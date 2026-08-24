export type DirectorySeoLink = {
  label: string
  href: string
}

export type DirectorySeoCopy = {
  intro: string
  guidance: string
  links: DirectorySeoLink[]
}

const CATEGORY_COPY: Record<string, DirectorySeoCopy> = {
  technology: {
    intro: 'Explore software houses, IT companies, web developers, product teams, and technology service providers in Pakistan.',
    guidance: 'Compare each available profile by services, city, public website, portfolio or case-study evidence, contact details, and current hiring information. A category page should describe the providers actually available rather than imply a complete national ranking.',
    links: [
      { label: 'Compare software houses in Pakistan', href: '/blog/best-software-houses-pakistan-2026/' },
      { label: 'Explore IT jobs in Pakistan', href: '/blog/it-jobs-in-pakistan/' },
      { label: 'Browse technology companies', href: '/companies/' },
    ],
  },
  healthcare: {
    intro: 'Find healthcare businesses, clinics, pharmacies, laboratories, hospitals, and medical professionals by location and service.',
    guidance: 'For health-related decisions, confirm the provider’s current address, appointment route, service scope, and relevant professional or regulatory information from authoritative sources.',
    links: [
      { label: 'Find trusted professionals', href: '/blog/how-to-find-trusted-professionals-pakistan/' },
      { label: 'Browse city-based services', href: '/blog/local-services-pakistan-by-city/' },
    ],
  },
  media: {
    intro: 'Explore digital marketing companies, advertising agencies, public-relations teams, and media providers in Pakistan.',
    guidance: 'When comparing an agency, review the services it actually offers, the industries it serves, its public work, location, contact information, and the terms of any proposed engagement.',
    links: [
      { label: 'Read the local SEO guide', href: '/blog/local-seo-pakistan-businesses-google-ranking/' },
      { label: 'Browse businesses in Lahore', href: '/blog/businesses-in-lahore-by-category/' },
    ],
  },
  manufacturing: {
    intro: 'Discover manufacturing companies, factories, industrial suppliers, and textile-related businesses by category and city in Pakistan.',
    guidance: 'Industrial profiles are most useful when they state the actual product or service, operating location, contact route, business website, and any publicly verifiable certifications or capabilities.',
    links: [
      { label: 'Explore businesses by city', href: '/cities/' },
      { label: 'Browse all business categories', href: '/categories/' },
    ],
  },
  restaurants: {
    intro: 'Find restaurants, cafés, bakeries, caterers, and other food businesses by city, cuisine, and local service information.',
    guidance: 'Before visiting, check the listing’s current location, opening hours, menu or website, phone number, and customer information. Details can change, so use the business’s own channels when confirmation is important.',
    links: [
      { label: 'Read the Pakistan restaurants guide', href: '/blog/restaurants-in-pakistan/' },
      { label: 'Read the Karachi restaurants guide', href: '/blog/restaurants-in-karachi/' },
    ],
  },
  finance: {
    intro: 'Explore accountants, tax consultants, financial advisers, banks, and finance-related businesses by category and location.',
    guidance: 'Finance and tax decisions require current credentials, service terms, and official confirmation. Treat a directory profile as a discovery starting point, not as a substitute for professional or regulatory verification.',
    links: [
      { label: 'Read the accountant jobs guide', href: '/blog/accountant-jobs-pakistan-city-guide/' },
      { label: 'Browse trusted professionals', href: '/professionals/' },
    ],
  },
  'home-services': {
    intro: 'Find plumbers, electricians, appliance technicians, AC specialists, painters, and other home-service providers by city.',
    guidance: 'Compare service area, availability, contact information, response expectations, and quote terms before hiring. Avoid sharing unnecessary sensitive information until the provider is independently verified.',
    links: [
      { label: 'Read the local services guide', href: '/blog/local-services-pakistan-by-city/' },
      { label: 'Browse Pakistani cities', href: '/cities/' },
    ],
  },
}

const CITY_COPY: Record<string, DirectorySeoCopy> = {
  karachi: {
    intro: 'Explore businesses, services, companies, jobs, and professional profiles available in Karachi, Pakistan.',
    guidance: 'Karachi searches often combine a service or industry with the city. Use the category and business links below to narrow discovery, then confirm current address, hours, and contact details with the provider.',
    links: [
      { label: 'Restaurants in Karachi guide', href: '/blog/restaurants-in-karachi/' },
      { label: 'Browse technology category', href: '/category/technology/' },
      { label: 'Browse healthcare category', href: '/category/healthcare/' },
    ],
  },
  lahore: {
    intro: 'Explore businesses, services, companies, jobs, and professional profiles available in Lahore, Pakistan.',
    guidance: 'Lahore users may search by neighborhood, service, or business category. Use available listing details as a starting point and verify the current operating information before visiting or hiring.',
    links: [
      { label: 'Businesses in Lahore guide', href: '/blog/businesses-in-lahore-by-category/' },
      { label: 'Browse technology category', href: '/category/technology/' },
      { label: 'Browse media and marketing', href: '/category/media/' },
    ],
  },
  islamabad: {
    intro: 'Explore businesses, services, companies, jobs, and professional profiles available in Islamabad, Pakistan.',
    guidance: 'Use city and category information together when comparing providers in Islamabad. Confirm the exact office or service area, current contact details, and any regulated credentials from authoritative sources.',
    links: [
      { label: 'Browse technology category', href: '/category/technology/' },
      { label: 'Browse professional profiles', href: '/professionals/' },
    ],
  },
  rawalpindi: {
    intro: 'Explore businesses, services, companies, jobs, and professional profiles available in Rawalpindi, Pakistan.',
    guidance: 'Search by the service you need and review the available listing information, location, contact route, and operating details before making a decision.',
    links: [
      { label: 'Browse local services guide', href: '/blog/local-services-pakistan-by-city/' },
      { label: 'Explore all categories', href: '/categories/' },
    ],
  },
  faisalabad: {
    intro: 'Explore businesses, services, companies, jobs, and professional profiles available in Faisalabad, Pakistan.',
    guidance: 'Use the city page with relevant industry categories to discover local providers. Business information should be checked for current contact details and service scope.',
    links: [
      { label: 'Browse manufacturing category', href: '/category/manufacturing/' },
      { label: 'Browse technology category', href: '/category/technology/' },
    ],
  },
  multan: {
    intro: 'Explore businesses, services, companies, jobs, and professional profiles available in Multan, Pakistan.',
    guidance: 'Narrow a local search with a category, service, or profession and confirm the provider’s current details before contacting or visiting.',
    links: [
      { label: 'Explore all categories', href: '/categories/' },
      { label: 'Read the local services guide', href: '/blog/local-services-pakistan-by-city/' },
    ],
  },
  sialkot: {
    intro: 'Explore businesses, services, companies, jobs, and professional profiles available in Sialkot, Pakistan.',
    guidance: 'Category and city pages can help with initial discovery of industrial, commercial, and professional providers. Confirm product, service, and contact information directly with the business.',
    links: [
      { label: 'Browse manufacturing category', href: '/category/manufacturing/' },
      { label: 'Explore all categories', href: '/categories/' },
    ],
  },
}

export function getCategorySeoCopy(categoryId: string): DirectorySeoCopy | null {
  return CATEGORY_COPY[categoryId] || null
}

export function getCitySeoCopy(citySlug: string): DirectorySeoCopy | null {
  return CITY_COPY[citySlug.toLowerCase()] || null
}
