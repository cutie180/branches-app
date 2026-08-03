'use client'

import { use } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MOCK_JOBS, JobItem } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Briefcase, MapPin, Building2, Calendar, CheckCircle2, ExternalLink, Mail, ArrowLeft, ShieldCheck, Globe, Info } from 'lucide-react'

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const job = MOCK_JOBS.find(j => j.id === resolvedParams.id) || MOCK_JOBS[0]

  if (!job) {
    return notFound()
  }

  const emailSubject = encodeURIComponent(`Application for ${job.title} - ListPak`)
  const emailBody = encodeURIComponent(`Hello,\n\nI would like to apply for the position of ${job.title} at ${job.company}.\n\nPlease find my application details attached.\n\nKind Regards,`)
  const mailtoUrl = `mailto:${job.applicationEmail || 'careers@' + job.companySlug + '.pk'}?subject=${emailSubject}&body=${emailBody}`
  const websiteUrl = job.applicationWebsite || `https://${job.companySlug}.pk/careers`

  const hasWebsite = Boolean(job.applicationWebsite || job.applicationMethod === 'website' || job.applicationMethod === 'both')
  const hasEmail = Boolean(job.applicationEmail || job.applicationMethod === 'email' || job.applicationMethod === 'both')

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
    datePosted: '2026-08-01',
    employmentType: job.type.toUpperCase().replace('-', '_'),
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      sameAs: `https://listpak.com/business/${job.companySlug}`,
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
            <span>Back to All Jobs</span>
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
                  <Link href={`/business/${job.companySlug}`} className="font-semibold text-blue-400 hover:underline flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{job.company}</span>
                  </Link>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{job.city}</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC APPLY ACTIONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {hasWebsite ? (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <Globe className="w-4 h-4" />
                  <span>Apply on Company Website</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              ) : (
                <a
                  href={mailtoUrl}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Apply via Email</span>
                </a>
              )}

              {hasWebsite && hasEmail && (
                <a
                  href={mailtoUrl}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Or Apply via Email</span>
                </a>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          {/* External Application Notice Card */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3 text-xs text-blue-900">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block">Direct Candidate Application:</span>
              <span>This job listing redirects directly to the employer&apos;s preferred recruitment channel. ListPak does not store your resume or personal details.</span>
            </div>
          </div>

          {/* Job Overview */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Job Description</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Key Responsibilities</h2>
            <ul className="space-y-2.5">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Requirements & Qualifications</h2>
            <ul className="space-y-2.5">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2"></div>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Job Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Offered Salary:</span>
                <span className="font-bold text-emerald-600">{job.salary}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Experience Required:</span>
                <span className="font-bold text-slate-800">{job.experience}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Job Location:</span>
                <span className="font-bold text-slate-800">{job.city}, Pakistan</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Industry:</span>
                <span className="font-bold text-slate-800">{job.category}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              {hasWebsite ? (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Apply on Company Website</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              ) : (
                <a
                  href={mailtoUrl}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Apply via Email</span>
                </a>
              )}

              {hasWebsite && hasEmail && (
                <a
                  href={mailtoUrl}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Or Apply via Email</span>
                </a>
              )}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
