import { cache } from 'react'
import { MOCK_BUSINESSES, BusinessItem, ContactMessage } from './data'
import { db } from './firebase'
import { collection, getDocs, query, where, limit, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

// Memory cache store for super fast reads and SSG generation
let memoryBusinessesCache: BusinessItem[] = [...MOCK_BUSINESSES]
let memoryContactMessagesCache: ContactMessage[] = []

export function normalizeSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Generates 5 realistic starter reviews for new business listings
 */
export const GENERATE_STARTER_REVIEWS = (businessName: string) => [
  {
    id: 'rev-starter-1-' + Date.now(),
    userName: 'Tariq Mehmood',
    rating: 5,
    date: 'Just now',
    comment: `Excellent service and a very professional team at ${businessName}. Highly recommended for anyone looking for reliable solutions.`
  },
  {
    id: 'rev-starter-2-' + Date.now(),
    userName: 'Saima Khan',
    rating: 5,
    date: '1 day ago',
    comment: `Great overall experience from start to finish with ${businessName}. Friendly staff and outstanding customer support.`
  },
  {
    id: 'rev-starter-3-' + Date.now(),
    userName: 'Bilal Ahmed',
    rating: 5,
    date: '2 days ago',
    comment: `${businessName} exceeded expectations with quality service, quick response times, and professional communication.`
  },
  {
    id: 'rev-starter-4-' + Date.now(),
    userName: 'Hamza Sheikh',
    rating: 5,
    date: '3 days ago',
    comment: `Very satisfied with the experience at ${businessName}. Everything was handled efficiently and exactly as promised.`
  },
  {
    id: 'rev-starter-5-' + Date.now(),
    userName: 'Zainab Fatima',
    rating: 5,
    date: '4 days ago',
    comment: `Highly recommended. The staff at ${businessName} were knowledgeable, courteous, and delivered excellent service throughout.`
  }
]

/**
 * Fetch all businesses. If includePending is false (default), returns ONLY approved businesses.
 */
export const getAllBusinesses = cache(async function getAllBusinesses(includePending: boolean = false): Promise<BusinessItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'businesses'))
    if (!querySnapshot.empty) {
      const firestoreItems: BusinessItem[] = []
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data()
        const bName = data.businessName || data.name || 'Business listing'
        const itemStatus = data.status || 'approved'
        
        const docLocations = data.locations && data.locations.length > 0
          ? data.locations
          : [{ city: data.city || 'Pakistan', address: data.address || 'Commercial Center, Pakistan', isPrimary: true }]
        const docCities = data.cities && data.cities.length > 0
          ? data.cities
          : Array.from(new Set(docLocations.map((l: { city: string }) => l.city)))
        const primaryLoc = docLocations.find((l: { isPrimary?: boolean }) => l.isPrimary) || docLocations[0]

        firestoreItems.push({
          id: docSnap.id,
          slug: data.slug || normalizeSlug(bName),
          name: bName,
          category: data.category || 'Services',
          categoryId: data.categoryId || data.category || 'services',
          city: primaryLoc.city || data.city || 'Pakistan',
          cities: docCities,
          province: data.province || 'Pakistan',
          rating: Number.isFinite(data.rating) ? data.rating : 0,
          reviewCount: data.reviewCount || (data.reviews ? data.reviews.length : 0),
          verified: data.verified === true,
          isClaimed: data.isClaimed === true,
          isFeatured: data.isFeatured === true,
          status: itemStatus,
          submittedAt: data.submittedAt || data.createdAt || new Date().toISOString(),
          approvedAt: data.approvedAt,
          approvedBy: data.approvedBy,
          rejectionReason: data.rejectionReason,
          ownerName: data.ownerName || data.fullName || '',
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          email: data.email || '',
          website: data.website || data.websiteUrl || '',
          address: primaryLoc.address || data.address || 'Commercial Center, Pakistan',
          locations: docLocations,
          coverImage: data.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
          logo: data.logo || data.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
          description: data.description || 'Business listing submitted to ListPak.',
          services: data.services || [],
          operatingHours: data.operatingHours || {},
          features: data.features || [],
          reviews: data.reviews && data.reviews.length > 0 ? data.reviews : [],
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
    }
  } catch (err) {
    console.warn('Firestore getAllBusinesses fallback to memory cache:', err)
  }

  if (includePending) {
    return memoryBusinessesCache
  }
  
  // Public filter: only return approved items
  return memoryBusinessesCache.filter(b => (b.status || 'approved') === 'approved')
})

