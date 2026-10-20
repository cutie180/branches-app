import fs from 'fs';

const filePath = './lib/blog-data.ts';
let code = fs.readFileSync(filePath, 'utf8');

// 1. restaurants-in-pakistan
code = code.replace(
  /('restaurants-in-pakistan':\s*\{[\s\S]*?title:\s*)'[^']+'([\s\S]*?metaTitle:\s*)'[^']+'([\s\S]*?metaDescription:\s*)'[^']+'/,
  `$1'25 Best Restaurants in Pakistan 2026 – Karachi, Lahore & Islamabad'$2'25 Best Restaurants in Pakistan 2026 – Karachi, Lahore & Islamabad'$3'Pakistan\\'s best restaurants in 2026 across Karachi, Lahore & Islamabad — top picks by cuisine, area & budget, with contact details.'`
);

// 2. best-universities-computer-science-pakistan
code = code.replace(
  /('best-universities-computer-science-pakistan':\s*\{[\s\S]*?title:\s*)'[^']+'([\s\S]*?metaTitle:\s*)'[^']+'([\s\S]*?metaDescription:\s*)'[^']+'/,
  `$1'Best Universities for Computer Science in Pakistan 2026 – Top 12 Ranked'$2'Best Universities for Computer Science in Pakistan 2026 – Top 12 Ranked'$3'Top universities for BS Computer Science in Pakistan 2026: NUST, FAST-NUCES, LUMS, COMSATS & more — fees, merit, cities & admission details compared.'`
);

// 3. best-software-houses-pakistan-2026
code = code.replace(
  /('best-software-houses-pakistan-2026':\s*\{[\s\S]*?title:\s*)'[^']+'([\s\S]*?metaTitle:\s*)'[^']+'([\s\S]*?metaDescription:\s*)'[^']+'/,
  `$1'Top 15 Software Houses in Pakistan 2026 – Ranked by Clients & Reviews'$2'Top 15 Software Houses in Pakistan 2026 – Ranked by Clients & Reviews'$3'Pakistan\\'s top software houses in 2026: Systems Limited, Arbisoft, Netsol, 10Pearls & more. Services, locations & contact details — compare and hire.'`
);

// 4. how-to-find-jobs-in-pakistan-2026
code = code.replace(
  /('how-to-find-jobs-in-pakistan-2026':\s*\{[\s\S]*?title:\s*)'[^']+'([\s\S]*?metaTitle:\s*)'[^']+'([\s\S]*?metaDescription:\s*)'[^']+'/,
  `$1'How to Find Jobs in Pakistan 2026 – Step-by-Step Guide (Free)'$2'How to Find Jobs in Pakistan 2026 – Step-by-Step Guide (Free)'$3'Find jobs in Pakistan in 2026: where to search, how to apply, fresher tips & the latest Karachi, Lahore & Islamabad vacancies on ListPak Jobs.'`
);

// 5. top-business-directory-websites-pakistan
code = code.replace(
  /('top-business-directory-websites-pakistan':\s*\{[\s\S]*?title:\s*)'[^']+'([\s\S]*?metaTitle:\s*)'[^']+'([\s\S]*?metaDescription:\s*)'[^']+'/,
  `$1'Top Business Directories in Pakistan Compared (2026 Guide)'$2'Top Business Directories in Pakistan Compared (2026 Guide)'$3'Compare the top online business directories in Pakistan in 2026. Discover how to list your company on ListPak and build high-authority local citations.'`
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated blog-data.ts titles and meta descriptions.');
