import fs from 'fs';
import path from 'path';

const INDEXNOW_API_KEY = '40d4228026174b1b8d8e93bd7827fbb6';
const HOST = 'www.listpak.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_API_KEY}.txt`;

async function runIndexNowSubmission() {
  console.log("Gathering all URLs for IndexNow batch submission...");
  
  const urls = new Set([
    `https://${HOST}`,
    `https://${HOST}/categories`,
    `https://${HOST}/cities`,
    `https://${HOST}/professionals`,
    `https://${HOST}/jobs`,
    `https://${HOST}/blog`,
    `https://${HOST}/contact`,
    `https://${HOST}/about-us`,
    `https://${HOST}/terms`,
    `https://${HOST}/privacy-policy`,
    `https://${HOST}/add-business`,
    `https://${HOST}/add-professional`,
  ]);

  // Load database dump
  const dumpPath = path.join(process.cwd(), "scripts", "all-db-dump.json");
  if (fs.existsSync(dumpPath)) {
    const dump = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));

    // Professionals
    if (dump.professionals) {
      dump.professionals.forEach(p => {
        const slug = p.username || p.slug || p.id;
        urls.add(`https://${HOST}/professionals/${slug}`);
      });
    }

    // Jobs
    if (dump.jobs) {
      dump.jobs.forEach(j => {
        const slug = j.slug || j.id;
        urls.add(`https://${HOST}/jobs/${slug}`);
      });
    }

    // Businesses
    if (dump.businesses) {
      dump.businesses.forEach(b => {
        const slug = b.slug || b.id;
        urls.add(`https://${HOST}/business/${slug}`);
      });
    }
  }

  const urlList = Array.from(urls);
  console.log(`Total URLs collected for submission: ${urlList.length}`);

  const payload = {
    host: HOST,
    key: INDEXNOW_API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  const endpoints = [
    'https://api.indexnow.org/IndexNow',
    'https://www.bing.com/IndexNow'
  ];

  for (const endpoint of endpoints) {
    console.log(`\nSubmitting ${urlList.length} URLs to ${endpoint}...`);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`Response Status: ${res.status} ${res.statusText}`);
      if (res.ok || res.status === 200 || res.status === 202) {
        console.log(`✓ SUCCESS: Submitted to ${endpoint}`);
      } else {
        const bodyText = await res.text();
        console.log(`Response Body: ${bodyText}`);
      }
    } catch (err) {
      console.error(`Error submitting to ${endpoint}:`, err.message);
    }
  }

  console.log("\nIndexNow batch submission completed.");
  process.exit(0);
}

runIndexNowSubmission().catch(e => { console.error(e); process.exit(1); });
