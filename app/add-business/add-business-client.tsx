'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Building2, MapPin, Phone, Mail, Globe, Upload, CheckCircle2, ShieldCheck, 
  Sparkles, ArrowRight, ArrowLeft, Star, ChevronDown, ChevronUp, Lock, Eye, 
  Award, TrendingUp, Zap, HelpCircle, FileText, Check, AlertCircle, PhoneCall, MessageCircle, Users, Briefcase
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES, CITIES } from '@/lib/data'
import { saveBusinessToDatabase } from '@/lib/db-service'
import { toast } from 'sonner'

const SUB_CATEGORIES: Record<string, string[]> = {
  'restaurants': ['Fast Food', 'Fine Dining', 'Cafe & Bakery', 'Catering & Events', 'Food Delivery'],
  'real-estate': ['Property Dealers', 'Builders & Developers', 'Commercial Leasing', 'Architectural Design'],
  'technology': ['Software Development', 'Web & Mobile Apps', 'IT Infrastructure', 'Digital Marketing'],
  'healthcare': ['Hospitals & Clinics', 'Specialist Doctors', 'Pharmacies', 'Diagnostic Labs'],
  'education': ['Schools & Colleges', 'Universities', 'Tuition Academies', 'Skill Institutes'],
  'retail': ['Clothing & Boutiques', 'Electronics & Mobile', 'Supermarkets', 'Jewelry & Watch'],
  'construction': ['Civil Contractors', 'Building Materials', 'Interior Decor', 'Architecture'],
  'automotive': ['Auto Showrooms', 'Mechanics & Repair', 'Car Spare Parts', 'Car Rental'],
  'finance': ['Chartered Accountants', 'Tax Advisory', 'Corporate Audit', 'Banking & Loans'],
  'travel': ['Umrah & Hajj Tours', 'Travel Agencies', 'Airline Ticketing', 'Visa Services'],
  'beauty': ['Salons & Parlors', 'Spas & Wellness', 'Gyms & Fitness', 'Skincare Clinics'],
  'logistics': ['Cargo & Transport', 'Courier Services', 'Freight Forwarding', 'Warehousing'],
}

const FAQS = [
  {
    q: 'Is listing my business on ListPak 100% free forever?',
    a: 'Yes, listing your business on ListPak is completely free forever. There are no setup fees, no monthly subscriptions, and no credit card required.'
  },
  {
    q: 'How long does it take for my business to rank on Google?',
    a: 'Once submitted, your business profile is indexed by Google search bots within 24 to 48 hours. Many Pakistani local businesses start appearing on page 1 of Google within 7 days.'
  },
  {
    q: 'Can I update my business information later?',
    a: 'Yes, you can edit your phone number, operating hours, address, services, photos, and description anytime from your owner dashboard.'
  },
  {
    q: 'How does business verification work?',
    a: 'After submitting your business, our compliance team verifies your phone number and official CNIC/registration document to grant your profile a green Verified Trust Badge.'
  }
]

export interface FormLocation {
  city: string
  address: string
  isPrimary: boolean
  citySearchQuery?: string
  isCityDropdownOpen?: boolean
}

