import { cache } from 'react'
import { MOCK_BUSINESSES, BusinessItem, ContactMessage, RejectedBusinessNotice } from './data'
import { db } from './firebase'
import { collection, getDocs, query, where, limit, addDoc, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'
import { sanitizeText, sanitizeUrl, sanitizeImageUrl, sanitizePhone } from './sanitizer'

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
 * Generate clean SEO friendly business slug.
 * - ONLY the business name.
 * - If exactly 1 unique city is selected: appends the city name (e.g. "shadab-group-real-estate-builders-sargodha")
 * - If 2 or more cities are selected: NO city in slug, only business name (e.g. "shadab-group-real-estate-builders")
 * - Prevents repetitive keywords and prevents duplicate city tokens.
 */
export function generateBusinessSlug(name: string, cities?: string[] | string): string {
  const cleanName = (name || '').trim()
  const cityList = Array.isArray(cities)
    ? Array.from(new Set(cities.map(c => (c || '').trim()).filter(Boolean)))
    : (cities ? [cities.trim()] : [])

  const validCities = cityList.filter(c => {
    const lc = c.toLowerCase()
    return lc !== 'pakistan' && lc !== 'all cities' && lc !== 'all pakistan' && lc !== 'nationwide'
  })

  let nameNorm = normalizeSlug(cleanName)

  // If exactly 1 unique city is selected: append that single city
  if (validCities.length === 1) {
    const cityNorm = normalizeSlug(validCities[0])
    if (cityNorm) {
      if (nameNorm.endsWith(`-in-${cityNorm}`)) {
        nameNorm = nameNorm.slice(0, -(4 + cityNorm.length)).replace(/-+$/, '')
      } else if (nameNorm.endsWith(`-${cityNorm}`)) {
        nameNorm = nameNorm.slice(0, -(1 + cityNorm.length)).replace(/-+$/, '')
      }
      return `${nameNorm || normalizeSlug(cleanName)}-${cityNorm}`
    }
  }

  // If 2 or more cities (or 0 valid cities): NO city in route slug, ONLY the name
  for (const c of validCities) {
    const cNorm = normalizeSlug(c)
    if (cNorm) {
      if (nameNorm.endsWith(`-in-${cNorm}`)) {
        nameNorm = nameNorm.slice(0, -(4 + cNorm.length)).replace(/-+$/, '')
      } else if (nameNorm.endsWith(`-${cNorm}`)) {
        nameNorm = nameNorm.slice(0, -(1 + cNorm.length)).replace(/-+$/, '')
      }
    }
  }

  return nameNorm || normalizeSlug(cleanName) || 'business'
}

/**
 * Deprecated review helper: returns empty array to strictly comply with Google AdSense
 * policy prohibiting fabricated customer reviews or artificial ratings.
 */
export const GENERATE_STARTER_REVIEWS = (_businessName: string): any[] => []

export function normalizeBusinessDoc(docId: string, data: any): BusinessItem {
  const bName = data.businessName || data.name || 'Verified Business'
  const rawStatus = (data.status || '').toString().toLowerCase().trim()
  const rawPaymentStatus = (data.paymentStatus || '').toString().toUpperCase().trim()
  
  // Extract payment screenshot from all possible fields
  const screenshot = data.paymentScreenshot || 
    data.paymentProof || 
    data.screenshotUrl || 
    data.proofDoc || 
    data.paymentDetails?.paymentScreenshot || 
    data.paymentDetails?.screenshot || 
    data.paymentDetails?.paymentProof || 
    ''

  const paymentMethod = data.paymentMethod || 
    data.paymentDetails?.paymentMethod || 
    'Easypaisa'

  const refNumber = data.paymentReference || 
    data.referenceNumber || 
    data.transactionRef || 
    data.transactionId || 
    data.paymentDetails?.referenceNumber || 
    data.paymentDetails?.transactionRef || 
    ''

  const paymentDetails = data.paymentDetails || (screenshot ? {
    paymentMethod,
    referenceNumber: refNumber,
    paymentScreenshot: screenshot,
    amount: Number(data.amount || data.paymentDetails?.amount || 50),
    paymentDate: data.paymentDate || data.submittedAt || data.createdAt || new Date().toISOString()
  } : undefined)

  // Determine normalized status:
  // User-submitted listings (with userId or submittedAt/createdAt) are pending unless explicitly approved
  let itemStatus: 'pending' | 'approved' | 'rejected' = 'approved'
  if (rawStatus === 'rejected') {
    itemStatus = 'rejected'
  } else if (rawStatus === 'approved' || (data.approvedAt && rawStatus !== 'pending')) {
    itemStatus = 'approved'
  } else if (rawStatus === 'pending' || rawStatus === 'pending_approval' || data.submittedAt || data.userId || (data.createdAt && !data.approvedAt) || screenshot || rawPaymentStatus === 'PENDING') {
    itemStatus = 'pending'
  }

  const paymentStatus = rawPaymentStatus || (screenshot || paymentDetails ? 'PENDING' : (itemStatus === 'approved' ? 'VERIFIED' : 'UNPAID'))

  const itemSlug = data.slug || normalizeSlug(bName)
  
  const docLocations = data.locations && data.locations.length > 0
    ? data.locations
    : [{ city: data.city || 'Pakistan', address: data.address || 'Commercial Center, Pakistan', isPrimary: true }]
  const docCities = data.cities && data.cities.length > 0
    ? data.cities
    : Array.from(new Set(docLocations.map((l: { city: string }) => l.city)))
  const primaryLoc = docLocations.find((l: { isPrimary?: boolean }) => l.isPrimary) || docLocations[0]

  return {
    id: docId || data.id || 'biz-' + Date.now(),
    userId: data.userId || '',
    slug: itemSlug,
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
    ownerName: data.ownerName || data.fullName || 'Business Representative',
    phone: data.phone || '+92 300 0000000',
    whatsapp: data.whatsapp || '923000000000',
    email: data.email || 'contact@business.pk',
    website: data.website || data.websiteUrl || 'https://listpak.com',
    address: primaryLoc.address || data.address || 'Commercial Center, Pakistan',
    locations: docLocations,
    coverImage: (() => {
      const rawCover = (data.coverImage || data.coverUrl || '').trim()
      if (rawCover.startsWith('data:image/')) {
        return `/api/biz-logo?id=${encodeURIComponent(docId)}&type=cover`
      }
      return rawCover || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    })(),
    logo: (() => {
      const isCrustCrave = itemSlug === 'crust-crave-karachi' || itemSlug.includes('crust-crave')
      const isShadab = itemSlug === 'shadab-group-real-estate-builders' || itemSlug.includes('shadab')
      const isIndrive = itemSlug.includes('indrive') || bName.toLowerCase().includes('indrive')
      const rawLogo = (data.logo || data.logoUrl || '').trim()

      if (isCrustCrave) {
        return '/crust-and-crave-logo.jpg'
      }
      if (isShadab) {
        return '/shadab-group-logo.png'
      }
      if (isIndrive) {
        return '/indrive-logo.png'
      }
      if (rawLogo) {
        if (rawLogo.startsWith('data:image/')) {
          return `/api/biz-logo?id=${encodeURIComponent(docId)}`
        }
        return rawLogo
      }
      return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'
    })(),
    description: data.description || data.aboutText || 'Verified business listing on ListPak.',
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    canonical: data.canonical,
    introduction: data.introduction || data.shortIntro,
    secondaryCategories: data.secondaryCategories,
    schemaType: data.schemaType,
    services: data.services || ['General Services', 'Customer Support'],
    detailedServices: data.detailedServices,
    sections: data.sections,
    operatingHours: data.operatingHours || { 'Monday - Sunday': '10:00 AM - 09:00 PM' },
    features: data.features || ['Verified Profile'],
    paymentDetails,
    paymentScreenshot: screenshot,
    paymentStatus,
    reviews: data.reviews && data.reviews.length > 0 ? data.reviews : [],
    faqs: data.faqs || []
  }
}

// Local storage keys for browser client persistence
const LOCAL_CUSTOM_BIZ_KEY = 'listpak_custom_businesses'
const LOCAL_USER_BIZ_IDS_KEY = 'listpak_user_business_ids'

function getStoredCustomBusinesses(): BusinessItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_BIZ_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (_) {
    return []
  }
}

