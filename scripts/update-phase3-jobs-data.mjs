import fs from 'fs';

const filePath = './lib/data.ts';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Remove all placeholder text
code = code.replaceAll('Verify current direct application URL from the source result', '');

// 2. Fix smarthubinnovations call center job: Karachi city match and salary
code = code.replace(
  'SmartHubInnovations is hiring energetic, fluent English speakers for Evening Shift Call Center Agent positions at our modern customer support center in Islamabad.',
  'SmartHubInnovations is hiring energetic, fluent English speakers for Evening Shift Call Center Agent positions at our modern customer support center in Karachi.'
);

// Fix call center salary to 45k-75k
code = code.replace(
  `    "id": "job-evening-shift-call-center-agent-students-freshers-smarthubinnovations",
    "slug": "evening-shift-call-center-agent-students-freshers-smarthubinnovations",
    "title": "Evening Shift Call Center Agent - Students & Freshers",
    "company": "smarthubinnovations",
    "companyId": "company",
    "companyLogo": "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=100&q=80",
    "city": "Karachi",
    "cities": [
      "Karachi"
    ],
    "type": "Part-time",
    "category": "Customer Support",
    "salary": "Up to PKR 40,000 / month",`,
  `    "id": "job-evening-shift-call-center-agent-students-freshers-smarthubinnovations",
    "slug": "evening-shift-call-center-agent-students-freshers-smarthubinnovations",
    "title": "Evening Shift Call Center Agent - Students & Freshers",
    "company": "smarthubinnovations",
    "companyId": "company",
    "companyLogo": "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=100&q=80",
    "city": "Karachi",
    "cities": [
      "Karachi"
    ],
    "type": "Part-time",
    "category": "Customer Support",
    "salary": "PKR 45,000 - 75,000 / month",`
);

// 3. Fix Bahria Town Karachi Data Entry Operator city from Lakki Marwat to Karachi
code = code.replace(
  `    "id": "job-data-entry-operator-bahria-town-karachi",
    "slug": "data-entry-operator-bahria-town-karachi",
    "title": "Data Entry Operator",
    "company": "Bahria Town Karachi",
    "companyId": "company",
    "companyLogo": "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=100&q=80",
    "city": "Lakki Marwat",
    "cities": [
      "Lakki Marwat"
    ],`,
  `    "id": "job-data-entry-operator-bahria-town-karachi",
    "slug": "data-entry-operator-bahria-town-karachi",
    "title": "Data Entry Operator",
    "company": "Bahria Town Karachi",
    "companyId": "company",
    "companyLogo": "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=100&q=80",
    "city": "Karachi",
    "cities": [
      "Karachi"
    ],`
);

// 4. Update postedAt dates on all MOCK_JOBS to October 15-20, 2026
// And expiresAt to 30 days later (November 14-19, 2026)
let jobIdx = 0;
code = code.replace(
  /("id":\s*"(?:job-|CJhX|b29L|jpmE|umfF)[^"]+",[\s\S]*?"postedAt":\s*")([^"]+)("[\s\S]*?"expiresAt":\s*")([^"]+)(")/g,
  (match, p1, oldPosted, p3, oldExpires, p5) => {
    jobIdx++;
    // Spread dates across Oct 15 - Oct 20, 2026
    const day = 15 + (jobIdx % 5);
    const hour = 8 + (jobIdx % 10);
    const min = (jobIdx * 7) % 60;
    const pad = (n) => String(n).padStart(2, '0');
    const newPosted = `2026-10-${pad(day)}T${pad(hour)}:${pad(min)}:00.000Z`;
    const expDay = day + 30 > 31 ? day + 30 - 31 : day + 30; // into Nov 2026
    const expMonth = day + 30 > 31 ? '11' : '10';
    const newExpires = `2026-${expMonth}-${pad(expDay)}T${pad(hour)}:${pad(min)}:00.000Z`;
    return `${p1}${newPosted}${p3}${newExpires}${p5}`;
  }
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated lib/data.ts with clean job data and October 2026 dates.');
