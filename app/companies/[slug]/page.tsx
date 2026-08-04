'use client'

import { use, useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CompanyItem, JobItem } from '@/lib/data'
import { getCompanyBySlug, getAllCompanies } from '@/lib/company-service'
import { getAllJobs } from '@/lib/job-service'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  Building2, MapPin, ShieldCheck, Star, Mail, Phone, Award, ArrowLeft, 
  Globe, Linkedin, Facebook, Twitter, Instagram, Youtube, Github, ExternalLink, 
  Briefcase, Calendar, Users, Check, MessageCircle, HelpCircle
} from 'lucide-react'

export default function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const [company, setCompany] = useState<CompanyItem | null>(null)
  const [activeJobs, setActiveJobs] = useState<JobItem[]>([])
  const [similarCompanies, setSimilarCompanies] = useState<CompanyItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const comp = await getCompanyBySlug(slug)
        if (comp) {
          setCompany(comp)
          const allJ = await getAllJobs(false)
          setActiveJobs(allJ.filter(j => j.companySlug === comp.slug || j.company.toLowerCase() === comp.name.toLowerCase()))

          const allC = await getAllCompanies(false)
          setSimilarCompanies(allC.filter(c => c.slug !== comp.slug).slice(0, 3))
        }
      } catch (err) {
        console.error('Error fetching company details:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 text-slate-400 text-sm">
          Loading company profile...
        </div>
        <Footer />
      </div>
    )
  }

  if (!company) {
    return notFound()
  }

  // Construct Organization Schema for SEO
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    description: company.description,
    url: company.website || `https://listpak.com/companies/${company.slug}`,
    logo: company.logo,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressRegion: company.province,
      addressCountry: company.country || 'Pakistan'
    },
    telephone: company.phone,
    email: company.companyEmail || company.hrEmail,
    sameAs: [company.linkedin, company.facebook, company.github, company.twitter].filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link href="/companies" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Companies Directory</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-3xl object-cover border-4 border-white/20 shadow-2xl bg-white shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{company.name}</h1>
                  {company.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Verified Employer</span>
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-blue-400">{company.industry} • {company.companyType}</p>
                <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{company.city}, Pakistan</span>
                  <span>•</span>
                  <span>{company.companySize}</span>
                  <span>•</span>
                  <span>Est. {company.establishedYear}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {company.linkedin && (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-4 h-4 fill-white" />
                  <span>LinkedIn Page</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Company Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">Company Overview & Culture</h2>
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
            {company.description}
          </p>
        </div>

        {/* HR Contact & Headquarter Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Headquarters & Recruitment Contact</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-bold block">HR Representative</span>
              <p className="font-extrabold text-slate-900 mt-0.5">{company.hrName || 'Talent Acquisition Team'}</p>
              <p className="text-slate-600">{company.hrDesignation || 'HR Lead'}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-bold block">HR Contact Email</span>
              <p className="font-extrabold text-blue-600 mt-0.5">{company.hrEmail || company.companyEmail || 'Contact via ListPak'}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-bold block">Headquarters Address</span>
              <p className="font-extrabold text-slate-900 mt-0.5">{company.address || company.headquarters}</p>
            </div>
          </div>
        </div>

        {/* Active Job Openings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              <span>Active Job Openings ({activeJobs.length})</span>
            </h2>
            <Link href="/post-job" className="text-xs font-bold text-blue-600 hover:underline">Post Job for {company.name}</Link>
          </div>

          {activeJobs.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4">No active job vacancies published at this time.</p>
          ) : (
            <div className="space-y-3">
              {activeJobs.map((job) => (
                <div key={job.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <Link href={`/jobs/${job.slug || job.id}`} className="font-extrabold text-slate-900 text-sm hover:text-blue-600">
                      {job.title}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">📍 {job.city} • {job.type} • {job.salary}</p>
                  </div>
                  <Link
                    href={`/jobs/${job.slug || job.id}`}
                    className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 cursor-pointer"
                  >
                    View & Apply
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar Hiring Companies */}
        {similarCompanies.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-base font-extrabold text-slate-900">Similar Hiring Companies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarCompanies.map((sim) => (
                <Link
                  key={sim.slug}
                  href={`/companies/${sim.slug}`}
                  className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md group space-y-2 block"
                >
                  <div className="flex items-center gap-3">
                    <img src={sim.logo} alt={sim.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-xs text-slate-900 group-hover:text-blue-600">{sim.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{sim.industry}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