function saveStoredCustomBusiness(biz: BusinessItem) {
  if (typeof window === 'undefined') return
  try {
    const current = getStoredCustomBusinesses()
    const updated = [biz, ...current.filter(b => b.id !== biz.id && b.slug.toLowerCase() !== biz.slug.toLowerCase())]
    localStorage.setItem(LOCAL_CUSTOM_BIZ_KEY, JSON.stringify(updated))

    // Also register to user's local business ID list if applicable
    if (biz.userId || biz.email) {
      const rawIds = localStorage.getItem(LOCAL_USER_BIZ_IDS_KEY)
      const ids: string[] = rawIds ? JSON.parse(rawIds) : []
      if (!ids.includes(biz.id)) {
        ids.push(biz.id)
        localStorage.setItem(LOCAL_USER_BIZ_IDS_KEY, JSON.stringify(ids))
      }
    }
  } catch (_) {}
}

function updateStoredCustomBusiness(idOrSlug: string, updates: Partial<BusinessItem>) {
  if (typeof window === 'undefined') return
  try {
    const current = getStoredCustomBusinesses()
    const norm = idOrSlug.toLowerCase().trim()
    const updated = current.map(b => {
      if (b.id === idOrSlug || b.slug.toLowerCase() === norm || b.name.toLowerCase() === norm) {
        return { ...b, ...updates }
      }
      return b
    })
    localStorage.setItem(LOCAL_CUSTOM_BIZ_KEY, JSON.stringify(updated))
  } catch (_) {}
}