export async function getPendingBusinesses(): Promise<BusinessItem[]> {
  const all = await getAllBusinesses(true)
  return all.filter(b => b.status === 'pending')
}

export async function approveBusiness(id: string, adminUid: string): Promise<boolean> {
  // Update memory cache
  const idx = memoryBusinessesCache.findIndex(b => b.id === id)
  if (idx !== -1) {
    memoryBusinessesCache[idx].status = 'approved'
    memoryBusinessesCache[idx].approvedAt = new Date().toISOString()
    memoryBusinessesCache[idx].approvedBy = adminUid
  }

  // Update Firestore
  try {
    const docRef = doc(db, 'businesses', id)
    await updateDoc(docRef, {
      status: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: adminUid
    })
    return true
  } catch (err) {
    console.warn('Firestore approveBusiness error:', err)
  }
  return true
}

export async function rejectBusiness(id: string, reason?: string): Promise<boolean> {
  // Update memory cache
  const idx = memoryBusinessesCache.findIndex(b => b.id === id)
  if (idx !== -1) {
    memoryBusinessesCache[idx].status = 'rejected'
    memoryBusinessesCache[idx].rejectionReason = reason || 'Does not satisfy business verification requirements.'
  }

  // Update Firestore
  try {
    const docRef = doc(db, 'businesses', id)
    await updateDoc(docRef, {
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason || 'Does not satisfy business verification requirements.'
    })
    return true
  } catch (err) {
    console.warn('Firestore rejectBusiness error:', err)
  }
  return true
}

export async function getFeaturedBusinesses(limitCount: number = 9): Promise<BusinessItem[]> {
  const approvedOnly = await getAllBusinesses(false)
  const featured = approvedOnly.filter(b => b.isFeatured || b.verified)
  return featured.slice(0, limitCount)
}

export const getBusinessBySlug = cache(async function getBusinessBySlug(slug: string): Promise<BusinessItem | null> {
  const cached = memoryBusinessesCache.find(b => b.slug === slug)
  if (cached && (cached.status || 'approved') === 'approved') {
    return cached
  }

  try {
    const q = query(collection(db, 'businesses'), where('slug', '==', slug), limit(1))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0]
      const data = docSnap.data()
      if (data.status && data.status !== 'approved') {
        return null // Pending/rejected listings are not publicly accessible
      }
      const bName = data.businessName || data.name || 'Business listing'
      const docLocations = data.locations && data.locations.length > 0
        ? data.locations
        : [{ city: data.city || 'Pakistan', address: data.address || 'Commercial Center, Pakistan', isPrimary: true }]
      const docCities = data.cities && data.cities.length > 0
        ? data.cities
        : Array.from(new Set(docLocations.map((l: { city: string }) => l.city)))
      const primaryLoc = docLocations.find((l: { isPrimary?: boolean }) => l.isPrimary) || docLocations[0]

      const item: BusinessItem = {
        id: docSnap.id,
        slug: data.slug || slug,
        name: bName,
        category: data.category || 'Services',
        categoryId: data.categoryId || data.category || 'services',
        city: primaryLoc.city || data.city || 'Pakistan',
        cities: docCities,
        province: data.province || 'Pakistan',
        rating: Number.isFinite(data.rating) ? data.rating : 0,
        reviewCount: data.reviewCount || 5,
        verified: data.verified === true,
        isClaimed: data.isClaimed === true,
        isFeatured: data.isFeatured === true,
        status: data.status || 'approved',
        phone: data.phone || '',
        whatsapp: data.whatsapp || '',
        email: data.email || '',
        website: data.website || data.websiteUrl || '',
        address: primaryLoc.address || data.address || 'Commercial Center, Pakistan',
        locations: docLocations,
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        logo: data.logo || data.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
        description: data.description || 'Business listing submitted to ListPak.',
        services: data.services || [],
        operatingHours: data.operatingHours || {},
        features: data.features || [],
        reviews: data.reviews && data.reviews.length > 0 ? data.reviews : [],
        faqs: data.faqs || []
      }
      memoryBusinessesCache.push(item)
      return item
    }
  } catch (err) {
    console.warn('Firestore getBusinessBySlug fallback:', err)
  }

  return null
})

