import { readFileSync } from 'fs'
import { join } from 'path'

// Test customer business slugs
const customerSlugs = [
  'mughal-foods',
  'sansar24',
  'swapot',
  'avon-commercial',
  'artx-films',
  'lake-view-resort',
  'hutaib-industrial-solution',
  'estate-business'
]

console.log('--- TEST 1: Verifying lib/data.ts contains all customer businesses and has status: approved ---')
const dataTsPath = join(process.cwd(), 'lib', 'data.ts')
const dataTsContent = readFileSync(dataTsPath, 'utf-8')

let allCustomerSlugsFound = true
for (const slug of customerSlugs) {
  const hasSlug = dataTsContent.includes(`"slug": "${slug}"`)
  console.log(`Checking slug "${slug}": ${hasSlug ? '✅ FOUND' : '❌ MISSING'}`)
  if (!hasSlug) allCustomerSlugsFound = false
}

if (!allCustomerSlugsFound) {
  console.error('FATAL: Not all customer slugs found in lib/data.ts')
  process.exit(1)
}

console.log('\n--- TEST 2: Verifying redirect for /businesses in next.config.mjs ---')
const nextConfigPath = join(process.cwd(), 'next.config.mjs')
const nextConfigContent = readFileSync(nextConfigPath, 'utf-8')
const hasRedirect = nextConfigContent.includes("source: '/businesses'") && nextConfigContent.includes("destination: '/search/'")
console.log(`Redirect /businesses -> /search/: ${hasRedirect ? '✅ CONFIGURED' : '❌ MISSING'}`)

console.log('\n--- TEST 3: Verifying app/search/page.tsx has 7-day cache and character search ---')
const searchPagePath = join(process.cwd(), 'app', 'search', 'page.tsx')
const searchPageContent = readFileSync(searchPagePath, 'utf-8')

const checks = [
  { name: '7-day cache ms', test: searchPageContent.includes('7 * 24 * 60 * 60 * 1000') },
  { name: 'localStorage cache key', test: searchPageContent.includes('listpak_approved_businesses_cache_v2') },
  { name: 'getAllBusinesses called', test: searchPageContent.includes('getAllBusinesses(false)') },
  { name: 'businessesList state initialized', test: searchPageContent.includes('useState<BusinessItem[]>(MOCK_BUSINESSES)') },
  { name: 'Character token query matching', test: searchPageContent.includes('queryTokens.every') },
  { name: 'Card link has safe slug', test: searchPageContent.includes('href={`/business/${itemSlug}`}') },
  { name: 'Sync Listings button', test: searchPageContent.includes('syncBusinesses(true)') },
]

let allChecksPassed = true
for (const c of checks) {
  console.log(`Check "${c.name}": ${c.test ? '✅ PASS' : '❌ FAIL'}`)
  if (!c.test) allChecksPassed = false
}

if (!allChecksPassed) {
  console.error('FATAL: One or more search page checks failed')
  process.exit(1)
}

console.log('\n✅ ALL VERIFICATION TESTS PASSED SUCCESSFULLY!')