const LOCAL_REJECTED_NOTICES_KEY = 'listpak_rejected_business_notices'

export function removeStoredCustomBusiness(idOrSlug: string, altSlug?: string) {
  if (typeof window === 'undefined') return
  try {
    const norm = (idOrSlug || '').toLowerCase().trim()
    const altNorm = (altSlug || '').toLowerCase().trim()
    const current = getStoredCustomBusinesses()
    const updated = current.filter(b => {
      const bId = (b.id || '').toLowerCase().trim()
      const bSlug = (b.slug || '').toLowerCase().trim()
      const matchPrimary = bId === norm || bSlug === norm
      const matchAlt = altNorm ? (bId === altNorm || bSlug === altNorm) : false
      return !matchPrimary && !matchAlt
    })
    localStorage.setItem(LOCAL_CUSTOM_BIZ_KEY, JSON.stringify(updated))

    const rawIds = localStorage.getItem(LOCAL_USER_BIZ_IDS_KEY)
    if (rawIds) {
      const ids: string[] = JSON.parse(rawIds)
      const filteredIds = ids.filter(i => {
        const iNorm = i.toLowerCase().trim()
        return iNorm !== norm && (!altNorm || iNorm !== altNorm)
      })
      localStorage.setItem(LOCAL_USER_BIZ_IDS_KEY, JSON.stringify(filteredIds))
    }
  } catch (_) {}
}

export function getStoredRejectedNotices(): RejectedBusinessNotice[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LOCAL_REJECTED_NOTICES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (_) {
    return []
  }
}

export function saveStoredRejectedNotice(notice: RejectedBusinessNotice) {
  if (typeof window === 'undefined') return
  try {
    const current = getStoredRejectedNotices()
    const updated = [notice, ...current.filter(n => n.id !== notice.id && n.businessId !== notice.businessId)]
    localStorage.setItem(LOCAL_REJECTED_NOTICES_KEY, JSON.stringify(updated))
  } catch (_) {}
}

export function dismissStoredRejectedNotice(noticeId: string) {
  if (typeof window === 'undefined') return
  try {
    const current = getStoredRejectedNotices()
    const updated = current.map(n => n.id === noticeId ? { ...n, dismissed: true } : n).filter(n => !n.dismissed)
    localStorage.setItem(LOCAL_REJECTED_NOTICES_KEY, JSON.stringify(updated))
  } catch (_) {}
}

/**
 * Fetch all businesses. If includePending is false (default), returns ONLY approved businesses.
 */
