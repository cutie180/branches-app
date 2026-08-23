import { cache } from 'react'
import { MOCK_COMPANIES, CompanyItem } from './data'
import { db } from './firebase'
import { collection, getDocs, query, where, limit, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { normalizeSlug } from './db-service'

let memoryCompaniesCache: CompanyItem[] = [...MOCK_COMPANIES]

export const getAllCompanies = cache(async function getAllCompanies(includePending: boolean = false): Promise<CompanyItem[]> {
  try {
    const snap = await getDocs(collection(db, 'companies'))
    if (!snap.empty) {
      const items: CompanyItem[] = []
      snap.forEach((docSnap) => {
        const data = docSnap.data() as Partial<CompanyItem>
        const cName = data.name || 'Verified Company'
        const cSlug = data.slug || normalizeSlug(cName)

        items.push({
          id: docSnap.id,
          slug: cSlug,
          name: cName,
          logo: data.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
          coverImage: data.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
          description: data.description || 'Verified hiring company profile on ListPak Pakistan.',
          industry: data.industry || 'Technology & IT',
          category: data.category || 'Hiring Company / HR',
          companySize: data.companySize || '10 - 50 Employees',
          employeeCount: data.employeeCount || 25,
          establishedYear: data.establishedYear || '2020',
          registrationNumber: data.registrationNumber || '',
          companyType: data.companyType || 'Private',
          headquarters: data.headquarters || 'Lahore, Pakistan',
          branchLocations: data.branchLocations || [],
          website: data.website || '',
          careersUrl: data.careersUrl || '',
          googleMapUrl: data.googleMapUrl || '',
          hrName: data.hrName || 'HR Department',
          hrDesignation: data.hrDesignation || 'HR Manager',
          hrEmail: data.hrEmail || '',
          companyEmail: data.companyEmail || '',
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          address: data.address || '',
          city: data.city || 'Lahore',
          province: data.province || 'Punjab',
          country: data.country || 'Pakistan',
          linkedin: data.linkedin || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          twitter: data.twitter || '',
          youtube: data.youtube || '',
          github: data.github || '',
          customSocialLinks: data.customSocialLinks || [],
          verified: data.verified ?? true,
          isFeatured: data.isFeatured ?? false,
          status: data.status || 'approved',
          submittedAt: data.submittedAt || new Date().toISOString(),
          approvedAt: data.approvedAt,
          approvedBy: data.approvedBy,
          rejectionReason: data.rejectionReason,
          reviews: data.reviews || [],
          faqs: data.faqs || [],
          activeJobsCount: data.activeJobsCount || 1
        })
      })

      const existingSlugs = new Set(items.map(c => c.slug))
      const combined = [
        ...items,
        ...memoryCompaniesCache.filter(c => !existingSlugs.has(c.slug))
      ]
      memoryCompaniesCache = combined
    }
  } catch (err) {
    console.warn('Firestore getAllCompanies fallback to memory cache:', err)
  }

  if (includePending) {
    return memoryCompaniesCache
  }

  return memoryCompaniesCache.filter(c => (c.status || 'approved') === 'approved')
})

export const getCompanyBySlug = cache(async function getCompanyBySlug(slug: string): Promise<CompanyItem | null> {
  const normalized = slug.toLowerCase().trim()
  const cached = memoryCompaniesCache.find(c => c.slug.toLowerCase() === normalized || c.id === normalized)
  if (cached && (cached.status || 'approved') === 'approved') {
    return cached
  }

  try {
    const q = query(collection(db, 'companies'), where('slug', '==', normalized), limit(1))
    const snap = await getDocs(q)
    if (!snap.empty) {
      const docSnap = snap.docs[0]
      const data = docSnap.data() as CompanyItem
      if (data.status && data.status !== 'approved') return null
      memoryCompaniesCache.push({ ...data, id: docSnap.id })
      return data
    }
  } catch (err) {
    console.warn('Firestore getCompanyBySlug error:', err)
  }

  return null
})

export async function saveCompanyToDatabase(compData: Partial<CompanyItem>): Promise<CompanyItem> {
  const name = compData.name || 'New Hiring Company'
  const slug = compData.slug || normalizeSlug(name) + '-' + Math.floor(Math.random() * 1000)

  const newComp: CompanyItem = {
    id: 'comp-' + Date.now(),
    slug,
    name,
    logo: compData.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    coverImage: compData.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    description: compData.description || `${name} hiring company profile on ListPak.`,
    industry: compData.industry || 'Technology & IT',
    category: compData.category || 'Hiring Company / HR',
    companySize: compData.companySize || '10 - 50 Employees',
    employeeCount: Number(compData.employeeCount) || 20,
    establishedYear: compData.establishedYear || '2020',
    registrationNumber: compData.registrationNumber || '',
    companyType: compData.companyType || 'Private',
    headquarters: compData.headquarters || `${compData.city || 'Lahore'}, Pakistan`,
    branchLocations: compData.branchLocations || [],
    website: compData.website || '',
    careersUrl: compData.careersUrl || '',
    googleMapUrl: compData.googleMapUrl || '',

    hrName: compData.hrName || 'HR Recruitment Team',
    hrDesignation: compData.hrDesignation || 'HR Lead',
    hrEmail: compData.hrEmail || '',
    companyEmail: compData.companyEmail || '',
    phone: compData.phone || '',
    whatsapp: compData.whatsapp || '',
    address: compData.address || '',
    city: compData.city || 'Lahore',
    province: compData.province || 'Punjab',
    country: compData.country || 'Pakistan',

    linkedin: compData.linkedin || '',
    facebook: compData.facebook || '',
    instagram: compData.instagram || '',
    twitter: compData.twitter || '',
    youtube: compData.youtube || '',
    github: compData.github || '',
    customSocialLinks: compData.customSocialLinks || [],

    verified: true,
    isFeatured: false,
    status: 'pending', // PENDING WORKFLOW
    submittedAt: new Date().toISOString(),
    reviews: [],
    faqs: [],
    activeJobsCount: 0
  }

  memoryCompaniesCache = [newComp, ...memoryCompaniesCache.filter(c => c.slug !== slug)]

  try {
    await addDoc(collection(db, 'companies'), newComp)
  } catch (err) {
    console.warn('Firestore saveCompanyToDatabase error:', err)
  }

  return newComp
}

export async function approveCompany(id: string, adminUid: string): Promise<boolean> {
  const idx = memoryCompaniesCache.findIndex(c => c.id === id || c.slug === id)
  if (idx !== -1) {
    memoryCompaniesCache[idx].status = 'approved'
    memoryCompaniesCache[idx].approvedAt = new Date().toISOString()
    memoryCompaniesCache[idx].approvedBy = adminUid
  }

  try {
    const docRef = doc(db, 'companies', id)
    await updateDoc(docRef, { status: 'approved', approvedAt: new Date().toISOString(), approvedBy: adminUid })
  } catch (err) {
    console.warn('Firestore approveCompany error:', err)
  }
  return true
}

export async function rejectCompany(id: string, reason?: string): Promise<boolean> {
  const idx = memoryCompaniesCache.findIndex(c => c.id === id || c.slug === id)
  if (idx !== -1) {
    memoryCompaniesCache[idx].status = 'rejected'
    memoryCompaniesCache[idx].rejectionReason = reason
  }

  try {
    const docRef = doc(db, 'companies', id)
    await updateDoc(docRef, { status: 'rejected', rejectedAt: new Date().toISOString(), rejectionReason: reason })
  } catch (err) {
    console.warn('Firestore rejectCompany error:', err)
  }
  return true
}

export async function updateCompanyProfile(idOrSlug: string, updates: Partial<CompanyItem>): Promise<boolean> {
  const idx = memoryCompaniesCache.findIndex(c => c.id === idOrSlug || c.slug === idOrSlug)
  if (idx !== -1) {
    memoryCompaniesCache[idx] = { ...memoryCompaniesCache[idx], ...updates }
  }

  try {
    const docRef = doc(db, 'companies', idOrSlug)
    await updateDoc(docRef, updates)
  } catch (err) {
    console.warn('Firestore updateCompanyProfile error:', err)
  }
  return true
}
