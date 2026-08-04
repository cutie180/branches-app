import { MOCK_JOBS, JobItem, ProfessionalItem } from './data'
import { getAllProfessionals } from './professional-service'
import { db } from './firebase'
import { collection, getDocs, query, where, limit, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { normalizeSlug } from './db-service'

let memoryJobsCache: JobItem[] = [...MOCK_JOBS]

export async function getAllJobs(includePending: boolean = false): Promise<JobItem[]> {
  try {
    const snap = await getDocs(collection(db, 'jobs'))
    if (!snap.empty) {
      const items: JobItem[] = []
      snap.forEach((docSnap) => {
        const data = docSnap.data() as Partial<JobItem>
        const jTitle = data.title || 'Job Opening'
        const jSlug = data.slug || docSnap.id

        items.push({
          id: docSnap.id,
          slug: jSlug,
          title: jTitle,
          company: data.company || 'Hiring Employer',
          companySlug: data.companySlug || normalizeSlug(data.company || 'hiring-company'),
          companyLogo: data.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
          city: data.city || 'Pakistan',
          province: data.province || 'Pakistan',
          country: data.country || 'Pakistan',
          category: data.category || 'Technology & IT',
          department: data.department || 'Engineering',
          type: data.type || 'Full-time',
          employmentType: data.employmentType || data.type || 'Full-time',
          salary: data.salary || 'Competitive Package',
          experience: data.experience || '1 - 3 Years',
          education: data.education || 'Bachelor Degree',
          skills: data.skills || ['Communication', 'Teamwork'],
          vacancies: data.vacancies || 1,
          genderPreference: data.genderPreference || 'Any',
          ageRequirement: data.ageRequirement || 'N/A',
          deadline: data.deadline || 'Open until filled',
          joiningDate: data.joiningDate || 'Immediate',
          workingHours: data.workingHours || '09:00 AM - 06:00 PM',
          shiftType: data.shiftType || 'Day Shift',
          benefits: data.benefits || ['Health Insurance', 'Annual Bonus', 'Paid Leaves'],
          postedDate: data.postedDate || 'Just now',
          description: data.description || 'Verified job vacancy on ListPak Pakistan.',
          responsibilities: data.responsibilities || ['Fulfill daily role responsibilities with quality.'],
          requirements: data.requirements || ['Relevant experience and educational qualifications.'],
          preferredQualifications: data.preferredQualifications || [],
          applicationWebsite: data.applicationWebsite || '',
          applicationEmail: data.applicationEmail || '',
          applicationMethod: data.applicationMethod || 'both',
          applicationUrl: data.applicationUrl || data.applicationWebsite || '',
          verified: data.verified ?? true,
          isFeatured: data.isFeatured ?? false,
          status: data.status || 'approved'
        })
      })

      const existingIds = new Set(items.map(j => j.id))
      const combined = [
        ...items,
        ...memoryJobsCache.filter(j => !existingIds.has(j.id))
      ]
      memoryJobsCache = combined
    }
  } catch (err) {
    console.warn('Firestore getAllJobs fallback error:', err)
  }

  if (includePending) {
    return memoryJobsCache
  }

  return memoryJobsCache.filter(j => (j.status || 'approved') === 'approved')
}

export async function getJobBySlug(idOrSlug: string): Promise<JobItem | null> {
  const normalized = idOrSlug.toLowerCase().trim()
  const cached = memoryJobsCache.find(j => j.id === idOrSlug || j.slug?.toLowerCase() === normalized)
  if (cached && (cached.status || 'approved') === 'approved') {
    return cached
  }

  try {
    const q = query(collection(db, 'jobs'), where('slug', '==', normalized), limit(1))
    const snap = await getDocs(q)
    if (!snap.empty) {
      const docSnap = snap.docs[0]
      const data = docSnap.data() as JobItem
      if (data.status && data.status !== 'approved') return null
      memoryJobsCache.push({ ...data, id: docSnap.id })
      return data
    }
  } catch (err) {
    console.warn('Firestore getJobBySlug error:', err)
  }

  return cached || memoryJobsCache[0] || null
}

export async function saveJobToDatabase(jobData: Partial<JobItem>): Promise<JobItem> {
  const title = jobData.title || 'New Job Opportunity'
  const company = jobData.company || 'Hiring Employer'
  const slug = normalizeSlug(`${title} ${jobData.city || 'Pakistan'}`) + '-' + Math.floor(Math.random() * 1000)

  const newJob: JobItem = {
    id: 'job-' + Date.now(),
    slug,
    title,
    company,
    companySlug: jobData.companySlug || normalizeSlug(company),
    companyLogo: jobData.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    city: jobData.city || 'Karachi',
    province: jobData.province || 'Sindh',
    country: jobData.country || 'Pakistan',
    category: jobData.category || 'Technology & IT',
    department: jobData.department || 'General',
    type: jobData.type || 'Full-time',
    employmentType: jobData.employmentType || jobData.type || 'Full-time',
    salary: jobData.salary || 'Negotiable',
    experience: jobData.experience || '1 - 3 Years',
    education: jobData.education || 'Bachelor Degree',
    skills: jobData.skills || ['Communication'],
    vacancies: Number(jobData.vacancies) || 1,
    genderPreference: jobData.genderPreference || 'Any',
    ageRequirement: jobData.ageRequirement || 'N/A',
    deadline: jobData.deadline || 'Open until filled',
    joiningDate: jobData.joiningDate || 'Immediate',
    workingHours: jobData.workingHours || '09:00 AM - 06:00 PM',
    shiftType: jobData.shiftType || 'Day Shift',
    benefits: jobData.benefits || ['Health Insurance', 'Paid Leaves'],
    postedDate: 'Just now',
    description: jobData.description || `Job opening for ${title} at ${company}.`,
    responsibilities: jobData.responsibilities || ['Perform core job responsibilities.'],
    requirements: jobData.requirements || ['Relevant experience in field.'],
    preferredQualifications: jobData.preferredQualifications || [],
    applicationWebsite: jobData.applicationWebsite || '',
    applicationEmail: jobData.applicationEmail || '',
    applicationMethod: jobData.applicationMethod || 'both',
    applicationUrl: jobData.applicationUrl || jobData.applicationWebsite || '',
    verified: true,
    isFeatured: false,
    status: 'pending' // PENDING WORKFLOW
  }

  memoryJobsCache = [newJob, ...memoryJobsCache.filter(j => j.id !== newJob.id)]

  try {
    await addDoc(collection(db, 'jobs'), newJob)
  } catch (err) {
    console.warn('Firestore saveJobToDatabase error:', err)
  }

  return newJob
}

export async function approveJob(id: string, adminUid: string): Promise<boolean> {
  const idx = memoryJobsCache.findIndex(j => j.id === id || j.slug === id)
  if (idx !== -1) {
    memoryJobsCache[idx].status = 'approved'
  }

  try {
    const docRef = doc(db, 'jobs', id)
    await updateDoc(docRef, { status: 'approved' })
  } catch (err) {
    console.warn('Firestore approveJob error:', err)
  }
  return true
}

export async function rejectJob(id: string, reason?: string): Promise<boolean> {
  const idx = memoryJobsCache.findIndex(j => j.id === id || j.slug === id)
  if (idx !== -1) {
    memoryJobsCache[idx].status = 'rejected'
  }

  try {
    const docRef = doc(db, 'jobs', id)
    await updateDoc(docRef, { status: 'rejected', rejectionReason: reason })
  } catch (err) {
    console.warn('Firestore rejectJob error:', err)
  }
  return true
}

/**
 * CANDIDATE MATCHING ENGINE
 * Calculates match percentage between a Job posting and candidates in the Professional / Job Seeker network
 */
export async function getMatchingCandidatesForJob(job: JobItem): Promise<Array<{ candidate: ProfessionalItem; matchScore: number; matchReasons: string[] }>> {
  const allCandidates = await getAllProfessionals(false)
  const results: Array<{ candidate: ProfessionalItem; matchScore: number; matchReasons: string[] }> = []

  const jobSkills = (job.skills || []).map(s => s.toLowerCase().trim())
  const jobTitle = (job.title || '').toLowerCase()
  const jobCity = (job.city || '').toLowerCase()

  allCandidates.forEach(cand => {
    let score = 50 // Base score
    const reasons: string[] = []

    // 1. Skill Matches (+10 score per matching skill)
    const matchingSkills = cand.skills.filter(s => jobSkills.some(js => js.includes(s.toLowerCase()) || s.toLowerCase().includes(js)))
    if (matchingSkills.length > 0) {
      score += matchingSkills.length * 12
      reasons.push(`Matches ${matchingSkills.length} required skill(s): ${matchingSkills.join(', ')}`)
    }

    // 2. Profession / Title Match (+20 score)
    if (jobTitle.includes(cand.profession.toLowerCase()) || cand.title.toLowerCase().includes(jobTitle) || jobTitle.split(' ').some(w => w.length > 3 && cand.title.toLowerCase().includes(w))) {
      score += 20
      reasons.push(`Matching profession: ${cand.profession}`)
    }

    // 3. Location Match (+15 score)
    if (cand.city.toLowerCase() === jobCity || job.type.toLowerCase().includes('remote')) {
      score += 15
      reasons.push(job.type.toLowerCase().includes('remote') ? 'Open for remote role' : `Located in ${cand.city}`)
    }

    // 4. Availability check
    if (cand.availability && cand.availability.toLowerCase().includes('open to work')) {
      score += 10
      reasons.push('Actively open for job opportunities')
    }

    const finalScore = Math.min(98, score)
    if (finalScore >= 60) {
      results.push({ candidate: cand, matchScore: finalScore, matchReasons: reasons })
    }
  })

  return results.sort((a, b) => b.matchScore - a.matchScore)
}