export async function getAllBusinesses(includePending: boolean = false): Promise<BusinessItem[]> {
  const localItems = getStoredCustomBusinesses()

  try {
    const querySnapshot = await getDocs(collection(db, 'businesses'))
    if (!querySnapshot.empty) {
      const firestoreItems: BusinessItem[] = []
      querySnapshot.forEach((docSnap) => {
        firestoreItems.push(normalizeBusinessDoc(docSnap.id, docSnap.data()))
      })

      // Merge avoiding duplicate slugs/ids: Firestore items have priority, then local custom items, then mock data
      const firestoreSlugs = new Set(firestoreItems.map(b => b.slug.toLowerCase()))
      const firestoreIds = new Set(firestoreItems.map(b => b.id.toLowerCase()))
      
      const nonDuplicateLocal = localItems.filter(
        b => !firestoreSlugs.has(b.slug.toLowerCase()) && !firestoreIds.has(b.id.toLowerCase())
      )

      const usedSlugs = new Set([...firestoreSlugs, ...nonDuplicateLocal.map(b => b.slug.toLowerCase())])
      const usedIds = new Set([...firestoreIds, ...nonDuplicateLocal.map(b => b.id.toLowerCase())])

      const nonDuplicateMocks = memoryBusinessesCache.filter(
        b => !usedSlugs.has(b.slug.toLowerCase()) && !usedIds.has(b.id.toLowerCase())
      )

      memoryBusinessesCache = [...firestoreItems, ...nonDuplicateLocal, ...nonDuplicateMocks]
    } else if (localItems.length > 0) {
      const localSlugs = new Set(localItems.map(b => b.slug.toLowerCase()))
      const localIds = new Set(localItems.map(b => b.id.toLowerCase()))
      const nonDuplicateMocks = memoryBusinessesCache.filter(
        b => !localSlugs.has(b.slug.toLowerCase()) && !localIds.has(b.id.toLowerCase())
      )
      memoryBusinessesCache = [...localItems, ...nonDuplicateMocks]
    }
  } catch (err) {
    console.warn('Firestore getAllBusinesses fallback to memory cache & local items:', err)
    if (localItems.length > 0) {
      const localSlugs = new Set(localItems.map(b => b.slug.toLowerCase()))
      const localIds = new Set(localItems.map(b => b.id.toLowerCase()))
      const nonDuplicateMocks = memoryBusinessesCache.filter(
        b => !localSlugs.has(b.slug.toLowerCase()) && !localIds.has(b.id.toLowerCase())
      )
      memoryBusinessesCache = [...localItems, ...nonDuplicateMocks]
    }
  }

  if (includePending) {
    return memoryBusinessesCache
  }
  
  // Public filter: only return approved items
  return memoryBusinessesCache.filter(b => b.status === 'approved')
}

export async function getPendingBusinesses(): Promise<BusinessItem[]> {
  const all = await getAllBusinesses(true)
  return all.filter(b => b.status === 'pending' || b.paymentStatus === 'PENDING')
}

async function updateBusinessInFirestore(idOrSlug: string, fieldsToUpdate: Record<string, any>): Promise<void> {
  const norm = (idOrSlug || '').trim()
  if (!norm) return

  // Strip all undefined fields to prevent Firestore serialization errors
  const cleanFields = JSON.parse(JSON.stringify(fieldsToUpdate))

  try {
    const docRef = doc(db, 'businesses', norm)
    await updateDoc(docRef, cleanFields)
    return
  } catch (err) {
    try {
      const q = query(collection(db, 'businesses'), where('slug', '==', norm.toLowerCase()), limit(1))
      const snap = await getDocs(q)
      if (!snap.empty) {
        await updateDoc(snap.docs[0].ref, cleanFields)
        return
      }
      const qId = query(collection(db, 'businesses'), where('id', '==', norm), limit(1))
      const snapId = await getDocs(qId)
      if (!snapId.empty) {
        await updateDoc(snapId.docs[0].ref, cleanFields)
        return
      }
    } catch (innerErr) {
      console.warn('Firestore updateBusinessInFirestore error:', innerErr)
    }
  }
}

export async function approveBusiness(id: string, adminUid: string): Promise<boolean> {
  const norm = id.toLowerCase().trim()
  const idx = memoryBusinessesCache.findIndex(b => b.id === id || b.slug.toLowerCase() === norm)
  if (idx !== -1) {
    memoryBusinessesCache[idx].status = 'approved'
    memoryBusinessesCache[idx].paymentStatus = 'VERIFIED'
    memoryBusinessesCache[idx].approvedAt = new Date().toISOString()
    memoryBusinessesCache[idx].approvedBy = adminUid
  }

  updateStoredCustomBusiness(id, {
    status: 'approved',
    paymentStatus: 'VERIFIED',
    approvedAt: new Date().toISOString(),
    approvedBy: adminUid
  })

  await updateBusinessInFirestore(id, {
    status: 'approved',
    paymentStatus: 'VERIFIED',
    approvedAt: new Date().toISOString(),
    approvedBy: adminUid
  })

  return true
}

