# ListPak Keyword-Gap Implementation Report

**Implementation date:** 24 August 2026
**Website:** [ListPak](https://www.listpak.com/)
**Repository:** `cutie180/branches-app`
**Source brief:** `/home/ubuntu/upload/pasted_content_8.txt`
**Source dataset:** `/home/ubuntu/upload/keywords-2026-08-24.csv`

## Executive summary

The competitor keyword file was treated as a **search-demand dataset**, not as a list of phrases to paste into the website. The dataset contains **876 rows** with competitor, source-volume, trend, SEO-score, competition, topic, and other fields. The full row-level ownership map is committed under [`seo/keyword-to-page-map.json`](./seo/keyword-to-page-map.json), with an aggregate summary under [`seo/keyword-mapping-summary.json`](./seo/keyword-mapping-summary.json).

A conservative classifier mapped **584 rows to keep/conditional ownership** and placed **292 rows in reject/review**. The eligible group is conditional on actual inventory, truthful entity data, unique content, and user intent. Rejected rows include generic web/e-commerce phrases, foreign-market searches, unrelated topics, named entities without a verified matching ListPak record, ambiguous searches, and duplicate or cannibalizing variants. No rankings, traffic gains, Domain Authority gains, or indexing gains are claimed.

The implementation improved the existing architecture rather than rebuilding it. Changes are code- and content-template based; **no Firestore records, user records, or listing entities were added or modified**. A small set of post-rebase type-safety fixes was also applied where the concurrent remote changes exposed existing submission and optional-field mismatches; these fixes preserve the existing workflows and stored data shapes.

## Dataset and prioritization

| Measure | Result | Meaning |
|---|---:|---|
| Total source rows | 876 | All rows are preserved in the committed map. |
| Keep/conditional | 584 | A real ListPak page family can potentially satisfy the intent, subject to data/content checks. |
| Reject/review | 292 | Do not target automatically. Reasons are retained row by row. |
| P0 | 16 | High-value local/category opportunities with existing route support and source volume at or above 1,000. |
| P1 | 89 | Strong existing page or entity opportunities, generally with source volume at or above 300 or clear professional/job intent. |
| P2 | 479 | Relevant but lower-demand, more conditional, or requiring future inventory/content depth. |
| P3 | 292 | Rejected, unclear, unrelated, or future opportunities. |

The source file’s Volume values were preserved as supplied. They were not independently verified and should not be presented as current Google volume. The same rule applies to competitor visibility and source SEO scores.

## P0 opportunities

The P0 set consists of the following source phrases or close variants: **Karachi pharma companies; Karachi pharmaceutical companies; Karachi software houses; call centers in Lahore; call centers in Karachi; digital marketing companies in Pakistan; digital marketing agencies in Pakistan; Lahore pharma companies; Lahore pharmaceutical companies; medicine companies in Lahore; Pakistan freelancers; Faisalabad software house; Multan software house; pharma in Karachi; software houses in Faisalabad; and textile companies in Karachi.**

These phrases are mapped to existing city/category or professional page families. They are not permission to claim that ListPak contains a complete list, to create empty city/category combinations, or to add competitors’ entities as ListPak records.

| P0 cluster | Primary ownership | Implemented approach |
|---|---|---|
| Software houses and IT companies | Technology category, relevant city pages, and the existing software-house guide | Added a focused Karachi software-house section and valid contextual links to technology, city, company, and job pages. |
| Pharmaceutical and medicine businesses | Healthcare category plus relevant city pages | Added healthcare semantic guidance without inventing medical businesses or credentials. |
| Digital marketing agencies | Media category plus the existing local-SEO guide | Added agency-comparison language based on services, evidence, and engagement terms. |
| Call centers | City/category hubs and future data-backed guide | No thin landing page was created; current inventory must justify a dedicated page. |
| Pakistan freelancers | Professional hub and professional-discovery guide | Profile facts remain data-driven and are not fabricated. |
| Textile and industrial companies | Manufacturing category plus city pages | Added industrial-provider guidance without adding named entities or unsupported company claims. |

## Keyword ownership model

| Intent | Primary ListPak owner | Indexability rule |
|---|---|---|
| Pakistan-wide directory discovery | Homepage or directory guide | Keep broad platform language on the homepage; use the directory guide for informational comparisons. |
| Business category | `/category/{category}/` | Index when the category page has useful approved inventory or distinct helpful content. |
| City/local business | `/city/{city}/` | Index when the page provides useful approved listings or unique editorial value. |
| City plus category/service | City and category hubs | Do not create thousands of combinations. A combined page requires sufficient inventory and unique content. |
| Business or company name | Approved business/company profile | Target only the matching verified or approved entity; never insert competitor names. |
| Profession or professional name | Approved professional profile or professional hub | Use actual name, profession, expertise, location, and public sources only. |
| Current job or job category | Active job page or jobs hub | Expired or unverifiable vacancies must not be represented as active opportunities. |
| Informational query | Existing or genuinely distinct blog article | Improve an existing article before creating a new one; avoid near-duplicate guides. |
| Search/filter/pagination query | Search interface | Keep query-driven and faceted results `noindex, follow` unless they become curated, stable landing pages. |

## Repository audit and completed changes

### Homepage

The homepage now communicates the platform’s actual purpose: discovering businesses, services, companies, jobs, and professionals across Pakistan by category and city. Unsupported numeric claims such as large listing totals, city counts, job totals, and ratings were replaced with descriptive capabilities. The FAQ was revised so listing and job publication language does not promise immediate publication or universal verification. Fabricated testimonial and case-study blocks were replaced with factual platform use cases and links to categories, professionals, and jobs.

### About page

The About page now focuses on ListPak, Pakistan business discovery, professional profiles, job discovery, platform purpose, mission, and values. Unsupported claims about ranking position, founding details, user totals, visitor totals, listing totals, and specific team credentials were removed or softened. The page remains an informational platform page rather than a category-keyword landing page.

### Contact page

The Contact page now owns contact ListPak, support, business-listing help, professional-profile help, job-posting questions, directory support, and technical issues. Unverified response-time, 24/7, and fixed service-availability promises were removed. Users are directed to provide the relevant URL, listing name, and issue details.

### Category pages

Category titles were changed from unsupported “Best …” phrasing to factual category ownership. Category descriptions now explain available businesses, services, locations, contact details, and verification limitations. A new data-independent copy map in [`lib/seo-directory-content.ts`](./lib/seo-directory-content.ts) adds carefully scoped semantic guidance and contextual links for technology, healthcare, media, manufacturing, restaurants, finance, and home services. Empty categories retain a useful empty state rather than receiving keyword-only text.

### City pages

City pages now use truthful local-discovery language for businesses, services, jobs, and professional profiles. The new copy map adds focused guidance for Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Sialkot. These additions are intentionally limited; they do not generate city/category combinations or claim complete city coverage. Rating labels show “No rating yet” when no actual rating exists.

### Business, professional, company, and job pages

Dynamic metadata now uses stored entity fields such as name, category, city, profession, job title, employer, and description. Universal “verified” labels were removed from metadata unless the stored profile is actually marked verified. Descriptions now encourage users to confirm contact, location, deadline, application, and credential information. The business service’s fallback values were neutralized so missing phone numbers, email addresses, websites, services, hours, and features remain empty rather than becoming fabricated data.

### Blog content

The existing software-house guide was improved instead of creating a competing duplicate article. It now contains a focused section on software houses and IT companies in Karachi, with comparison criteria, evidence standards, career context, and valid links to city, technology, and jobs pages. A stale `/category/technology-it` link was corrected to the valid `/category/technology/` route. The local-SEO article and blog hub no longer promise “rank #1” or page-one results; they describe visibility improvement and practical guidance instead.

### Internal linking

New contextual links connect relevant category pages, city pages, company pages, professional pages, job pages, and existing guides. A targeted local check examined **45 internal paths** extracted from the new content and found **no errors**. Some older links intentionally redirect to the enforced trailing-slash form; this is a non-broken normalization behavior and should be migrated gradually if desired.

## Technical and indexation safeguards retained

The implementation preserves the existing canonical and trailing-slash repairs from the independent SEO validation. Search results remain `noindex, follow`. Dynamic routes continue to validate known category and city slugs and return 404 for unknown entities. Approved/active data remains the source of business, company, professional, and job profiles. No new indexable search filters, pagination combinations, empty entity records, or fake jobs were created.

The sitemap and canonical behavior should be rechecked after deployment. The source project’s declared lint command remains a known Next.js 16 compatibility issue: `npm run lint` uses the deprecated `next lint` behavior and should be replaced with a supported ESLint command in a separate maintenance change.

## Validation performed

| Check | Result |
|---|---|
| Keyword mapping | 876 rows normalized and mapped; full JSON committed. |
| TypeScript | `npx tsc --noEmit` completed successfully after the final changes. |
| Production build | `npm run build` completed successfully and generated 386 static pages after the final post-rebase changes. |
| Local route status | Homepage, category, city, blog, business, professional, job, and search representatives returned 200 locally. |
| Search indexability | Search route remained `noindex` with canonical `/search/`. |
| New internal links | 45 extracted local paths checked; no 4xx errors. |
| Database changes | None. |
| Ranking claims | None. |

Local validation is not a substitute for post-deployment validation. After Vercel deployment, recrawl the production sitemap, inspect response headers and rendered HTML, check the canonical groups, and verify that the deployed commit contains the changes described here.

## Remaining gaps and next steps

The keyword file indicates demand around call centers, pharmaceutical companies, software houses, textile companies, digital marketing agencies, freelancers, restaurants, and city/category combinations. The current code now gives these topics clearer ownership and contextual support, but **inventory depth remains the limiting factor**. Dedicated landing pages should be added only after ListPak has enough approved records and unique information to satisfy the search intent.

The next content phase should prioritize a small number of evidence-backed guides: a methodology-led comparison of Pakistan software houses, a local-services guide with real category coverage, and carefully sourced pages for high-demand provider categories. Each article should link to actual ListPak inventory, disclose dates and limitations, and be refreshed when facts change.

The next technical phase should measure production performance for city hubs, eliminate remaining sitemap redirects if any are regenerated by deployment, complete the supported ESLint migration, and confirm that all public profile schemas contain only actual entity facts. Search Console query and indexation data should be used before changing P0/P1 priorities.

## Files added or modified

| File or artifact | Purpose |
|---|---|
| `KEYWORD_IMPLEMENTATION_PLAN.md` | Scope, ownership rules, priorities, and rejected-keyword policy. |
| `KEYWORD_IMPLEMENTATION_REPORT.md` | This implementation report. |
| `seo/keyword-to-page-map.json` | Complete 876-row normalized ownership map. |
| `seo/keyword-mapping-summary.json` | Aggregate counts, priorities, page types, and rejection examples. |
| `lib/seo-directory-content.ts` | Safe reusable category and city semantic copy map. |
| `app/page.tsx` | Homepage purpose, trust language, FAQ, use cases, and CTA copy. |
| `app/about/page.tsx` | About-page purpose, mission, stats, values, and team-language corrections. |
| `app/contact/page.tsx` | Contact/support intent and promise corrections. |
| `app/categories/page.tsx`, `app/cities/page.tsx` | Category/city hub copy and unsupported-count/verification cleanup. |
| `app/category/[slug]/page.tsx`, `app/city/[slug]/page.tsx` | Dynamic semantic content and truthful local/category presentation. |
| `app/business/[slug]/page.tsx`, `app/companies/[slug]/page.tsx`, `app/professionals/[username]/page.tsx`, `app/jobs/[id]/page.tsx` | Data-driven entity metadata improvements. |\n| `app/add-company/add-company-client.tsx`, `app/add-professional/add-professional-client.tsx`, `app/companies/page.tsx`, `app/admin/page.tsx`, `lib/company-service.ts` | Post-rebase type-safe normalization and neutral defaults; no database records changed. |
| `lib/db-service.ts` | Neutral fallback mapping for missing entity fields. |
| `lib/blog-content.ts`, `lib/blog-data.ts`, `app/blog/page.tsx` | Existing-content improvement, local section, stale-link correction, and factual title language. |
| `components/footer.tsx` | Sitewide trust and navigation copy corrections. |

## References

[1]: https://www.listpak.com/ "ListPak live website"
[2]: https://developers.google.com/search/docs/fundamentals/creating-helpful-content "Google Search Central: Creating helpful, reliable, people-first content"
[3]: https://developers.google.com/search/docs/essentials/spam-policies "Google Search Central: Spam policies for Google web search"
[4]: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls "Google Search Central: Consolidate duplicate URLs"
