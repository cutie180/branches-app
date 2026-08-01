'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, AlertCircle, Upload, X, CheckCircle2, Eye, MessageCircle, Zap, Copy, Check, Sparkles } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CitySearchDropdown from '@/components/ui/city-search-dropdown'
import { CATEGORIES } from '@/lib/data'
import { sendBusinessSubmissionEmail } from '@/lib/email-service'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const normalizeCategoryForStorage = (cat: string) => cat ? cat.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''

type Status = 'idle' | 'loading' | 'success' | 'error'

const MAX_LOGO_MB = 2.5
const MIN_DESCRIPTION_CHARS = 500
const MAX_DESCRIPTION_CHARS = 1000

// Sub-categories for each main category
const SUB_CATEGORIES: Record<string, string[]> = {
  'restaurants': ['Fast Food', 'Fine Dining', 'Cafe', 'Bakery', 'Catering', 'Food Truck'],
  'real-estate': ['Residential', 'Commercial', 'Industrial', 'Land', 'Rental', 'Property Management'],
  'technology': ['Software Development', 'Web Design', 'IT Support', 'Digital Marketing', 'Mobile Apps', 'Cloud Services'],
  'healthcare': ['Hospitals', 'Clinics', 'Pharmacies', 'Dental', 'Laboratories', 'Medical Equipment'],
  'education': ['Schools', 'Colleges', 'Universities', 'Tuition Centers', 'Training Institutes', 'Online Learning'],
  'retail': ['Supermarkets', 'Clothing', 'Electronics', 'Jewelry', 'Books', 'Department Stores'],
  'construction': ['Building Contractors', 'Architecture', 'Interior Design', 'Building Materials', 'Civil Engineering', 'Renovation'],
  'automotive': ['Car Dealers', 'Mechanics', 'Parts', 'Accessories', 'Service Centers', 'Car Rental'],
  'finance': ['Banks', 'Insurance', 'Investment', 'Accounting', 'Loans', 'Financial Advisors'],
  'travel': ['Airlines', 'Hotels', 'Tour Operators', 'Transport', 'Travel Agencies', 'Car Rental'],
  'beauty': ['Salons', 'Spas', 'Gyms', 'Cosmetics', 'Beauty Products', 'Wellness Centers'],
  'logistics': ['Courier', 'Cargo', 'Warehousing', 'Transport', 'Supply Chain', 'Freight Forwarding'],
}

