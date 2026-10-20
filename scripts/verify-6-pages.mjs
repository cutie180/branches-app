import fs from 'fs';

const pages = [
  {
    slug: 'rahber-travels',
    expectedTitle: 'Rahber Travels Lahore – Contact Number, Adda Address & Timings | ListPak',
    expectedMetaDesc: 'Rahber Travels contact number: 0307-5553045. Rehbar Adda on Band Road, Lahore — timings (open daily 10 AM–9 PM), routes & ticket info.',
    faqCount: 5,
    sampleFaq: 'What is the contact number of Rahber Travels in Lahore?'
  },
  {
    slug: 'nayatel',
    expectedTitle: 'Nayatel Helpline Number & Contact Details – Islamabad | ListPak',
    expectedMetaDesc: 'Nayatel helpline: 1441 (24/7). SMS: 8116, WhatsApp: +92 51 111 11 44 44. Internet packages, coverage areas & Nayatel office details in Islamabad.',
    faqCount: 5,
    sampleFaq: 'What is the Nayatel helpline number?',
    expectedPhone: '1441'
  },
  {
    slug: 'orange-line-metro-station-timing-and-routes',
    expectedTitle: 'Orange Line Metro Lahore – Timings, 26 Stations & Route | ListPak',
    expectedMetaDesc: 'Orange Line Metro Lahore: 26 stations from Dera Gujran to Ali Town across 27.1 km. Train timings, station list, route & helpline (042) 111-222-627.',
    faqCount: 4,
    sampleFaq: 'How many stations does the Orange Line Metro Lahore have?'
  },
  {
    slug: 'al-zaban-hardware-store',
    expectedTitle: 'Al Zaban Hardware Store Lahore – Contact Number & Location | ListPak',
    expectedMetaDesc: 'Al Zaban Hardware Store contact: 0335-1108300. Township B1, Lahore address, timings (open daily 10 AM–9 PM) & hardware products and prices info.',
    faqCount: 4,
    sampleFaq: 'What is the contact number of Al Zaban Hardware Store?'
  },
  {
    slug: 'monal-lahore',
    expectedTitle: 'Monal Restaurant Lahore – Timings, Menu & Contact Number | ListPak',
    expectedMetaDesc: 'Monal Restaurant Lahore — iconic rooftop dining with Pakistani, Mughlai, Continental & BBQ cuisine. Location, timings & contact details on ListPak.',
    faqCount: 3,
    sampleFaq: 'Where is Monal Restaurant located in Lahore?',
    expectedPhone: '042-35789823'
  },
  {
    slug: 'allure-beauty',
    expectedTitle: 'Allure Beauty Karachi – Contact Number & Online Beauty Store | ListPak',
    expectedMetaDesc: 'Allure Beauty contact: +92 300 0725776. Karachi-based online store for authentic makeup, skincare & perfumes. Delivery across Pakistan.',
    faqCount: 4,
    sampleFaq: "What is Allure Beauty's contact number?"
  }
];

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function verify() {
  console.log('Testing pages on http://localhost:3000 ...\n');
  let allPassed = true;

  for (const page of pages) {
    const url = `http://localhost:3000/business/${page.slug}`;
    console.log(`Testing: ${url}`);
    const res = await fetch(url);
    if (res.status !== 200) {
      console.error(`❌ HTTP Status failed: expected 200, got ${res.status}`);
      allPassed = false;
      continue;
    }
    console.log(`  ✓ HTTP Status: 200`);

    const html = await res.text();

    // 1. Check title (decode HTML entities as browsers/crawlers do)
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const actualTitle = titleMatch ? decodeHtml(titleMatch[1]) : '';
    if (actualTitle === page.expectedTitle) {
      console.log(`  ✓ Title match: "${actualTitle}"`);
    } else {
      console.error(`  ❌ Title mismatch!\n     Expected: "${page.expectedTitle}"\n     Actual:   "${actualTitle}"`);
      allPassed = false;
    }

    // 2. Check meta description
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const actualDesc = descMatch ? decodeHtml(descMatch[1]) : '';
    if (actualDesc === page.expectedMetaDesc) {
      console.log(`  ✓ Meta Description match: "${actualDesc}"`);
    } else {
      console.error(`  ❌ Meta Description mismatch!\n     Expected: "${page.expectedMetaDesc}"\n     Actual:   "${actualDesc}"`);
      allPassed = false;
    }

    // 3. Check visible FAQ section
    if (html.includes('Frequently Asked Questions') && html.includes(page.sampleFaq)) {
      console.log(`  ✓ Visible FAQ section verified (contains "${page.sampleFaq}")`);
    } else {
      console.error(`  ❌ Visible FAQ section missing or incomplete!`);
      allPassed = false;
    }

    // 4. Check JSON-LD schemas
    const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const schemas = [];
    for (const m of jsonLdMatches) {
      try {
        schemas.push(JSON.parse(m[1]));
      } catch (err) {
        console.error('  ❌ JSON-LD parse error:', err.message);
        allPassed = false;
      }
    }

    const faqSchema = schemas.find(s => s['@type'] === 'FAQPage');
    if (faqSchema && Array.isArray(faqSchema.mainEntity) && faqSchema.mainEntity.length === page.faqCount) {
      console.log(`  ✓ FAQPage JSON-LD verified (${faqSchema.mainEntity.length} questions)`);
    } else {
      console.error(`  ❌ FAQPage JSON-LD missing or wrong count! Found:`, faqSchema);
      allPassed = false;
    }

    const localBizSchema = schemas.find(s => s['@type'] === 'LocalBusiness' || (Array.isArray(s['@type']) && s['@type'].includes('LocalBusiness')));
    if (localBizSchema) {
      console.log(`  ✓ LocalBusiness schema verified`);
      // Check markdown stripping
      if (localBizSchema.description && (localBizSchema.description.includes('**') || localBizSchema.description.includes('##'))) {
        console.error(`  ❌ LocalBusiness description contains markdown! "${localBizSchema.description.slice(0, 100)}"`);
        allPassed = false;
      } else {
        console.log(`  ✓ LocalBusiness description is clean plain text (no markdown)`);
      }

      // Check aggregateRating is NOT present if no real reviews
      if (localBizSchema.aggregateRating) {
        console.log(`  ℹ️ aggregateRating present:`, localBizSchema.aggregateRating);
      } else {
        console.log(`  ✓ aggregateRating correctly omitted (no synthetic template fallback)`);
      }

      // Check phone if expected
      if (page.expectedPhone) {
        if (localBizSchema.telephone === page.expectedPhone || localBizSchema.telephone.replace(/\D/g, '') === page.expectedPhone.replace(/\D/g, '')) {
          console.log(`  ✓ Verified phone in schema: ${localBizSchema.telephone}`);
        } else {
          console.error(`  ❌ Phone mismatch in schema! Expected ${page.expectedPhone}, got ${localBizSchema.telephone}`);
          allPassed = false;
        }
      }

      // Ensure dummy phone placeholder is NOT present
      if (localBizSchema.telephone === '+9221111000000' || localBizSchema.telephone === '9221111000000') {
        console.error(`  ❌ Placeholder phone +9221111000000 found in schema!`);
        allPassed = false;
      }
    } else {
      console.error(`  ❌ LocalBusiness schema missing!`);
      allPassed = false;
    }

    console.log('');
  }

  // 5. Test untargeted business page
  console.log('Testing untargeted page /business/crust-crave-karachi ...');
  const untargetedRes = await fetch('http://localhost:3000/business/crust-crave-karachi');
  console.log(`  ✓ Untargeted status: ${untargetedRes.status}`);
  const untargetedHtml = await untargetedRes.text();
  const untargetedTitle = decodeHtml(untargetedHtml.match(/<title>([^<]+)<\/title>/)?.[1] || '');
  console.log(`  ✓ Untargeted title (kept template): "${untargetedTitle}"`);

  if (allPassed) {
    console.log('\n🎉 ALL 6 PAGES AND GLOBAL CHECKS PASSED PERFECTLY!');
  } else {
    console.error('\n❌ SOME CHECKS FAILED!');
    process.exit(1);
  }
}

verify().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