export default function AddBusinessClient() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    subcategory: '',
    locations: [
      { city: '', address: '', isPrimary: true, citySearchQuery: '', isCityDropdownOpen: false }
    ] as FormLocation[],
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    description: '',
    services: '',
    proofDoc: ''
  })

  // Errors State
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Multi-Location Handlers
  const handleAddLocation = () => {
    setFormData(prev => ({
      ...prev,
      locations: [
        ...prev.locations,
        { city: '', address: '', isPrimary: prev.locations.length === 0, citySearchQuery: '', isCityDropdownOpen: false }
      ]
    }))
  }

  const handleRemoveLocation = (index: number) => {
    if (formData.locations.length <= 1) return
    setFormData(prev => {
      const updated = prev.locations.filter((_, i) => i !== index)
      if (!updated.some(l => l.isPrimary) && updated.length > 0) {
        updated[0].isPrimary = true
      }
      return { ...prev, locations: updated }
    })
  }

  const handleSetPrimaryLocation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.map((loc, i) => ({
        ...loc,
        isPrimary: i === index
      }))
    }))
  }

  const handleLocationCitySelect = (index: number, city: string) => {
    setFormData(prev => {
      const updated = [...prev.locations]
      updated[index] = {
        ...updated[index],
        city,
        isCityDropdownOpen: false,
        citySearchQuery: ''
      }
      return { ...prev, locations: updated }
    })
    setErrors(prev => {
      const newErrs = { ...prev }
      delete newErrs[`location_${index}_city`]
      return newErrs
    })
  }

  const handleLocationAddressChange = (index: number, address: string) => {
    setFormData(prev => {
      const updated = [...prev.locations]
      updated[index] = {
        ...updated[index],
        address
      }
      return { ...prev, locations: updated }
    })
    setErrors(prev => {
      const newErrs = { ...prev }
      delete newErrs[`location_${index}_address`]
      return newErrs
    })
  }

  const toggleLocationCityDropdown = (index: number) => {
    setFormData(prev => {
      const updated = [...prev.locations]
      updated[index] = {
        ...updated[index],
        isCityDropdownOpen: !updated[index].isCityDropdownOpen
      }
      return { ...prev, locations: updated }
    })
  }

  const handleLocationCitySearch = (index: number, query: string) => {
    setFormData(prev => {
      const updated = [...prev.locations]
      updated[index] = {
        ...updated[index],
        citySearchQuery: query
      }
      return { ...prev, locations: updated }
    })
  }

  const handleAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const loc = formData.locations[index]
      if (loc && loc.address.trim() && loc.city) {
        handleAddLocation()
        setTimeout(() => {
          const nextCityBtn = document.getElementById(`city-dropdown-btn-${index + 1}`)
          if (nextCityBtn) {
            nextCityBtn.focus()
          }
        }, 50)
      } else {
        toast.error('Please select a city and complete the physical address for Location ' + (index + 1) + ' before adding another.')
      }
    }
  }

  // Calculate completion percentage
  const calculateProgress = () => {
    let filled = 0
    if (formData.businessName) filled++
    if (formData.category) filled++
    if (formData.locations.some(l => l.city && l.address)) filled++
    if (formData.phone) filled++
    if (formData.whatsapp) filled++
    if (formData.description.length >= 50) filled++
    return Math.min(100, Math.round((filled / 6) * 100))
  }

  const validateStep = (step: number) => {
    const errs: Record<string, string> = {}
    if (step === 1) {
      if (!formData.businessName.trim()) errs.businessName = 'Business name is required'
      if (!formData.category) errs.category = 'Select a category'
    } else if (step === 2) {
      if (formData.locations.length === 0) {
        errs.locations = 'At least one location is required'
      } else {
        formData.locations.forEach((loc, idx) => {
          if (!loc.city) {
            errs[`location_${idx}_city`] = 'City selection is required'
          }
          if (!loc.address.trim()) {
            errs[`location_${idx}_address`] = 'Physical address is required'
          }

          // Duplicate location detection
          const currentKey = `${loc.city.toLowerCase()}|${loc.address.trim().toLowerCase()}`
          const isDuplicate = formData.locations.some((otherLoc, otherIdx) => {
            if (otherIdx === idx) return false
            const otherKey = `${otherLoc.city.toLowerCase()}|${otherLoc.address.trim().toLowerCase()}`
            return currentKey === otherKey && loc.city && loc.address.trim()
          })
          if (isDuplicate) {
            errs[`location_${idx}_address`] = 'This location (city & address) has already been added.'
          }
        })
      }
      if (!formData.phone.trim()) errs.phone = 'Phone number is required'
    } else if (step === 3) {
      const wordCount = formData.description.trim() ? formData.description.trim().split(/\s+/).filter(Boolean).length : 0
      if (wordCount < 250) {
        const remaining = 250 - wordCount
        errs.description = `Description must be at least 250 words for SEO indexing. Current: ${wordCount} words (${remaining} more words required).`
      }
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(4, prev + 1))
    } else {
      toast.error('Please complete all mandatory fields in this section.')
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(3)) return

    setIsSubmitting(true)
    try {
      const primaryLoc = formData.locations.find(l => l.isPrimary) || formData.locations[0] || { city: 'Karachi', address: 'Pakistan' }

      const saved = await saveBusinessToDatabase({
        name: formData.businessName,
        category: formData.category,
        categoryId: formData.category.toLowerCase().split(' ')[0],
        city: primaryLoc.city || 'Karachi',
        address: primaryLoc.address || 'Pakistan',
        locations: formData.locations.map(l => ({
          city: l.city,
          address: l.address,
          isPrimary: l.isPrimary
        })),
        cities: Array.from(new Set(formData.locations.map(l => l.city))),
        phone: formData.phone,
        whatsapp: formData.whatsapp || formData.phone.replace(/[^0-9]/g, ''),
        email: formData.email,
        website: formData.website,
        description: formData.description,
        services: formData.services ? formData.services.split(',').map(s => s.trim()) : ['General Services'],
        status: 'pending'
      })

      setSubmittedSlug(saved.slug)
      setIsSubmitting(false)
      toast.success('Your business submission has been received and is currently under review.')
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
      toast.error('An error occurred while saving your listing. Please try again.')
    }
  }

  const progress = calculateProgress()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-slate-50 to-[#F8FAFC] text-slate-900 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 overflow-hidden text-center">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200 text-xs font-bold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>SaaS Business Onboarding Portal</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Onboard Your Business to Pakistan&apos;s Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Ecosystem</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Reach thousands of potential customers, improve Google search ranking, and receive direct WhatsApp & phone inquiries nationwide — 100% free forever.
          </p>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-600 font-semibold flex-wrap">
            <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="w-4 h-4" /> 100% Free Forever</span>
            <span className="flex items-center gap-1 text-blue-600"><ShieldCheck className="w-4 h-4" /> Verified Trust Badge</span>
            <span className="flex items-center gap-1 text-purple-600"><TrendingUp className="w-4 h-4" /> High Google Search Ranking</span>
          </div>
        </div>
      </section>

      {/* MAIN ONBOARDING & FORM WIZARD */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-16">
        
        {submittedSlug ? (
          /* SUCCESS CONFIRMATION STATE (UNDER REVIEW) */
          <div className="bg-white rounded-3xl p-10 border border-slate-200/90 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Submission Under Administrative Review
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">Thank you for submitting your business.</h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Your listing for <strong className="text-slate-900">{formData.businessName}</strong> has been received successfully and is currently under review.
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Our team will review your submission. Once it has been approved by an administrator, it will become publicly visible on ListPak and eligible for search engine indexing.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <Link
                href="/"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all text-center"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* MULTI-STEP WIZARD */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT FORM COLUMN (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-8">
              
              {/* STEP PROGRESS BAR */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span className="text-blue-600">Step {currentStep} of 4</span>
                  <span>{progress}% Profile Complete</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${Math.max(currentStep * 25, progress)}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-4 gap-1 text-[11px] font-semibold text-center text-slate-400 pt-1">
                  <span className={currentStep >= 1 ? 'text-blue-600 font-bold' : ''}>1. Identity</span>
                  <span className={currentStep >= 2 ? 'text-blue-600 font-bold' : ''}>2. Location</span>
                  <span className={currentStep >= 3 ? 'text-blue-600 font-bold' : ''}>3. Details</span>
                  <span className={currentStep >= 4 ? 'text-blue-600 font-bold' : ''}>4. Verify</span>
                </div>
              </div>

              {/* STEP 1: BUSINESS IDENTITY */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in-50">
                  {/* Category Type Switcher Banner */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">What profile type are you creating on ListPak?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-white border-2 border-blue-600 rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-900">Business / Store</p>
                          <p className="text-[10px] text-slate-500">Retail shops & vendors</p>
                        </div>
                      </div>

                      <Link
                        href="/add-professional"
                        className="p-3 bg-white border border-slate-200 hover:border-blue-400 rounded-xl flex items-center gap-3 transition-all hover:bg-blue-50/50 group cursor-pointer"
                      >
                        <div className="p-2 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 rounded-lg shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600">Professional</p>
                          <p className="text-[10px] text-slate-500">Personal & Freelancer</p>
                        </div>
                      </Link>

                      <Link
                        href="/add-company"
                        className="p-3 bg-white border border-slate-200 hover:border-blue-400 rounded-xl flex items-center gap-3 transition-all hover:bg-blue-50/50 group cursor-pointer"
                      >
                        <div className="p-2 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 rounded-lg shrink-0">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600">Hiring Company / HR</p>
                          <p className="text-[10px] text-slate-500">Employers & Jobs</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Step 1: Business Identity & Category</h2>
                    <p className="text-xs text-slate-500 mt-1">Enter your registered or commercial trade name and industry taxonomy.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Al-Rehman Traders / Tech Solutions Pakistan"
                        className={`w-full px-4 py-3 bg-slate-50/80 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.businessName ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                        }`}
                      />
                      {errors.businessName && <span className="text-[11px] font-semibold text-red-500 mt-1 block">{errors.businessName}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Industry Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className={`w-full px-4 py-3 bg-slate-50/80 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer ${
                            errors.category ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                          }`}
                        >
                          <option value="">-- Select Business Category --</option>
                          {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                        {errors.category && <span className="text-[11px] font-semibold text-red-500 mt-1 block">{errors.category}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Subcategory Specialization</label>
                        <input
                          type="text"
                          value={formData.subcategory}
                          onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                          placeholder="e.g. Fast Food, Web Apps"
                          className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION & CONTACT */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Step 2: Business Locations & Contact Channels</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Add all physical branches, campuses, or store locations across cities. The first location is set as your Primary location.
                    </p>
                  </div>

                  {/* REPEATABLE LOCATIONS SECTION */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        Business Locations ({formData.locations.length} {formData.locations.length === 1 ? 'Location' : 'Locations'})
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        Press <strong>Enter</strong> in address to add another location
                      </span>
                    </div>

                    {formData.locations.map((loc, index) => {
                      const filteredCities = CITIES.filter(c =>
                        c.toLowerCase().includes((loc.citySearchQuery || '').toLowerCase().trim())
                      )

                      return (
                        <div 
                          key={index}
                          className={`p-5 rounded-2xl border transition-all space-y-4 ${
                            loc.isPrimary 
                              ? 'bg-blue-50/40 border-blue-200 shadow-xs' 
                              : 'bg-slate-50/60 border-slate-200'
                          }`}
                        >
                          <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-slate-200/60">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                                {index + 1}
                              </span>
                              <h4 className="text-sm font-extrabold text-slate-900">
                                Location {index + 1}
                              </h4>
                              {loc.isPrimary ? (
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                                  Primary Location
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimaryLocation(index)}
                                  className="text-[11px] text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
                                >
                                  Set as Primary
                                </button>
                              )}
                            </div>

                            {formData.locations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveLocation(index)}
                                className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                              >
                                Remove Location
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* City Selector for Location Block */}
                            <div className="relative">
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                City *
                              </label>
                              <div className="relative">
                                <button
                                  type="button"
                                  id={`city-dropdown-btn-${index}`}
                                  onClick={() => toggleLocationCityDropdown(index)}
                                  className={`w-full px-4 py-3 bg-white border rounded-2xl text-sm flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition ${
                                    errors[`location_${index}_city`] ? 'border-red-500 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  <span className={loc.city ? 'font-semibold text-slate-900' : 'text-slate-400'}>
                                    {loc.city ? loc.city : `-- Select City (${CITIES.length} Cities) --`}
                                  </span>
                                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-2 transition-transform duration-200 ${loc.isCityDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {loc.isCityDropdownOpen && (
                                  <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in-50 duration-150">
                                    <div className="p-2.5 border-b border-slate-100 bg-slate-50/80 sticky top-0">
                                      <input
                                        type="text"
                                        value={loc.citySearchQuery || ''}
                                        onChange={(e) => handleLocationCitySearch(index, e.target.value)}
                                        placeholder="Search city..."
                                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        autoFocus
                                      />
                                    </div>

                                    <div className="max-h-56 overflow-y-auto divide-y divide-slate-50 p-1">
                                      {filteredCities.length > 0 ? (
                                        filteredCities.map((city) => (
                                          <button
                                            key={city}
                                            type="button"
                                            onClick={() => handleLocationCitySelect(index, city)}
                                            className={`w-full px-3 py-2 text-left text-xs rounded-xl flex items-center justify-between transition ${
                                              loc.city === city
                                                ? 'bg-blue-50 text-blue-700 font-bold'
                                                : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                          >
                                            <span>{city}</span>
                                            {loc.city === city && <Check className="w-3.5 h-3.5 text-blue-600" />}
                                          </button>
                                        ))
                                      ) : (
                                        <div className="p-4 text-center text-xs text-slate-400">
                                          No matching city found
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              {errors[`location_${index}_city`] && (
                                <span className="text-[11px] font-semibold text-red-500 mt-1 block">{errors[`location_${index}_city`]}</span>
                              )}
                            </div>

                            {/* Physical Address Input */}
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Physical Address *
                              </label>
                              <input
                                type="text"
                                value={loc.address}
                                onChange={(e) => handleLocationAddressChange(index, e.target.value)}
                                onKeyDown={(e) => handleAddressKeyDown(e, index)}
                                placeholder="Plot / Shop / Building number, Street, Area"
                                className={`w-full px-4 py-3 bg-white border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                                  errors[`location_${index}_address`] ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                                }`}
                              />
                              {errors[`location_${index}_address`] && (
                                <span className="text-[11px] font-semibold text-red-500 mt-1 block">{errors[`location_${index}_address`]}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {/* ADD ANOTHER LOCATION BUTTON */}
                    <button
                      type="button"
                      onClick={handleAddLocation}
                      className="w-full py-3.5 px-4 bg-slate-50 hover:bg-blue-50 border-2 border-dashed border-slate-300 hover:border-blue-400 text-blue-700 font-extrabold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>+ Add Another Location / Branch</span>
                    </button>
                  </div>

                  {/* CONTACT CHANNELS */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <h3 className="text-sm font-extrabold text-slate-900">Contact Channels</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Mobile / Phone *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+92 300 1234567"
                          className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        {errors.phone && <span className="text-[11px] font-semibold text-red-500 mt-1 block">{errors.phone}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">WhatsApp Inquiry Number</label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="923001234567"
                          className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Official Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="contact@business.pk"
                          className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Official Website URL (Optional)</label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://company.pk"
                          className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DESCRIPTION & SERVICES */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Step 3: Business Profile & Services</h2>
                    <p className="text-xs text-slate-500 mt-1">Provide a high-quality description to improve Google SEO ranking.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold text-slate-700">Detailed Business Description * (Minimum 250 Words Required)</label>
                        <span className="text-[11px] text-slate-400 font-semibold">{formData.description.trim() ? formData.description.trim().split(/\s+/).filter(Boolean).length : 0} words</span>
                      </div>
                      
                      {/* Live Word Counter Gauge */}
                      {(() => {
                        const currentWords = formData.description.trim() ? formData.description.trim().split(/\s+/).filter(Boolean).length : 0
                        const remaining = Math.max(0, 250 - currentWords)
                        return (
                          <div className="p-3 mb-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs flex flex-wrap justify-between items-center gap-2 font-semibold">
                            <span className="text-slate-700">Current Words: <strong className="text-blue-600">{currentWords}</strong></span>
                            <span className="text-slate-700">Minimum Required: <strong>250</strong></span>
                            <span className={currentWords >= 250 ? "text-emerald-600 font-bold flex items-center gap-1" : "text-amber-600 font-bold"}>
                              {currentWords >= 250 ? "✓ 250 Words Requirement Met" : `${remaining} more words required`}
                            </span>
                          </div>
                        )
                      })()}

                      <textarea
                        rows={7}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your business background, operating philosophy, product ranges, delivery terms, quality guarantees, and customer policies in detail (at least 250 words required for SEO)..."
                        className={`w-full px-4 py-3 bg-slate-50/80 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          errors.description ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                        }`}
                      />
                      {errors.description && <span className="text-[11px] font-semibold text-red-500 mt-1 block">{errors.description}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Products / Services Offered (Comma separated)</label>
                      <input
                        type="text"
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                        placeholder="e.g. Free Delivery, 24/7 Support, Wholesale Pricing"
                        className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Business Logo / Featured Photo (Optional)</label>
                      <label className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors block">
                        {logoPreview ? (
                          <div className="flex items-center justify-center gap-4">
                            <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs" />
                            <div className="text-left">
                              <span className="text-xs font-bold text-emerald-600 block">✓ Logo / Photo Uploaded</span>
                              <span className="text-[11px] text-slate-500 block">Click box to upload a different image</span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                            <span className="text-xs text-slate-600 font-medium block">Click to upload business logo or storefront photo</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Supports JPG, PNG, WEBP (Max 5MB)</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                setLogoPreview(reader.result as string)
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: VERIFICATION REVIEW */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Step 4: Final Review & Ownership Verification</h2>
                    <p className="text-xs text-slate-500 mt-1">Review listing details before publishing to Pakistan&apos;s digital directory.</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="font-bold text-slate-500">Business Name:</span>
                      <span className="font-extrabold text-slate-900">{formData.businessName || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="font-bold text-slate-500">Category & Locations:</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {formData.category || 'General'} in {formData.locations[0]?.city || 'Pakistan'}
                        {formData.locations.length > 1 && ` (+${formData.locations.length - 1} more)`}
                      </span>
                    </div>
                    <div className="border-b border-slate-200/60 pb-2 space-y-1">
                      <span className="font-bold text-slate-500 block">Registered Branches ({formData.locations.length}):</span>
                      {formData.locations.map((l, i) => (
                        <p key={i} className="text-slate-700 font-medium text-[11px]">
                          • <strong>{l.city || 'City'}:</strong> {l.address || 'Address'} {l.isPrimary && '(Primary)'}
                        </p>
                      ))}
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-2">
                      <span className="font-bold text-slate-500">Phone & WhatsApp:</span>
                      <span className="font-semibold text-slate-800">{formData.phone} / {formData.whatsapp || 'Same'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block mb-1">Description:</span>
                      <p className="text-slate-700 leading-relaxed">{formData.description || 'No description provided.'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* WIZARD BUTTON ACTIONS */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back Section</span>
                  </button>
                ) : <div></div>}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-emerald-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{isSubmitting ? 'Publishing Listing...' : 'Publish Business Free'}</span>
                  </button>
                )}
              </div>

            </div>

            {/* RIGHT SIDEBAR: STICKY LIVE PREVIEW CARD (4 Cols) */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    Live Listing Preview
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Draft
                  </span>
                </div>

                {/* Simulated Business Card */}
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-200/80 space-y-3">
                  <div className="flex items-start gap-3">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shrink-0">
                        {formData.businessName ? formData.businessName.charAt(0).toUpperCase() : 'B'}
                      </div>
                    )}
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-extrabold text-slate-900 text-sm truncate">
                        {formData.businessName || 'Your Business Name'}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500">{formData.category}</p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>5.0 (New Listing)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {formData.description || 'Your business description will appear here as you type...'}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {formData.locations[0]?.city || 'Pakistan'}
                      {formData.locations.length > 1 && ` (+${formData.locations.length - 1} branches)`}
                    </span>
                    <span className="font-bold text-blue-600">{formData.phone || '+92 300 0000000'}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-2 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant Google Search Indexing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Direct Customer Phone & WhatsApp Calls</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* LONG-FORM VALUE SECTION 1: WHY LIST YOUR BUSINESS */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Ecosystem Advantages</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why List Your Business on ListPak?
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              ListPak provides Pakistani businesses with the digital infrastructure needed to grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Google Search Visibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rank on page 1 of Google for local keywords like &quot;best service in [your city]&quot; with our high domain authority profile schema.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Direct Customer Inquiries</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customers click directly to call your phone number or initiate a WhatsApp chat with zero intermediaries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">100% Free Forever</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero listing fees, zero commission per lead, and zero monthly subscriptions. Enjoy free listing forever.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Verified Trust Badge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Build instant trust with Pakistani customers through our CNIC and commercial verification seal.
              </p>
            </div>
          </div>
        </section>

        {/* VALUE SECTION 2: FEATURE COMPARISON TABLE */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">ListPak Feature Standards</h2>
            <p className="text-slate-500 text-xs">Comparing ListPak free ecosystem benefits with traditional directories.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Feature Capabilities</th>
                  <th className="p-3.5">Old Classified Directories</th>
                  <th className="p-3.5 rounded-r-xl bg-blue-600 text-white">ListPak Ecosystem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Google Search Indexing & Schema</td>
                  <td className="p-3.5 text-slate-400">Basic / Slow</td>
                  <td className="p-3.5 font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Instant LocalBusiness JSON-LD
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">WhatsApp & Phone Lead Action Buttons</td>
                  <td className="p-3.5 text-slate-400">Hidden / Paid</td>
                  <td className="p-3.5 font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 100% Free Direct Access
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Interactive Customer Reviews & Photos</td>
                  <td className="p-3.5 text-slate-400">Not Available</td>
                  <td className="p-3.5 font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Included Free
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Mobile & Tablet Optimized UX</td>
                  <td className="p-3.5 text-slate-400">Outdated Layout</td>
                  <td className="p-3.5 font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Stripe/Linear Grade UI
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* VALUE SECTION 3: FREQUENTLY ASKED QUESTIONS */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Onboarding FAQ</h2>
            <p className="text-slate-500 text-xs">Everything you need to know about listing your business.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-200/80 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 bg-slate-50/80 hover:bg-slate-100/80 font-bold text-slate-900 text-xs sm:text-sm text-left flex justify-between items-center transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white text-slate-600 text-xs leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
