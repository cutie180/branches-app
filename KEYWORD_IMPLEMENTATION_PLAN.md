# ListPak Keyword-Gap Implementation Plan

**Source:** `/home/ubuntu/upload/keywords-2026-08-24.csv` and the implementation brief in `/home/ubuntu/upload/pasted_content_8.txt`.

## Executive decision

The uploaded file contains **876 keyword rows**. It is a competitor search-demand dataset, not a list of phrases to paste into ListPak. Source metrics such as Volume, Trend, SEO Score, Competition, Traffic Value, Topics, and competitor domain are preserved in the generated analysis files under `/home/ubuntu/listpak-audit/keyword-analysis/`. No search-volume, ranking, traffic, or authority values are inferred.

A conservative mapping classified **584 rows as keep/conditional** and **292 rows as reject/review**. The mapping is a review aid rather than an automatic publishing instruction: a row remains eligible only when ListPak has a truthful page, relevant approved inventory, or useful editorial coverage that satisfies the query.

| Dataset measure | Result | Implementation meaning |
|---|---:|---|
| Total source rows | 876 | Every row is retained in the audit map. |
| Keep/conditional rows | 584 | Mapped to an existing page family, subject to inventory and intent checks. |
| Reject/review rows | 292 | Not placed blindly; includes generic web phrases, unrelated/foreign topics, named entities without verified records, and unclear intent. |
| P0 rows | 16 | High-value local/category opportunities with existing route support and source volume at or above 1,000. |
| P1 rows | 89 | Strong existing page or entity opportunities, generally with source volume at or above 300 or clear entity/professional intent. |
| P2 rows | 479 | Relevant but lower-demand, more conditional, or requiring future data/content depth. |
| P3 rows | 292 | Rejected, unclear, or future opportunities; do not publish without new evidence. |

## Page ownership rules

| Search intent | Primary owner | Current ListPak route family | Rule |
|---|---|---|---|
| Pakistan-wide business-directory discovery | Homepage or directory guide | `/` or `/blog/top-business-directory-websites-pakistan/` | Homepage owns platform discovery; the guide owns informational comparisons. |
| Business category | Category hub | `/category/{category}/` | Use the matching category and truthful approved listing count. |
| City + category/service | City and category hubs together | `/city/{city}/` plus `/category/{category}/` | Do not create thousands of combined pages. Create a combined landing page only when approved inventory and unique content justify it. |
| Business/entity name | Business profile | `/business/{slug}/` | Optimize only the matching approved entity; never insert competitor or unrelated names. |
| Professional/entity or profession | Professional profile/hub | `/professionals/{username}/` or `/professionals/` | Use only verified profile facts and approved records. |
| Active job or job category | Job detail/hub | `/jobs/{slug}/` or `/jobs/` | Only active, real jobs may represent current vacancies. Search/filter URLs remain non-indexable. |
| Informational guidance | Blog article | `/blog/{slug}/` | Existing articles own directory, local services, software-house, job, professional, startup, and city-guide information where intent is distinct. |
| Contact/support | Contact page | `/contact/` | Keep support and listing-help language only. |

## P0 ownership targets

The source file identifies the following high-value local/category clusters. These are **not** claims that ListPak currently ranks for them and are not permission to fabricate inventory:

| Keyword cluster | Primary owner | Safe implementation |
|---|---|---|
| Karachi pharmaceutical/pharma companies | `/city/karachi/` + `/category/healthcare/` | Improve truthful city/category headings and links; publish a dedicated guide only after real approved inventory or sourced editorial research exists. |
| Karachi software houses | `/city/karachi/` + `/category/technology/` | Strengthen technology/category and city discovery copy; existing software-house guide owns broad informational intent. |
| Call centers in Lahore/Karachi | City and relevant category hubs | Use existing approved listings and an informational guide only if the directory has sufficient call-center inventory. |
| Digital marketing companies/agencies in Pakistan | `/category/media/` + `/blog/local-seo-pakistan-businesses-google-ranking/` | Use category discovery for providers and the blog for educational local SEO intent. |
| Lahore pharmaceutical/medicine companies | `/city/lahore/` + `/category/healthcare/` | Do not claim a complete list without verified inventory. |
| Pakistan freelancers | `/professionals/` + professional-discovery guide | Use the hub/profile template and verification guidance; do not invent freelancer profiles. |
| Faisalabad/Multan software houses | City + technology hubs | Use existing city/category architecture only when approved records make the page useful. |
| Textile companies in Karachi | `/city/karachi/` + `/category/manufacturing/` | Use manufacturing category and city links; do not target named textile entities without matching approved profiles. |

## Existing coverage and content gaps

ListPak already has distinct guides for business directories, free business listing, local SEO, software houses, businesses in Lahore, local services, trusted professionals, jobs, remote work, accountant jobs, digital-marketing jobs in Lahore, startups, restaurants, and education. These articles should be improved through contextual linking and factual updates rather than duplicated with near-identical posts.

The repository has category and city hubs, but the hubs are data-driven and can render empty pages. Such pages should remain indexable only when they contain useful approved listings or genuinely unique editorial content. Query-driven search, filter, sort, and pagination combinations should remain `noindex, follow` until they become stable, curated landing pages with unique content and a clear canonical.

The keyword dataset contains only one clearly job-oriented row under the conservative classifier, so it does not justify creating new job-category pages. Existing job guides and real active job pages remain the correct owners for job intent.

## Safe source changes to implement

1. Remove unsupported global trust/count language from the homepage and About page, replacing it with factual platform-purpose language or values sourced from live data.
2. Keep homepage ownership broad: businesses, services, professionals, companies, jobs, and Pakistan-wide discovery. Do not add every keyword.
3. Improve category and city templates with natural semantic copy, truthful count labels, and contextual links to related blog guides and hubs without creating a combinatorial page explosion.
4. Improve dynamic business, professional, and job metadata from the actual entity fields already present in the data model; never add unsupported attributes.
5. Add a reusable keyword-to-page ownership note and internal links from existing content where the link satisfies user intent.
6. Preserve the existing noindex policy for search/filter URLs and do not make user-submission or empty dynamic pages indexable solely for keyword coverage.
7. Do not modify Firestore records, add mock entities, or make broad deletions.

## Rejected/review policy

The rejected/review queue remains in `keyword_mapping_summary.json` and `keyword_to_page_map.json`. Representative reasons include generic web/e-commerce phrases such as “online store” and “website designing” without a Pakistan directory intent; foreign-market terms such as USA and Canada directory searches; unrelated sports/news queries; named-entity searches such as individual companies or travel brands without a matching verified ListPak entity; and malformed or duplicate phrase variants that would create cannibalization.

## Verification standard

After implementation, run TypeScript, production build, route checks, metadata checks, JSON-LD parsing, internal-link checks, sitemap checks, and a diff review. Ranking, indexing, backlink, Domain Authority, or traffic gains must not be claimed unless independently measured after deployment.
