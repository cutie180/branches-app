import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getAllJobs } from '@/lib/job-service'
import { getPublicJobPath, getPublicJobSlug } from '@/lib/job-url'
import { toCanonicalUrl } from '@/lib/directory-helpers'
import { Briefcase, MapPin, Plus, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react'
import JobsFilterClient from '@/components/jobs/jobs-filter-client'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Jobs in Pakistan 2026 – Latest Vacancies | ListPak Jobs',
  description: 'Find the latest jobs in Pakistan — call center, IT, marketing, data entry & remote jobs in Karachi, Lahore, Islamabad. New vacancies added daily. Apply free.',
  alternates: {
    canonical: 'https://listpak.com/jobs/',
  },
  openGraph: {
    title: 'Jobs in Pakistan 2026 – Latest Vacancies | ListPak Jobs',
    description: 'Find the latest jobs in Pakistan — call center, IT, marketing, data entry & remote jobs in Karachi, Lahore, Islamabad. New vacancies added daily. Apply free.',
    url: 'https://listpak.com/jobs/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Pakistan 2026 – Latest Vacancies | ListPak Jobs',
    description: 'Find the latest jobs in Pakistan — call center, IT, marketing, data entry & remote jobs in Karachi, Lahore, Islamabad. New vacancies added daily. Apply free.',
  },
}

const JOBS_FAQS = [
  {
    question: 'How can I find the latest jobs in Pakistan?',
    answer:
      'Browse ListPak Jobs for the latest vacancies across Pakistan, filterable by city — Karachi, Lahore, Islamabad and more — and by role such as call center, IT, marketing and data entry. New jobs are added daily.',
  },
  {
    question: 'Are there jobs for freshers in Pakistan on ListPak?',
    answer:
      'Yes. ListPak lists fresher and student-friendly jobs including evening-shift call center roles, internships, data entry and remote positions that do not require prior experience.',
  },
  {
    question: 'Is it free to apply for jobs on ListPak?',
    answer: 'Yes, applying for jobs on ListPak is completely free for job seekers.',
  },
  {
    question: 'How can employers post a job on ListPak?',
    answer:
      'Employers can post a job on ListPak from the Post a Job page. Listings include structured JobPosting data so they can appear in Google job results.',
  },
]

export default async function JobsPage() {
  const allJobs = await getAllJobs(false)
  const top20Jobs = allJobs.slice(0, 20)

  // ItemList schema of the latest 20 job posts
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Latest Jobs in Pakistan 2026',
    description: 'Top job vacancies across Karachi, Lahore, Islamabad and remote in Pakistan.',
    numberOfItems: top20Jobs.length,
    itemListElement: top20Jobs.map((job, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${job.title} at ${job.company} in ${job.city}`,
      url: toCanonicalUrl(`jobs/${getPublicJobSlug(job)}`),
    })),
  }

  // FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: JOBS_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://listpak.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Jobs',
        item: 'https://listpak.com/jobs/',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-blue-700 underline">Home</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Jobs</span>
      </nav>

      {/* Jobs Hero Header */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 mt-2">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Pakistan Employment Portal</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Jobs in Pakistan 2026
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
                Find the latest jobs in Pakistan — call center, IT, marketing, data entry &amp; remote jobs in Karachi, Lahore, Islamabad. New vacancies added daily. Apply free.
              </p>
            </div>

            <Link
              href="/post-job"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post a Job Free</span>
            </Link>
          </div>

          {/* Quick City Hub Links */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <span className="font-semibold text-slate-400">Popular Job Cities:</span>
            <Link href="/city/karachi" className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors">
              Karachi Jobs
            </Link>
            <Link href="/city/lahore" className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors">
              Lahore Jobs
            </Link>
            <Link href="/city/islamabad" className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors">
              Islamabad Jobs
            </Link>
            <Link href="/city/rawalpindi" className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors">
              Rawalpindi Jobs
            </Link>
            <Link href="/city/faisalabad" className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors">
              Faisalabad Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Main Interactive Jobs Listing & Search */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        <JobsFilterClient initialJobs={allJobs} />

        {/* Crawler-Accessible Complete Job Directory Links */}
        <section aria-label="Browse All Live Job Openings" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Complete Job Directory &amp; Latest Postings
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct links to all {allJobs.length} live job postings across Pakistan.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {allJobs.length} Active Openings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allJobs.map((job) => (
              <Link
                key={job.id}
                href={getPublicJobPath(job)}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 uppercase">
                    {job.city} • {job.type}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {job.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {job.company}
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-700 font-bold truncate max-w-[170px]">
                    {job.salary}
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                    Apply <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Visible Frequently Asked Questions Section (Matching FAQPage Schema) */}
        <section aria-labelledby="jobs-faq-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </span>
            <h3 id="jobs-faq-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Questions About Jobs in Pakistan
            </h3>
            <p className="text-xs text-slate-500">
              Answers to common questions about finding, applying, and posting jobs on ListPak.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {JOBS_FAQS.map((faq, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4 space-y-1.5' : 'space-y-1.5'}>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
