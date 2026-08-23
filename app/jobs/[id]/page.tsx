import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getJobBySlug, getAllJobs, getMatchingCandidatesForJob } from '@/lib/job-service'
import { 
  Briefcase, MapPin, Building2, Calendar, CheckCircle2, ExternalLink, Mail, 
  ArrowLeft, ShieldCheck, Globe, Info, Users, Sparkles, UserCheck, Check
} from 'lucide-react'
import JobInteractiveApply from './job-interactive-apply'

export const revalidate = 86400

export async function generateStaticParams() {
  const jobs = await getAllJobs()
  return jobs.map((j) => ({
    id: j.slug || j.id,
  }))
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params
  const idOrSlug = params.id
  const job = await getJobBySlug(idOrSlug)

  const jobTitle = job ? job.title : 'job openings'
  const jobCity = job ? job.city : 'Pakistan'
  const title = job ? `${job.title} at ${job.company} (${job.city}) | ListPak Jobs` : 'Job Vacancy | ListPak Pakistan'
  const description = job ? job.description : `Apply for ${jobTitle} in ${jobCity} on ListPak hiring portal.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.listpak.com/jobs/${idOrSlug}`,
    },
    openGraph: {
      title,
      description,
      siteName: 'ListPak',
      url: `https://www.listpak.com/jobs/${idOrSlug}`,
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
    url: `https://www.listpak.com/jobs/${idOrSlug}`,
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={`/jobs/${idOrSlug}`} />
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
                jobTitle={job.title}
                companyName={job.company}
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
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

      </main>

      <Footer />
    </div>
  )
}
