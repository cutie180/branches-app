import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getJobBySlug, getAllJobs, getMatchingCandidatesForJob } from '@/lib/job-service'
import { 
  Briefcase, MapPin, Building2, Calendar, CheckCircle2, ExternalLink, Mail, 
  ArrowLeft, ShieldCheck, Globe, Info, Users, Sparkles, UserCheck, Check,
  MessageCircle, Clock, Award, FileText, AlertTriangle
} from 'lucide-react'
import JobInteractiveApply from './job-interactive-apply'
import { getPublicJobPath, getPublicJobSlug } from '@/lib/job-url'

export const dynamicParams = true
export const revalidate = 0

export async function generateStaticParams() {
  const jobs = await getAllJobs()
  return jobs.flatMap((j) => {
    const storedSlug = j.slug || j.id
    const publicSlug = getPublicJobSlug(j)
    return Array.from(new Set([publicSlug, storedSlug])).map((id) => ({ id }))
  })
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params
  const idOrSlug = params.id
  const job = await getJobBySlug(idOrSlug)

  const jobTitle = job ? job.title : 'job openings'
  const jobCity = job ? job.city : 'Pakistan'
  const publicPath = job ? getPublicJobPath(job) : `/jobs/${idOrSlug}`
  const title = job ? `${job.title} at ${job.company} (${job.city}) | ListPak Jobs` : 'Job Vacancy | ListPak Pakistan'
  const description = job ? `${job.description} Confirm the employer, location, deadline, and application route before applying.` : `Review ${jobTitle} opportunities in ${jobCity} on the ListPak jobs directory.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.listpak.com${publicPath}`,
    },
    openGraph: {
      title,
      description,
      siteName: 'ListPak',
      url: `https://www.listpak.com${publicPath}`,
      locale: 'en_PK',
      type: 'article',
      images: job?.companyLogo ? [{ url: job.companyLogo, alt: job.company }] : undefined,
    },
  }
}

