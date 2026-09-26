import { CATEGORIES, CITIES, BusinessItem } from './data'

export const VERIFICATION_DISCLAIMER =
  "ListPak verification indicates that the listing or profile completed ListPak's verification process. Verification does not independently guarantee every claim made by the business or individual."

export const CANONICAL_DOMAIN = 'https://www.listpak.com'

export function toCanonicalUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  return clean ? `${CANONICAL_DOMAIN}/${clean}/` : `${CANONICAL_DOMAIN}/`
}

/**
 * Maps a business to its primary canonical category ID from CATEGORIES.
 */
export function normalizeBusinessCategoryId(biz: Pick<BusinessItem, 'categoryId' | 'category' | 'secondaryCategories'>): string {
  if (biz.categoryId && CATEGORIES.some(c => c.id === biz.categoryId)) {
    return biz.categoryId
  }
  const text = `${biz.category || ''} ${(biz.secondaryCategories || []).join(' ')}`.toLowerCase()
  if (text.includes('restaurant') || text.includes('food') || text.includes('cafe') || text.includes('dining')) return 'restaurants'
  if (text.includes('real estate') || text.includes('property') || text.includes('builder')) return 'real-estate'
  if (text.includes('technology') || text.includes('tech') || text.includes('software') || text.includes('it ') || text.includes('developer')) return 'technology'
  if (text.includes('health') || text.includes('medical') || text.includes('doctor') || text.includes('clinic') || text.includes('hospital')) return 'healthcare'
  if (text.includes('education') || text.includes('school') || text.includes('training') || text.includes('academy') || text.includes('tutor')) return 'education'
  if (text.includes('retail') || text.includes('shopping') || text.includes('store') || text.includes('shop') || text.includes('market')) return 'retail'
  if (text.includes('construction') || text.includes('building') || text.includes('contractor') || text.includes('architect')) return 'construction'
  if (text.includes('automotive') || text.includes('vehicle') || text.includes('car') || text.includes('auto')) return 'automotive'
  if (text.includes('finance') || text.includes('banking') || text.includes('account') || text.includes('tax')) return 'finance'
  if (text.includes('travel') || text.includes('tourism') || text.includes('tour') || text.includes('visa') || text.includes('umrah')) return 'travel'
  if (text.includes('beauty') || text.includes('salon') || text.includes('spa') || text.includes('skincare')) return 'beauty'
  if (text.includes('logistics') || text.includes('courier') || text.includes('transport') || text.includes('cargo') || text.includes('freight')) return 'logistics'
  if (text.includes('home service') || text.includes('repair') || text.includes('plumb') || text.includes('electri')) return 'home-services'
  if (text.includes('solar') || text.includes('energy') || text.includes('renewable')) return 'solar-energy'
  if (text.includes('legal') || text.includes('law') || text.includes('advocate')) return 'legal'
  if (text.includes('event') || text.includes('wedding') || text.includes('marquee')) return 'events'
  if (text.includes('manufacturing') || text.includes('factory') || text.includes('industrial')) return 'manufacturing'
  if (text.includes('furniture') || text.includes('interior')) return 'furniture'
  if (text.includes('media') || text.includes('advertising') || text.includes('marketing') || text.includes('pr')) return 'media'
  if (text.includes('hiring') || text.includes('hr') || text.includes('recruitment')) return 'hiring-company-hr'
  return biz.categoryId || 'retail'
}

export function normalizeCitySlug(city: string): string {
  return (city || '').trim().toLowerCase().replace(/\s+/g, '-')
}

