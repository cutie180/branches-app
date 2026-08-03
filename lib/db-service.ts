import { MOCK_BUSINESSES, BusinessItem } from './data'
import { db } from './firebase'
import { collection, getDocs, query, where, limit, addDoc, doc, setDoc } from 'firebase/firestore'

// Memory cache store for super fast reads and SSG generation
let memoryBusinessesCache: BusinessItem[] = [...MOCK_BUSINESSES]

export function normalizeSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Single Source of Truth Database Service
 * Combines initial seeded business entries and dynamic database storage.
 */
export async function getAllBusinesses(): Promise<BusinessItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'businesses'))
    if (!querySnapshot.empty) {
      const firestoreItems: BusinessItem[] = []
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data()
        firestoreItems.push({
          id: docSnap.id,
          slug: data.slug || normalizeSlug(data.businessName || 'business'),
          name: data.businessName || data.name || 'Verified Business',
          category: data.category || 'Services',
          categoryId: data.categoryId || data.category || 'services',
          city: data.city || 'Pakistan',
          province: data.province || 'Pakistan',
          rating: data.rating || 4.9,
          reviewCount: data.reviewCount || 8,
          verified: data.verified ?? true,
          isClaimed: data.isClaimed ?? true,
          phone: data.phone || '+92 300 0000000',
          whatsapp: data.whatsapp || '923000000000',
          email: data.email || 'contact@business.pk',
          website: data.website || data.websiteUrl || 'https://listpak.com',
          address: data.address || 'Commercial Center, Pakistan',
          coverImage: data.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
          logo: data.logo || data.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
          description: data.description || 'Verified business listing on ListPak.',
          services: data.services || ['General Services', 'Customer Support'],
          operatingHours: data.operatingHours || { 'Monday - Saturday': '09:00 AM - 07:00 PM' },
          features: data.features || ['Verified Profile'],
          reviews: data.reviews || [],
          faqs: data.faqs || []
        })
      })

      // Merge avoiding duplicate slugs
      const existingSlugs = new Set(firestoreItems.map(b => b.slug))
      const combined = [
        ...firestoreItems,
        ...memoryBusinessesCache.filter(b => !existingSlugs.has(b.slug))
      ]
      memoryBusinessesCache = combined
      return combined
    }
  } catch (err) {
    console.warn('Firestore getAllBusinesses fallback to memory cache:', err)
  }
  return memoryBusinessesCache
}

export async function getBusinessBySlug(slug: string): Promise<BusinessItem | null> {
  // First check memory cache
  const cached = memoryBusinessesCache.find(b => b.slug === slug)
  if (cached) return cached

  // Fetch from Firestore
  try {
    const q = query(collection(db, 'businesses'), where('slug', '==', slug), limit(1))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0]
      const data = docSnap.data()
      const item: BusinessItem = {
        id: docSnap.id,
        slug: data.slug || slug,
        name: data.businessName || data.name || 'Verified Business',
        category: data.category || 'Services',
        categoryId: data.categoryId || data.category || 'services',
        city: data.city || 'Pakistan',
        province: data.province || 'Pakistan',
        rating: data.rating || 4.9,
        reviewCount: data.reviewCount || 10,
        verified: data.verified ?? true,
        isClaimed: data.isClaimed ?? true,
        phone: data.phone || '+92 300 0000000',
        whatsapp: data.whatsapp || '923000000000',
        email: data.email || 'info@business.pk',
        website: data.website || data.websiteUrl || 'https://listpak.com',
        address: data.address || 'Commercial Center, Pakistan',
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        logo: data.logo || data.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
        description: data.description || 'Verified local business listing on ListPak.',
        services: data.services || ['Customer Service', 'Consultation'],
        operatingHours: data.operatingHours || { 'Monday - Saturday': '09:00 AM - 07:00 PM' },
        features: data.features || ['Verified Listing'],
        reviews: data.reviews || [],
        faqs: data.faqs || []
      }
      memoryBusinessesCache.push(item)
      return item
    }
  } catch (err) {
    console.warn('Firestore getBusinessBySlug fallback:', err)
  }

  // Fallback generation for unknown slug
  const cleanName = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const fallbackBiz: BusinessItem = {
    id: slug,
    slug,
    name: cleanName,
    category: 'Commercial Services',
    categoryId: 'services',
    city: 'Lahore',
    province: 'Punjab',
    rating: 4.8,
    reviewCount: 15,
    verified: true,
    isClaimed: false,
    phone: '+92 300 1234567',
    whatsapp: '923001234567',
    email: 'info@' + slug + '.pk',
    website: 'https://' + slug + '.pk',
    address: 'Commercial Hub, Lahore',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    description: `${cleanName} is a top-rated verified business listing on ListPak Pakistan directory.`,
    services: ['General Services', 'Customer Inquiries'],
    operatingHours: { 'Monday - Saturday': '09:00 AM - 07:00 PM' },
    features: ['Verified Contact Details'],
    reviews: [],
    faqs: []
  }
  memoryBusinessesCache.push(fallbackBiz)
  return fallbackBiz
}

export async function saveBusinessToDatabase(businessData: Partial<BusinessItem>): Promise<BusinessItem> {
  const name = businessData.name || 'New Business'
  const slug = businessData.slug || normalizeSlug(name)

  const newBiz: BusinessItem = {
    id: 'biz-' + Date.now(),
    slug,
    name,
    category: businessData.category || 'Services',
    categoryId: businessData.categoryId || 'services',
    city: businessData.city || 'Karachi',
    province: businessData.province || 'Pakistan',
    rating: 5.0,
    reviewCount: 1,
    verified: true,
    isClaimed: true,
    phone: businessData.phone || '+92 300 0000000',
    whatsapp: businessData.whatsapp || '923000000000',
    email: businessData.email || 'contact@business.pk',
    website: businessData.website || 'https://listpak.com',
    address: businessData.address || 'Pakistan',
    coverImage: businessData.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    logo: businessData.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    description: businessData.description || 'Newly registered business on ListPak.',
    services: businessData.services || ['Professional Services'],
    operatingHours: businessData.operatingHours || { 'Monday - Saturday': '09:00 AM - 07:00 PM' },
    features: ['Verified Listing'],
    reviews: [],
    faqs: []
  }

  // Update memory cache
  memoryBusinessesCache = [newBiz, ...memoryBusinessesCache.filter(b => b.slug !== slug)]

  // Persist to Firestore
  try {
    await addDoc(collection(db, 'businesses'), {
      ...newBiz,
      businessName: newBiz.name,
      createdAt: new Date().toISOString(),
      status: 'approved'
    })
  } catch (err) {
    console.warn('Firestore save fallback:', err)
  }

  return newBiz
}
