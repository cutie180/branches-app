import { cache } from 'react'
import { MOCK_PROFESSIONALS, MOCK_VERIFICATION_REQUESTS, ProfessionalItem, ProfessionalVerificationRequest, ProfessionalVerificationPaymentDetails, ProfessionalInquiry } from './data'
import { db } from './firebase'
import { collection, getDocs, query, where, limit, addDoc, doc, updateDoc, deleteDoc, setDoc, orderBy } from 'firebase/firestore'
import { normalizeSlug } from './db-service'

/**
 * Generate clean SEO friendly slug incorporating professional's name and professional title
 * e.g. Name: "Muhammad Ali", Title: "Frontend Developer" -> "muhammad-ali-frontend-developer"
 */
export function generateProfessionalSlug(name: string, title?: string, profession?: string): string {
  const cleanName = (name || '').trim()
  const cleanTitle = (title || '').trim()
  const cleanProfession = (profession || '').trim()

  const rolePart = cleanTitle || cleanProfession
  const combined = rolePart ? `${cleanName} ${rolePart}` : cleanName
  const slug = normalizeSlug(combined)
  return slug || normalizeSlug(cleanName) || 'professional'
}

// In-memory cache for fast reads & server rendering
let memoryProfessionalsCache: ProfessionalItem[] = [...MOCK_PROFESSIONALS]
let memoryVerificationRequestsCache: ProfessionalVerificationRequest[] = [...MOCK_VERIFICATION_REQUESTS]
let memoryInquiriesCache: ProfessionalInquiry[] = []

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
        const proUsername = data.username || data.slug || generateProfessionalSlug(proName, data.title, data.profession)
        const itemStatus = data.status || 'approved'
        const itemVerified = data.verified ?? (data.verificationStatus === 'VERIFIED' ? true : false)
        const itemVerificationStatus = data.verificationStatus || (itemVerified ? 'VERIFIED' : 'UNVERIFIED')
        const itemProfileStatus = data.profileStatus || (itemStatus === 'approved' ? 'APPROVED' : itemStatus === 'rejected' ? 'REJECTED' : 'PENDING')

        firestoreItems.push({
          id: docSnap.id,
          userId: data.userId,
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
          gender: data.gender || '',
          avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          coverImage: data.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
          bio: data.bio || 'Verified professional profile on ListPak Pakistan network.',
          about: data.about || data.bio || '',
          skills: data.skills && data.skills.length > 0 ? data.skills : ['Professional Services'],
          experienceYears: data.experienceYears ?? 3,
          verified: itemVerified,
          isFeatured: data.isFeatured ?? false,
          status: itemStatus,
          profileStatus: itemProfileStatus,
          verificationStatus: itemVerificationStatus,
          verificationRequestStatus: data.verificationRequestStatus || 'NOT_REQUESTED',
          verificationPaymentDetails: data.verificationPaymentDetails,
          submittedAt: data.submittedAt || new Date().toISOString(),
          approvedAt: data.approvedAt,
          approvedBy: data.approvedBy,
          verifiedAt: data.verifiedAt,
          verifiedBy: data.verifiedBy,
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

      // Merge avoiding duplicate usernames and sort newest registrations first
      const existingUsernames = new Set(firestoreItems.map(p => p.username))
      const combined = [
        ...firestoreItems,
        ...memoryProfessionalsCache.filter(p => !existingUsernames.has(p.username))
      ].sort((a, b) => {
        // 1. Pending reviews top priority
        const aPending = (a.status === 'pending' || a.profileStatus === 'PENDING') ? 1 : 0
        const bPending = (b.status === 'pending' || b.profileStatus === 'PENDING') ? 1 : 0
        if (bPending !== aPending) return bPending - aPending

        // 2. Newest registered profiles top
        const bTime = new Date(b.submittedAt || 0).getTime() || (b.id ? parseInt(b.id.replace(/\D/g, '')) || 0 : 0)
        const aTime = new Date(a.submittedAt || 0).getTime() || (a.id ? parseInt(a.id.replace(/\D/g, '')) || 0 : 0)
        return bTime - aTime
      })
      memoryProfessionalsCache = combined
    }
  } catch (err) {
    console.warn('Firestore getAllProfessionals fallback to memory cache:', err)
  }

  if (includePending) {
    return memoryProfessionalsCache
  }

  return memoryProfessionalsCache.filter(p => (p.status || 'approved') === 'approved' && (p.profileStatus || 'APPROVED') === 'APPROVED')
})

