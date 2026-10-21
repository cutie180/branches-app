import fs from 'fs';
import path from 'path';

// Helper to load ES module files relative to branches
async function runVerification() {
  console.log('====================================================');
  console.log('   LISTPAK PHASE 4 CLEANUP VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      if (details) console.error(`       Details: ${details}`);
      failed++;
    }
  }

  // ----------------------------------------------------
  // 1. PRAYER TIMES TESTS
  // ----------------------------------------------------
  console.log('\n--- 1. Prayer Times Indexing Allowlist ---');
  const prayerPage = await import('../app/prayer-times/[slug]/page.tsx');
  const { INDEXABLE_PRAYER_SLUGS, generateMetadata: generatePrayerMeta } = prayerPage;

  const expectedKeptSlugs = [
    'islamabad',
    'kallar-syedan',
    'lahore',
    'shujabad',
    'sohawa',
    'timergara',
    'rawalpindi',
    'sarai-alamgir',
    'samundri',
    'hassan-abdal',
    'batkhela',
    'peshawar',
    'karachi',
  ];

  assert(INDEXABLE_PRAYER_SLUGS instanceof Set, 'INDEXABLE_PRAYER_SLUGS is a Set');
  assert(INDEXABLE_PRAYER_SLUGS.size === 13, `INDEXABLE_PRAYER_SLUGS has exactly 13 slugs (got ${INDEXABLE_PRAYER_SLUGS.size})`);

  for (const slug of expectedKeptSlugs) {
    assert(INDEXABLE_PRAYER_SLUGS.has(slug), `INDEXABLE_PRAYER_SLUGS includes '${slug}'`);
  }

  // Test kept page metadata (e.g. islamabad)
  const keptMeta = await generatePrayerMeta({ params: Promise.resolve({ slug: 'islamabad-today' }) });
  assert(keptMeta.robots?.index === true, "Kept prayer page (islamabad-today) has robots.index === true");
  assert(keptMeta.robots?.follow === true, "Kept prayer page (islamabad-today) has robots.follow === true");

  // Test non-kept page metadata (e.g. faisalabad, multan, abbottabad)
  const noindexMeta1 = await generatePrayerMeta({ params: Promise.resolve({ slug: 'faisalabad-today' }) });
  assert(noindexMeta1.robots?.index === false, "Non-kept prayer page (faisalabad-today) has robots.index === false");
  assert(noindexMeta1.robots?.follow === true, "Non-kept prayer page (faisalabad-today) has robots.follow === true");

  const noindexMeta2 = await generatePrayerMeta({ params: Promise.resolve({ slug: 'multan-today' }) });
  assert(noindexMeta2.robots?.index === false, "Non-kept prayer page (multan-today) has robots.index === false");
  assert(noindexMeta2.robots?.follow === true, "Non-kept prayer page (multan-today) has robots.follow === true");

  // Hub page verification
  const prayerHubSrc = fs.readFileSync('./app/prayer-times-pakistan/page.tsx', 'utf8');
  assert(prayerHubSrc.includes('index: true'), 'Prayer hub /prayer-times-pakistan/ has index: true');
  assert(prayerHubSrc.includes('follow: true'), 'Prayer hub /prayer-times-pakistan/ has follow: true');

  // ----------------------------------------------------
  // 2. CATEGORY X CITY NOINDEX TESTS
  // ----------------------------------------------------
  console.log('\n--- 2. Category x City < 3 Listings Noindex Rule ---');
  const catCityPage = await import('../app/category/[slug]/[city]/page.tsx');
  const { generateMetadata: generateCatCityMeta } = catCityPage;
  const { getAllBusinesses } = await import('../lib/db-service.ts');
  const { filterBusinessesByCategory, filterBusinessesByCategoryAndCity, getPopulatedCategoryCityPairs } = await import('../lib/directory-helpers.ts');
  const allBiz = await getAllBusinesses(false);

  // Test combo with 0 listings (e.g. finance in quetta)
  const zeroListingsMeta = await generateCatCityMeta({
    params: Promise.resolve({ slug: 'finance', city: 'quetta' }),
  });
  assert(
    zeroListingsMeta.robots?.index === false,
    '/category/finance/quetta/ (0 listings < 3) has robots.index === false (noindex)'
  );
  assert(
    zeroListingsMeta.robots?.follow === true,
    '/category/finance/quetta/ has robots.follow === true (follow)'
  );

  // Find a combo with 1 or 2 listings (if any exists)
  const populatedPairs = getPopulatedCategoryCityPairs(allBiz);
  const smallPair = populatedPairs.find((p) => p.count < 3);

  if (smallPair) {
    const smallMeta = await generateCatCityMeta({
      params: Promise.resolve({ slug: smallPair.categorySlug, city: smallPair.citySlug }),
    });
    assert(
      smallMeta.robots?.index === false,
      `/category/${smallPair.categorySlug}/${smallPair.citySlug}/ (${smallPair.count} listings < 3) has robots.index === false (noindex)`
    );
    assert(
      smallMeta.robots?.follow === true,
      `/category/${smallPair.categorySlug}/${smallPair.citySlug}/ has robots.follow === true (follow)`
    );
  }

  // Check combo with >= 3 listings
  const bigPair = populatedPairs.find((p) => p.count >= 3);
  if (bigPair) {
    const bigMeta = await generateCatCityMeta({
      params: Promise.resolve({ slug: bigPair.categorySlug, city: bigPair.citySlug }),
    });
    assert(
      bigMeta.robots?.index === true,
      `/category/${bigPair.categorySlug}/${bigPair.citySlug}/ (${bigPair.count} listings >= 3) has robots.index === true (index)`
    );
    assert(
      bigMeta.robots?.follow === true,
      `/category/${bigPair.categorySlug}/${bigPair.citySlug}/ has robots.follow === true (follow)`
    );
  }

  // ----------------------------------------------------
  // 3. 8 CATEGORY ROUTES SEO OVERRIDES & FAQ TESTS
  // ----------------------------------------------------
  console.log('\n--- 3. Category SEO Overrides & Visible FAQ Matching ---');
  const { CATEGORY_SEO_OVERRIDES, getCategorySeoOverride } = await import('../lib/category-seo-overrides.ts');

  const requiredRoutes = [
    'restaurants',
    'finance',
    'technology',
    'automotive',
    'real-estate',
    'travel',
    'healthcare',
    'categories',
  ];

  for (const key of requiredRoutes) {
    const override = getCategorySeoOverride(key);
    assert(Boolean(override), `Category override exists for '${key}'`);
    assert(Boolean(override?.title && override.title.includes('ListPak')), `'${key}' title ends with ListPak: "${override?.title}"`);
    assert(Boolean(override?.description && override.description.length > 50), `'${key}' meta description is substantial (${override?.description.length} chars)`);
    assert(Boolean(override?.intro && override.intro.length > 50), `'${key}' intro paragraph is substantial (${override?.intro.length} chars)`);
    assert(Array.isArray(override?.faqs) && override.faqs.length === 3, `'${key}' has exactly 3 FAQ items (got ${override?.faqs?.length})`);

    // Verify questions and answers have content
    override?.faqs?.forEach((faq, i) => {
      assert(Boolean(faq.question && faq.question.endsWith('?')), `'${key}' FAQ ${i + 1} has valid question: "${faq.question}"`);
      assert(Boolean(faq.answer && faq.answer.length > 20), `'${key}' FAQ ${i + 1} has substantial answer`);
    });
  }

  // Check specific titles and descriptions from user specification
  const rest = getCategorySeoOverride('restaurants');
  assert(rest?.title === 'Restaurants & Food in Pakistan – Best Places to Eat | ListPak', 'Restaurants title matches exact specification');
  assert(rest?.description === 'Find the best restaurants in Pakistan — Karachi, Lahore, Islamabad & more. Cuisines, contact numbers, addresses & reviews. List your restaurant free.', 'Restaurants meta description matches exact specification');
  assert(rest?.intro?.includes("Burns Road") && rest?.intro?.includes("Food Street"), 'Restaurants intro mentions Burns Road and Food Street');

  const fin = getCategorySeoOverride('finance');
  assert(fin?.title === 'Banks & Finance Companies in Pakistan | ListPak', 'Finance title matches exact specification');
  assert(fin?.description === 'Banks and finance companies in Pakistan — Meezan Bank, HBL, UBL, MCB, Allied Bank & more. Branches, contact numbers & details. Browse free on ListPak.', 'Finance meta description matches exact specification');
  assert(fin?.intro?.includes('Meezan Bank, HBL, UBL, MCB and Allied Bank'), 'Finance intro mentions major banks');

  const tech = getCategorySeoOverride('technology');
  assert(tech?.title === 'IT Companies & Software Houses in Pakistan | ListPak', 'Technology title matches exact specification');
  assert(tech?.description === 'IT companies and software houses in Pakistan — Lahore, Islamabad, Karachi. Services, contact numbers & profiles. Compare and hire, or list your company free.', 'Technology meta description matches exact specification');

  const catHub = getCategorySeoOverride('categories');
  assert(catHub?.title === 'Business Categories in Pakistan – Browse by Industry | ListPak', 'Categories hub title matches exact specification');
  assert(catHub?.description === 'Browse Pakistani businesses by category: restaurants, technology, healthcare, real estate, finance, automotive, travel & more — with city filters.', 'Categories hub description matches exact specification');

  // Verify visible rendering & JSON-LD inclusion in app/category/[slug]/page.tsx
  const catSlugSrc = fs.readFileSync('./app/category/[slug]/page.tsx', 'utf8');
  assert(catSlugSrc.includes('getCategorySeoOverride'), 'app/category/[slug]/page.tsx imports and calls getCategorySeoOverride');
  assert(catSlugSrc.includes('categorySeo?.intro'), 'app/category/[slug]/page.tsx visibly renders categorySeo.intro');
  assert(catSlugSrc.includes('categorySeo?.faqs'), 'app/category/[slug]/page.tsx visibly renders categorySeo.faqs');
  assert(catSlugSrc.includes("'@type': 'FAQPage'"), 'app/category/[slug]/page.tsx injects FAQPage schema matching FAQs');

  // Verify visible rendering & JSON-LD inclusion in app/categories/page.tsx
  const catsIndexSrc = fs.readFileSync('./app/categories/page.tsx', 'utf8');
  assert(catsIndexSrc.includes("getCategorySeoOverride('categories')"), 'app/categories/page.tsx gets categories override');
  assert(catsIndexSrc.includes('override?.intro'), 'app/categories/page.tsx visibly renders intro');
  assert(catsIndexSrc.includes('override?.faqs'), 'app/categories/page.tsx visibly renders FAQs');
  assert(catsIndexSrc.includes("'@type': 'FAQPage'"), 'app/categories/page.tsx injects FAQPage schema');

  // ----------------------------------------------------
  // 4. PROFESSIONALS HUB METADATA
  // ----------------------------------------------------
  console.log('\n--- 4. Professionals Hub Metadata ---');
  const profLayoutSrc = fs.readFileSync('./app/professionals/layout.tsx', 'utf8');
  assert(
    profLayoutSrc.includes('Professionals in Pakistan – Hire Verified Experts | ListPak'),
    '/professionals/ layout title matches exact specification'
  );
  assert(
    profLayoutSrc.includes(
      'Find verified professionals in Pakistan — developers, marketers, consultants & founders. Browse profiles by city and expertise, or create your free profile.'
    ),
    '/professionals/ layout meta description matches exact specification'
  );

  // ----------------------------------------------------
  // 5. SITEMAP REGENERATION & ACCURACY
  // ----------------------------------------------------
  console.log('\n--- 5. Dynamic Sitemap Structure & Cleanliness ---');
  const sitemapModule = await import('../app/sitemap.ts');
  const sitemapEntries = await sitemapModule.default();

  console.log(`Total URLs in generated sitemap: ${sitemapEntries.length}`);
  assert(sitemapEntries.length > 50, `Sitemap has substantial URL count: ${sitemapEntries.length}`);

  const sitemapUrls = sitemapEntries.map((e) => e.url);
  const sitemapUrlSet = new Set(sitemapUrls);

  // Check required core URLs
  assert(sitemapUrlSet.has('https://www.listpak.com/'), 'Sitemap includes homepage');
  assert(sitemapUrlSet.has('https://www.listpak.com/categories/'), 'Sitemap includes /categories/');
  assert(sitemapUrlSet.has('https://www.listpak.com/cities/'), 'Sitemap includes /cities/');
  assert(sitemapUrlSet.has('https://www.listpak.com/prayer-times-pakistan/'), 'Sitemap includes /prayer-times-pakistan/');
  assert(sitemapUrlSet.has('https://www.listpak.com/jobs/'), 'Sitemap includes /jobs/');
  assert(sitemapUrlSet.has('https://www.listpak.com/post-job/'), 'Sitemap includes /post-job/');
  assert(sitemapUrlSet.has('https://www.listpak.com/add-business/'), 'Sitemap includes /add-business/');
  assert(sitemapUrlSet.has('https://www.listpak.com/about/'), 'Sitemap includes /about/');
  assert(sitemapUrlSet.has('https://www.listpak.com/contact/'), 'Sitemap includes /contact/');
  assert(sitemapUrlSet.has('https://www.listpak.com/faqs/'), 'Sitemap includes /faqs/');

  // Check EXCLUDED items:
  assert(!sitemapUrls.some((u) => u.includes('/search/')), 'Sitemap contains NO /search/ URLs');
  assert(!sitemapUrls.some((u) => u.includes('/add-company/')), 'Sitemap contains NO /add-company/ URLs (duplicate of add-business)');

  // Check prayer times in sitemap:
  const prayerUrlsInSitemap = sitemapUrls.filter((u) => u.includes('prayer-times-') && u !== 'https://www.listpak.com/prayer-times-pakistan/');
  console.log(`Prayer times city URLs in sitemap: ${prayerUrlsInSitemap.length}`);
  assert(prayerUrlsInSitemap.length === 13, `Sitemap contains EXACTLY 13 prayer city URLs (got ${prayerUrlsInSitemap.length})`);

  for (const slug of expectedKeptSlugs) {
    const expectedUrl = `https://www.listpak.com/prayer-times-${slug}-today/`;
    assert(sitemapUrlSet.has(expectedUrl), `Sitemap contains kept prayer URL: ${expectedUrl}`);
  }

  // Non-kept prayer times must NOT be in sitemap
  assert(!sitemapUrlSet.has('https://www.listpak.com/prayer-times-faisalabad-today/'), 'Sitemap does NOT contain excluded prayer-times-faisalabad-today');
  assert(!sitemapUrlSet.has('https://www.listpak.com/prayer-times-multan-today/'), 'Sitemap does NOT contain excluded prayer-times-multan-today');
  assert(!sitemapUrlSet.has('https://www.listpak.com/prayer-times-sialkot-today/'), 'Sitemap does NOT contain excluded prayer-times-sialkot-today');

  // Check category pages in sitemap: only >=3 listings
  const catUrls = sitemapUrls.filter((u) => u.includes('/category/') && !u.match(/\/category\/[^/]+\/[^/]+\//));
  console.log(`Category hub URLs in sitemap with >= 3 listings: ${catUrls.length}`);
  for (const u of catUrls) {
    const slug = u.split('/category/')[1].replace(/\//g, '');
    const count = filterBusinessesByCategory(allBiz, slug).length;
    assert(count >= 3, `Sitemap category URL /category/${slug}/ has ${count} listings (>= 3)`);
  }

  // Check category x city URLs in sitemap: only >=3 listings
  const catCityUrls = sitemapUrls.filter((u) => u.match(/\/category\/[^/]+\/[^/]+\//));
  console.log(`Category x City combo URLs in sitemap with >= 3 listings: ${catCityUrls.length}`);
  for (const u of catCityUrls) {
    const parts = u.split('/category/')[1].split('/').filter(Boolean);
    const catPart = parts[0];
    const cityPart = parts[1];
    const count = filterBusinessesByCategoryAndCity(allBiz, catPart, cityPart).length;
    assert(count >= 3, `Sitemap category x city URL /category/${catPart}/${cityPart}/ has ${count} listings (>= 3)`);
  }

  // Check accurate lastmod
  const hasValidLastmod = sitemapEntries.every((e) => e.lastModified instanceof Date && !isNaN(e.lastModified.getTime()));
  assert(hasValidLastmod, 'All sitemap entries have valid Date objects for lastModified');

  // Check for deduplication
  assert(sitemapUrls.length === sitemapUrlSet.size, `Sitemap entries are strictly deduplicated (${sitemapUrls.length} unique URLs)`);

  console.log('\n====================================================');
  console.log(`   PHASE 4 VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error('Verification script crashed:', err);
  process.exit(1);
});