export default async function JobDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const idOrSlug = params.id

  const job = await getJobBySlug(idOrSlug)

  if (!job) {
    return notFound()
  }

  const storedSlug = (job.slug || job.id).toLowerCase()
  const publicJobSlug = getPublicJobSlug(job)
  const publicJobPath = getPublicJobPath(job)
  if (publicJobSlug !== storedSlug && idOrSlug.toLowerCase() !== publicJobSlug) {
    redirect(publicJobPath)
  }

  const isRemoteSeoInternship = 
    storedSlug === 'remote-seo-internship' || 
    idOrSlug.toLowerCase() === 'remote-seo-internship' || 
    job.id === 'job-remote-seo-internship'

  const whatsappApplicationUrl = `https://wa.me/923345636230?text=${encodeURIComponent("Hello ListPak HR, I am applying for one of the 10 Remote SEO Internship positions (On-Page & Off-Page). I have attached my CV and Cover Letter. Looking forward to your response!")}`

  const matchingCandidatesRaw = await getMatchingCandidatesForJob(job)
  const matchingCandidates = matchingCandidatesRaw.slice(0, 4)

  const websiteUrl = job.applicationWebsite || job.applicationUrl || ''
  const datePosted = /^\d{4}-\d{2}-\d{2}/.test(job.postedDate || '') ? job.postedDate : undefined
  const validThroughDate = job.deadline && !/open until filled/i.test(job.deadline) ? new Date(job.deadline) : null
  const validThrough = validThroughDate && !Number.isNaN(validThroughDate.getTime())
    ? validThroughDate.toISOString()
    : undefined

  const jobLocations = (job.cities && job.cities.length > 0)
    ? job.cities.map(c => ({
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: c,
          addressCountry: 'PK'
        }
      }))
    : {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.city,
          addressCountry: 'PK'
        }
      }

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
    ...(datePosted ? { datePosted } : {}),
    ...(validThrough ? { validThrough } : {}),
    employmentType: (job.type || 'FULL_TIME').toUpperCase().replace('-', '_'),
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      sameAs: job.applicationWebsite || undefined,
      logo: job.companyLogo
    },
    jobLocation: jobLocations,
    url: `https://www.listpak.com${publicJobPath}`,
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={publicJobPath} />
      <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 text-xs text-slate-500"><Link href="/" className="hover:text-blue-700 underline">Home</Link><span className="mx-2">/</span><Link href="/jobs" className="hover:text-blue-700 underline">Jobs</Link><span className="mx-2">/</span><span>{job.title}</span></nav>

      {datePosted && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
        />
      )}

      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-4">
          <Link href="/jobs" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Job Openings</span>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-2">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-700 shadow-md bg-white shrink-0">
                <Image
                  src={job.companyLogo}
                  alt={job.company}
                  width={64}
                  height={64}
                  priority
                  sizes="64px"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {job.type}
                  </span>
                  {job.cities && job.cities.length > 1 && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {job.cities.length} Branch Cities
                    </span>
                  )}
                  <span className="text-xs text-slate-400">Posted {job.postedDate}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{job.title}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                  <Link href={`/companies/${job.companySlug}`} className="font-semibold text-blue-400 hover:underline flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{job.company}</span>
                  </Link>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.cities && job.cities.length > 1 ? job.cities.join(', ') : job.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Application CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <JobInteractiveApply
                jobId={job.id}
                jobTitle={job.title}
                companyName={job.company}
                companyLogo={job.companyLogo}
                city={job.city}
                salary={job.salary}
                type={job.type}
                applicationWebsite={websiteUrl}
                publicJobPath={publicJobPath}
              />

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
      <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full ${isRemoteSeoInternship ? 'max-w-7xl' : 'max-w-5xl space-y-8'}`}>
        {isRemoteSeoInternship ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Mobile Fast-Track Hiring Notification Banner */}
              <div className="lg:hidden bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-3xl p-5 shadow-lg space-y-3 border border-emerald-500/30">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200">
                      Fast-Track Hiring Alert
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/20 text-white">
                    10 Positions
                  </span>
                </div>
                <h2 className="text-base font-extrabold leading-snug">
                  10 Positions Post for SEO Internship — Send CV on WhatsApp to Get Hired Soon
                </h2>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  We are hiring 10 remote SEO interns! Candidates who send their CV and cover letter directly on WhatsApp receive immediate priority review.
                </p>
                <a
                  href={whatsappApplicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-white text-emerald-800 text-xs font-extrabold shadow-md flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-700 text-emerald-700 shrink-0" />
                  <span>Send CV on WhatsApp (+92 334 5636230)</span>
                </a>
              </div>

              {/* Branch Cities Highlight if multiple */}
              {job.cities && job.cities.length > 1 && (
                <div className="bg-blue-50/70 rounded-3xl p-5 border border-blue-200/80 shadow-2xs space-y-2">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Available Across {job.cities.length} Cities in Pakistan & 100% Remote</span>
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.cities.map(c => (
                      <span key={c} className="px-3 py-1 bg-white text-blue-900 rounded-xl text-xs font-bold border border-blue-200 shadow-2xs">
                        📍 {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Job Overview Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Salary / Stipend</span>
                  <p className="font-extrabold text-emerald-700 text-sm mt-0.5">{job.salary}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Experience</span>
                  <p className="font-extrabold text-slate-900 text-sm mt-0.5">{job.experience}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Location</span>
                  <p className="font-extrabold text-slate-900 text-sm mt-0.5">{job.city}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Vacancies</span>
                  <p className="font-extrabold text-blue-600 text-sm mt-0.5">{job.vacancies || 1} Position(s)</p>
                </div>
              </div>

              {/* First Read It Before Applying Alert Box */}
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50/60 rounded-3xl p-6 sm:p-7 border-2 border-amber-400/80 shadow-md space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 block">
                        Important Notice • Lazmi Hidayat
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                        First Read It Before Applying (Apply Karne Se Pehle Zaroor Parhein)
                      </h2>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto text-[11px] font-extrabold px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 border border-amber-300 shrink-0">
                    Mandatory Terms
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Please read all internship terms and conditions carefully before submitting your CV. This ensures complete alignment on expectations, compensation, and evaluation:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                  {/* Point 1 */}
                  <div className="bg-white/90 rounded-2xl p-4 border border-amber-200/80 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-amber-800 font-extrabold">
                      <span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-xs text-amber-800 font-extrabold shrink-0">1</span>
                      <span>2-Month Unpaid Period</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pl-8">
                      This internship is strictly <strong>unpaid for the first 2 months</strong>. It serves as an intensive practical training & evaluation phase covering On-Page and Off-Page SEO.
                    </p>
                  </div>

                  {/* Point 2 */}
                  <div className="bg-white/90 rounded-2xl p-4 border border-emerald-200/80 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-xs text-emerald-800 font-extrabold shrink-0">2</span>
                      <span>Monthly Paid Job on Performance</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pl-8">
                      When candidate <strong>demonstrates complete work, consistent deliverables, and timely submissions</strong> across the 2 months, we will immediately hire you on a <strong>monthly salary paid position</strong>!
                    </p>
                  </div>

                  {/* Point 3 */}
                  <div className="bg-white/90 rounded-2xl p-4 border border-blue-200/80 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-blue-800 font-extrabold">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-xs text-blue-800 font-extrabold shrink-0">3</span>
                      <span>No Degree Barrier (Matric & Inter)</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pl-8">
                      <strong>Graduation is NOT required</strong>. Candidates with Matric (10th) or Intermediate (FA / FSc / ICS / I.Com) qualifications are 100% eligible to apply. Curiosity and dedication are what matter most.
                    </p>
                  </div>

                  {/* Point 4 */}
                  <div className="bg-white/90 rounded-2xl p-4 border border-purple-200/80 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-2 text-purple-800 font-extrabold">
                      <span className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-xs text-purple-800 font-extrabold shrink-0">4</span>
                      <span>Flexible Hours vs. Strict Deadlines</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pl-8">
                      Work 100% from home on your own flexible schedule. However, <strong>assigned SEO tasks and milestones must be submitted accurately and on time</strong> without unannounced delays.
                    </p>
                  </div>
                </div>

                {/* Agreement Note */}
                <div className="p-3.5 rounded-2xl bg-amber-100/80 border border-amber-300 text-[11px] text-amber-950 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Confirmation:</strong> By submitting your CV on WhatsApp, you confirm that you have read and agreed to the 2-month unpaid evaluation and performance-based hiring model.
                  </span>
                </div>
              </div>

              {/* Candidate Matching Suggestions */}
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
                        <Image src={candidate.avatar} alt={candidate.name} width={48} height={48} loading="lazy" sizes="48px" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
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
            </div>

            {/* Sidebar Column (Desktop Sticky) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* WhatsApp Priority Application Notification Box */}
              <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70 rounded-3xl p-6 border-2 border-emerald-500/50 shadow-xl shadow-emerald-600/10 relative overflow-hidden space-y-5">
                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Header Badge */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-100 relative">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                      Priority Hiring Alert
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    10 Positions Open
                  </span>
                </div>

                {/* Notification Text */}
                <div className="space-y-2 relative">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/25">
                      <MessageCircle className="w-6 h-6 fill-white text-white" />
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold mb-1">
                        10 Vacancies Available
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                        Send your CV with cover letter on WhatsApp to get hired soon
                      </h3>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        Direct WhatsApp Recruitment Channel (10 Positions)
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    We have posted <strong>10 open positions</strong> for this Remote SEO Internship! Candidates who submit their CV and a brief cover letter directly on WhatsApp receive immediate priority review and rapid shortlisting.
                  </p>
                </div>

                {/* Pre-apply Warning Reminder */}
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-[11px] leading-snug">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>First Read It Before Applying:</strong> 2-Month unpaid training. Guaranteed monthly paid job upon showing complete work!
                  </span>
                </div>

                {/* WhatsApp Action Button */}
                <a
                  href={whatsappApplicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Send CV on WhatsApp (+92 334 5636230)</span>
                </a>

                {/* Checklist Box */}
                <div className="bg-white/90 rounded-2xl p-4 border border-emerald-100/90 space-y-2.5 text-[11px]">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>What to include in your message:</span>
                  </span>
                  <ul className="space-y-2 text-slate-600 pl-0.5">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span><strong>Attach Updated CV:</strong> PDF format preferred.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span><strong>Short Cover Letter:</strong> Mention why you want to learn On-Page & Off-Page SEO.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span><strong>Qualification:</strong> Matric / Intermediate (No degree required).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span><strong>Availability:</strong> Flexible timings (100% Remote / Work from home).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Role Quick Highlights Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Internship Highlights</span>
                </h4>
                <div className="space-y-3 divide-y divide-slate-100">
                  <div className="pt-2 flex justify-between items-start gap-2">
                    <span className="text-slate-500 font-medium">Open Positions</span>
                    <span className="font-extrabold text-blue-600 text-right">10 Vacancies Available</span>
                  </div>
                  <div className="pt-2 flex justify-between items-start gap-2">
                    <span className="text-slate-500 font-medium">Program Duration</span>
                    <span className="font-bold text-slate-900 text-right">2-Month Unpaid Training</span>
                  </div>
                  <div className="pt-2 flex justify-between items-start gap-2">
                    <span className="text-slate-500 font-medium">Hiring Path</span>
                    <span className="font-bold text-emerald-600 text-right">Monthly Paid Job on Performance</span>
                  </div>
                  <div className="pt-2 flex justify-between items-start gap-2">
                    <span className="text-slate-500 font-medium">Education</span>
                    <span className="font-bold text-slate-900 text-right">Matric / Inter (No Degree Needed)</span>
                  </div>
                  <div className="pt-2 flex justify-between items-start gap-2">
                    <span className="text-slate-500 font-medium">Work Mode</span>
                    <span className="font-bold text-slate-900 text-right">100% Remote (Nationwide)</span>
                  </div>
                  <div className="pt-2 flex justify-between items-start gap-2">
                    <span className="text-slate-500 font-medium">Timings</span>
                    <span className="font-bold text-slate-900 text-right">Flexible (Task-Based Delivery)</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <>
            {/* Branch Cities Highlight if multiple */}
            {job.cities && job.cities.length > 1 && (
              <div className="bg-blue-50/70 rounded-3xl p-5 border border-blue-200/80 shadow-2xs space-y-2">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Multi-Branch Opening: Available Across {job.cities.length} Cities in Pakistan</span>
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {job.cities.map(c => (
                    <span key={c} className="px-3 py-1 bg-white text-blue-900 rounded-xl text-xs font-bold border border-blue-200 shadow-2xs">
                      📍 {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
                <span className="text-slate-400 font-medium">Location</span>
                <p className="font-extrabold text-slate-900 text-sm mt-0.5">{job.city}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Vacancies</span>
                <p className="font-extrabold text-blue-600 text-sm mt-0.5">{job.vacancies || 1} Position(s)</p>
              </div>
            </div>

            {/* Candidate Matching Suggestions */}
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
                      <Image src={candidate.avatar} alt={candidate.name} width={48} height={48} loading="lazy" sizes="48px" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
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
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
