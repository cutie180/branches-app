# Job URL and WhatsApp Application Update

## Implemented

ListPak now publishes the selected job through the shorter URL:

`https://www.listpak.com/jobs/online-teachers-igcse-a-level/`

The previous long URL remains supported. When a visitor opens the legacy URL, the job route resolves the same approved job and redirects to the short public URL. This preserves existing bookmarks, backlinks, and indexed references while giving future internal links, canonical metadata, structured data, and sitemap entries the shorter path.

All job-detail pages now include an **Apply on WhatsApp** button next to the existing ListPak application and careers-site actions. The button opens WhatsApp for `03345636230` using the international form `923345636230` and pre-fills a message containing the job title, employer, short ListPak job URL, and an instruction that the applicant is sending a CV. WhatsApp still requires the applicant to attach the CV manually; the website does not upload or transmit files automatically.

## Source changes

| Area | Change |
|---|---|
| `lib/job-url.ts` | Shared WhatsApp recipient, collision-checked short alias map, and public job-path helpers. |
| `lib/job-service.ts` | Short alias lookup resolves to the stored legacy slug without changing Firestore records. |
| `app/jobs/[id]/page.tsx` | Generates both short and legacy static paths, redirects the selected legacy path to the short path, updates canonical/OG/schema/breadcrumb URLs, and renders the WhatsApp CTA. |
| Job listing surfaces | Homepage, jobs hub, city pages, company pages, employer dashboard, search, admin preview, and sitemap use the shared public job path. |

## Validation

TypeScript validation passed with `npx tsc --noEmit`. The production build passed with 387 generated static pages. Local checks confirmed that both the long legacy URL and the short URL return the same job content, the canonical URL is the short path, the WhatsApp link contains `https://wa.me/923345636230`, and the sitemap contains the short path when the job is included in the approved sitemap inventory.

No database record or stored job slug was modified. The public short alias is code-based and intentionally limited to this requested listing. Additional aliases should be added only after collision checks and preservation of the original URL.
