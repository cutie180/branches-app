'use client'

import { use, useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ProfessionalItem } from '@/lib/data'
import { getProfessionalByUsername, getAllProfessionals } from '@/lib/professional-service'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  Users, MapPin, ShieldCheck, Star, Mail, Phone, Award, CheckCircle2, ArrowLeft, 
  Globe, Linkedin, Github, Facebook, Twitter, Instagram, Youtube, MessageCircle, ExternalLink, 
  Briefcase, Calendar, GraduationCap, Building2, Check, Stethoscope, Code, Palette, Wrench, HelpCircle, Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

export default function ProfessionalDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params)
  const username = resolvedParams.username

  const [pro, setPro] = useState<ProfessionalItem | null>(null)
  const [similarPros, setSimilarPros] = useState<ProfessionalItem[]>([])
  const [loading, setLoading] = useState(true)

  // Inquiry Modal State
  const [showContactModal, setShowContactModal] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')

  // Review Submission Modal
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerRating, setReviewerRating] = useState(5)
  const [reviewerComment, setReviewerComment] = useState('')

  // FAQ Accordion Toggle
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const item = await getProfessionalByUsername(username)
        if (item) {
          setPro(item)
          const all = await getAllProfessionals(false)
          setSimilarPros(all.filter(p => p.username !== item.username).slice(0, 3))
        }
      } catch (err) {
        console.error('Error fetching professional:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 text-slate-400 text-sm">
          Loading professional profile...
        </div>
        <Footer />
      </div>
    )
  }

  if (!pro) {
    return notFound()
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!senderName || !senderEmail || !message) {
      toast.error('Please enter all required fields.')
      return
    }
    setShowContactModal(false)
    setSenderName('')
    setSenderEmail('')
    setMessage('')
    toast.success(`Message dispatched directly to ${pro.name}!`)
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewerName || !reviewerComment) {
      toast.error('Please complete all review fields.')
      return
    }
    const newRev = {
      id: 'rev-' + Date.now(),
      userName: reviewerName,
      rating: reviewerRating,
      date: 'Just now',
      comment: reviewerComment
    }
    setPro(prev => prev ? { ...prev, reviews: [newRev, ...(prev.reviews || [])] } : prev)
    setShowReviewModal(false)
    setReviewerName('')
    setReviewerComment('')
    toast.success('Thank you! Your review has been recorded.')
  }

  // Gather social links
  const socialLinks = [
    { label: 'LinkedIn (Primary Profile)', url: pro.linkedin, icon: Linkedin, color: 'text-blue-700 bg-blue-50 border-blue-300 font-extrabold ring-2 ring-blue-500/20' },
    { label: 'GitHub', url: pro.github, icon: Github, color: 'text-slate-900 bg-slate-100 border-slate-300' },
    { label: 'Portfolio', url: pro.portfolio || pro.website, icon: Globe, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { label: 'WhatsApp', url: pro.whatsapp ? `https://wa.me/${pro.whatsapp}` : undefined, icon: MessageCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Email', url: pro.email ? `mailto:${pro.email}` : undefined, icon: Mail, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { label: 'Phone', url: pro.phone ? `tel:${pro.phone}` : undefined, icon: Phone, color: 'text-slate-800 bg-slate-100 border-slate-300' },
    { label: 'Twitter / X', url: pro.twitter, icon: Twitter, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { label: 'Instagram', url: pro.instagram, icon: Instagram, color: 'text-pink-600 bg-pink-50 border-pink-200' },
    { label: 'Facebook', url: pro.facebook, icon: Facebook, color: 'text-blue-800 bg-blue-50 border-blue-200' },
    { label: 'YouTube', url: pro.youtube, icon: Youtube, color: 'text-red-600 bg-red-50 border-red-200' },
    { label: 'Behance', url: pro.behance, icon: Globe, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { label: 'Dribbble', url: pro.dribbble, icon: Globe, color: 'text-pink-600 bg-pink-50 border-pink-200' },
    { label: 'Medium', url: pro.medium, icon: Globe, color: 'text-slate-800 bg-slate-100 border-slate-300' },
    { label: 'Stack Overflow', url: pro.stackoverflow, icon: Globe, color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { label: 'Upwork', url: pro.upwork, icon: Briefcase, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { label: 'Fiverr', url: pro.fiverr, icon: Briefcase, color: 'text-green-600 bg-green-50 border-green-200' },
    { label: 'Freelancer', url: pro.freelancer, icon: Briefcase, color: 'text-sky-700 bg-sky-50 border-sky-200' },
    { label: 'Kaggle', url: pro.kaggle, icon: Globe, color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
    { label: 'ResearchGate', url: pro.researchgate, icon: Globe, color: 'text-teal-700 bg-teal-50 border-teal-200' },
    { label: 'ORCID', url: pro.orcid, icon: Globe, color: 'text-green-700 bg-green-50 border-green-200' },
    { label: 'Google Scholar', url: pro.googleScholar, icon: Globe, color: 'text-blue-800 bg-blue-50 border-blue-200' },
    ...(pro.customSocialLinks || []).map(c => ({ label: c.name, url: c.url, icon: ExternalLink, color: 'text-slate-700 bg-slate-100 border-slate-300' }))
  ].filter(link => Boolean(link.url))

  // Construct JSON-LD Schemas for SEO
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: pro.name,
    jobTitle: pro.title,
    description: pro.bio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: pro.city,
      addressRegion: pro.province,
      addressCountry: pro.country || 'Pakistan'
    },
    telephone: pro.phone,
    email: pro.email,
    sameAs: socialLinks.map(s => s.url)
  }

  const jsonLdProfilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: jsonLdPerson
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.listpak.com/' },
      { '@type': 'ListItem', position: 2, name: 'Professionals', item: 'https://www.listpak.com/professionals' },
      { '@type': 'ListItem', position: 3, name: pro.name, item: `https://www.listpak.com/professionals/${pro.username}` }
    ]
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* JSON-LD SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLdPerson, jsonLdProfilePage, jsonLdBreadcrumb]) }}
      />

      {/* Cover Header Banner */}
      <section className="relative bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between">
            <Link href="/professionals" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Professionals Network</span>
            </Link>

            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {pro.availability || 'Open to Work'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={pro.avatar}
                alt={pro.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20 shadow-2xl shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{pro.name}</h1>
                  {pro.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Verified Profile</span>
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-blue-400">{pro.title}</p>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {pro.city}, {pro.province || 'Pakistan'}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {pro.rating} ({pro.reviewCount || 2} reviews)
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{pro.experienceYears}+ Years Exp</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {pro.linkedin && (
                <a
                  href={pro.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Linkedin className="w-4 h-4 fill-white" />
                  <span>Connect on LinkedIn</span>
                </a>
              )}

              <button
                onClick={() => setShowContactModal(true)}
                className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Professional</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Dedicated Social Links & Contact Card */}
        {socialLinks.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Public Social Links & Portfolios</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 rounded-xl border text-xs flex items-center gap-2 transition-all hover:scale-105 cursor-pointer ${item.color}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Short Bio & Detailed About */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">About & Career Background</h2>
          <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 leading-relaxed">
            {pro.bio}
          </p>
          {pro.about && (
            <p className="text-xs text-slate-600 leading-relaxed space-y-2 whitespace-pre-line">
              {pro.about}
            </p>
          )}
        </div>

        {/* Dynamic Profession-Specific Details Card */}
        {pro.dynamicFields && Object.keys(pro.dynamicFields).length > 0 && (
          <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl p-6 border border-blue-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-extrabold text-blue-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{pro.profession} Domain Credentials</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(pro.dynamicFields).map(([key, val]) => {
                if (!val) return null
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())
                return (
                  <div key={key} className="p-3 bg-white rounded-xl border border-blue-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{formattedKey}</span>
                    <p className="font-extrabold text-slate-900">{val.toString()}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Verified Skills & Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Skills & Competencies</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {pro.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Services Offered</span>
            </h2>
            <div className="space-y-2 text-xs">
              {pro.servicesOffered && pro.servicesOffered.length > 0 ? (
                pro.servicesOffered.map((serv, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{serv}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">Custom professional consultation and project contracts.</p>
              )}
            </div>
          </div>
        </div>

        {/* Work Experience Timeline */}
        {pro.previousExperience && pro.previousExperience.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Work Experience Timeline</h2>
            <div className="space-y-4">
              {pro.previousExperience.map((exp, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-extrabold text-slate-900 text-sm">{exp.title}</h3>
                    <span className="text-xs font-bold text-blue-600">{exp.duration}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600">{exp.company}</p>
                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pro.education && pro.education.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>Education & Degrees</span>
              </h2>
              <div className="space-y-3 text-xs">
                {pro.education.map((edu, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-extrabold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-600 font-medium">{edu.institution}</p>
                    <p className="text-slate-400 font-mono text-[10px] mt-0.5">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pro.certifications && pro.certifications.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Certifications & Licenses</span>
              </h2>
              <div className="space-y-3 text-xs">
                {pro.certifications.map((cert, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-extrabold text-slate-900">{cert.title}</p>
                    <p className="text-slate-600 font-medium">{cert.issuer}</p>
                    <p className="text-slate-400 font-mono text-[10px] mt-0.5">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Ratings & Client Reviews</h2>
              <p className="text-xs text-slate-500">Feedback from clients and colleagues on ListPak.</p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Write a Review
            </button>
          </div>

          <div className="space-y-4">
            {pro.reviews && pro.reviews.length > 0 ? (
              pro.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-900">{rev.userName}</span>
                    <span className="text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No reviews submitted yet.</p>
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        {pro.faqs && pro.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-3">
              {pro.faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs text-slate-900 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span>{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Professionals Internal Linking */}
        {similarPros.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-base font-extrabold text-slate-900">Similar Verified Professionals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarPros.map((sim) => (
                <Link
                  key={sim.username}
                  href={`/professionals/${sim.username}`}
                  className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md group space-y-2 block"
                >
                  <div className="flex items-center gap-3">
                    <img src={sim.avatar} alt={sim.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-xs text-slate-900 group-hover:text-blue-600">{sim.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{sim.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Contact Inquiry Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Send Inquiry to {pro.name}</h3>
              <button onClick={() => setShowContactModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg">✕</button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Inquiry Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project scope or consulting requirements..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Write Review for {pro.name}</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg">✕</button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Asad Shah"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating</label>
                <select
                  value={reviewerRating}
                  onChange={(e) => setReviewerRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-amber-600"
                >
                  <option value={5}>★★★★★ (5/5) Excellent</option>
                  <option value={4}>★★★★☆ (4/5) Very Good</option>
                  <option value={3}>★★★☆☆ (3/5) Average</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Review Feedback *</label>
                <textarea
                  rows={4}
                  required
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  placeholder="Share details of your experience with this professional..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Submit Review
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
