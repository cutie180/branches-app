'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  User, Briefcase, MapPin, Phone, Mail, Globe, Upload, CheckCircle2, ShieldCheck, 
  Sparkles, ArrowRight, ArrowLeft, Star, ChevronDown, ChevronUp, Lock, Award, 
  Linkedin, Github, Facebook, Instagram, Twitter, Youtube, Plus, Trash2, Check,
  FileText, ExternalLink, MessageCircle, AlertCircle, Building2, Stethoscope,
  Code, Palette, GraduationCap, Wrench, Scale, Calculator
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CITIES, CATEGORIES } from '@/lib/data'
import { saveProfessionalToDatabase } from '@/lib/professional-service'
import { toast } from 'sonner'

// Professions list
const POPULAR_PROFESSIONS = [
  'Software Developer',
  'Doctor',
  'Dentist',
  'Lawyer',
  'Architect',
  'Civil Engineer',
  'Teacher / Educator',
  'Tutor',
  'Chartered Accountant',
  'Graphic Designer',
  'Writer / Content Creator',
  'Photographer',
  'Videographer',
  'Digital Marketer',
  'SEO Expert',
  'Social Media Manager',
  'AI Engineer',
  'Data Scientist',
  'Mobile App Developer',
  'Electrician',
  'Plumber',
  'Carpenter',
  'Auto Mechanic',
  'Welder',
  'Driver',
  'Delivery Rider',
  'Security Guard',
  'Construction Worker',
  'Tailor',
  'Beautician / Hair Stylist',
  'Fitness Trainer',
  'Freelancer',
  'Student / Fresh Graduate',
  'Job Seeker',
  'Consultant',
  'Other Professional'
]

// Availability options
const AVAILABILITY_OPTIONS = [
  'Open to Work (Full-time)',
  'Available for Freelance / Contracts',
  'Part-time / Hourly Consulting',
  'In-Clinic / In-Person Consultation',
  'Remote Only',
  'Not Looking Currently'
]