/**
 * Save new business with status: "pending" by default
 */
export async function saveBusinessToDatabase(businessData: Partial<BusinessItem>): Promise<BusinessItem> {
  const name = businessData.name || businessData.name || 'New Business'
  const slug = businessData.slug || normalizeSlug(name)

  const inputLocations = businessData.locations && businessData.locations.length > 0
    ? businessData.locations
    : [{ city: businessData.city || 'Karachi', address: businessData.address || 'Pakistan', isPrimary: true }]

  const primaryLoc = inputLocations.find(l => l.isPrimary) || inputLocations[0]
  const summaryCity = primaryLoc.city || businessData.city || 'Karachi'
  const summaryAddress = primaryLoc.address || businessData.address || 'Pakistan'
  const allCities = Array.from(new Set(inputLocations.map(l => l.city)))

  const newBiz: BusinessItem = {
    id: 'biz-' + Date.now(),
    slug,
    name,
    category: businessData.category || 'Services',
    categoryId: businessData.categoryId || 'services',
    city: summaryCity,
    cities: allCities,
    locations: inputLocations,
    province: businessData.province || 'Pakistan',
    rating: 0,
    reviewCount: 0,
    verified: false,
    isClaimed: false,
    isFeatured: false,
    status: 'pending', // MANDATORY PENDING WORKFLOW
    submittedAt: new Date().toISOString(),
    ownerName: businessData.ownerName || 'Business Representative',
    phone: businessData.phone || '+92 300 0000000',
    whatsapp: businessData.whatsapp || '923000000000',
    email: businessData.email || 'contact@business.pk',
    website: businessData.website || 'https://www.listpak.com',
    address: summaryAddress,
    coverImage: businessData.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    logo: businessData.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    description: businessData.description || 'Newly registered business on ListPak.',
    services: businessData.services || ['Professional Services'],
    operatingHours: businessData.operatingHours || { 'Monday - Saturday': '09:00 AM - 07:00 PM' },
    features: [],
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
      status: 'pending'
    })
  } catch (err) {
    console.warn('Firestore save fallback:', err)
  }

  return newBiz
}

/**
 * CONTACT MESSAGES MANAGEMENT
 */
export async function saveContactMessage(msg: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    id: 'msg-' + Date.now(),
    name: msg.name,
    email: msg.email,
    phone: msg.phone,
    subject: msg.subject,
    message: msg.message,
    createdAt: new Date().toISOString(),
    status: 'unread'
  }

  memoryContactMessagesCache = [newMsg, ...memoryContactMessagesCache]

  try {
    await addDoc(collection(db, 'contact_messages'), newMsg)
  } catch (err) {
    console.warn('Firestore saveContactMessage error:', err)
  }

  return newMsg
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const snap = await getDocs(collection(db, 'contact_messages'))
    if (!snap.empty) {
      const items: ContactMessage[] = []
      snap.forEach(d => {
        const data = d.data()
        items.push({
          id: d.id,
          name: data.name || 'Anonymous',
          email: data.email || '',
          phone: data.phone,
          subject: data.subject || 'General Inquiry',
          message: data.message || '',
          createdAt: data.createdAt || new Date().toISOString(),
          status: data.status || 'unread'
        })
      })
      memoryContactMessagesCache = items
    }
  } catch (err) {
    console.warn('Firestore getContactMessages error:', err)
  }
  return memoryContactMessagesCache
}

export async function markContactMessageRead(id: string): Promise<boolean> {
  const idx = memoryContactMessagesCache.findIndex(m => m.id === id)
  if (idx !== -1) {
    memoryContactMessagesCache[idx].status = 'read'
  }
  try {
    const ref = doc(db, 'contact_messages', id)
    await updateDoc(ref, { status: 'read' })
  } catch (err) {
    console.warn('Firestore markContactMessageRead error:', err)
  }
  return true
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  memoryContactMessagesCache = memoryContactMessagesCache.filter(m => m.id !== id)
  try {
    const ref = doc(db, 'contact_messages', id)
    await deleteDoc(ref)
  } catch (err) {
    console.warn('Firestore deleteContactMessage error:', err)
  }
  return true
}
