import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBusinessLogoUrl(
  logoUrl?: string,
  businessName?: string,
  slug?: string
): string {
  if (logoUrl && logoUrl.trim() !== '') return logoUrl
  
  const nameLower = businessName?.toLowerCase() || ''
  const slugLower = slug?.toLowerCase() || ''
  
  if (nameLower.includes('yango') || slugLower.includes('yango')) {
    return '/yango-logo.jpg'
  }
  
  if (
    nameLower.includes('ubl') ||
    nameLower.includes('united bank limited') ||
    slugLower.includes('ubl') ||
    slugLower.includes('united-bank-limited')
  ) {
    return '/ubl-logo.png'
  }
  
  return ''
}


/**
 * Short plain-text excerpt for listing cards.
 * Card descriptions must be truncated server-side: CSS line-clamp alone still
 * ships the full text in the HTML, which duplicates one business's full copy
 * across every listing/related card it appears on (near-duplicate pages).
 */
export function excerpt(text: string | null | undefined, max = 180): string {
  if (!text) return ''
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim()}…`
}
