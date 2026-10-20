import type { JobItem } from './data'

export interface ParsedJobSalary {
  minValue: number
  maxValue: number
  unitText: 'MONTH' | 'YEAR'
}

/**
 * Robustly parses salary strings (e.g. "PKR 45,000 - 75,000", "PKR 40K - 60K",
 * "From PKR 100,000 / month", "Up to PKR 1,400,000 / year").
 * Returns structured values or null if not numeric.
 */
export function parseJobSalary(salaryText?: string | null): ParsedJobSalary | null {
  if (!salaryText) return null
  const s = salaryText.trim()
  if (!s || /competitive|unpaid|open|tbd|negotiable/i.test(s)) {
    return null
  }

  const isYearly = /year|annum/i.test(s)
  const unitText: 'MONTH' | 'YEAR' = isYearly ? 'YEAR' : 'MONTH'

  // Remove commas for clean number extraction
  const clean = s.replace(/,/g, '')

  // Range match: "45000 - 75000", "40K - 60K", "50,000–75,000"
  const rangeMatch = clean.match(/(\d+(?:\.\d+)?)\s*(k)?\s*(?:-|–|to)\s*(?:pkr\s*)?(\d+(?:\.\d+)?)\s*(k)?/i)
  if (rangeMatch) {
    let min = parseFloat(rangeMatch[1]) * (rangeMatch[2] ? 1000 : 1)
    let max = parseFloat(rangeMatch[3]) * (rangeMatch[4] ? 1000 : 1)
    if (min < 1000 && !rangeMatch[2]) min *= 1000
    if (max < 1000 && !rangeMatch[4]) max *= 1000
    return {
      minValue: Math.round(min),
      maxValue: Math.round(max),
      unitText
    }
  }

  // Single number with up to / from or standalone (e.g. "Up to PKR 40,000 / month", "PKR 75,000 / month")
  const numMatch = clean.match(/(?:from|up to|pkr)?\s*(\d+(?:\.\d+)?)\s*(k)?/i)
  if (numMatch) {
    let val = parseFloat(numMatch[1]) * (numMatch[2] ? 1000 : 1)
    if (val < 1000 && !numMatch[2]) val *= 1000
    const isUpTo = /up to/i.test(s)
    if (isUpTo) {
      return {
        minValue: Math.round(val * 0.6),
        maxValue: Math.round(val),
        unitText
      }
    }
    return {
      minValue: Math.round(val),
      maxValue: Math.round(val),
      unitText
    }
  }

  return null
}

/**
 * Returns ISO 8601 string for job posting date.
 */
export function getJobDatePosted(job: Pick<JobItem, 'postedAt' | 'postedDate'>): string {
  if (job.postedAt) {
    const d = new Date(job.postedAt)
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }
  if (job.postedDate && /^\d{4}-\d{2}-\d{2}/.test(job.postedDate)) {
    const d = new Date(job.postedDate)
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }
  return new Date('2026-10-18T10:00:00.000Z').toISOString()
}

/**
 * Returns ISO 8601 string for validThrough date (datePosted + 30 days).
 */
export function getJobValidThrough(job: Pick<JobItem, 'postedAt' | 'postedDate' | 'expiresAt' | 'deadline'>): string {
  if (job.expiresAt) {
    const d = new Date(job.expiresAt)
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }
  if (job.deadline && !/open until filled/i.test(job.deadline)) {
    const d = new Date(job.deadline)
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }
  const datePosted = getJobDatePosted(job)
  const posted = new Date(datePosted)
  if (!Number.isNaN(posted.getTime())) {
    return new Date(posted.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
  }
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
}

/**
 * Checks if a job has passed its validThrough date.
 */
export function isExpiredJob(job: JobItem): boolean {
  const validThrough = getJobValidThrough(job)
  const vt = new Date(validThrough)
  return !Number.isNaN(vt.getTime()) && vt.getTime() < Date.now()
}

/**
 * Strips markdown symbols (#, **, *, links, code backticks) into clean plain text for schema.
 */
export function stripMarkdown(text?: string | null): string {
  if (!text) return ''
  return text
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Meta description template:
 * "{Company} is hiring {Job Title} in {City}. Salary PKR {min}–{max}/month. Apply free on ListPak."
 * when salary exists; otherwise "{Company} is hiring {Job Title} in {City}. Apply free on ListPak."
 */
export function formatJobMetaDescription(job: Pick<JobItem, 'company' | 'title' | 'city' | 'salary'>): string {
  const company = job.company || 'Employer'
  const title = job.title || 'Job Opening'
  const city = job.city || 'Pakistan'
  const salaryParsed = parseJobSalary(job.salary)

  if (salaryParsed && salaryParsed.minValue > 0) {
    const unit = salaryParsed.unitText === 'YEAR' ? 'year' : 'month'
    let salaryClause = ''
    if (salaryParsed.maxValue && salaryParsed.maxValue > salaryParsed.minValue) {
      salaryClause = `Salary PKR ${salaryParsed.minValue.toLocaleString()}–${salaryParsed.maxValue.toLocaleString()}/${unit}. `
    } else {
      salaryClause = `Salary PKR ${salaryParsed.minValue.toLocaleString()}/${unit}. `
    }
    return `${company} is hiring ${title} in ${city}. ${salaryClause}Apply free on ListPak.`
  }

  return `${company} is hiring ${title} in ${city}. Apply free on ListPak.`
}