export async function getPendingProfessionals(): Promise<ProfessionalItem[]> {
  const all = await getAllProfessionals(true)
  return all.filter(p => p.status === 'pending' || p.profileStatus === 'PENDING')
}

export const getProfessionalByUsername = cache(async function getProfessionalByUsername(username: string): Promise<ProfessionalItem | null> {
  const normalized = username.toLowerCase().trim()
  const cached = memoryProfessionalsCache.find(p => p.username.toLowerCase() === normalized || p.slug?.toLowerCase() === normalized)
  
  if (cached && (cached.status || 'approved') === 'approved' && (cached.profileStatus || 'APPROVED') === 'APPROVED') {
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

    // Secondary fallback: query by 'slug' field
    const qSlug = query(collection(db, 'professionals'), where('slug', '==', normalized), limit(1))
    const snapSlug = await getDocs(qSlug)
    if (!snapSlug.empty) {
      const docSnap = snapSlug.docs[0]
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

  // If approved match in memory
  if (cached && cached.status === 'approved') {
    return cached
  }

  return null
})

export async function getProfessionalForDashboard(idOrUsernameOrEmail?: string): Promise<ProfessionalItem | null> {
  const all = await getAllProfessionals(true)
  if (!idOrUsernameOrEmail) {
    return all[0] || null
  }
  const normalized = idOrUsernameOrEmail.toLowerCase().trim()
  const found = all.find(p => 
    p.id?.toLowerCase() === normalized || 
    p.username.toLowerCase() === normalized || 
    p.slug?.toLowerCase() === normalized ||
    p.email?.toLowerCase() === normalized ||
    p.userId?.toLowerCase() === normalized
  )
  return found || all[0] || null
}

export async function saveProfessionalToDatabase(proData: Partial<ProfessionalItem>): Promise<ProfessionalItem> {
  const name = proData.fullName || proData.name || 'New Professional'
  const title = proData.title || ''
  const profession = proData.profession || ''
  
  // Generate unique SEO username/slug combining Name and Professional Title
  // e.g. "Muhammad Ali" + "Frontend Developer" -> "muhammad-ali-frontend-developer"
  let baseSlug = proData.slug || proData.username || ''
  if (!baseSlug) {
    baseSlug = generateProfessionalSlug(name, title, profession)
  }

  // Ensure unique username/slug: use baseSlug directly, or append number suffix if identical slug exists
  let username = baseSlug
  let counter = 1
  while (memoryProfessionalsCache.some(p => (p.username.toLowerCase() === username.toLowerCase() || p.slug?.toLowerCase() === username.toLowerCase()) && p.id !== proData.id)) {
    username = `${baseSlug}-${counter}`
    counter++
  }

  const newPro: ProfessionalItem = {
    id: 'pro-' + Date.now(),
    userId: proData.userId || '',
    username,
    slug: username,
    name,
    fullName: name,
    title: title || 'Professional Specialist',
    profession: profession || 'Specialist',
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
    gender: proData.gender || '',
    avatar: proData.avatar || '',
    coverImage: proData.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    bio: proData.bio || `Verified ${profession} profile on ListPak.`,
    about: proData.about || proData.bio || '',
    skills: proData.skills || [profession],
    experienceYears: Number(proData.experienceYears) || 1,
    verified: false, // Must be verified by admin after Rs. 50 fee
    isFeatured: false,
    status: 'pending', // PENDING WORKFLOW
    profileStatus: 'PENDING',
    verificationStatus: 'UNVERIFIED',
    verificationRequestStatus: 'NOT_REQUESTED',
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

/**
 * Approve a pending professional profile to make it publicly visible.
 * Note: Keeps verificationStatus as UNVERIFIED unless separate verification approval happens.
 */
export async function approveProfessional(id: string, adminUid: string): Promise<boolean> {
  const idx = memoryProfessionalsCache.findIndex(p => p.id === id || p.username === id)
  if (idx !== -1) {
    memoryProfessionalsCache[idx].status = 'approved'
    memoryProfessionalsCache[idx].profileStatus = 'APPROVED'
    memoryProfessionalsCache[idx].approvedAt = new Date().toISOString()
    memoryProfessionalsCache[idx].approvedBy = adminUid
  }

  try {
    const docRef = doc(db, 'professionals', id)
    await updateDoc(docRef, {
      status: 'approved',
      profileStatus: 'APPROVED',
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
    memoryProfessionalsCache[idx].profileStatus = 'REJECTED'
    memoryProfessionalsCache[idx].rejectionReason = reason || 'Professional details could not be validated.'
  }

  try {
    const docRef = doc(db, 'professionals', id)
    await updateDoc(docRef, {
      status: 'rejected',
      profileStatus: 'REJECTED',
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason || 'Professional details could not be validated.'
    })
  } catch (err) {
    console.warn('Firestore rejectProfessional error:', err)
  }
  return true
}

/**
 * Directly mark a professional as Verified (giving green check and unlocking edit access)
 */
export async function verifyProfessional(idOrUsername: string, adminUid: string): Promise<boolean> {
  const pro = memoryProfessionalsCache.find(p => p.id === idOrUsername || p.username === idOrUsername)
  const now = new Date().toISOString()
  if (pro) {
    pro.verified = true
    pro.verificationStatus = 'VERIFIED'
    pro.verifiedAt = now
    pro.verifiedBy = adminUid
  }

  const docId = pro?.id || idOrUsername

  try {
    const docRef = doc(db, 'professionals', docId)
    await updateDoc(docRef, {
      verified: true,
      verificationStatus: 'VERIFIED',
      verifiedAt: now,
      verifiedBy: adminUid
    })
  } catch (err) {
    console.warn('Firestore verifyProfessional error:', err)
  }
  return true
}

/**
 * Remove verification from a professional (reverting to unverified status and locking editing)
 */
export async function unverifyProfessional(idOrUsername: string, adminUid: string): Promise<boolean> {
  const pro = memoryProfessionalsCache.find(p => p.id === idOrUsername || p.username === idOrUsername)
  if (pro) {
    pro.verified = false
    pro.verificationStatus = 'UNVERIFIED'
  }

  const docId = pro?.id || idOrUsername

  try {
    const docRef = doc(db, 'professionals', docId)
    await updateDoc(docRef, {
      verified: false,
      verificationStatus: 'UNVERIFIED'
    })
  } catch (err) {
    console.warn('Firestore unverifyProfessional error:', err)
  }
  return true
}

/**
 * Fetch all verification requests (from Firestore or in-memory)
 */
export async function getVerificationRequests(): Promise<ProfessionalVerificationRequest[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'professional_verifications'))
    if (!querySnapshot.empty) {
      const items: ProfessionalVerificationRequest[] = []
      querySnapshot.forEach((docSnap) => {
        items.push({ ...docSnap.data(), id: docSnap.id } as ProfessionalVerificationRequest)
      })
      const ids = new Set(items.map(i => i.id))
      memoryVerificationRequestsCache = [
        ...items,
        ...memoryVerificationRequestsCache.filter(m => !ids.has(m.id))
      ]
    }
  } catch (err) {
    console.warn('Firestore getVerificationRequests fallback:', err)
  }
  return memoryVerificationRequestsCache
}

/**
 * User submits verification payment request with Rs. 50 screenshot and transaction ref
 */
export async function submitVerificationRequest(
  idOrUsername: string,
  paymentDetails: ProfessionalVerificationPaymentDetails
): Promise<{ success: boolean; request: ProfessionalVerificationRequest }> {
  const pro = memoryProfessionalsCache.find(p => p.id === idOrUsername || p.username === idOrUsername)
  const now = new Date().toISOString()
  const reqId = 'ver-req-' + Date.now()

  const newRequest: ProfessionalVerificationRequest = {
    id: reqId,
    professionalProfileId: pro?.id || idOrUsername,
    username: pro?.username || idOrUsername,
    proName: pro?.name || 'Professional Candidate',
    profession: pro?.profession || 'Specialist',
    city: pro?.city || 'Pakistan',
    avatar: pro?.avatar,
    amount: paymentDetails.amount || 50,
    paymentMethod: paymentDetails.paymentMethod || 'EasyPaisa (Mashreq Pay)',
    paymentReference: paymentDetails.transactionRef || 'N/A',
    paymentScreenshot: paymentDetails.paymentScreenshot || '',
    status: 'PENDING',
    submittedAt: now
  }

  // Update memory cache
  memoryVerificationRequestsCache = [newRequest, ...memoryVerificationRequestsCache.filter(r => r.id !== reqId)]
  
  if (pro) {
    pro.verificationRequestStatus = 'PENDING'
    pro.verificationPaymentDetails = paymentDetails
  }

  try {
    await setDoc(doc(db, 'professional_verifications', reqId), newRequest)
    const proDocId = pro?.id || idOrUsername
    if (proDocId) {
      const docRef = doc(db, 'professionals', proDocId)
      await updateDoc(docRef, {
        verificationRequestStatus: 'PENDING',
        verificationPaymentDetails: paymentDetails
      })
    }
  } catch (err) {
    console.warn('Firestore submitVerificationRequest error:', err)
  }

  return { success: true, request: newRequest }
}

/**
 * Admin approves verification request: sets verificationStatus = 'VERIFIED', verified = true
 */
export async function approveVerificationRequest(requestId: string, adminUid: string): Promise<boolean> {
  const now = new Date().toISOString()
  const req = memoryVerificationRequestsCache.find(r => r.id === requestId)
  if (req) {
    req.status = 'APPROVED'
    req.reviewedAt = now
    req.reviewedBy = adminUid

    // Update corresponding professional
    const pro = memoryProfessionalsCache.find(p => p.id === req.professionalProfileId || p.username === req.username)
    if (pro) {
      pro.verified = true
      pro.verificationStatus = 'VERIFIED'
      pro.verificationRequestStatus = 'APPROVED'
      pro.verifiedAt = now
      pro.verifiedBy = adminUid
    }
  }

  try {
    const reqRef = doc(db, 'professional_verifications', requestId)
    await updateDoc(reqRef, {
      status: 'APPROVED',
      reviewedAt: now,
      reviewedBy: adminUid
    })

    const pro = memoryProfessionalsCache.find(p => p.id === req?.professionalProfileId || p.username === req?.username)
    const proDocId = pro?.id || req?.professionalProfileId || req?.username
    if (proDocId) {
      const proRef = doc(db, 'professionals', proDocId)
      await updateDoc(proRef, {
        verified: true,
        verificationStatus: 'VERIFIED',
        verificationRequestStatus: 'APPROVED',
        verifiedAt: now,
        verifiedBy: adminUid
      })
    }
  } catch (err) {
    console.warn('Firestore approveVerificationRequest error:', err)
  }

  return true
}

/**
 * Admin rejects verification request: keeps verificationStatus = 'UNVERIFIED', verified = false
 */
export async function rejectVerificationRequest(requestId: string, reason: string, adminUid: string): Promise<boolean> {
  const now = new Date().toISOString()
  const req = memoryVerificationRequestsCache.find(r => r.id === requestId)
  if (req) {
    req.status = 'REJECTED'
    req.rejectionReason = reason
    req.reviewedAt = now
    req.reviewedBy = adminUid

    // Update corresponding professional
    const pro = memoryProfessionalsCache.find(p => p.id === req.professionalProfileId || p.username === req.username)
    if (pro) {
      pro.verified = false
      pro.verificationStatus = 'UNVERIFIED'
      pro.verificationRequestStatus = 'REJECTED'
    }
  }

  try {
    const reqRef = doc(db, 'professional_verifications', requestId)
    await updateDoc(reqRef, {
      status: 'REJECTED',
      rejectionReason: reason,
      reviewedAt: now,
      reviewedBy: adminUid
    })

    if (req?.professionalProfileId) {
      const proRef = doc(db, 'professionals', req.professionalProfileId)
      await updateDoc(proRef, {
        verificationRequestStatus: 'REJECTED'
      })
    }
  } catch (err) {
    console.warn('Firestore rejectVerificationRequest error:', err)
  }

  return true
}

/**
 * SECURE PROFILE UPDATE:
 * Enforces server-side rule: If profile is approved and NOT verified, deny edits!
 */
export async function updateProfessionalProfileSecure(
  idOrUsername: string,
  updates: Partial<ProfessionalItem>,
  isAdmin: boolean = false
): Promise<{ success: boolean; message: string; data?: ProfessionalItem }> {
  const pro = memoryProfessionalsCache.find(p => p.id === idOrUsername || p.username === idOrUsername)
  
  if (!pro) {
    return { success: false, message: 'Professional profile not found.' }
  }

  // Security Check: An approved unverified user CANNOT edit their public profile!
  const isApproved = (pro.status || 'approved') === 'approved'
  const isVerified = pro.verified === true || pro.verificationStatus === 'VERIFIED'

  if (isApproved && !isVerified && !isAdmin) {
    return {
      success: false,
      message: 'Profile editing is available only to verified professionals. Please complete verification to unlock profile editing.'
    }
  }

  // Never allow non-admins to tamper with verificationStatus, profileStatus, or verified fields
  if (!isAdmin) {
    delete updates.verified
    delete updates.verificationStatus
    delete updates.status
    delete updates.profileStatus
    delete updates.approvedAt
    delete updates.approvedBy
    delete updates.verifiedAt
    delete updates.verifiedBy
  }

  const updatedPro = { ...pro, ...updates }
  const idx = memoryProfessionalsCache.findIndex(p => p.id === idOrUsername || p.username === idOrUsername)
  if (idx !== -1) {
    memoryProfessionalsCache[idx] = updatedPro
  }

  try {
    const docRef = doc(db, 'professionals', pro.id || idOrUsername)
    await updateDoc(docRef, updates)
  } catch (err) {
    console.warn('Firestore updateProfessionalProfileSecure error:', err)
  }

  return { success: true, message: 'Profile updated successfully.', data: updatedPro }
}

export async function updateProfessionalProfile(idOrUsername: string, updates: Partial<ProfessionalItem>): Promise<boolean> {
  const res = await updateProfessionalProfileSecure(idOrUsername, updates, false)
  return res.success
}

export async function deleteProfessionalProfile(idOrUsername: string): Promise<boolean> {
  memoryProfessionalsCache = memoryProfessionalsCache.filter(p => p.id !== idOrUsername && p.username !== idOrUsername)
  try {
    const docRef = doc(db, 'professionals', idOrUsername)
    await deleteDoc(docRef)
  } catch (err) {
    console.warn('Firestore deleteProfessionalProfile error:', err)
  }
  return true
}

export async function saveProfessionalInquiry(data: {
  proUsername: string
  proName: string
  senderName: string
  senderEmail: string
  senderWhatsApp: string
  message: string
}): Promise<{ success: boolean; inquiry?: ProfessionalInquiry; error?: string }> {
  const newInquiry: ProfessionalInquiry = {
    id: 'inq-' + Date.now(),
    proUsername: data.proUsername,
    proName: data.proName,
    senderName: data.senderName,
    senderEmail: data.senderEmail,
    senderWhatsApp: data.senderWhatsApp,
    message: data.message,
    createdAt: new Date().toISOString(),
    status: 'new'
  }

  memoryInquiriesCache = [newInquiry, ...memoryInquiriesCache]

  try {
    const docRef = doc(db, 'professional_inquiries', newInquiry.id)
    await setDoc(docRef, newInquiry)
  } catch (err) {
    console.warn('Firestore saveProfessionalInquiry error:', err)
  }

  return { success: true, inquiry: newInquiry }
}

export async function getProfessionalInquiries(proUsernameOrId?: string): Promise<ProfessionalInquiry[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'professional_inquiries'))
    const items: ProfessionalInquiry[] = []
    querySnapshot.forEach(docSnap => {
      items.push({ id: docSnap.id, ...(docSnap.data() as any) })
    })
    if (items.length > 0) {
      items.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      memoryInquiriesCache = items
    }
  } catch (err) {
    console.warn('Firestore getProfessionalInquiries error:', err)
  }

  if (!proUsernameOrId || proUsernameOrId === 'all') {
    return memoryInquiriesCache
  }
  const cleanTarget = proUsernameOrId.toLowerCase().trim()
  return memoryInquiriesCache.filter(inq => {
    const pU = (inq.proUsername || '').toLowerCase().trim()
    const pN = (inq.proName || '').toLowerCase().trim()
    return pU === cleanTarget || pU.includes(cleanTarget) || cleanTarget.includes(pU) || (pN && pN === cleanTarget)
  })
}


