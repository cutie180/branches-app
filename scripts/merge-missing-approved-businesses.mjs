import fs from 'fs';
import { MOCK_BUSINESSES } from '../lib/data.ts';

const dump = JSON.parse(fs.readFileSync('./scripts/all-db-dump.json', 'utf8'));
const dumpBiz = dump.businesses || [];
const existingSlugs = new Set(MOCK_BUSINESSES.map(b => (b.slug || '').toLowerCase()));

const missing = dumpBiz.filter(b => 
  b && b.name && b.slug && 
  !existingSlugs.has(b.slug.toLowerCase()) && 
  (b.status === 'approved' || !b.status)
);

console.log(`Found ${missing.length} approved businesses to merge.`);

const normalizedMissing = missing.map(b => {
  const city = b.city || 'Karachi';
  const address = b.address || `${city}, Pakistan`;
  const locations = b.locations && b.locations.length > 0
    ? b.locations
    : [{ city, address, isPrimary: true }];
  const cities = b.cities && b.cities.length > 0
    ? b.cities
    : [city];

  return {
    id: b.id || `biz-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    slug: b.slug,
    name: b.name,
    metaTitle: b.metaTitle || `${b.name} – ${b.category || 'Business'} in ${city} | ListPak`,
    metaDescription: b.metaDescription || (b.description ? b.description.slice(0, 160) : `Find ${b.name} contact details, phone number and address in ${city}, Pakistan on ListPak.`),
    canonical: `https://www.listpak.com/business/${b.slug}/`,
    introduction: b.introduction || (b.description ? b.description.slice(0, 200) : `${b.name} is a verified business in ${city}, Pakistan.`),
    category: b.category || 'Services',
    categoryId: b.categoryId || 'retail',
    secondaryCategories: b.secondaryCategories || [],
    city,
    cities,
    province: b.province || 'Pakistan',
    address,
    locations,
    phone: b.phone || '+92 300 0000000',
    whatsapp: b.whatsapp || '923000000000',
    email: b.email || 'contact@business.pk',
    website: b.website || 'https://www.listpak.com',
    coverImage: b.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    logo: b.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    description: b.description || `${b.name} provides professional services and products in ${city}, Pakistan.`,
    services: b.services || [],
    operatingHours: b.operatingHours || { "Monday - Saturday": "09:00 AM - 07:00 PM" },
    rating: Number.isFinite(b.rating) ? b.rating : 5,
    reviewCount: Number.isFinite(b.reviewCount) ? b.reviewCount : 1,
    verified: Boolean(b.verified),
    isClaimed: Boolean(b.isClaimed),
    isFeatured: Boolean(b.isFeatured),
    status: 'approved',
    paymentStatus: b.paymentStatus || 'VERIFIED',
    features: b.features || ['Verified Business Profile'],
    reviews: Array.isArray(b.reviews) ? b.reviews : [],
    faqs: Array.isArray(b.faqs) ? b.faqs : [],
    submittedAt: b.submittedAt || new Date().toISOString(),
    approvedAt: b.approvedAt || new Date().toISOString(),
    approvedBy: b.approvedBy || 'admin-master',
    ownerName: b.ownerName || 'Business Representative',
  };
});

const updatedBusinesses = [...MOCK_BUSINESSES, ...normalizedMissing];
console.log(`Updated total businesses count: ${updatedBusinesses.length}`);

// Inject into lib/data.ts
const dataFilePath = './lib/data.ts';
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

const startMarker = 'export const MOCK_BUSINESSES: BusinessItem[] = [';
const endMarker = 'export const MOCK_COMPANIES: CompanyItem[] = []';

const startIndex = dataContent.indexOf(startMarker);
const endIndex = dataContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate MOCK_BUSINESSES markers in lib/data.ts');
  process.exit(1);
}

const newBusinessesJson = JSON.stringify(updatedBusinesses, null, 2);
const newSection = `export const MOCK_BUSINESSES: BusinessItem[] = ${newBusinessesJson}\n\n`;

dataContent = dataContent.slice(0, startIndex) + newSection + dataContent.slice(endIndex);
fs.writeFileSync(dataFilePath, dataContent, 'utf8');
console.log('Successfully updated lib/data.ts with all approved customer businesses!');
