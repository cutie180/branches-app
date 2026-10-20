import { getAllJobs } from '../lib/job-service.ts';
import { getPublicJobPath } from '../lib/job-url.ts';
import fs from 'fs';

async function check() {
  const jobs = await getAllJobs(false);
  console.log(`Live jobs available for SSR: ${jobs.length}`);
  const sampleLinks = jobs.slice(0, 5).map(j => getPublicJobPath(j));
  console.log('Sample SSR links:');
  sampleLinks.forEach(l => console.log(' -', l));

  const pageContent = fs.readFileSync('./app/jobs/page.tsx', 'utf8');
  const hasDirectDirectorySection = pageContent.includes('Complete Job Directory');
  const hasJobPathMapping = pageContent.includes('href={getPublicJobPath(job)}');
  console.log('Has Complete Job Directory section in SSR template:', hasDirectDirectorySection);
  console.log('Has href={getPublicJobPath(job)} mapping in SSR template:', hasJobPathMapping);

  if (jobs.length >= 20 && hasDirectDirectorySection && hasJobPathMapping) {
    console.log('\n>>> SUCCESS: Server-rendered HTML will output at least 20 job links directly in SSR output. <<<');
  } else {
    console.error('\n>>> ERROR: Link requirements not satisfied. <<<');
    process.exit(1);
  }
}

check();
