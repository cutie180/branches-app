import type { JobItem } from './data'

/** Shared recipient for job applications sent through WhatsApp. */
export const JOB_APPLICATION_WHATSAPP = '923345636230'

/**
 * Short public aliases for selected long legacy job slugs. Existing URLs remain
 * valid and are redirected by the detail route to the shorter canonical path.
 */
export const SHORT_JOB_SLUGS: Record<string, string> = {
  'online-teachers-required-for-o-igcse-a-levels-for-all-subjects-zohaib-asad-academies': 'online-teachers-igcse-a-level',
}

export const JOB_SLUG_ALIASES: Record<string, string> = Object.fromEntries(
  Object.entries(SHORT_JOB_SLUGS).map(([legacy, short]) => [short, legacy])
)

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '')
}

export function getPublicJobSlug(job: Pick<JobItem, 'id' | 'slug' | 'title'>): string {
  const stored = (job.slug || '').trim()
  // A stored slug equal to the document id means the job never received a real
  // slug (the data layer defaults slug to the doc id). Publish a readable
  // title-based slug instead of the raw Firestore id; the id suffix keeps it
  // unique and stable, and getJobBySlug resolves it back to the job.
  if (stored && stored !== job.id) {
    return SHORT_JOB_SLUGS[stored.toLowerCase()] || stored
  }
  const fromTitle = job.title ? slugifyTitle(job.title) : ''
  if (fromTitle) return `${fromTitle}-${job.id.slice(0, 6).toLowerCase()}`
  return job.id
}

export function getPublicJobPath(job: Pick<JobItem, 'id' | 'slug' | 'title'>): string {
  return `/jobs/${getPublicJobSlug(job)}`
}
