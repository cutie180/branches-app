# Research notes and safeguards

**Research date:** 23 August 2026  
**Scope:** Pakistan-focused professional and professional-entity opportunities for manual ListPak entry.  
**Database status:** No new records were inserted.  
**Application status:** No application or Firestore rules files were changed for this manual-research package.

## Research method

Current web search results were used to identify real Pakistani professionals and professional entities with visible entity, role, founder, CEO, profession, organization, or Pakistan-intent queries. Official organization pages and high-authority institutional pages were preferred for role verification. Search snippets were treated as discovery signals, not as permission to scrape private information or as proof of ListPak verification.

Observed query families included `who is [person]`, `[person name]`, `[person] Pakistan`, `[person] CEO`, `[person] founder`, `[person] expert`, `[person] profession`, `[profession] Pakistan`, and `[profession] in Pakistan`. Candidate selection considered public SERP visibility, entity recognition, current or recent relevance, public professional information, relationship to Pakistan, realistic profile usefulness, competition, and likely ranking opportunity.

## Current search-result signals

The current search landscape showed that professional/entity queries are served by official organization pages, LinkedIn, Wikipedia, World Economic Forum, university profiles, public-sector pages, speaker bios, company leadership pages, and public social profiles. This is why the recommended ListPak profiles link to authoritative public websites rather than pretending to be official biographies.

Strong search signals were observed for Salim Ghauri, Jehan Ara, Kalsoom Lakhani, Muneeb Maayr, Monis Rahman, Dr Sania Nishtar, Arif Habib, Nighat Dad, Roshaneh Zafar, and Fiza Farhan. Their query families and source evidence are recorded in each candidate file.

## Duplicate baseline

The repository’s professional fixtures already contain Hamza Shaikh, Dr Zainab Malik, Shehryar Khan, Tariq Mehmood, Saima Riaz, Prof. Adnan Tariq, Bilal Ahmed, and Dr Imran Ashraf, along with several suspicious/generated slugs present in the live sitemap. None of the ten researched names match those fixture names or the proposed slugs.

A read-only Firestore REST request for the `professionals` collection returned HTTP 200 with an empty document payload at the time of research. The live professional hub rendered `Pakistani Professionals Directory (0)` and `Loading professional profiles...`, so the production database, static fixtures, and sitemap are inconsistent. A manual operator must still search the live admin queue and Firestore by normalized name, slug, website, and organization before creating any record.

## Manual-entry trust rules

Use the existing professional creation/admin workflow. Do not hardcode these profiles into React or Next.js files, create static pages, create a duplicate model, bypass moderation, or modify an existing approved record unnecessarily.

Set `status` to `pending`, `profileStatus` to `PENDING`, `verified` to `false`, `verificationStatus` to `UNVERIFIED`, and `verificationRequestStatus` to `NOT_REQUESTED`. Start `rating` and `reviewCount` at zero and use an empty `reviews` array. Public-source research does not equal ListPak verification, and no person should receive a green verification badge without the required ListPak process.

Leave `phone`, `email`, and `whatsapp` empty unless the professional or organization supplies a public business contact and agrees to its use. Do not use data-broker pages, scraped personal numbers, or private email addresses. Obtain a permitted portrait or image; do not hotlink a copyrighted or private photo.

City fields marked for confirmation should be checked directly before approval. The current public sources support role/entity identity more strongly than personal residence. Use the organization’s public office city only when the association is clear and label it for review.

## SEO and profile-quality rules

A profile should not be added to the public XML sitemap until it is approved, complete, unique, internally linked, and genuinely useful. Pending records should not be publicly indexable. The page title and H1 should state the public name and role, and the description should be based on public sources with a visible correction/claim path.

Do not add fake reviews, default ratings, invented availability, unsupported licenses, unsupported credentials, or “verified” language. For doctors, lawyers, accountants, and finance professionals, require additional credential and identity review before approval. For CEO/founder profiles, state the organization relationship accurately and distinguish a ListPak directory entry from the official company page.

## Source list

The individual files contain candidate-level citations. The key source types used were NetSol/PITB, Katalyst Labs, i2i Ventures, Bykea, SDPI, Gavi, Heartfile, Arif Habib Corporation, Digital Rights Foundation, Kashf Foundation, ORA Global Development Advisors, World Economic Forum, LinkedIn, Forbes, universities, and other institutional pages.
