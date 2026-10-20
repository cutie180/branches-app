import fs from 'fs';

const raw = fs.readFileSync('./lib/data.ts', 'utf8');
const jobsMatch = raw.match(/export const MOCK_JOBS: JobItem\[\] = (\[[\s\S]*?\n\];?\n)/);

if (jobsMatch) {
  // evaluate or parse
  const jobsJson = jobsMatch[1].trim().replace(/;$/, '');
  try {
    const jobs = JSON.parse(jobsJson);
    console.log('Total mock jobs:', jobs.length);
    console.log('First 5 jobs:');
    jobs.slice(0, 5).forEach(j => {
      console.log(`- ${j.title} (${j.company}, ${j.city}): postedAt=${j.postedAt}, postedDate=${j.postedDate}, deadline=${j.deadline}, expiresAt=${j.expiresAt}, salary=${j.salary}`);
    });
  } catch (e) {
    console.log('JSON parse error, extracting fields via regex');
    const titles = [...jobsJson.matchAll(/"title":\s*"([^"]+)"/g)].map(m => m[1]);
    console.log('Total jobs found by regex:', titles.length);
    const postedAts = [...jobsJson.matchAll(/"postedAt":\s*"([^"]+)"/g)].map(m => m[1]);
    console.log('Sample postedAt:', postedAts.slice(0, 5));
    const deadlines = [...jobsJson.matchAll(/"deadline":\s*"([^"]+)"/g)].map(m => m[1]);
    console.log('Sample deadlines:', deadlines.slice(0, 5));
  }
} else {
  console.log('Could not match MOCK_JOBS');
}
