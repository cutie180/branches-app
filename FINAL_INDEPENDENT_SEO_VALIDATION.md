# Final Independent SEO Validation — ListPak

**Validation date:** 23 August 2026  
**Live site reviewed:** [www.listpak.com](https://www.listpak.com/)  
**Repository reviewed:** `cutie180/branches-app`  
**Review posture:** Independent external-style validation. Prior implementation was treated as untrusted and re-tested against production and source.

## Executive verdict

ListPak has a credible directory architecture, a useful combined proposition across businesses, jobs, professionals, companies, and editorial content, and several good foundations: HTTPS and host normalization work, unknown dynamic routes return 404, the live sitemap and robots file are reachable, entity pages expose useful local fields, and the new blog pages are substantially more complete than thin programmatic pages.

The current production release is **not yet technically clean enough to scale organic discovery safely**. The most important problems are production sitemap URLs that redirect, a production duplicate-canonical defect on major hubs, two city sitemap URLs that timed out during an independent crawl, slow city rendering, broken internal links, client-only listing shells on major hubs, and visible trust/data-integrity problems. The most serious trust issue is that the live Technoinn page displays five highly generic customer reviews and a 5.0 rating with relative timestamps, while the site also displays broad claims such as “100% Verified Businesses” and “150+ Pakistani Cities.” These claims must be reconciled with real verification and review records before being used as ranking or conversion signals.

No Firestore records, users, or database documents were changed. The safe source-only repairs described below were implemented locally, validated, committed, and pushed separately from any recommended data cleanup or indexation policy decision. Production will continue to show the old behavior until the deployment associated with the repair commit is live and cache-revalidated.

## Method and evidence

The independent production crawler fetched the live XML sitemap and tested every listed URL, following redirects and parsing the final HTML head, headings, robots directives, canonical tags, JSON-LD types, and internal-link counts. A second bounded crawl started from the homepage, category/city hubs, jobs, companies, professionals, blog, and representative entity pages. Additional direct browser checks covered the homepage, search, a researched professional, a researched business, a job detail page, an empty city, the jobs hub, the companies hub, a new blog article, and competitor/editorial comparison pages.

The production sitemap returned **348 URLs**. **346 returned HTTP 200**, while **2 timed out** in the independent crawl: `/city/daska` and `/city/hafizabad`. **345 of the sitemap URLs redirected once**, overwhelmingly because the sitemap omitted the trailing slash while the application enforced `trailingSlash: true`. All successful responses exposed a canonical link according to the crawler, but one duplicate group assigned the homepage canonical to ten non-home routes. The crawl found one `noindex` URL, consistent with the query-driven search page.

A bounded internal-link crawl found **354 unique same-site targets and 1,247 target occurrences** from 14 seed pages. It found **39 unique HTTP 404 targets**: 28 malformed multi-word city URLs, one invalid category URL, one missing company route, and nine job URLs with an extra `job-` prefix. This is not a theoretical issue: the live Accountant page links to `/companies/barlas-sale-service/`, which currently returns 404, and the Lahore city page exposes job links that return 404.

The direct performance probe measured response time and HTML bytes, not Core Web Vitals. It therefore does not claim field LCP, INP, or CLS results. Representative results included approximately 375 KB for the homepage, 183 KB for categories, 358 KB for cities, 526 KB for Lahore, 150 KB for the Technoinn business page, 118 KB for the Accountant job, 132 KB for the Jehan Ara profile, 105 KB for the blog article, and approximately 46 KB for the jobs and companies shells. These are transfer-body observations from Vercel responses and should be supplemented with Lighthouse and Search Console data.

## What passed

| Area | Independent result | Assessment |
|---|---|---|
| HTTPS and host | HTTP and non-www requests normalize to the HTTPS `www` host, then return 200 | Pass, with expected one-hop normalization |
| Robots | `/robots.txt` returns 200, allows `/`, disallows admin/API/login/register/dashboard paths, and declares the sitemap | Pass, subject to ongoing query/facet policy |
| Sitemap availability | `/sitemap.xml` returns 200 and is syntactically crawlable | Pass, but URL values were not canonical before the repair |
| Invalid dynamic routes | Unknown business, category, city, job, and company probes return 404 after slash normalization | Pass; protects against soft-404 index pollution |
| Search indexation | Search route is implemented with `noindex, follow` and one noindex page was detected | Directionally correct |
| Blog detail pages | New article has H1, author/date/read-time, breadcrumb, related links, sources, canonical, BlogPosting, and visible content | Good foundation |
| Entity-page basics | Business, job, and professional pages expose address/city, contact or application actions, breadcrumbs, and relevant entity schema | Good foundation, subject to trust/data cleanup |
| Build health | `npx tsc --noEmit` and `npm run build` passed after the repair set; build generated 397 pages | Pass |
| Lint health | `npm run lint` remains broken because the script calls removed/incompatible `next lint` under Next 16 | Not passed; CI gap remains |

## Severity summary

| Severity | Count or scope | Main issues |
|---|---:|---|
| **CRITICAL** | 3 | Synthetic-looking public reviews/ratings and unsupported verification claims; live duplicate-home canonical group; broken internal entity/job links at scale |
| **HIGH** | 6 | 345 sitemap redirects; two city timeouts and widespread slow city responses; JS-only empty shells on core hubs; stale/low-value empty city/category surface; incomplete/unsafe JobPosting freshness; canonical target `/about-us/` returned 404 |
| **MEDIUM** | 8 | Duplicate generic metadata; uniform inaccurate sitemap `lastmod`; client-side filters without crawlable state; possible duplicate entity URL conventions; schema consistency gaps; heavy HTML/client payloads; acquisition/policy indexation; lint/CI gap |
| **LOW** | 5 | Copy/grammar repetition, placeholder imagery, breadcrumb slash consistency, broad footer boilerplate, editorial/entity evidence depth |

## CRITICAL issues

### 1. Public trust signals appear inconsistent with evidence

The live Technoinn business page displays a 5.0 rating, five customer reviews, and five generic reviews attributed to generic names with timestamps such as “Just now,” “1 day ago,” and “4 days ago.” The comments use templated praise and do not expose evidence of a real customer transaction. The page also displays “100% Verified Businesses” in the sitewide footer. This creates a direct quality, trust, and structured-data risk. The business JSON-LD includes `AggregateRating` with `ratingValue: 5` and `reviewCount: 5` because the live record contains reviews.

This is not fixed by changing a title or schema template. It requires a **data and policy audit**: verify the provenance of each review, remove or clearly label seeded/demo content, verify what “Verified” means, and emit aggregate rating only from eligible, authentic reviews. No database changes were made in this validation phase because that would be destructive without a record-by-record decision.

### 2. The live release assigned the homepage canonical to unrelated hubs

The production crawler found one duplicate canonical group in which `https://www.listpak.com/` was canonical for the homepage plus `/add-company`, `/add-professional`, `/categories`, `/cities`, `/companies`, `/contact`, `/jobs`, `/post-job`, and `/professionals`. The source cause was the global `alternates.canonical` in `app/layout.tsx`, inherited by routes that had no route-specific canonical.

This was repaired in source by removing the global homepage canonical and adding route-specific canonical metadata for categories, cities, jobs, companies, professionals, contact, post-job, add-company, add-professional, and the about route. The homepage still has its own canonical through the home page metadata. The repair must be confirmed after deployment with raw HTML, not only browser-rendered inspection.

Google treats redirects and `rel="canonical"` as strong canonicalization signals and sitemap inclusion as a weaker signal; it also recommends linking internally to the canonical URL.[1] The previous production state sent conflicting signals on important hubs.

### 3. Broken internal links expose 404s from indexable content

The bounded crawl found 39 unique broken internal targets. The failures are concentrated in three source-level patterns: the cities index generated raw lower-case city names with spaces instead of the route’s hyphenated slug format; the city page linked jobs using `job-${id}`-style URLs even though the detail route uses the actual slug or ID; and a job detail page linked to a company slug for which no company detail record exists. The category failure `/category/technology-it/` also indicates a stale or mismatched category identifier in a live link source.

The city link generator and city job links were repaired in source. The repair preserves existing valid routes and does not write records. The missing company record/link requires a data-model decision: either create or approve the corresponding company record through the normal workflow, or render the employer as plain text when no company profile exists. It should not be repaired by inventing a company record.

## HIGH issues

### Sitemap URLs were not canonical before repair

The live sitemap listed non-trailing-slash URLs while the site enforced trailing slashes. As a result, 345 of 348 entries redirected once before reaching the final page. This wastes crawl requests, weakens the sitemap’s canonical signal, and makes freshness/coverage diagnostics less reliable. The sitemap generator now normalizes every route through a trailing-slash helper. It still needs production verification after deployment.

The sitemap also assigns the same current timestamp to every URL. A sitemap `lastmod` value should represent the last meaningful content change, not the generation time. The next implementation should use record timestamps where reliable and omit `lastmod` where reliable timestamps are unavailable. Google’s guidance specifically recommends accurate modification times and warns against dynamic/list pages in sitemaps.[2]

### City performance and availability are not scalable

Two sitemap city URLs timed out in the external crawl, and many other city/category pages took roughly 15–37 seconds in the same crawl. A second, lower-concurrency probe sometimes returned those routes in under one second from cache, which suggests a cold-render, cache-miss, backend, or regional variability problem rather than a uniformly slow static response. The city route currently loads all businesses and all jobs and filters them at request/render time, which is an expensive design as inventory grows.

Google’s crawl-budget guidance identifies stable response time, latency, and server health as factors in crawl capacity, and recommends efficient loading, accurate sitemaps, eliminating duplicate URLs, and avoiding long redirect chains.[3] This should be treated as a crawlability and scalability problem, not only a front-end speed issue. Profile cold requests, Firestore reads, render duration, and cache hit/miss behavior; then move to city-scoped queries or precomputed counts and cacheable route data.

### Core hubs are client-rendered and expose empty server shells

`/jobs/`, `/companies/`, and `/professionals/` are client components that fetch inventory in `useEffect`. The live HTML shows `Open Vacancies (0)` / `Loading job openings...` and `Hiring Companies (0)` / `Loading employer directory...` before hydration. This makes core discovery pages dependent on JavaScript execution and live client fetches. It also makes the page appear empty to any crawler or renderer that does not complete the client request.

The hubs should remain interactive, but their primary inventory, counts, and meaningful internal links should be rendered on the server or through a server-fetched initial payload. The client can then enhance filtering. Add route-specific metadata, which was repaired in source, but do not treat metadata alone as a fix for a client-empty directory.

### Empty city and category pages should not automatically be indexable

Daska currently returns 200, `index, follow`, a self-canonical, CollectionPage schema, and a short generic description, but it has zero businesses and no meaningful city-specific inventory in the server-rendered content. A city page with no listings is not automatically a useful search landing page. The same risk exists for categories with no approved entities.

Recommended policy: keep a city/category URL indexable only when it has a minimum level of genuine inventory or unique editorial utility. Otherwise return a useful 200 page that is `noindex, follow` and excluded from the sitemap, or do not generate the route until it has value. Do not use a blanket noindex for all cities: populated city hubs are strategically valuable. This policy must be data-driven and tested against business goals before implementation.

### Job freshness and JobPosting eligibility are incomplete

The live Accountant page says “Posted Just now,” while its external Rozee link is the source application URL. Its visible requirements are generic and its structured data lacks a valid ISO `datePosted`. Google’s JobPosting documentation requires `datePosted`, a complete description, the hiring organization, job location, a way to apply, and timely handling of expired postings. Google says expired jobs should be removed, return 404/410, or retain past `validThrough` without JobPosting markup.[2]

Source repairs now exclude parseable past-deadline jobs from approved job listings and detail lookup, add `validThrough` when a deadline is parseable, and suppress JobPosting JSON-LD when no ISO `datePosted` is available. This is conservative and avoids emitting clearly incomplete markup. The remaining requirement is operational: store source date, deadline, source URL, approval status, and last-verified time; add an expiry job or scheduled review; remove expired jobs from the sitemap; and verify externally sourced vacancies before publishing them.

### The about page canonicalized to a 404 URL

The live `/about/` page declared `https://www.listpak.com/about-us/` as canonical, but `/about-us/` returned 404 while `/about/` returned 200. The source canonical was corrected to `/about/`. This should be rechecked after deployment and any old `/about-us` references should be searched before introducing a redirect.

## MEDIUM issues

### Major hubs had duplicate generic titles

The live `/companies/`, `/contact/`, `/jobs/`, `/post-job/`, and `/professionals/` pages used the generic title `ListPak — Pakistan Business Directory, Jobs & Professionals`. This weakens relevance and makes the pages indistinguishable in crawls and SERPs. Route-specific metadata layouts were added for the client-rendered hubs and service pages. The production crawl must confirm deployment because the homepage browser title also differed from the repository’s newer metadata, indicating deployment lag or stale cached output.

### Sitemap inventory is broader than the proven indexable value

The sitemap includes search, submission, acquisition, policy, and support pages. Search results are now noindex, but forms such as `/add-business/`, `/add-professional/`, `/add-company/`, and `/post-job/` remain a policy decision. They can be indexable acquisition landing pages if they contain substantial explanatory content and truthful value propositions. If they are primarily forms with little unique content, the safer SEO policy is `noindex, follow` and exclusion from the sitemap while retaining normal user access. This review did not make that policy change because it affects acquisition strategy rather than a purely technical defect.

Policy pages may remain indexable when they are useful trust documents, but administrative, login, registration, dashboard, and internal workflow pages should remain blocked/noindex as appropriate. Confirm that no user-specific or private route is present in the sitemap.

### Query, filter, sort, and pagination handling needs an explicit contract

The search page correctly uses `noindex, follow`, but jobs and companies filtering is currently in-memory client state with no canonicalized, crawlable filtered URLs and no visible server-rendered pagination. This is acceptable for user interaction but should not create indexable query combinations. If city/category landing pages are later built from filters, each must have a unique content threshold, stable URL, self-canonical, and a deliberate sitemap policy. Do not expose arbitrary combinations of query, city, type, industry, sort, or page parameters as indexable pages.

### Entity URL conventions should be stabilized

Job details accept either a slug or a document ID, while links in different surfaces use either `job.slug || job.id` or only `job.id`. Business, company, and professional routes are slug-based. Choose one public canonical pattern per entity type. When a record has both an old ID URL and a stable slug, redirect the old form to the slug rather than emitting both. Do not remove or rename existing URLs without a redirect map and Search Console monitoring.

### Structured data parses, but semantic quality is uneven

The live sample pages produced no JSON-LD syntax parse errors. The observed type coverage was: Organization 347, WebSite 347, FAQPage 9, Blog 1, BreadcrumbList 314, BlogPosting 19, LocalBusiness 50, CollectionPage 207, ContactPage 1, JobPosting 28, Person 10, and ProfilePage 10. Global Organization and WebSite markup on every page is not inherently wrong, but the homepage emitted two WebSite objects and some route-level breadcrumb/entity URLs omitted the final slash while HTML canonicals included it. Consolidate duplicate WebSite markup and standardize entity URLs.

The LocalBusiness sample included `AggregateRating` based on the generic live reviews described above. It also uses `department` for branch-like locations; validate this model against actual business records and use only properties that accurately describe the entity. Person pages have useful `sameAs` links, but some images are generic Unsplash placeholders and should not be presented as verified identity evidence.

The JobPosting sample had the correct broad entity shape but lacked required `datePosted` when the source used a relative date. The source repair suppresses that incomplete markup and adds `validThrough` where safely parseable. Use Google’s Rich Results Test and Search Console URL Inspection on deployed samples; the parser used here is a syntax and semantic sanity check, not a Google eligibility guarantee.

### Payload size and client JavaScript warrant profiling

The homepage and populated city page returned large HTML bodies, while hubs returned client-rendered shells and then rely on JavaScript and data fetching. This can affect LCP and interaction responsiveness, but the current evidence does not measure LCP, INP, or CLS. Run Lighthouse in mobile and desktop modes, WebPageTest or equivalent, and RUM/CrUX where available. Specifically profile hero images, Unsplash/remote image loading, hydrated client components, Firestore reads, map loading, review interactions, analytics scripts, and the amount of JSON embedded in city pages.

### Lint is not a functioning quality gate

`npm run lint` fails before linting because the package script calls `next lint`, while Next.js 16 no longer accepts that command form. Do not claim lint passed. Add a supported ESLint configuration and explicit `eslint .` script in a separate maintenance change, then make it a CI gate. This was not bundled with the SEO repair because it would introduce tooling/configuration changes beyond the minimal production-safe fixes.

## LOW issues

The Technoinn description repeats the same service block several times and includes obvious spelling and grammar errors. Several profile and business images are generic remote placeholders. Sitewide footer language is repeated aggressively and includes broad factual claims. Blog and entity pages would benefit from stronger original editorial evidence, named source dates, official company links, and a clearer verification methodology. Breadcrumb JSON-LD should use the exact same trailing-slash URLs used in HTML links and canonicals for consistency.

## Indexability policy

| Page type | Should index? | Conditions |
|---|---|---|
| Homepage | Yes | One self-canonical, truthful claims, stable primary proposition |
| Category hub | Yes when useful | Approved inventory or substantial category editorial content; otherwise noindex/exclude until useful |
| City hub | Yes when useful | Genuine local inventory, city-specific information, or meaningful job/professional content; empty pages should not be mass-indexed |
| Approved business detail | Yes | Real approved entity, unique description, usable local contact/location data, no fabricated reviews or claims |
| Approved company detail | Yes | Real approved employer/company profile with unique data and at least one useful relationship or hiring signal |
| Approved professional detail | Yes | Real approved profile, public identity/business evidence, unique bio/services, no synthetic reviews or unverifiable “verified” claims |
| Active job detail | Yes temporarily | Confirmed active source, complete description, application path, accurate date/location; expire promptly |
| Expired job detail | No | Remove/410/404, or retain without JobPosting only when there is a strong archival reason; remove from sitemap |
| Search results | No | `noindex, follow`; never add query result pages to the sitemap |
| Filter/sort/query combinations | Usually no | Keep interactive, but do not create an indexable URL matrix without a deliberate landing-page strategy |
| Pagination | Usually no for client filters | If server-paginated, use a deliberate crawl/index policy and unique value; avoid duplicate list pages |
| Submission forms | Decision required | Keep indexable only as substantial acquisition landing pages; otherwise noindex and exclude sitemap |
| Login/register/dashboard/admin | No | Block or noindex as appropriate; never sitemap these URLs |
| Legal/support pages | Often yes | Keep indexable when they provide useful trust/accessibility information and are not private workflow pages |

## SERP and competitor findings

No exact ranking positions are claimed. Google browser searches were CAPTCHA-limited, so the SERP work was used for presentation and competitor comparison rather than rank measurement. The brand discovery surface showed ListPak pages such as About, blog, contact, categories, and HTML sitemap alongside established directory competitors including PakBD, BusinessBook.pk, Enic.PK, YellowPage.pk, BusinessList.pk, B2BMAP, and TradeKey. Search Console should be used for actual impressions, clicks, queries, average position, indexing, and rich-result status.

[BusinessList.pk](https://www.businesslist.pk/) presents a more mature directory proposition with broad category and city navigation, visible counts and update/freshness signals, reviews, photos/products, listing plans, and a business-data hub. ListPak’s combined business/jobs/professionals/editorial model is a differentiation opportunity, but it cannot compete consistently on non-brand searches until its inventory is real, its trust claims are substantiated, and its city/category pages contain useful evidence.

The directly reviewed [Nextbridge Pakistan IT-company guide](https://nextbridge.com/top-it-companies-pakistan/) has strong entity association: a clear “Top 10 IT Companies in Pakistan” intent, named companies, company-specific descriptions, official links, services/technology context, related links, and a recognizable publisher brand. ListPak’s “How to Compare IT Companies” article is more cautious and methodologically responsible, but needs more authoritative company evidence, transparent inclusion criteria, current source dates, and internal links to real company profiles to earn comparable topical authority.

LinkedIn’s [Pakistan jobs surface](https://www.linkedin.com/jobs/jobs-in-pakistan/) is a major competitor for job discovery because it combines current inventory, company pages, role taxonomies, and strong identity signals. ListPak can compete in long-tail local discovery through verified Pakistan-specific employer pages, city/job combinations with genuine inventory, application freshness, and useful editorial guides, not by copying broad job-list pages.

## Completed in source during this validation

The following non-destructive code repairs were made and locally validated:

1. Removed the global homepage canonical from `app/layout.tsx` so it cannot be inherited by unrelated routes.
2. Added route-specific canonical/social metadata layouts for jobs, companies, professionals, contact, and post-job hubs, plus canonical/social metadata for categories, cities, add-company, add-professional, and the live about route.
3. Corrected the about-page canonical from the confirmed 404 `/about-us/` target to `/about/`.
4. Normalized all sitemap URLs to trailing-slash canonical URLs compatible with `next.config.mjs`.
5. Corrected city-index links to use hyphenated, URL-safe slugs for multi-word city names.
6. Corrected city-page business matching to compare against the normalized city name rather than a hyphenated URL slug.
7. Corrected city-page job links to use `job.slug || job.id`, eliminating the observed extra-prefix 404 pattern.
8. Added conservative job expiration filtering for parseable past deadlines and prevented expired jobs from being returned as approved detail pages.
9. Added `validThrough` when the deadline is parseable and suppressed JobPosting JSON-LD when no ISO `datePosted` exists, avoiding clearly incomplete markup.
10. Made no Firestore writes, did not add business/professional/job records, and did not rename or delete existing public routes.

Validation after these changes: `npx tsc --noEmit` passed; `npm run build` passed and generated 397 static pages; `git diff --check` passed. `npm run lint` remains a pre-existing script/tooling failure as documented above. Local production checks confirmed route-specific titles/canonicals, trailing-slash sitemap URLs, and hyphenated multi-word city links. Live validation of these repairs remains deployment-dependent.

## Recommended 30-day execution roadmap

### Days 1–3: deploy and verify the safe technical repairs

Deploy the source repair and immediately recrawl the sitemap. Confirm that every sitemap `<loc>` returns 200 without a redirect, every canonical matches the final URL including the trailing slash, the ten duplicate-home canonical routes are resolved, `/about/` self-canonicalizes, and the broken city/job links are gone. Compare the deployed commit hash to GitHub and clear or wait out Vercel/ISR caches before judging the result.

### Days 4–7: integrity and indexation controls

Audit Firestore and displayed production content for seeded reviews, ratings, verification badges, static counts, “#1,” “100% verified,” “150+ cities,” and other unsupported claims. Decide record by record whether to remove, label as demo, or substantiate them. Add an approved-status and verification policy that is visible to users. Implement a threshold-based city/category indexation policy and remove empty or near-empty pages from the sitemap; do not change thousands of URLs without a redirect/noindex inventory and Search Console monitoring.

### Days 8–14: job freshness and hub rendering

Add `sourceUrl`, `sourcePostedAt`, `lastVerifiedAt`, `expiresAt`, and explicit application status to jobs where the model permits. Schedule expiry/reverification, remove expired jobs from the sitemap, and return 404/410 or an archival non-JobPosting response according to policy. Refactor jobs, companies, and professionals hubs to server-render initial inventory and counts, with client filtering as enhancement. Add stable crawlable links to approved detail pages.

### Days 15–21: performance and local scalability

Instrument cold and warm requests for city/category/entity routes. Replace “load all then filter” city queries with city-scoped reads or precomputed approved counts. Reduce HTML duplication, optimize above-the-fold images, defer maps and nonessential scripts, and profile hydration. Run mobile Lighthouse and WebPageTest on the homepage, a populated city, an empty city, category, business, job, professional, company, blog, and search routes. Track LCP/INP/CLS from real users; do not infer Core Web Vitals from curl timings.

### Days 22–30: authority, SERP measurement, and editorial expansion

Connect Google Search Console and Bing Webmaster Tools, submit the corrected sitemap, inspect representative URLs, and record indexation/rich-result errors. Build a query-to-page map for Pakistan + city + profession/category/job topics. Strengthen the best blog guides with dated official sources, methodology, original comparisons, and links to real approved entities. Create local landing pages only where inventory and unique content justify them. Benchmark BusinessList, PakBD, LinkedIn Jobs, and relevant specialist directories monthly using Search Console data rather than unverified rank claims.

## Release gates before declaring ListPak SEO-ready

The site should not be declared clean until the deployed sitemap has zero avoidable redirects and zero timeouts; core hubs have unique title/description/canonical metadata and server-visible inventory or a deliberate noindex policy; internal-link 404s are zero on a recurring bounded crawl; empty city/category pages follow an explicit inventory threshold; expired jobs cannot retain active JobPosting markup; public reviews and verification claims have auditable provenance; aggregate ratings are emitted only for eligible evidence; and Search Console confirms canonical, indexation, JobPosting, and rich-result behavior on representative live URLs.

## References

[1]: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls  "Google Search Central: Canonicalization and duplicate URLs"
[2]: https://developers.google.com/search/docs/appearance/structured-data/job-posting  "Google Search Central: JobPosting structured data"
[3]: https://developers.google.com/crawling/docs/crawl-budget  "Google Crawling Infrastructure: Optimize your crawl budget"
