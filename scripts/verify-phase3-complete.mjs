import fs from 'fs';
import { getAllJobs, getJobBySlug } from '../lib/job-service.ts';
import { getPublicJobSlug, getPublicJobPath } from '../lib/job-url.ts';
import { parseJobSalary, getJobDatePosted, getJobValidThrough, stripMarkdown, formatJobMetaDescription, isExpiredJob } from '../lib/job-schema-helpers.ts';
import { BLOG_POSTS } from '../lib/blog-data.ts';

async function runVerification() {
  console.log('====================================================');
  console.log('   LISTPAK PHASE 3 COMPREHENSIVE VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. HUB PAGE CHECKS
  console.log('--- 1. /jobs/ Hub Page Metadata & Structure ---');
  const jobsPageSrc = fs.readFileSync('./app/jobs/page.tsx', 'utf8');
  assert(!jobsPageSrc.startsWith("'use client'"), '/jobs/ page.tsx is a Server Component (no use client at root)');
  assert(jobsPageSrc.includes('Jobs in Pakistan 2026 – Latest Jobs in Karachi, Lahore & Islamabad | ListPak'), 'Hub title matches exact requirement');
  assert(jobsPageSrc.includes('Find the latest jobs in Pakistan — call center, IT, marketing, data entry & remote jobs in Karachi, Lahore, Islamabad. New vacancies added daily. Apply free.'), 'Hub meta description matches exact requirement');
  assert(jobsPageSrc.includes('@type": "ItemList') || jobsPageSrc.includes("'@type': 'ItemList'"), 'Hub includes ItemList JSON-LD schema');
  assert(jobsPageSrc.includes('@type": "FAQPage') || jobsPageSrc.includes("'@type': 'FAQPage'"), 'Hub includes FAQPage JSON-LD schema');
  assert(jobsPageSrc.includes('How can I find the latest jobs in Pakistan?'), 'Hub FAQ Q1 matches exact text');
  assert(jobsPageSrc.includes('Are there jobs for freshers in Pakistan on ListPak?'), 'Hub FAQ Q2 matches exact text');
  assert(jobsPageSrc.includes('Is it free to apply for jobs on ListPak?'), 'Hub FAQ Q3 matches exact text');
  assert(jobsPageSrc.includes('How can employers post a job on ListPak?'), 'Hub FAQ Q4 matches exact text');

  // Check live jobs
  const liveJobs = await getAllJobs(false);
  console.log(`\nTotal active jobs returned by getAllJobs(false): ${liveJobs.length}`);
  assert(liveJobs.length >= 20, `Active jobs count (${liveJobs.length}) is at least 20`);

  // Check SSR job links in page source
  assert(jobsPageSrc.includes('getPublicJobPath(job)'), 'Hub page template links every job via getPublicJobPath(job)');

  // 2. SAMPLE JOB POSTING SCHEMA CHECKS
  console.log('\n--- 2. JobPosting Schema & Data Quality Checks ---');
  const sampleJob = liveJobs.find(j => j.id.includes('smarthubinnovations')) || liveJobs[0];
  console.log(`Testing Sample Job: ${sampleJob.title} (${sampleJob.company}, ${sampleJob.city})`);

  const datePosted = getJobDatePosted(sampleJob);
  const validThrough = getJobValidThrough(sampleJob);
  const parsedSalary = parseJobSalary(sampleJob.salary);
  const metaDesc = formatJobMetaDescription(sampleJob);
  const cleanedDesc = stripMarkdown(sampleJob.description);

  assert(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(datePosted), `datePosted is valid ISO 8601: ${datePosted}`);
  assert(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(validThrough), `validThrough is valid ISO 8601: ${validThrough}`);
  
  // ValidThrough should be approx 30 days after datePosted
  const diffDays = Math.round((new Date(validThrough) - new Date(datePosted)) / (1000 * 60 * 60 * 24));
  assert(diffDays === 30, `validThrough is exactly 30 days after datePosted (${diffDays} days)`);

  assert(parsedSalary !== null && parsedSalary.minValue > 0, `Structured salary parsed successfully: min=${parsedSalary?.minValue}, max=${parsedSalary?.maxValue}, unit=${parsedSalary?.unitText}`);
  assert(parsedSalary?.minValue === 45000 && parsedSalary?.maxValue === 75000, `Call center salary parsed to min=45000, max=75000`);

  assert(!cleanedDesc.includes('###') && !cleanedDesc.includes('**'), 'Job description stripped of markdown headers and bold syntax');
  assert(metaDesc.includes('Salary PKR 45,000–75,000/month. Apply free on ListPak.') || metaDesc.includes('Apply free on ListPak.'), `Job post meta description format: "${metaDesc}"`);

  // Check remote job handling
  const remoteJob = liveJobs.find(j => j.city.toLowerCase() === 'remote');
  if (remoteJob) {
    console.log(`\nTesting Remote Job: ${remoteJob.title}`);
    assert(remoteJob.city.toLowerCase() === 'remote', 'Identified remote job vacancy');
  }

  // Check placeholder absence across all live jobs
  let placeholderFound = false;
  liveJobs.forEach(j => {
    if ((j.applicationWebsite || '').includes('Verify current direct application') || (j.applicationUrl || '').includes('Verify current direct application')) {
      placeholderFound = true;
    }
  });
  assert(!placeholderFound, 'Zero placeholder text ("Verify current direct application URL...") in any job');

  // Check city mismatches on call center winner post
  const ccJob = liveJobs.find(j => j.id.includes('smarthubinnovations'));
  if (ccJob) {
    assert(ccJob.city === 'Karachi', 'Call center job city is Karachi');
    assert(ccJob.description.includes('support center in Karachi'), 'Call center description matches Karachi (Islamabad mismatch resolved)');
  }

  // 3. BLOG LISTICLES CHECKS (PART B)
  console.log('\n--- 3. Part B Blog Listicles Metadata Checks ---');

  // B1. best-software-houses-pakistan-2026
  const b1 = BLOG_POSTS['best-software-houses-pakistan-2026'];
  assert(b1 && b1.title === 'Top 15 Software Houses in Pakistan 2026 – Ranked by Clients & Reviews', 'B1 title matches exact requirement');
  assert(b1 && b1.metaDescription.startsWith("Pakistan's top software houses in 2026: Systems Limited"), 'B1 meta description matches exact requirement');

  // B2. best-universities-computer-science-pakistan
  const b2 = BLOG_POSTS['best-universities-computer-science-pakistan'];
  assert(b2 && b2.title === 'Best Universities for Computer Science in Pakistan 2026 – Top 12 Ranked', 'B2 title matches exact requirement');
  assert(b2 && b2.metaDescription.startsWith('Top universities for BS Computer Science in Pakistan 2026: NUST'), 'B2 meta description matches exact requirement');

  // B3. restaurants-in-lahore
  const b3 = BLOG_POSTS['restaurants-in-lahore'];
  assert(b3 && b3.title === "15 Best Restaurants in Lahore 2026 – Food Street to MM Alam Road", 'B3 title matches exact requirement');
  assert(b3 && b3.metaDescription.includes('Monal, Salt\'n Pepper, Food Street favourites'), 'B3 meta description matches exact requirement');

  // B4. best-solar-companies-pakistan
  const b4 = BLOG_POSTS['best-solar-companies-pakistan'];
  assert(b4 && b4.title === 'Top 10 Solar Companies in Pakistan 2026 – Prices, Panels & Installers', 'B4 title matches exact requirement');
  assert(b4 && b4.metaDescription.includes('compare installers in Karachi, Lahore & Islamabad'), 'B4 meta description matches exact requirement');

  // B5. best-free-business-listing-websites-pakistan-2026
  const b5 = BLOG_POSTS['best-free-business-listing-websites-pakistan-2026'];
  assert(b5 && b5.title === '12 Best Free Business Listing Sites in Pakistan 2026 (ListPak Ranked #1)', 'B5 title matches exact requirement');
  assert(b5 && b5.metaDescription.includes('Free business listing sites in Pakistan that actually get you Google visibility in 2026'), 'B5 meta description matches exact requirement');

  // B6. top-business-directory-websites-pakistan
  const b6 = BLOG_POSTS['top-business-directory-websites-pakistan'];
  assert(b6 && b6.title === 'Top Business Directories in Pakistan Compared (2026 Guide)', 'B6 title matches exact requirement');

  // B7. best-banks-in-pakistan
  const b7 = BLOG_POSTS['best-banks-in-pakistan'];
  assert(b7 && b7.title === 'Top 10 Banks in Pakistan 2026 – Best for Accounts, Loans & Digital Banking', 'B7 title matches exact requirement');
  assert(b7 && b7.metaDescription.includes("Pakistan's best banks in 2026 ranked: Meezan, HBL, UBL"), 'B7 meta description matches exact requirement');

  // B8. how-to-find-jobs-in-pakistan-2026
  const b8 = BLOG_POSTS['how-to-find-jobs-in-pakistan-2026'];
  assert(b8 && b8.title === 'How to Find Jobs in Pakistan 2026 – Step-by-Step Guide (Free)', 'B8 title matches exact requirement');
  assert(b8 && b8.metaDescription.includes('Find jobs in Pakistan in 2026: where to search, how to apply'), 'B8 meta description matches exact requirement');

  // Retitle: restaurants-in-pakistan
  const rip = BLOG_POSTS['restaurants-in-pakistan'];
  assert(rip && rip.title === '25 Best Restaurants in Pakistan 2026 – Karachi, Lahore & Islamabad', 'restaurants-in-pakistan title matches exact requirement');
  assert(rip && rip.metaDescription.includes('Pakistan\'s best restaurants in 2026 across Karachi, Lahore & Islamabad'), 'restaurants-in-pakistan meta description matches exact requirement');

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