export default function AddProfessionalClient() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedUsername, setSubmittedUsername] = useState<string | null>(null)

  // Searchable City state
  const [citySearch, setCitySearch] = useState('')
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const filteredCities = CITIES.filter(c => c.toLowerCase().includes(citySearch.toLowerCase().trim()))

  // Skills input state
  const [skillInput, setSkillInput] = useState('')
  const [customSocialName, setCustomSocialName] = useState('')
  const [customSocialUrl, setCustomSocialUrl] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    profession: 'Software Developer',
    category: 'Professional / Job Seeker',
    specialization: '',
    shortBio: '',
    about: '',
    experienceYears: '3',
    availability: 'Open to Work (Full-time)',
    currentCompany: '',
    hourlyRate: 'PKR 3,000 / hr',
    
    // Skills & Arrays
    skills: ['Communication', 'Problem Solving'] as string[],
    languages: ['Urdu', 'English'] as string[],
    servicesOffered: [] as string[],
    
    // Education & Work
    education: [{ degree: '', institution: '', year: '' }],
    certifications: [{ title: '', issuer: '', year: '' }],
    previousExperience: [{ title: '', company: '', duration: '', description: '' }],

    // Location & Contact
    city: 'Lahore',
    province: 'Punjab',
    country: 'Pakistan',
    address: '',
    googleMapUrl: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    portfolio: '',
    resumeUrl: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',

    // Social Links (Highlighted LinkedIn + 16 platforms)
    linkedin: '',
    github: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    behance: '',
    dribbble: '',
    stackoverflow: '',
    medium: '',
    fiverr: '',
    upwork: '',
    freelancer: '',
    kaggle: '',
    researchgate: '',
    orcid: '',
    googleScholar: '',
    customSocialLinks: [] as Array<{ name: string; url: string }>,

    // Dynamic fields depending on profession
    dynamicFields: {} as Record<string, string>
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Skill management
  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }))
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }))
  }

  // Custom Social Link management
  const addCustomSocialLink = () => {
    if (customSocialName.trim() && customSocialUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        customSocialLinks: [...prev.customSocialLinks, { name: customSocialName.trim(), url: customSocialUrl.trim() }]
      }))
      setCustomSocialName('')
      setCustomSocialUrl('')
    }
  }

  const removeCustomSocialLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customSocialLinks: prev.customSocialLinks.filter((_, i) => i !== index)
    }))
  }

  // Dynamic profession field updater
  const updateDynamicField = (key: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      dynamicFields: { ...prev.dynamicFields, [key]: val }
    }))
  }

  // Repeatable array handlers
  const addEdu = () => setFormData(p => ({ ...p, education: [...p.education, { degree: '', institution: '', year: '' }] }))
  const removeEdu = (idx: number) => setFormData(p => ({ ...p, education: p.education.filter((_, i) => i !== idx) }))

  const addCert = () => setFormData(p => ({ ...p, certifications: [...p.certifications, { title: '', issuer: '', year: '' }] }))
  const removeCert = (idx: number) => setFormData(p => ({ ...p, certifications: p.certifications.filter((_, i) => i !== idx) }))

  const addExp = () => setFormData(p => ({ ...p, previousExperience: [...p.previousExperience, { title: '', company: '', duration: '', description: '' }] }))
  const removeExp = (idx: number) => setFormData(p => ({ ...p, previousExperience: p.previousExperience.filter((_, i) => i !== idx) }))

  // Step validation
  const validateStep = (step: number) => {
    const errs: Record<string, string> = {}
    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full Name is required'
      if (!formData.title.trim()) errs.title = 'Professional Title is required'
      if (!formData.profession.trim()) errs.profession = 'Please select or type your profession'
      if (!formData.shortBio.trim() || formData.shortBio.length < 20) {
        errs.shortBio = 'Short bio must be at least 20 characters'
      }
    }
    if (step === 3) {
      if (formData.skills.length === 0) errs.skills = 'Add at least 1 core skill'

      const currentYear = new Date().getFullYear()
      const minYear = 1950
      const maxGraduationYear = currentYear + 6
      const maxCertYear = currentYear + 5

      formData.education.forEach((edu, idx) => {
        if (edu.year.trim()) {
          const yrNum = parseInt(edu.year, 10)
          if (isNaN(yrNum) || yrNum < minYear || yrNum > maxGraduationYear) {
            errs[`eduYear_${idx}`] = `Year must be between ${minYear} and ${maxGraduationYear}`
          }
        }
      })

      formData.certifications.forEach((cert, idx) => {
        if (cert.year.trim()) {
          const yrNum = parseInt(cert.year, 10)
          if (isNaN(yrNum) || yrNum < minYear || yrNum > maxCertYear) {
            errs[`certYear_${idx}`] = `Year must be between ${minYear} and ${maxCertYear}`
          }
        }
      })
    }
    if (step === 4) {
      if (!formData.city) errs.city = 'City is required'
      if (!formData.email.trim()) errs.email = 'Email address is required'
      if (!formData.phone.trim()) errs.phone = 'Phone number is required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(4)) {
      toast.error('Please complete all required fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const createdPro = await saveProfessionalToDatabase({
        ...formData,
        experienceYears: Number(formData.experienceYears) || 0
      })
      setSubmittedUsername(createdPro.username)
      toast.success('Professional Profile submitted successfully!')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      toast.error('Failed to submit profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
              <User className="w-3.5 h-3.5" />
              <span>Personal Professional Profile</span>
            </span>
            <div className="text-xs text-slate-400 font-medium">
              Free • Indexable on Google • Green Verified Badge
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Create Your Public Professional Profile & Portfolio
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
            For individuals, freelancers, doctors, software engineers, teachers, skilled workers, and job seekers across Pakistan.
          </p>

          {/* Mode switch helper banner */}
          <div className="pt-2 flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs">
            <span className="text-slate-300 font-medium">Registering a Store, Shop, or Business Company instead?</span>
            <Link href="/add-business" className="text-blue-400 hover:text-blue-300 font-bold underline flex items-center gap-1 shrink-0">
              <Building2 className="w-3.5 h-3.5" />
              <span>Go to Business Registration</span>
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {submittedUsername ? (
          /* Confirmation State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Profile Under Compliance Review</span>
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Congratulations, {formData.fullName}!
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Your professional profile as <strong className="text-slate-900">{formData.title}</strong> has been submitted. Our compliance team will review and publish your SEO profile within 24 hours.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-left max-w-md mx-auto">
              <div className="flex justify-between text-slate-600">
                <span>Profile Slug:</span>
                <span className="font-mono text-slate-900 font-bold">/professionals/{submittedUsername}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Status:</span>
                <span className="text-amber-600 font-extrabold">Pending Admin Approval</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/professionals/${submittedUsername}`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Preview Your Profile Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/professionals"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                Explore Professionals Network
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-step Form */
          <div className="space-y-8">
            {/* Step Progress Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs grid grid-cols-5 gap-2 text-center text-xs">
              {[
                { num: 1, label: 'Basic Info' },
                { num: 2, label: 'Profession Template' },
                { num: 3, label: 'Skills & Exp' },
                { num: 4, label: 'Location & Contact' },
                { num: 5, label: 'Social & Review' }
              ].map(s => (
                <div
                  key={s.num}
                  onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                  className={`py-2 px-1 rounded-xl transition-all font-bold ${
                    currentStep === s.num
                      ? 'bg-blue-600 text-white shadow-md'
                      : currentStep > s.num
                      ? 'bg-blue-50 text-blue-700 cursor-pointer'
                      : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  <span>Step {s.num}</span>
                  <span className="hidden sm:inline block text-[11px] font-normal">{s.label}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
              
              {/* STEP 1: BASIC INFO */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Personal & Professional Identity</h2>
                    <p className="text-xs text-slate-500 mt-1">This information identifies you to employers and clients searching ListPak.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                        placeholder="e.g. Muhammad Ali Khan"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Professional Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. Senior Next.js Developer, Consultant Doctor, Electrician"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.title && <p className="text-red-500 text-[11px] mt-1">{errors.title}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select Profession *</label>
                      <select
                        value={formData.profession}
                        onChange={(e) => setFormData(p => ({ ...p, profession: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      >
                        {POPULAR_PROFESSIONS.map(prof => (
                          <option key={prof} value={prof}>{prof}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category / Specialization</label>
                      <input
                        type="text"
                        value={formData.specialization}
                        onChange={(e) => setFormData(p => ({ ...p, specialization: e.target.value }))}
                        placeholder="e.g. Dermatology, Full Stack Web, Solar Wiring"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Years of Experience</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={formData.experienceYears}
                        onChange={(e) => setFormData(p => ({ ...p, experienceYears: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Current Company (Optional)</label>
                      <input
                        type="text"
                        value={formData.currentCompany}
                        onChange={(e) => setFormData(p => ({ ...p, currentCompany: e.target.value }))}
                        placeholder="e.g. Self-Employed or Tech Firm"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Availability</label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData(p => ({ ...p, availability: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      >
                        {AVAILABILITY_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Professional Bio (Public snippet) *</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.shortBio}
                      onChange={(e) => setFormData(p => ({ ...p, shortBio: e.target.value }))}
                      placeholder="Briefly describe your expertise, key skills, and what you offer to clients or employers..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.shortBio && <p className="text-red-500 text-[11px] mt-1">{errors.shortBio}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Detailed About Section (Full background)</label>
                    <textarea
                      rows={5}
                      value={formData.about}
                      onChange={(e) => setFormData(p => ({ ...p, about: e.target.value }))}
                      placeholder="Write your detailed background, career history, approach to work, major accomplishments, and mission..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: DYNAMIC PROFESSION FIELDS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{formData.profession} Specific Fields</span>
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900">Profession-Specific Dynamic Details</h2>
                    <p className="text-xs text-slate-500 mt-1">Provide domain details tailored to your profession.</p>
                  </div>

                  {/* Doctor Template */}
                  {formData.profession.toLowerCase().includes('doctor') || formData.profession.toLowerCase().includes('dentist') ? (
                    <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-4">
                      <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                        <span>Medical Doctor & Healthcare Credentials</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">PMDC Registration Number</label>
                          <input
                            type="text"
                            placeholder="e.g. PMDC-12345-S"
                            value={formData.dynamicFields.pmdcNumber || ''}
                            onChange={(e) => updateDynamicField('pmdcNumber', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Hospital / Clinic Name</label>
                          <input
                            type="text"
                            placeholder="e.g. South City Hospital Clifton"
                            value={formData.dynamicFields.hospitalClinic || ''}
                            onChange={(e) => updateDynamicField('hospitalClinic', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Fee</label>
                          <input
                            type="text"
                            placeholder="e.g. PKR 3,000 / consultation"
                            value={formData.dynamicFields.consultationFee || ''}
                            onChange={(e) => updateDynamicField('consultationFee', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Working / OPD Hours</label>
                          <input
                            type="text"
                            placeholder="e.g. Mon - Sat: 4:00 PM - 8:00 PM"
                            value={formData.dynamicFields.workingHours || ''}
                            onChange={(e) => updateDynamicField('workingHours', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ) : formData.profession.toLowerCase().includes('developer') || formData.profession.toLowerCase().includes('engineer') ? (
                    /* Web Developer Template */
                    <div className="p-5 bg-cyan-50/60 rounded-2xl border border-cyan-200 space-y-4">
                      <div className="flex items-center gap-2 text-cyan-900 font-extrabold text-sm">
                        <Code className="w-5 h-5 text-cyan-600" />
                        <span>Software Development & Tech Stack</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Programming Languages</label>
                          <input
                            type="text"
                            placeholder="TypeScript, Python, JavaScript, Go"
                            value={formData.dynamicFields.programmingLanguages || ''}
                            onChange={(e) => updateDynamicField('programmingLanguages', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Frameworks & Libraries</label>
                          <input
                            type="text"
                            placeholder="Next.js, React, Node.js, Tailwind CSS"
                            value={formData.dynamicFields.frameworks || ''}
                            onChange={(e) => updateDynamicField('frameworks', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Cloud & Databases</label>
                          <input
                            type="text"
                            placeholder="AWS, Vercel, PostgreSQL, Docker"
                            value={formData.dynamicFields.technologies || ''}
                            onChange={(e) => updateDynamicField('technologies', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Open to Remote Work?</label>
                          <select
                            value={formData.dynamicFields.openToRemote || 'Yes'}
                            onChange={(e) => updateDynamicField('openToRemote', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          >
                            <option value="Yes">Yes - Global Remote Work</option>
                            <option value="Hybrid">Hybrid Only</option>
                            <option value="On-site Only">On-site Only</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : formData.profession.toLowerCase().includes('designer') || formData.profession.toLowerCase().includes('creative') ? (
                    /* Designer Template */
                    <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-4">
                      <div className="flex items-center gap-2 text-purple-900 font-extrabold text-sm">
                        <Palette className="w-5 h-5 text-purple-600" />
                        <span>Graphic Design & Creative Portfolio</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Design Tools & Software</label>
                          <input
                            type="text"
                            placeholder="Figma, Adobe Illustrator, Photoshop, Blender"
                            value={formData.dynamicFields.designSoftware || ''}
                            onChange={(e) => updateDynamicField('designSoftware', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Behance / Dribbble Link</label>
                          <input
                            type="text"
                            placeholder="https://behance.net/username"
                            value={formData.dynamicFields.portfolio || ''}
                            onChange={(e) => updateDynamicField('portfolio', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ) : formData.profession.toLowerCase().includes('teacher') || formData.profession.toLowerCase().includes('tutor') ? (
                    /* Teacher Template */
                    <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-4">
                      <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                        <GraduationCap className="w-5 h-5 text-amber-600" />
                        <span>Teaching & Education Details</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Subjects Taught</label>
                          <input
                            type="text"
                            placeholder="e.g. Physics, Chemistry, O/A Level Math"
                            value={formData.dynamicFields.subjects || ''}
                            onChange={(e) => updateDynamicField('subjects', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Grade Levels</label>
                          <input
                            type="text"
                            placeholder="Class 9-10, O Level, A Level, University"
                            value={formData.dynamicFields.gradeLevels || ''}
                            onChange={(e) => updateDynamicField('gradeLevels', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Teaching Mode</label>
                          <select
                            value={formData.dynamicFields.teachingMode || 'Online & Home Tuition'}
                            onChange={(e) => updateDynamicField('teachingMode', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          >
                            <option value="Online & Home Tuition">Online & Home Tuition</option>
                            <option value="Online Zoom Only">Online Zoom Only</option>
                            <option value="Home Tuition Only">Home Tuition Only</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* General / Skilled Worker Template */
                    <div className="p-5 bg-slate-100 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                        <Wrench className="w-5 h-5 text-slate-600" />
                        <span>Skilled Worker & Technical Capabilities</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Specific Skill Type</label>
                          <input
                            type="text"
                            placeholder="e.g. Master Electrician, Solar Wireman, Auto Mechanic"
                            value={formData.dynamicFields.skillType || ''}
                            onChange={(e) => updateDynamicField('skillType', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Daily / Service Rate</label>
                          <input
                            type="text"
                            placeholder="e.g. PKR 3,500 / day"
                            value={formData.dynamicFields.dailyRate || ''}
                            onChange={(e) => updateDynamicField('dailyRate', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Available for Out-of-City Travel?</label>
                          <select
                            value={formData.dynamicFields.availableForTravel || 'Yes'}
                            onChange={(e) => updateDynamicField('availableForTravel', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          >
                            <option value="Yes">Yes - Available to Travel</option>
                            <option value="Within City Only">Within City Only</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Equipment / Tools Owned</label>
                          <input
                            type="text"
                            placeholder="Multi-meter, Safety Gear, Welding Kit, Ladder"
                            value={formData.dynamicFields.equipmentOwned || ''}
                            onChange={(e) => updateDynamicField('equipmentOwned', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: SKILLS, EDUCATION & EXPERIENCE */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Skills, Education & Experience</h2>
                    <p className="text-xs text-slate-500 mt-1">Showcase your expertise, degrees, certifications, and work timeline.</p>
                  </div>

                  {/* Skills Tagger */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Skills & Core Competencies *</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        placeholder="Type a skill and press Enter (e.g. Next.js, Clinical Dermatology, Solar Wiring)..."
                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                      >
                        Add Skill
                      </button>
                    </div>
                    {errors.skills && <p className="text-red-500 text-[11px] mb-2">{errors.skills}</p>}

                    <div className="flex flex-wrap gap-2 pt-1">
                      {formData.skills.map((s) => (
                        <span key={s} className="px-3 py-1 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 text-xs font-semibold flex items-center gap-1.5">
                          <span>{s}</span>
                          <button type="button" onClick={() => removeSkill(s)} className="hover:text-red-600 cursor-pointer">✕</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education List */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-extrabold text-slate-900 text-sm">Education & Degrees</h3>
                      <button type="button" onClick={addEdu} className="text-xs text-blue-600 font-bold flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add Degree
                      </button>
                    </div>

                    {formData.education.map((edu, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 relative">
                        <input
                          type="text"
                          placeholder="Degree (e.g. BS CS / MBBS / DAE)"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...formData.education]
                            newEdu[i].degree = e.target.value
                            setFormData(p => ({ ...p, education: newEdu }))
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Institution / University"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...formData.education]
                            newEdu[i].institution = e.target.value
                            setFormData(p => ({ ...p, education: newEdu }))
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <div className="flex flex-col">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="Graduation Year (e.g. 2024)"
                              value={edu.year}
                              onChange={(e) => {
                                const cleanVal = e.target.value.replace(/\D/g, '').slice(0, 4)
                                const newEdu = [...formData.education]
                                newEdu[i].year = cleanVal
                                setFormData(p => ({ ...p, education: newEdu }))
                                if (errors[`eduYear_${i}`]) {
                                  setErrors(prev => {
                                    const copy = { ...prev }
                                    delete copy[`eduYear_${i}`]
                                    return copy
                                  })
                                }
                              }}
                              className={`w-full px-3 py-1.5 bg-white border ${errors[`eduYear_${i}`] ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-lg text-xs`}
                            />
                            {formData.education.length > 1 && (
                              <button type="button" onClick={() => removeEdu(i)} className="text-red-500 hover:text-red-700 px-1">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          {errors[`eduYear_${i}`] && (
                            <p className="text-red-500 text-[10px] font-semibold mt-1">{errors[`eduYear_${i}`]}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Certifications List */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-extrabold text-slate-900 text-sm">Certifications & Licenses</h3>
                      <button type="button" onClick={addCert} className="text-xs text-blue-600 font-bold flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add Certification
                      </button>
                    </div>

                    {formData.certifications.map((cert, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Certification Title"
                          value={cert.title}
                          onChange={(e) => {
                            const newCert = [...formData.certifications]
                            newCert[i].title = e.target.value
                            setFormData(p => ({ ...p, certifications: newCert }))
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Issuing Authority (AWS, PMDC, ICAP)"
                          value={cert.issuer}
                          onChange={(e) => {
                            const newCert = [...formData.certifications]
                            newCert[i].issuer = e.target.value
                            setFormData(p => ({ ...p, certifications: newCert }))
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <div className="flex flex-col">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="Year (e.g. 2024)"
                              value={cert.year}
                              onChange={(e) => {
                                const cleanVal = e.target.value.replace(/\D/g, '').slice(0, 4)
                                const newCert = [...formData.certifications]
                                newCert[i].year = cleanVal
                                setFormData(p => ({ ...p, certifications: newCert }))
                                if (errors[`certYear_${i}`]) {
                                  setErrors(prev => {
                                    const copy = { ...prev }
                                    delete copy[`certYear_${i}`]
                                    return copy
                                  })
                                }
                              }}
                              className={`w-full px-3 py-1.5 bg-white border ${errors[`certYear_${i}`] ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-lg text-xs`}
                            />
                            {formData.certifications.length > 1 && (
                              <button type="button" onClick={() => removeCert(i)} className="text-red-500 hover:text-red-700 px-1">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          {errors[`certYear_${i}`] && (
                            <p className="text-red-500 text-[10px] font-semibold mt-1">{errors[`certYear_${i}`]}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* STEP 4: LOCATION & CONTACT */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Location & Direct Contact Info</h2>
                    <p className="text-xs text-slate-500 mt-1">Clients and employers will use these details to contact you directly.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Searchable City */}
                    <div className="relative">
                      <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onClick={() => setIsCityDropdownOpen(true)}
                        onChange={(e) => {
                          setFormData(p => ({ ...p, city: e.target.value }))
                          setCitySearch(e.target.value)
                          setIsCityDropdownOpen(true)
                        }}
                        placeholder="Search city in Pakistan..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}

                      {isCityDropdownOpen && (
                        <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                          {filteredCities.map(c => (
                            <div
                              key={c}
                              onClick={() => {
                                setFormData(p => ({ ...p, city: c }))
                                setIsCityDropdownOpen(false)
                              }}
                              className="px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                            >
                              {c}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Province</label>
                      <input
                        type="text"
                        value={formData.province}
                        onChange={(e) => setFormData(p => ({ ...p, province: e.target.value }))}
                        placeholder="Punjab, Sindh, KPK, Balochistan..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                      <input
                        type="text"
                        disabled
                        value="Pakistan"
                        className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+92 300 1234567"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData(p => ({ ...p, whatsapp: e.target.value }))}
                        placeholder="923001234567"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Personal Website URL (Optional)</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData(p => ({ ...p, website: e.target.value }))}
                        placeholder="https://yourname.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Resume / CV Link (Google Drive / DropBox)</label>
                      <input
                        type="url"
                        value={formData.resumeUrl}
                        onChange={(e) => setFormData(p => ({ ...p, resumeUrl: e.target.value }))}
                        placeholder="https://drive.google.com/file/..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: SOCIAL PROFILES & SUBMISSION */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Social Media & Public Networks</h2>
                    <p className="text-xs text-slate-500 mt-1">LinkedIn is highlighted as the primary professional link.</p>
                  </div>

                  {/* LinkedIn Highlight Box */}
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                    <label className="flex items-center gap-2 text-xs font-extrabold text-blue-900">
                      <Linkedin className="w-4 h-4 text-blue-600 fill-blue-600" />
                      <span>LinkedIn Profile URL (Highest Priority) *</span>
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(p => ({ ...p, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/yourusername"
                      className="w-full px-4 py-2.5 bg-white border border-blue-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  {/* Other Social Networks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">GitHub</label>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData(p => ({ ...p, github: e.target.value }))}
                        placeholder="https://github.com/username"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Upwork</label>
                      <input
                        type="url"
                        value={formData.upwork}
                        onChange={(e) => setFormData(p => ({ ...p, upwork: e.target.value }))}
                        placeholder="https://upwork.com/freelancers/..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Fiverr</label>
                      <input
                        type="url"
                        value={formData.fiverr}
                        onChange={(e) => setFormData(p => ({ ...p, fiverr: e.target.value }))}
                        placeholder="https://fiverr.com/username"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Behance</label>
                      <input
                        type="url"
                        value={formData.behance}
                        onChange={(e) => setFormData(p => ({ ...p, behance: e.target.value }))}
                        placeholder="https://behance.net/username"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Twitter / X</label>
                      <input
                        type="url"
                        value={formData.twitter}
                        onChange={(e) => setFormData(p => ({ ...p, twitter: e.target.value }))}
                        placeholder="https://twitter.com/username"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">YouTube Channel</label>
                      <input
                        type="url"
                        value={formData.youtube}
                        onChange={(e) => setFormData(p => ({ ...p, youtube: e.target.value }))}
                        placeholder="https://youtube.com/@channel"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Repeatable Custom Social Links */}
                  <div className="space-y-3 pt-2">
                    <h3 className="font-extrabold text-slate-900 text-xs">Add Custom Social / Profile Link</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Platform Name (e.g. Medium, Kaggle, Portfolio)"
                        value={customSocialName}
                        onChange={(e) => setCustomSocialName(e.target.value)}
                        className="w-1/3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                      <input
                        type="url"
                        placeholder="URL (https://...)"
                        value={customSocialUrl}
                        onChange={(e) => setCustomSocialUrl(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                      <button
                        type="button"
                        onClick={addCustomSocialLink}
                        className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900"
                      >
                        Add Link
                      </button>
                    </div>

                    {formData.customSocialLinks.length > 0 && (
                      <div className="space-y-1 pt-1">
                        {formData.customSocialLinks.map((link, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-slate-100 rounded-lg text-xs">
                            <span className="font-bold text-slate-800">{link.name}: <a href={link.url} target="_blank" className="text-blue-600 underline font-normal">{link.url}</a></span>
                            <button type="button" onClick={() => removeCustomSocialLink(idx)} className="text-red-600 hover:underline">Remove</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all hover:scale-105"
                  >
                    {isSubmitting ? (
                      <span>Submitting Profile...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Submit Profile for Verification</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
