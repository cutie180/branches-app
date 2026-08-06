'use client'

import { use, useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { JobItem, ProfessionalItem } from '@/lib/data'
import { getJobBySlug, getMatchingCandidatesForJob } from '@/lib/job-service'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  Briefcase, MapPin, Building2, Calendar, CheckCircle2, ExternalLink, Mail, 
  ArrowLeft, ShieldCheck, Globe, Info, Users, Sparkles, UserCheck, Check
} from 'lucide-react'
import { toast } from 'sonner'

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const idOrSlug = resolvedParams.id

  const [job, setJob] = useState<JobItem | null>(null)
  const [matchingCandidates, setMatchingCandidates] = useState<Array<{ candidate: ProfessionalItem; matchScore: number; matchReasons: string[] }>>([])
  const [loading, setLoading] = useState(true)

  // Direct Apply Modal state
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [applicantPhone, setApplicantPhone] = useState('')
  const [coverNote, setCoverNote] = useState('')

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const j = await getJobBySlug(idOrSlug)
        if (j) {
          setJob(j)
          const matches = await getMatchingCandidatesForJob(j)
          setMatchingCandidates(matches.slice(0, 4))
        }
      } catch (err) {
        console.error('Error loading job detail:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [idOrSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 text-slate-400 text-sm">
          Loading job opening...
        </div>
        <Footer />
      </div>
    )
  }

  if (!job) {
    return notFound()
  }

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applicantName || !applicantEmail) {
      toast.error('Please enter name and email.')
      return
    }
    setShowApplyModal(false)
    setApplicantName('')
    setApplicantEmail('')
    setApplicantPhone('')
    setCoverNote('')
    toast.success(`Application submitted to ${job.company} HR team!`)
  }

  const websiteUrl = job.applicationWebsite || job.applicationUrl || `https://${job.companySlug}.pk/careers`
  const mailtoUrl = job.applicationEmail ? `mailto:${job.applicationEmail}?subject=Application for ${encodeURIComponent(job.title)}` : ''

  const jobSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: job.company,
      value: job.id
    },
    datePosted: job.postedDate || '2026-08-01',
    employmentType: (job.type || 'FULL_TIME').toUpperCase().replace('-', '_'),
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      sameAs: `https://www.listpak.com/companies/${job.companySlug}`,
      logo: job.companyLogo
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city,
        addressCountry: 'PK'
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-4">
          <Link href="/jobs" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Job Openings</span>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-2">
            <div className="flex items-start gap-4">
              <img src={job.companyLogo} alt={job.company} className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md bg-white shrink-0" />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {job.type}
                  </span>
                  <span className="text-xs text-slate-400">Posted {job.postedDate}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{job.title}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                  <Link href={`/companies/${job.companySlug}`} className="font-semibold text-blue-400 hover:underline flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{job.company}</span>
                  </Link>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{job.city}</span>
                </div>
              </div>
            </div>

            {/* Application CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowApplyModal(true)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply on ListPak</span>
              </button>

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Careers Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Job Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs text-xs">
          <div>
            <span className="text-slate-400 font-medium">Salary Package</span>
            <p className="font-extrabold text-slate-900 text-sm mt-0.5">{job.salary}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Experience Required</span>
            <p className="font-extrabold text-slate-900 text-sm mt-0.5">{job.experience}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Job Location</span>
            <p className="font-extrabold text-slate-900 text-sm mt-0.5">{job.city}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Vacancies</span>
            <p className="font-extrabold text-blue-600 text-sm mt-0.5">{job.vacancies || 1} Position(s)</p>
          </div>
        </div>

        {/* Candidate Matching Suggestions (Integrated with Professional / Job Seeker Category) */}
        {matchingCandidates.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-3xl p-6 border border-blue-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-blue-950 flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-blue-600" />
                <span>Suggested Candidates from Professional Network ({matchingCandidates.length})</span>
              </h2>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">Automated Skill Match</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchingCandidates.map(({ candidate, matchScore, matchReasons }) => (
                <div key={candidate.username} className="p-4 bg-white rounded-2xl border border-blue-100 flex items-start gap-3 shadow-xs">
                  <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <Link href={`/professionals/${candidate.username}`} className="font-bold text-xs text-slate-900 hover:text-blue-600 truncate">
                        {candidate.name}
                      </Link>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        {matchScore}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-600 font-semibold">{candidate.title}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{matchReasons[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Job Requirements & Responsibilities */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900">Job Description</h2>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Key Responsibilities</h3>
              <div className="space-y-2 text-xs">
                {job.responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Role Requirements & Qualifications</h3>
              <div className="space-y-2 text-xs">
                {job.requirements.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {job.skills && job.skills.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Target Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(s => (
                  <span key={s} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </main>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Apply for {job.title}</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg">✕</button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Hamza Shaikh"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Note / Intro</label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Brief message for the HR hiring manager..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