export async function rejectBusiness(
  id: string, 
  reason?: string,
  adminUid?: string
): Promise<{ success: boolean; notice?: RejectedBusinessNotice }> {
  const norm = (id || '').trim().toLowerCase()
  const cleanReason = (reason || '').trim() || 'Does not satisfy business verification requirements.'
  
  // 1. Locate the business first before deleting so we retain its info for the user's rejection notice
  let targetBiz = memoryBusinessesCache.find(b => b.id.toLowerCase() === norm || b.slug.toLowerCase() === norm)
  
  if (!targetBiz && typeof window !== 'undefined') {
    const localList = getStoredCustomBusinesses()
    targetBiz = localList.find(b => b.id.toLowerCase() === norm || b.slug.toLowerCase() === norm)
  }

  // If not found in cache or local, check Firestore
  if (!targetBiz) {
    try {
      const snap = await getDocs(query(collection(db, 'businesses'), where('id', '==', id), limit(1)))
      if (!snap.empty) {
        targetBiz = normalizeBusinessDoc(snap.docs[0].id, snap.docs[0].data())
      } else {
        const qSlug = query(collection(db, 'businesses'), where('slug', '==', norm), limit(1))
        const snapSlug = await getDocs(qSlug)
        if (!snapSlug.empty) {
          targetBiz = normalizeBusinessDoc(snapSlug.docs[0].id, snapSlug.docs[0].data())
        }
      }
    } catch (e) {
      console.warn('Error locating business before rejection:', e)
    }
  }

  // 2. Formulate the rejection notice for the user
  const noticeId = `rej-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const notice: RejectedBusinessNotice = {
    id: noticeId,
    businessId: targetBiz?.id || id,
    businessName: targetBiz?.name || 'Business Submission',
    category: targetBiz?.category || 'Services',
    city: targetBiz?.city || 'Pakistan',
    ownerName: targetBiz?.ownerName || '',
    ownerEmail: (targetBiz?.email || '').toLowerCase().trim(),
    userId: (targetBiz?.userId || '').trim(),
    phone: targetBiz?.phone || '',
    rejectionReason: cleanReason,
    rejectedAt: new Date().toISOString(),
    rejectedBy: adminUid || 'admin-master',
    dismissed: false
  }

  // 3. Store rejection notice in Firestore so it's delivered to the user's dashboard in the cloud
  try {
    const cleanNotice = JSON.parse(JSON.stringify(notice))
    await setDoc(doc(db, 'rejected_business_notices', noticeId), cleanNotice)
  } catch (err) {
    console.warn('Failed to save rejection notice to Firestore, trying addDoc:', err)
    try {
      await addDoc(collection(db, 'rejected_business_notices'), JSON.parse(JSON.stringify(notice)))
    } catch (innerErr) {
      console.warn('Could not addDoc rejection notice:', innerErr)
    }
  }

  // 4. Save to localStorage for instant local/offline availability
  saveStoredRejectedNotice(notice)

  // 5. REMOVE BUSINESS DATA FROM DATABASE to free up space for the user
  // Delete from Firestore
  try {
    await deleteDoc(doc(db, 'businesses', id))
  } catch (_) {}

  if (targetBiz?.id && targetBiz.id !== id) {
    try {
      await deleteDoc(doc(db, 'businesses', targetBiz.id))
    } catch (_) {}
  }

  try {
    const qBySlug = query(collection(db, 'businesses'), where('slug', '==', norm), limit(5))
    const snapSlug = await getDocs(qBySlug)
    for (const d of snapSlug.docs) {
      await deleteDoc(d.ref)
    }
  } catch (_) {}

  try {
    const qById = query(collection(db, 'businesses'), where('id', '==', id), limit(5))
    const snapId = await getDocs(qById)
    for (const d of snapId.docs) {
      await deleteDoc(d.ref)
    }
  } catch (_) {}

  // Delete from memory cache
  memoryBusinessesCache = memoryBusinessesCache.filter(
    b => b.id.toLowerCase() !== norm && 
         b.id !== (targetBiz?.id || '') && 
         b.slug.toLowerCase() !== norm && 
         b.slug.toLowerCase() !== (targetBiz?.slug || '').toLowerCase()
  )

  // Remove from localStorage
  removeStoredCustomBusiness(id, targetBiz?.slug)

  return { success: true, notice }
}

export async function deleteBusiness(id: string): Promise<boolean> {
  const norm = id.toLowerCase().trim()
  try {
    await deleteDoc(doc(db, 'businesses', id))
  } catch (_) {}

  try {
    const qSlug = query(collection(db, 'businesses'), where('slug', '==', norm), limit(5))
    const snap = await getDocs(qSlug)
    for (const d of snap.docs) {
      await deleteDoc(d.ref)
    }
  } catch (_) {}

  memoryBusinessesCache = memoryBusinessesCache.filter(b => b.id.toLowerCase() !== norm && b.slug.toLowerCase() !== norm)
  removeStoredCustomBusiness(id)
  return true
}

export async function getRejectedBusinessNotices(emailOrUid: string): Promise<RejectedBusinessNotice[]> {
  const norm = (emailOrUid || '').trim().toLowerCase()
  if (!norm) return []
  const normDigits = norm.replace(/[^0-9]/g, '')

  const localNotices = getStoredRejectedNotices()
  const list: RejectedBusinessNotice[] = [...localNotices]

  try {
    const snap = await getDocs(collection(db, 'rejected_business_notices'))
    snap.forEach(d => {
      const data = d.data() as RejectedBusinessNotice
      if (!data.dismissed) {
        list.push({ ...data, id: d.id || data.id })
      }
    })
  } catch (err) {
    console.warn('Error fetching Firestore rejected_business_notices:', err)
  }

  // Deduplicate by notice id or businessId
  const seen = new Set<string>()
  const uniqueNotices: RejectedBusinessNotice[] = []
  for (const n of list) {
    const key = n.id || `${n.businessId}-${n.rejectedAt}`
    if (!seen.has(key) && !n.dismissed) {
      seen.add(key)
      uniqueNotices.push(n)
    }
  }

  // Filter for matching user
  return uniqueNotices
    .filter(n => {
      const nEmail = (n.ownerEmail || '').toLowerCase().trim()
      const nUid = (n.userId || '').toLowerCase().trim()
      const nPhone = (n.phone || '').replace(/[^0-9]/g, '')
      return (
        nEmail === norm ||
        nUid === norm ||
        (normDigits.length >= 7 && nPhone.includes(normDigits))
      )
    })
    .sort((a, b) => new Date(b.rejectedAt).getTime() - new Date(a.rejectedAt).getTime())
}

export async function dismissRejectedBusinessNotice(noticeId: string): Promise<boolean> {
  if (!noticeId) return false
  dismissStoredRejectedNotice(noticeId)

  try {
    const ref = doc(db, 'rejected_business_notices', noticeId)
    await updateDoc(ref, { dismissed: true })
  } catch (_) {
    try {
      await deleteDoc(doc(db, 'rejected_business_notices', noticeId))
    } catch (err) {
      console.warn('Error dismissing notice in Firestore:', err)
    }
  }

  return true
}

export async function getFeaturedBusinesses(limitCount: number = 9): Promise<BusinessItem[]> {
  const approvedOnly = await getAllBusinesses(false)
  const featured = approvedOnly.filter(b => b.isFeatured || b.verified)
  return featured.slice(0, limitCount)
}

export const getBusinessBySlug = cache(async function getBusinessBySlug(slug: string): Promise<BusinessItem | null> {
  const raw = decodeURIComponent(slug || '').trim()
  const normalized = raw.toLowerCase()
  if (!normalized) return null

  // 1. Live Firestore check for real-time approved status
  try {
    const q = query(collection(db, 'businesses'), where('slug', '==', normalized), limit(1))
    const snap = await getDocs(q)
    if (!snap.empty) {
      const docSnap = snap.docs[0]
      const item = normalizeBusinessDoc(docSnap.id, docSnap.data())
      memoryBusinessesCache = [
        item,
        ...memoryBusinessesCache.filter(b => b.slug.toLowerCase() !== normalized && b.id !== item.id)
      ]
      if (item.status === 'approved') {
        return item
      }
      return null
    }

    // Direct doc lookup by ID
    try {
      const direct = await getDocs(query(collection(db, 'businesses'), where('id', '==', raw), limit(1)))
      if (!direct.empty) {
        const item = normalizeBusinessDoc(direct.docs[0].id, direct.docs[0].data())
        if (item.status === 'approved') {
          return item
        }
      }
    } catch (_) {}
  } catch (err) {
    console.warn('Firestore getBusinessBySlug fallback:', err)
  }

  // 2. Local storage check
  const localItems = getStoredCustomBusinesses()
  const localFound = localItems.find(b => 
    b.slug.toLowerCase() === normalized || 
    b.id.toLowerCase() === normalized ||
    normalizeSlug(b.name) === normalized ||
    (b.city && `${normalizeSlug(b.name)}-${normalizeSlug(b.city)}` === normalized)
  )
  if (localFound && (localFound.status || 'approved') === 'approved') {
    return localFound
  }

  // 3. Memory cache check (with city suffix fallback matching)
  const cached = memoryBusinessesCache.find(b => 
    b.slug.toLowerCase() === normalized || 
    b.id.toLowerCase() === normalized ||
    normalizeSlug(b.name) === normalized ||
    (b.city && `${normalizeSlug(b.name)}-${normalizeSlug(b.city)}` === normalized)
  )
  if (cached && (cached.status || 'approved') === 'approved') {
    return cached
  }

  // 4. Mock businesses check
  const mockFound = MOCK_BUSINESSES.find(b => 
    b.slug.toLowerCase() === normalized || 
    b.id.toLowerCase() === normalized ||
    normalizeSlug(b.name) === normalized ||
    (b.city && `${normalizeSlug(b.name)}-${normalizeSlug(b.city)}` === normalized)
  )
  if (mockFound && (mockFound.status || 'approved') === 'approved') {
    return mockFound
  }

  return null
})

/**
 * Save new business with status: "pending" by default
 */
export async function saveBusinessToDatabase(businessData: Partial<BusinessItem>): Promise<BusinessItem> {
  const cleanName = sanitizeText(businessData.name || 'New Business', 120)
  const inputLocations = businessData.locations && businessData.locations.length > 0
    ? businessData.locations.map(l => ({
        ...l,
        city: sanitizeText(l.city, 60),
        address: sanitizeText(l.address, 250),
      }))
    : [{ city: sanitizeText(businessData.city || 'Karachi', 60), address: sanitizeText(businessData.address || 'Pakistan', 250), isPrimary: true }]

  const primaryLoc = inputLocations.find(l => l.isPrimary) || inputLocations[0]
  const summaryCity = primaryLoc.city || sanitizeText(businessData.city || 'Karachi', 60)
  const summaryAddress = primaryLoc.address || sanitizeText(businessData.address || 'Pakistan', 250)
  const allCities = Array.from(new Set(inputLocations.map(l => l.city).filter(Boolean)))

  const slug = businessData.slug || generateBusinessSlug(cleanName, allCities)
  const bizId = businessData.id || ('biz-' + Date.now())

  const newBiz: BusinessItem = {
    id: bizId,
    userId: businessData.userId || '',
    slug,
    name: cleanName,
    category: sanitizeText(businessData.category || 'Services', 80),
    categoryId: sanitizeText(businessData.categoryId || 'services', 80),
    city: summaryCity,
    cities: allCities,
    locations: inputLocations,
    province: sanitizeText(businessData.province || 'Pakistan', 80),
    rating: 0,
    reviewCount: 0,
    verified: false,
    isClaimed: false,
    isFeatured: false,
    status: 'pending', // MANDATORY PENDING WORKFLOW
    paymentStatus: businessData.paymentStatus || (businessData.paymentScreenshot ? 'PENDING' : 'UNPAID'),
    paymentScreenshot: sanitizeImageUrl(businessData.paymentScreenshot || ''),
    paymentDetails: businessData.paymentDetails,
    submittedAt: new Date().toISOString(),
    ownerName: sanitizeText(businessData.ownerName || 'Business Representative', 80),
    phone: sanitizePhone(businessData.phone || '+92 300 0000000'),
    whatsapp: sanitizePhone(businessData.whatsapp || '923000000000'),
    email: sanitizeText(businessData.email || 'contact@business.pk', 120),
    website: sanitizeUrl(businessData.website || 'https://listpak.com'),
    address: summaryAddress,
    coverImage: sanitizeImageUrl(businessData.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'),
    logo: sanitizeImageUrl(businessData.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'),
    description: sanitizeText(businessData.description || 'Newly registered business on ListPak.', 5000),
    services: Array.isArray(businessData.services) ? businessData.services.map(s => sanitizeText(s, 60)) : ['Professional Services'],
    operatingHours: businessData.operatingHours || { 'Monday - Saturday': '09:00 AM - 07:00 PM' },
    features: [],
    reviews: [],
    faqs: []
  }

  // Update memory cache
  memoryBusinessesCache = [newBiz, ...memoryBusinessesCache.filter(b => b.slug !== slug && b.id !== bizId)]

  // Persist immediately to localStorage so Ctrl+R refresh always preserves newly added businesses
  saveStoredCustomBusiness(newBiz)

  // Clean all undefined fields before sending to Firestore
  const cleanPayload = JSON.parse(JSON.stringify({
    ...newBiz,
    businessName: newBiz.name,
    createdAt: new Date().toISOString(),
    status: 'pending'
  }))

  // Persist to Firestore with explicit ID using setDoc
  try {
    const docRef = doc(db, 'businesses', bizId)
    await setDoc(docRef, cleanPayload)
  } catch (err) {
    console.warn('Firestore setDoc save fallback, trying addDoc:', err)
    try {
      const addedDoc = await addDoc(collection(db, 'businesses'), cleanPayload)
      newBiz.id = addedDoc.id
      saveStoredCustomBusiness(newBiz)
    } catch (innerErr) {
      console.warn('Firestore addDoc fallback error:', innerErr)
    }
  }

  return newBiz
}

export async function updateBusinessPaymentProof(
  idOrSlug: string,
  payment: {
    paymentMethod: string
    referenceNumber?: string
    paymentScreenshot: string
    amount?: number
  }
): Promise<boolean> {
  const norm = idOrSlug.toLowerCase().trim()
  const nowIso = new Date().toISOString()
  const paymentDetails = {
    paymentMethod: payment.paymentMethod,
    referenceNumber: payment.referenceNumber || '',
    paymentScreenshot: payment.paymentScreenshot,
    amount: payment.amount || 50,
    paymentDate: nowIso
  }

  const idx = memoryBusinessesCache.findIndex(b => b.id === idOrSlug || b.slug.toLowerCase() === norm || b.name.toLowerCase() === norm)
  if (idx !== -1) {
    memoryBusinessesCache[idx].paymentScreenshot = payment.paymentScreenshot
    memoryBusinessesCache[idx].paymentDetails = paymentDetails
    memoryBusinessesCache[idx].paymentStatus = 'PENDING'
    memoryBusinessesCache[idx].status = 'pending'
    memoryBusinessesCache[idx].submittedAt = nowIso
    ;(memoryBusinessesCache[idx] as any).lastRequestedAt = nowIso
  }

  updateStoredCustomBusiness(idOrSlug, {
    paymentScreenshot: payment.paymentScreenshot,
    paymentDetails,
    paymentStatus: 'PENDING',
    status: 'pending',
    submittedAt: nowIso,
    lastRequestedAt: nowIso
  } as any)

  await updateBusinessInFirestore(idOrSlug, {
    paymentScreenshot: payment.paymentScreenshot,
    paymentDetails,
    paymentStatus: 'PENDING',
    status: 'pending',
    submittedAt: nowIso,
    lastRequestedAt: nowIso
  })

  return true
}

export async function getUserBusinesses(emailOrUid: string): Promise<BusinessItem[]> {
  const norm = (emailOrUid || '').trim().toLowerCase()
  if (!norm) return []
  const normCleanDigits = norm.replace(/[^0-9]/g, '')

  try {
    const all = await getAllBusinesses(true)
    
    // Also get registered user business IDs
    let userRegisteredIds: string[] = []
    if (typeof window !== 'undefined') {
      try {
        const rawIds = localStorage.getItem(LOCAL_USER_BIZ_IDS_KEY)
        if (rawIds) userRegisteredIds = JSON.parse(rawIds)
      } catch (_) {}
    }

    return all.filter(b => {
      const bEmail = (b.email || '').toLowerCase().trim()
      const bUid = (b.userId || '').toLowerCase().trim()
      const bOwner = (b.ownerName || '').toLowerCase().trim()
      const bPhone = (b.phone || '').replace(/[^0-9]/g, '')
      const bWhatsApp = (b.whatsapp || '').replace(/[^0-9]/g, '')

      return (
        bEmail === norm ||
        bUid === norm ||
        bOwner === norm ||
        userRegisteredIds.includes(b.id) ||
        (normCleanDigits.length >= 7 && (bPhone.includes(normCleanDigits) || bWhatsApp.includes(normCleanDigits)))
      )
    })
  } catch (err) {
    console.warn('getUserBusinesses error:', err)
    return []
  }
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
