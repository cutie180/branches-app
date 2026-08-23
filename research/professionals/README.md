# ListPak Professional Research Package

**Purpose:** This directory contains research-only Markdown files for manual professional-profile entry into ListPak. No database records were created by this package, and no application routes or existing professional records were modified.

**Research date:** 23 August 2026  
**Scope:** Real Pakistani professionals and professional entities with public search signals and publicly documented work. Private contact information was not scraped. Each record is intended to be reviewed, claimed, and approved through ListPak’s existing moderation workflow before publication.

## Candidates

| # | Candidate | Public title | Category | Proposed city | Slug | Opportunity |
|---:|---|---|---|---|---|---:|
| 1 | [Salim Ghauri](./salim-ghauri.md) | Founder & CEO, NetSol Technologies | Technology & IT | Lahore | `salim-ghauri-founder-ceo-netsol-technologies` | 9.2/10 |
| 2 | [Jehan Ara](./jehan-ara.md) | Founder & CEO, Katalyst Labs | Technology & IT | Karachi | `jehan-ara-founder-ceo-katalyst-labs` | 9.0/10 |
| 3 | [Kalsoom Lakhani](./kalsoom-lakhani.md) | Cofounder & General Partner, i2i Ventures | Finance & Banking | Karachi; confirm before approval | `kalsoom-lakhani-cofounder-general-partner-i2i-ventures` | 8.8/10 |
| 4 | [Muneeb Maayr](./muneeb-maayr.md) | Founder, Bykea | Logistics & Courier | Karachi | `muneeb-maayr-founder-bykea` | 8.8/10 |
| 5 | [Monis Rahman](./monis-rahman.md) | Founder & Chairman, Rozee.pk; CEO & Co-Founder, Dukan.pk | Technology & IT | Lahore; confirm before approval | `monis-rahman-founder-chairman-rozee` | 9.1/10 |
| 6 | [Dr Sania Nishtar](./sania-nishtar.md) | CEO, Gavi; Physician and Founder of Heartfile | Healthcare & Medical | Islamabad | `sania-nishtar-ceo-gavi-physician` | 9.4/10 |
| 7 | [Arif Habib](./arif-habib.md) | Chairman, Arif Habib Group; Chief Executive, Arif Habib Corporation | Finance & Banking | Karachi | `arif-habib-chairman-ceo-arif-habib-group` | 9.3/10 |
| 8 | [Nighat Dad](./nighat-dad.md) | Lawyer; Founder & Executive Director, Digital Rights Foundation | Legal & Law Consultants | Lahore | `nighat-dad-lawyer-founder-digital-rights-foundation` | 8.9/10 |
| 9 | [Roshaneh Zafar](./roshaneh-zafar.md) | Founder & Managing Director, Kashf Foundation | Finance & Banking | Lahore | `roshaneh-zafar-founder-managing-director-kashf` | 8.7/10 |
| 10 | [Fiza Farhan](./fiza-farhan.md) | CEO, ORA Global Development Advisors | Professional / Job Seeker | Lahore; confirm before approval | `fiza-farhan-ceo-ora-global-development-advisors` | 8.7/10 |

## Manual-entry field rules

| Existing ListPak field | Manual-entry rule |
|---|---|
| `name`, `fullName` | Use the public name documented in the candidate file. |
| `title`, `profession`, `specialization` | Use the current or most recently documented public role. Do not add unsupported credentials. |
| `category` | Use the exact existing ListPak category named in each file. |
| `city`, `province`, `country` | Use only the documented location. Fields marked “confirm before approval” require direct confirmation from the professional or organization. |
| `bio`, `about` | Use or adapt the research summary, then allow the person/organization to claim or correct it. |
| `website` and social links | Use official organization/personal pages or public professional profiles only. |
| `phone`, `email`, `whatsapp` | Leave empty unless the professional or organization supplies a public business contact and agrees to its use. |
| `avatar`, `coverImage` | Obtain permission or use an appropriately licensed image. Do not hotlink a private or copyrighted portrait. |
| `rating`, `reviewCount`, `reviews` | Start at `0`, `0`, and `[]`. Never invent reviews or ratings. |
| `verified`, `verificationStatus` | Start at `false` and `UNVERIFIED`. Public-source research is not ListPak verification. |
| `status`, `profileStatus` | Create as `pending` and `PENDING`; do not auto-approve. |
| `userId` | Leave empty until the professional claims the profile or an authenticated account is linked. |

## Existing-record and approval checklist

Before manual entry, search the current Firestore `professionals` collection by normalized name, username, slug, official website, and organization. Compare against repository fixtures as well as live sitemap URLs. If a candidate already exists, update or claim the existing record instead of creating a duplicate.

After manual entry, confirm that the record appears in the existing admin **Pending Profiles** queue, remains unverified, has no fabricated reviews or ratings, resolves only through the existing professional route after approval, and is not added to the public sitemap until it is genuinely approved and indexable.

## Important content and trust note

These are public professional/entity research profiles, not endorsements, government registrations, licenses, or ListPak verifications. For doctors, lawyers, finance professionals, and other trust-sensitive roles, require direct confirmation and appropriate credential review before publication. The source URLs in each candidate file should be retained in internal research notes rather than exposed as unsupported claims in public profile copy.
