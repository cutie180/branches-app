import http from 'http';
import fs from 'fs';
import path from 'path';

const expectedPages = [
  {
    path: '/',
    name: 'Homepage',
    title: 'Pakistan Business Directory – Find & List Businesses Free | ListPak',
    description: "ListPak is Pakistan's free business directory. Find verified businesses by city & category — or add your business listing free and get found on Google.",
    faqCount: 4,
    sampleFaqQ: 'What is ListPak?',
    sampleFaqA: 'ListPak is a free business directory for Pakistan. It helps people find verified local businesses by city and category, and lets businesses create a free listing that appears on Google.',
  },
  {
    path: '/city/lahore/',
    name: 'Lahore City Page',
    title: 'Businesses in Lahore – 60+ Verified Local Listings | ListPak',
    description: 'Browse 60+ verified businesses in Lahore — restaurants, software houses, services & more. Find contact numbers, addresses & reviews, or list your business free.',
    introSnippet: "Lahore is Pakistan's commercial and cultural capital, home to one of the country's densest business ecosystems",
    faqCount: 3,
    sampleFaqQ: 'How many businesses are listed in Lahore on ListPak?',
    sampleFaqA: 'ListPak lists 60+ verified businesses in Lahore across categories including restaurants & food, technology & IT, healthcare, real estate, retail and construction.',
    categoryBlockHeader: 'Browse by category in Lahore',
    hasNextRel: true,
  },
  {
    path: '/city/islamabad/',
    name: 'Islamabad City Page',
    title: 'Businesses in Islamabad – 55+ Verified Local Listings | ListPak',
    description: 'Browse 55+ verified businesses in Islamabad — tech companies, restaurants, services & more. Contact numbers, addresses & reviews, or list your business free.',
    introSnippet: "Islamabad's planned sectors host Pakistan's highest concentration of tech companies",
    faqCount: 3,
    sampleFaqQ: 'How many businesses are listed in Islamabad on ListPak?',
    sampleFaqA: 'ListPak lists 55+ verified businesses in Islamabad across technology & IT, restaurants & food, healthcare, professional services and more.',
    categoryBlockHeader: 'Browse by category in Islamabad',
    hasNextRel: true,
  },
  {
    path: '/city/karachi/',
    name: 'Karachi City Page',
    title: 'Businesses in Karachi – 30+ Verified Local Listings | ListPak',
    description: 'Browse 30+ verified businesses in Karachi — restaurants, healthcare, tech & more. Contact numbers, addresses & reviews, or list your business free.',
    introSnippet: "Karachi is Pakistan's largest city and financial hub",
    faqCount: 3,
    sampleFaqQ: 'How many businesses are listed in Karachi on ListPak?',
    sampleFaqA: 'ListPak lists 30+ verified businesses in Karachi across restaurants & food, healthcare, technology & IT, retail and more.',
    categoryBlockHeader: 'Browse by category in Karachi',
    hasNextRel: true,
  },
  {
    path: '/city/gujranwala/',
    name: 'Gujranwala City Page',
    title: 'Businesses in Gujranwala – Local Business Directory | ListPak',
    description: 'Find businesses in Gujranwala, Pakistan — contact numbers, addresses & reviews. List your Gujranwala business free on ListPak.',
    faqCount: 2,
    sampleFaqQ: 'How can I find businesses in Gujranwala?',
    sampleFaqA: "Browse ListPak's Gujranwala directory for verified local businesses with contact numbers, addresses and operating hours.",
    categoryBlockHeader: 'Browse by category in Gujranwala',
  },
  {
    path: '/city/faisalabad/',
    name: 'Faisalabad City Page',
    title: 'Businesses in Faisalabad – Local Business Directory | ListPak',
    description: 'Find businesses in Faisalabad, Pakistan — contact numbers, addresses & reviews. List your Faisalabad business free on ListPak.',
    faqCount: 2,
    sampleFaqQ: 'How can I find businesses in Faisalabad?',
    sampleFaqA: "Browse ListPak's Faisalabad directory for verified local businesses with contact numbers, addresses and operating hours.",
    categoryBlockHeader: 'Browse by category in Faisalabad',
  },
  {
    path: '/city/multan/',
    name: 'Multan City Page',
    title: 'Businesses in Multan – Local Business Directory | ListPak',
    description: 'Find businesses in Multan, Pakistan — contact numbers, addresses & reviews. List your Multan business free on ListPak.',
    faqCount: 2,
    sampleFaqQ: 'How can I find businesses in Multan?',
    sampleFaqA: "Browse ListPak's Multan directory for verified local businesses with contact numbers, addresses and operating hours.",
    categoryBlockHeader: 'Browse by category in Multan',
  },
  {
    path: '/city/sialkot/',
    name: 'Sialkot City Page',
    title: 'Businesses in Sialkot – Local Business Directory | ListPak',
    description: 'Find businesses in Sialkot, Pakistan — contact numbers, addresses & reviews. List your Sialkot business free on ListPak.',
    faqCount: 2,
    sampleFaqQ: 'How can I find businesses in Sialkot?',
    sampleFaqA: "Browse ListPak's Sialkot directory for verified local businesses with contact numbers, addresses and operating hours.",
    categoryBlockHeader: 'Browse by category in Sialkot',
  },
];

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—');
}