export function getCityDisplayName(citySlug: string): string {
  const norm = citySlug.trim().toLowerCase()
  const found = CITIES.find(c => c.toLowerCase().replace(/\s+/g, '-') === norm)
  if (found) return found
  return citySlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function getCategoryDisplayName(catId: string): string {
  const found = CATEGORIES.find(c => c.id === catId)
  if (found) return found.name
  return catId
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * Filter businesses for a category, using both categoryId and normalized category matching.
 */
export function filterBusinessesByCategory(businesses: BusinessItem[], categoryId: string): BusinessItem[] {
  return businesses.filter(b => normalizeBusinessCategoryId(b) === categoryId)
}

/**
 * Filter businesses for a city, checking main city, cities array, and branch locations.
 */
export function filterBusinessesByCity(businesses: BusinessItem[], citySlug: string): BusinessItem[] {
  const normCity = citySlug.toLowerCase()
  return businesses.filter(b => {
    const mainCitySlug = normalizeCitySlug(b.city)
    if (mainCitySlug === normCity) return true
    if (b.cities && b.cities.some(c => normalizeCitySlug(c) === normCity)) return true
    if (b.locations && b.locations.some(l => normalizeCitySlug(l.city) === normCity)) return true
    return false
  })
}

/**
 * Filter businesses for a category and city combination.
 */
export function filterBusinessesByCategoryAndCity(
  businesses: BusinessItem[],
  categoryId: string,
  citySlug: string
): BusinessItem[] {
  const inCat = filterBusinessesByCategory(businesses, categoryId)
  return filterBusinessesByCity(inCat, citySlug)
}

export interface PopulatedCategoryCityPair {
  categorySlug: string
  categoryName: string
  citySlug: string
  cityName: string
  count: number
}

/**
 * Returns all (category, city) pairs that have at least 1 real approved business listing.
 */
export function getPopulatedCategoryCityPairs(businesses: BusinessItem[]): PopulatedCategoryCityPair[] {
  const map = new Map<string, { categorySlug: string; citySlug: string; count: number }>()

  for (const b of businesses) {
    const catSlug = normalizeBusinessCategoryId(b)
    const cityList = new Set<string>()
    if (b.city) cityList.add(b.city)
    if (b.cities) b.cities.forEach(c => cityList.add(c))
    if (b.locations) b.locations.forEach(l => { if (l.city) cityList.add(l.city) })

    for (const rawCity of cityList) {
      const citySlug = normalizeCitySlug(rawCity)
      if (!citySlug || citySlug === 'pakistan' || citySlug === 'nationwide' || citySlug === 'all-pakistan') continue
      const key = `${catSlug}:::${citySlug}`
      const existing = map.get(key)
      if (existing) {
        existing.count += 1
      } else {
        map.set(key, { categorySlug: catSlug, citySlug, count: 1 })
      }
    }
  }

  const result: PopulatedCategoryCityPair[] = []
  for (const item of map.values()) {
    result.push({
      categorySlug: item.categorySlug,
      categoryName: getCategoryDisplayName(item.categorySlug),
      citySlug: item.citySlug,
      cityName: getCityDisplayName(item.citySlug),
      count: item.count
    })
  }

  return result.sort((a, b) => b.count - a.count || a.cityName.localeCompare(b.cityName))
}

/**
 * Returns distinct cities where a given category actually has listings.
 */
export function getCitiesWithListingsForCategory(businesses: BusinessItem[], categoryId: string): { citySlug: string; cityName: string; count: number }[] {
  const pairs = getPopulatedCategoryCityPairs(businesses)
  return pairs
    .filter(p => p.categorySlug === categoryId)
    .map(p => ({ citySlug: p.citySlug, cityName: p.cityName, count: p.count }))
}

/**
 * Returns distinct categories that have listings in a given city.
 */
export function getCategoriesWithListingsForCity(businesses: BusinessItem[], citySlug: string): { categorySlug: string; categoryName: string; count: number }[] {
  const normCity = citySlug.toLowerCase()
  const pairs = getPopulatedCategoryCityPairs(businesses)
  return pairs
    .filter(p => p.citySlug === normCity)
    .map(p => ({ categorySlug: p.categorySlug, categoryName: p.categoryName, count: p.count }))
}