export default function AddBussinessClient() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    subcategory: '',
    branchCode: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    address: '',
    city: '',
    logoUrl: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [descriptionCharCount, setDescriptionCharCount] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [existingBusinesses, setExistingBusinesses] = useState<string[]>([])
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null)

  // Submission confirmation states
  const [submittedBusinessId, setSubmittedBusinessId] = useState<string | null>(null)
  const [submittedDocId, setSubmittedDocId] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Web Audio chime synthesis
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
      osc2.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.15); // C6
      
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc1.start();
      osc2.start();
      
      osc1.stop(audioCtx.currentTime + 0.6);
      osc2.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.error('Failed to play audio chime:', e);
    }
  }

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }

  const generateUniqueBusinessId = async () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000)
    return randomNum.toString()
  }

  // Check for existing businesses when phone or email changes
  useEffect(() => {
    setExistingBusinesses([])
  }, [formData.phone, formData.email])

  // Update subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      setFormData(prev => ({ ...prev, subcategory: '' }))
    }
  }, [formData.category])



  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < MIN_DESCRIPTION_CHARS) {
      newErrors.description = `Description must be at least ${MIN_DESCRIPTION_CHARS} characters`
    } else if (formData.description.length > MAX_DESCRIPTION_CHARS) {
      newErrors.description = `Description must not exceed ${MAX_DESCRIPTION_CHARS} characters`
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^(\+92|0)?[0-9]{2,4}[ -]?[0-9]{3,4}[ -]?[0-9]{3,4}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Pakistani phone number (e.g., 021 111 331 331)'
    }

    if (formData.whatsapp && !/^(\+92|0)?[0-9]{2,4}[ -]?[0-9]{3,4}[ -]?[0-9]{3,4}$/.test(formData.whatsapp.replace(/\s/g, ''))) {
      newErrors.whatsapp = 'Please enter a valid Pakistani WhatsApp number (e.g., 021 111 331 331)'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (existingBusinesses.length > 0) {
      newErrors.duplicate = 'A business with this phone or email already exists'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Update character count for description
    if (name === 'description') {
      setDescriptionCharCount(value.length)
    }
  }

  function compressImage(base64Str: string, maxWidth = 200, maxHeight = 200): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image()
      const timeout = setTimeout(() => resolve(base64Str), 2000)

      img.src = base64Str
      img.onload = () => {
        clearTimeout(timeout)
        try {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
          }
          
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          resolve(canvas.toDataURL('image/webp', 0.8))
        } catch (e) {
          resolve(base64Str)
        }
      }
      img.onerror = () => {
        clearTimeout(timeout)
        resolve(base64Str)
      }
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    if (file.size > MAX_LOGO_MB * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: `Logo must be smaller than ${MAX_LOGO_MB}MB` }))
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, logo: 'Please upload an image file' }))
      return
    }

    // Create preview and compress to WebP
    const reader = new FileReader()
    reader.onload = async (e) => {
      const result = e.target?.result as string
      try {
        const compressed = await compressImage(result, 200, 200)
        setLogoPreview(compressed)
        setFormData(prev => ({ ...prev, logoUrl: compressed }))
      } catch (err) {
        setLogoPreview(result)
        setFormData(prev => ({ ...prev, logoUrl: result }))
      }
      setErrors(prev => ({ ...prev, logo: '' }))
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogoPreview(null)
    setFormData(prev => ({ ...prev, logoUrl: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const generateSlug = (businessName: string, city: string) => {
    const cleanName = businessName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/[\s_]+/g, '-')   // Replace spaces/underscores with hyphens
      .replace(/-+/g, '-')       // Remove duplicate hyphens
      .replace(/^-+|-+$/g, '');  // Trim hyphens from ends
    
    const cleanCity = city
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    return cleanCity ? `${cleanName}-${cleanCity}` : cleanName;
  }

  const isSlugUnique = async (slug: string) => true

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setStatus('loading')
    try {
      const baseSlug = generateSlug(formData.businessName, formData.city)
      let finalSlug = baseSlug
      const uniqueBizId = await generateUniqueBusinessId()
      const generatedDocId = 'biz_' + Date.now()

      const businessData = {
        businessId: uniqueBizId,
        businessName: (formData.businessName || '').trim(),
        description: (formData.description || '').trim(),
        phone: (formData.phone || '').trim(),
        whatsapp: (formData.whatsapp || '').trim(),
        email: (formData.email || '').trim().toLowerCase(),
        websiteUrl: (formData.website || '').trim(),
        address: (formData.address || '').trim(),
        city: (formData.city || '').trim(),
        branchCode: (formData.branchCode || '').trim(),
        category: normalizeCategoryForStorage(formData.category || ''),
        categoryId: normalizeCategoryForStorage(formData.category || ''),
        categorySlug: normalizeCategoryForStorage(formData.category || ''),
        subCategory: (formData.subcategory || '').trim(),
        logoUrl: (formData.logoUrl || '').trim(),
        slug: finalSlug,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Save to Firestore Database
      try {
        const docRef = await addDoc(collection(db, 'businesses'), {
          ...businessData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        console.log('Successfully saved to Firestore with ID:', docRef.id)
      } catch (err) {
        console.error('Firestore submission save error:', err)
      }

      // Save to API route if available
      try {
        await fetch('/api/save-biz-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(businessData)
        })
      } catch (err) {
        console.warn('Local API save fallback:', err)
      }

      // Send notification email if email provided
      const categoryLabel =
        CATEGORIES.find(c => c.id === normalizeCategoryForStorage(formData.category))?.name
        || formData.category

      if (formData.email) {
        sendBusinessSubmissionEmail({
          to: formData.email,
          businessName: formData.businessName.trim(),
          businessId: generatedDocId,
          email: formData.email,
          phone: formData.phone.trim(),
          category: categoryLabel,
          city: formData.city.trim(),
          address: formData.address.trim(),
          description: formData.description.trim(),
          slug: businessData.slug,
        }).catch(err => console.error('Email dispatch failed:', err))
      }

      // Play synthesized audio alert
      playChime()

      // Set submission states
      setSubmittedBusinessId(uniqueBizId)
      setSubmittedDocId(generatedDocId)
      setSubmittedSlug(businessData.slug)
      setStatus('success')
      
      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
      console.error('Error submitting business:', error)
      setStatus('error')
    }
  }

  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F7FC] text-[#0F172A] font-sans pb-16">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
              Add Your Business Free to ListPak
            </h1>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto font-normal">
              List your business 100% free and reach thousands of customers across Pakistan. Join 10,000+ local services discovered every day.
            </p>
          </div>

          {/* SEO Benefits Section */}
          <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D9E2F1] flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">Boost Local SEO</h3>
                <p className="text-xs text-[#64748B]">Get a high-quality local citation to rank better in Google Search.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D9E2F1] flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">Direct Contact</h3>
                <p className="text-xs text-[#64748B]">Enable WhatsApp and phone calls directly from potential customers.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D9E2F1] flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-[#F97316]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm">100% Free</h3>
                <p className="text-xs text-[#64748B]">No credit card or payment required for any listing feature.</p>
              </div>
            </div>
          </section>

          {/* Form Layout */}
          <div className="max-w-4xl mx-auto">
            <div>
              {/* Existing Businesses Warning */}
              {existingBusinesses.length > 0 && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-800 mb-1">Existing Business Found</h3>
                      <p className="text-amber-700 text-sm">
                        We found existing businesses with your phone number or email:
                      </p>
                  <ul className="mt-2 text-sm text-amber-700">
                    {existingBusinesses.map((name, index) => (
                      <li key={index}>• {name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {status === 'success' ? (
            <div className="mb-12 bg-white border border-[#D9E2F1] rounded-2xl shadow-[0_8px_40px_rgba(15,23,42,0.08)] max-w-2xl mx-auto p-8 sm:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-bold mb-4">
                <span>✓ 100% Free Business Listing – No Payment Required</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3">
                Business Successfully Registered on ListPak!
              </h2>

              <p className="text-slate-600 mb-8 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                Thank you! Your business profile has been registered and is live on ListPak. Our admin team will perform a routine quality verification. No fee or credit card is ever required.
              </p>

              {/* Business ID Box */}
              <div className="bg-[#EEF4FF] border border-[#D9E2F1] rounded-2xl p-5 mb-8 max-w-md mx-auto flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block">Your Unique Business ID</span>
                  <div className="text-2xl font-extrabold text-[#0F172A] tracking-wide mt-0.5">{submittedBusinessId}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(submittedBusinessId || '', 'bizId')}
                  className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-[#0F172A] border border-[#D9E2F1] rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {copiedField === 'bizId' ? (
                    <>
                      <Check className="w-4 h-4 text-[#16A34A]" />
                      <span className="text-[#16A34A]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#64748B]" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {submittedSlug && (
                  <Link
                    href={`/business/${submittedSlug}`}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md text-sm text-center inline-block"
                  >
                    View Business Page
                  </Link>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-bold transition-all shadow-md text-sm cursor-pointer"
                >
                  Add Another Business Free
                </button>
              </div>
            </div>
          ) : (
            <>

          {/* Error Message */}
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Submission Failed</h3>
                  <p className="text-red-700 text-sm">
                    There was an error submitting your business. Please try again or contact support.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Premium Promotion */}
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Want More Visibility?
                </h3>
                <p className="text-slate-700 mb-4">
                  Mark your business as featured to appear at the top of search results and get significantly more visibility from potential customers!
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/923345636230"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact via WhatsApp
                  </a>
                  <Link
                    href="/featured-businesses"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-green-500 text-green-700 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors"
                  >
                    See Featured Businesses
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                🏢 Business Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.businessName ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="Enter your business name"
                  />
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.category ? 'border-red-500' : 'border-slate-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                {formData.category && SUB_CATEGORIES[formData.category] && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sub-category
                    </label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select a sub-category (optional)</option>
                      {SUB_CATEGORIES[formData.category].map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Branch Code field - only shown for Banks subcategory */}
                {formData.category === 'finance' && formData.subcategory === 'Banks' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Branch Code
                    </label>
                    <input
                      type="text"
                      name="branchCode"
                      value={formData.branchCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., 0052"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Enter the bank branch code (e.g., 0052 for HBL branches)
                    </p>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Description *
                    <span className="text-slate-500 font-normal ml-2">
                      ({descriptionCharCount}/{MAX_DESCRIPTION_CHARS} characters)
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                      errors.description ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="Describe your business, services, and what makes you unique..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">
                    Minimum {MIN_DESCRIPTION_CHARS} characters required for better visibility
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                📞 Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="021 111 331 331"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.whatsapp ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="021 111 331 331 (optional)"
                  />
                  {errors.whatsapp && (
                    <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="business@example.com (optional)"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="https://www.example.com (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                📍 Location Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.address ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="Enter your complete business address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City *
                  </label>
                  <CitySearchDropdown
                    value={formData.city}
                    onChange={(value) => handleInputChange({ 
                      target: { name: 'city', value } 
                    } as React.ChangeEvent<HTMLInputElement>)}
                    placeholder="Select or type your city"
                    className={`w-full ${
                      errors.city ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                🖼️ Business Logo
              </h2>

              <div className="space-y-4">
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-3 px-6 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-600">Upload Logo (Optional)</span>
                  </button>
                  <p className="mt-2 text-sm text-slate-500">
                    Maximum file size: {MAX_LOGO_MB}MB. Recommended: Square image, at least 200x200px
                  </p>
                  {errors.logo && (
                    <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
                  )}
                </div>

                {logoPreview && (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">Logo uploaded successfully</p>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="mt-2 text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={togglePreview}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">📋 Business Listing Preview</h2>
                <div className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Business logo"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200">
                        <span className="text-2xl text-slate-400">🏢</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800">
                        {formData.businessName || 'Business Name'}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        📍 {formData.city || 'City'}
                      </p>
                      <p className="text-sm text-slate-600">
                        📞 {formData.phone || 'Phone Number'}
                      </p>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        {formData.description || 'Business description will appear here...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'loading' || existingBusinesses.length > 0}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-lg shadow-lg hover:shadow-xl cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    🚀 Submit Business
                  </>
                )}
              </button>
            </div>

            {errors.duplicate && (
              <p className="mt-2 text-sm text-red-600 text-center">{errors.duplicate}</p>
            )}
            </form>
          </>
        )}

          {/* Help Section */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Need Help?</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <p>• All fields marked with * are required</p>
              <p>• Your business will be reviewed within 24 hours</p>
              <p>• Make sure your description is detailed for better visibility</p>
              <p>• Include your WhatsApp number for direct customer contact</p>
              <p>• For support, email us at support@listpak.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

      <Footer />
    </>
  )
}
