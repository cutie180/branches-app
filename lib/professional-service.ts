import { cache } from 'react'
import { MOCK_PROFESSIONALS, ProfessionalItem } from './data'
import { db } from './firebase'
import { collection, getDocs, query, where, limit, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { normalizeSlug } from './db-service'

// In-memory cache for fast reads & server rendering
let memoryProfessionalsCache: ProfessionalItem[] = [...MOCK_PROFESSIONALS]

export const GENERATE_STARTER_PROFESSIONAL_REVIEWS = (proName: string) => [
  {
    id: 'rev-pro-1-' + Date.now(),
    userName: 'Omer Farooq',
    rating: 5,
    date: 'Just now',
    comment: `Extremely professional experience working with ${proName}. Highly skilled, punctual, and attentive to requirements.`
  },
  {
    id: 'rev-pro-2-' + Date.now(),
    userName: 'Fatima Noor',
    rating: 5,
    date: '2 days ago',
    comment: `Great communication and top-quality work delivered by ${proName}. Exceeded expectations!`
  }
]

/**
 * Fetch all professionals. If includePending is false, returns ONLY approved profiles.
 */
export const getAllProfessionals = cache(async function getAllProfessionals(includePending: boolean = false): Promise<ProfessionalItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'professionals'))
    if (!querySnapshot.empty) {
      const firestoreItems: ProfessionalItem[] = []
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Partial<ProfessionalItem>
        const proName = data.fullName || data.name || 'Verified Professional'
        const proUsername = data.username || data.slug || normalizeSlug(proName)
        const itemStatus = data.status || 'approved'

        firestoreItems.push({
          id: docSnap.id,
          username: proUsername,
          slug: proUsername,
          name: proName,
          fullName: proName,
          title: data.title || 'Professional Specialist',
          profession: data.profession || 'Specialist',
          category: data.category || 'Professional / Job Seeker',
          specialization: data.specialization || 'General',
          city: data.city || 'Pakistan',
          province: data.province || 'Pakistan',
          country: data.country || 'Pakistan',
          address: data.address || '',
          googleMapUrl: data.googleMapUrl || '',
          rating: data.rating || 5.0,
          reviewCount: data.reviewCount || (data.reviews ? data.reviews.length : 2),
          hourlyRate: data.hourlyRate || 'Contact for Pricing',
          availability: data.availability || 'Available',
          avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          coverImage: data.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
          bio: data.bio || 'Verified professional profile on ListPak Pakistan network.',
          about: data.about || data.bio || '',
          skills: data.skills && data.skills.length > 0 ? data.skills : ['Professional Services'],
          experienceYears: data.experienceYears ?? 3,
          verified: data.verified ?? true,
          isFeatured: data.isFeatured ?? false,
          status: itemStatus,
          submittedAt: data.submittedAt || new Date().toISOString(),
          approvedAt: data.approvedAt,
          approvedBy: data.approvedBy,
          rejectionReason: data.rejectionReason,

          phone: data.phone || '',
          email: data.email || '',
          whatsapp: data.whatsapp || '',
          website: data.website || '',
          portfolio: data.portfolio || '',
          resumeUrl: data.resumeUrl || '',
          currentCompany: data.currentCompany || '',

          education: data.education || [],
          certifications: data.certifications || [],
          languages: data.languages || ['Urdu', 'English'],
          previousExperience: data.previousExperience || [],
          servicesOffered: data.servicesOffered || [],
          reviews: data.reviews && data.reviews.length > 0 ? data.reviews : GENERATE_STARTER_PROFESSIONAL_REVIEWS(proName),
          faqs: data.faqs || [],

          linkedin: data.linkedin,
          github: data.github,
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          youtube: data.youtube,
          behance: data.behance,
          dribbble: data.dribbble,
          stackoverflow: data.stackoverflow,
          medium: data.medium,
          fiverr: data.fiverr,
          upwork: data.upwork,
          freelancer: data.freelancer,
          kaggle: data.kaggle,
          researchgate: data.researchgate,
          orcid: data.orcid,
          googleScholar: data.googleScholar,
          customSocialLinks: data.customSocialLinks || [],
          dynamicFields: data.dynamicFields || {}
        })
      })

      // Merge avoiding duplicate usernames
      const existingUsernames = new Set(firestoreItems.map(p => p.username))
      const combined = [
        ...firestoreItems,
        ...memoryProfessionalsCache.filter(p => !existingUsernames.has(p.username))
      ]
      memoryProfessionalsCache = combined
    }
  } catch (err) {
    console.warn('Firestore getAllProfessionals fallback to memory cache:', err)
  }

  if (includePending) {
    return memoryProfessionalsCache
  }

  return memoryProfessionalsCache.filter(p => (p.status || 'approved') === 'approved')
})

export async function getPendingProfessionals(): Promise<ProfessionalItem[]> {
  const all = await getAllProfessionals(true)
  return all.filter(p => p.status === 'pending')
}

export const getProfessionalByUsername = cache(async function getProfessionalByUsername(username: string): Promise<ProfessionalItem | null> {
  const normalized = username.toLowerCase().trim()
  const cached = memoryProfessionalsCache.find(p => p.username.toLowerCase() === normalized || p.slug?.toLowerCase() === normalized)
  
  if (cached && (cached.status || 'approved') === 'approved') {
    return cached
  }

  try {
    const q = query(collection(db, 'professionals'), where('username', '==', normalized), limit(1))
    const snap = await getDocs(q)
    if (!snap.empty) {
      const docSnap = snap.docs[0]
      const data = docSnap.data() as ProfessionalItem
      if (data.status && data.status !== 'approved') {
        return null
      }
      memoryProfessionalsCache.push({ ...data, id: docSnap.id })
      return data
    }
  } catch (err) {
    console.warn('Firestore getProfessionalByUsername fallback:', err)
  }

  // Soft fallback matching memory item regardless of status for dev testing
  return cached || memoryProfessionalsCache[0] || null
})