async function verify() {
  console.log('====================================================');
  console.log('   ListPak Phase 2 SEO Verification (8 Routes)     ');
  console.log('====================================================\n');

  let allPassed = true;

  for (const page of expectedPages) {
    const url = `http://localhost:3000${page.path}`;
    console.log(`[TESTING] ${page.name} (${page.path})`);
    
    let res;
    try {
      res = await fetch(url);
    } catch (err) {
      console.error(`  ❌ Failed to connect to ${url}:`, err.message);
      allPassed = false;
      continue;
    }

    if (res.status !== 200) {
      console.error(`  ❌ HTTP Status failed: expected 200, got ${res.status}`);
      allPassed = false;
      continue;
    }
    console.log(`  ✓ HTTP Status: 200 OK`);

    const rawHtml = await res.text();
    const html = rawHtml.replace(/<!--[\s\S]*?-->/g, '');

    // 1. Title verification
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const actualTitle = titleMatch ? decodeHtml(titleMatch[1]).trim() : '';
    if (actualTitle === page.title) {
      console.log(`  ✓ Title match: "${actualTitle}"`);
    } else {
      console.error(`  ❌ Title mismatch!\n     Expected: "${page.title}"\n     Actual:   "${actualTitle}"`);
      allPassed = false;
    }

    // 2. Meta description verification
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const actualDesc = descMatch ? decodeHtml(descMatch[1]).trim() : '';
    if (actualDesc === page.description) {
      console.log(`  ✓ Meta Description match: "${actualDesc}"`);
    } else {
      console.error(`  ❌ Meta Description mismatch!\n     Expected: "${page.description}"\n     Actual:   "${actualDesc}"`);
      allPassed = false;
    }

    // 3. Intro copy check
    if (page.introSnippet) {
      if (html.includes(page.introSnippet)) {
        console.log(`  ✓ Unique intro copy present: "${page.introSnippet.slice(0, 45)}..."`);
      } else {
        console.error(`  ❌ Unique intro copy missing! Snippet not found.`);
        allPassed = false;
      }
    }

    // 4. "Browse by category in {City}" link block
    if (page.categoryBlockHeader) {
      if (html.includes(page.categoryBlockHeader)) {
        console.log(`  ✓ Category link block present: "${page.categoryBlockHeader}"`);
      } else {
        console.error(`  ❌ Category link block missing: "${page.categoryBlockHeader}" not found in HTML!`);
        allPassed = false;
      }
    }

    // 5. Visible FAQ section check
    if (html.includes(page.sampleFaqQ) && html.includes(page.sampleFaqA)) {
      console.log(`  ✓ Visible FAQ section contains sample Q&A: "${page.sampleFaqQ}"`);
    } else {
      console.error(`  ❌ Visible FAQ missing or text does not match! Q: "${page.sampleFaqQ}"`);
      allPassed = false;
    }

    // 6. FAQPage JSON-LD schema check
    const jsonLdMatches = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g) || [];
    let foundFaqSchema = false;
    let foundFaqEntity = false;

    for (const match of jsonLdMatches) {
      const content = match.replace(/<script[^>]*>|<\/script>/g, '').trim();
      try {
        const parsed = JSON.parse(content);
        const schemas = Array.isArray(parsed) ? parsed : [parsed];
        for (const s of schemas) {
          if (s['@type'] === 'FAQPage') {
            foundFaqSchema = true;
            if (s.mainEntity && Array.isArray(s.mainEntity)) {
              const matchedEntity = s.mainEntity.find(
                e => e.name === page.sampleFaqQ && e.acceptedAnswer?.text === page.sampleFaqA
              );
              if (matchedEntity) {
                foundFaqEntity = true;
              }
            }
          }
        }
      } catch (e) {
        // Ignore parse error on other scripts
      }
    }

    if (foundFaqSchema && foundFaqEntity) {
      console.log(`  ✓ FAQPage JSON-LD schema verified & matches visible text exactly`);
    } else {
      console.error(`  ❌ FAQPage JSON-LD schema missing or Q&A mismatch!`);
      allPassed = false;
    }

    // 7. Rel next check
    if (page.hasNextRel) {
      if (html.includes('rel="next"') || html.includes('rel=\'next\'')) {
        console.log(`  ✓ rel="next" pagination tag present`);
      } else {
        console.error(`  ❌ rel="next" tag expected but missing!`);
        allPassed = false;
      }
    }

    console.log('');
  }

  // Also verify paginated page /city/lahore/page/2/
  console.log('[TESTING] Paginated Page (/city/lahore/page/2/)');
  const page2Res = await fetch('http://localhost:3000/city/lahore/page/2/');
  if (page2Res.status === 200) {
    const page2Html = await page2Res.text();
    const hasRelPrev = page2Html.includes('rel="prev"');
    console.log(`  ✓ HTTP Status: 200 OK`);
    console.log(`  ✓ rel="prev" present: ${hasRelPrev}`);
  } else {
    console.error(`  ❌ /city/lahore/page/2/ failed with status: ${page2Res.status}`);
    allPassed = false;
  }

  console.log('\n====================================================');
  if (allPassed) {
    console.log('   🎉 ALL 8 ROUTES + PAGINATION PASSED VERIFICATION! ');
  } else {
    console.error('   ❌ SOME CHECKS FAILED. See details above.');
    process.exit(1);
  }
  console.log('====================================================\n');
}

verify();