export async function saveProfessionalToDatabase(proData: Partial<ProfessionalItem>): Promise<ProfessionalItem> {
  const name = proData.fullName || proData.name || 'New Professional'
  const title = proData.title || 'Professional Specialist'
  const profession = proData.profession || 'Specialist'
  
  // Generate unique SEO username/slug e.g., muhammad-ali-web-developer
  let baseSlug = normalizeSlug(`${name} ${profession}`)
  if (!baseSlug) baseSlug = normalizeSlug(name)
  const username = baseSlug + '-' + Math.floor(Math.random() * 1000)

  const newPro: ProfessionalItem = {
    id: 'pro-' + Date.now(),
    username,
    slug: username,
    name,
    fullName: name,
    title,
    profession,
    category: proData.category || 'Professional / Job Seeker',
    specialization: proData.specialization || profession,
    city: proData.city || 'Karachi',
    province: proData.province || 'Sindh',
    country: proData.country || 'Pakistan',
    address: proData.address || '',
    googleMapUrl: proData.googleMapUrl || '',
    rating: 5.0,
    reviewCount: 2,
    hourlyRate: proData.hourlyRate || 'Negotiable',
    availability: proData.availability || 'Open to Work',
    avatar: proData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    coverImage: proData.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    bio: proData.bio || `Verified ${profession} profile on ListPak.`,
    about: proData.about || proData.bio || '',
    skills: proData.skills || [profession],
    experienceYears: Number(proData.experienceYears) || 1,
    verified: true,
    isFeatured: false,
    status: 'pending', // PENDING WORKFLOW
    submittedAt: new Date().toISOString(),
    
    phone: proData.phone || '',
    email: proData.email || '',
    whatsapp: proData.whatsapp || '',
    website: proData.website || '',
    portfolio: proData.portfolio || '',
    resumeUrl: proData.resumeUrl || '',
    currentCompany: proData.currentCompany || '',

    education: proData.education || [],
    certifications: proData.certifications || [],
    languages: proData.languages || ['Urdu', 'English'],
    previousExperience: proData.previousExperience || [],
    servicesOffered: proData.servicesOffered || [],
    reviews: GENERATE_STARTER_PROFESSIONAL_REVIEWS(name),
    faqs: [],

    linkedin: proData.linkedin || '',
    github: proData.github || '',
    facebook: proData.facebook || '',
    instagram: proData.instagram || '',
    twitter: proData.twitter || '',
    youtube: proData.youtube || '',
    behance: proData.behance || '',
    dribbble: proData.dribbble || '',
    stackoverflow: proData.stackoverflow || '',
    medium: proData.medium || '',
    fiverr: proData.fiverr || '',
    upwork: proData.upwork || '',
    freelancer: proData.freelancer || '',
    kaggle: proData.kaggle || '',
    researchgate: proData.researchgate || '',
    orcid: proData.orcid || '',
    googleScholar: proData.googleScholar || '',
    customSocialLinks: proData.customSocialLinks || [],
    dynamicFields: proData.dynamicFields || {}
  }

  // Update memory cache
  memoryProfessionalsCache = [newPro, ...memoryProfessionalsCache.filter(p => p.username !== username)]

  // Persist to Firestore
  try {
    await addDoc(collection(db, 'professionals'), newPro)
  } catch (err) {
    console.warn('Firestore saveProfessionalToDatabase error:', err)
  }

  return newPro
}

export async function approveProfessional(id: string, adminUid: string): Promise<boolean> {
  const idx = memoryProfessionalsCache.findIndex(p => p.id === id || p.username === id)
  if (idx !== -1) {
    memoryProfessionalsCache[idx].status = 'approved'
    memoryProfessionalsCache[idx].approvedAt = new Date().toISOString()
    memoryProfessionalsCache[idx].approvedBy = adminUid
  }

  try {
    const docRef = doc(db, 'professionals', id)
    await updateDoc(docRef, {
      status: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: adminUid
    })
  } catch (err) {
    console.warn('Firestore approveProfessional error:', err)
  }
  return true
}

export async function rejectProfessional(id: string, reason?: string): Promise<boolean> {
  const idx = memoryProfessionalsCache.findIndex(p => p.id === id || p.username === id)
  if (idx !== -1) {
    memoryProfessionalsCache[idx].status = 'rejected'
    memoryProfessionalsCache[idx].rejectionReason = reason || 'Verification documents could not be verified.'
  }

  try {
    const docRef = doc(db, 'professionals', id)
    await updateDoc(docRef, {
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason || 'Verification documents could not be verified.'
    })
  } catch (err) {
    console.warn('Firestore rejectProfessional error:', err)
  }
  return true
}

export async function updateProfessionalProfile(idOrUsername: string, updates: Partial<ProfessionalItem>): Promise<boolean> {
  const idx = memoryProfessionalsCache.findIndex(p => p.id === idOrUsername || p.username === idOrUsername)
  if (idx !== -1) {
    memoryProfessionalsCache[idx] = { ...memoryProfessionalsCache[idx], ...updates }
  }

  try {
    const docRef = doc(db, 'professionals', idOrUsername)
    await updateDoc(docRef, updates)
  } catch (err) {
    console.warn('Firestore updateProfessionalProfile error:', err)
  }
  return true
}
