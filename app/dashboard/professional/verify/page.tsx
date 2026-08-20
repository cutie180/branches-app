'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { 
  ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Upload, 
  CreditCard, Smartphone, Building, AlertCircle, Sparkles, Check, 
  FileText, Lock, Clock, Eye, Copy, X
} from 'lucide-react'
import { toast } from 'sonner'
import { ProfessionalItem } from '@/lib/data'
import { getAllProfessionals, getProfessionalForDashboard } from '@/lib/professional-service'

export default function ProfessionalVerificationPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfessionalItem | null>(null)
  const [loading, setLoading] = useState(true)

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'EasyPaisa' | 'Mashreq Bank'>('EasyPaisa')
  const [transactionRef, setTransactionRef] = useState('')
  const [screenshotBase64, setScreenshotBase64] = useState<string | null>(null)
  const [screenshotFileName, setScreenshotFileName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null)

  const handleCopyAccount = (e: React.MouseEvent, text: string, fieldKey: string) => {
    e.stopPropagation()
    const cleanNum = text.replace(/\s+/g, '')
    navigator.clipboard.writeText(cleanNum)
    setCopiedField(fieldKey)
    toast.success(`Account number (${text}) copied to clipboard!`)
    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        let userEmail = ''
        const session = sessionStorage.getItem('listpak_user_session')
        if (session) {
          const parsed = JSON.parse(session)
          userEmail = parsed.email || parsed.username || ''
        }

        const pro = await getProfessionalForDashboard(userEmail)
        setProfile(pro)

        if (pro?.verificationRequestStatus === 'PENDING') {
          setSubmittedSuccess(true)
        }
      } catch (err) {
        console.error('Error loading profile for verification:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('')
    const file = e.target.files?.[0]
    if (!file) return

    // Validate mime types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Only JPG, JPEG, PNG, and WebP image files are accepted.')
      return
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size must be under 5MB.')
      return
    }

    setScreenshotFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      setScreenshotBase64(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!transactionRef.trim()) {
      setErrorMsg('Please enter your Transaction Reference / TID number.')
      return
    }

    if (!screenshotBase64) {
      setErrorMsg('Please upload a screenshot of your payment receipt.')
      return
    }

    if (!profile) {
      setErrorMsg('No professional profile found to link this verification request.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/professionals/verify-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idOrUsername: profile.username || profile.id,
          amount: 50,
          paymentMethod,
          transactionRef: transactionRef.trim(),
          paymentScreenshot: screenshotBase64,
          notes: `Verification request for ${profile.name} (${profile.title})`
        })
      })

      const data = await res.json()
      if (data.success) {
        setSubmittedSuccess(true)
        toast.success('Verification request submitted successfully.')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setErrorMsg(data.error || 'Failed to submit verification request.')
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/dashboard/professional"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Official ListPak Trust Program</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Get Your Profile Verified
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                Elevate your professional standing with a verified green trust badge and unlock profile editing.
              </p>
            </div>

            {/* Fee badge */}
            <div className="p-4 bg-emerald-950/80 border-2 border-emerald-500/40 rounded-2xl text-center shrink-0 shadow-lg">
              <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider block">Verification Fee</span>
              <span className="text-3xl font-extrabold text-white">Rs. 50</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">One-time processing fee</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">

        {submittedSuccess ? (
          /* Confirmation State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Verification Request Under Review</span>
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Verification request submitted successfully.
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Our admin team will review your payment and verification request. Your profile will receive the verified badge once the request has been approved.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-left max-w-md mx-auto">
              <div className="flex justify-between text-slate-600">
                <span>Verification Fee:</span>
                <span className="font-bold text-slate-900">Rs. 50</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Method:</span>
                <span className="font-bold text-slate-900">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Status:</span>
                <span className="text-amber-600 font-extrabold">PENDING ADMIN CONFIRMATION</span>
              </div>
              {screenshotBase64 && (
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Uploaded Receipt Proof:</span>
                  <button
                    type="button"
                    onClick={() => setPreviewModalImage(screenshotBase64)}
                    className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg border border-blue-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>See Payment Screenshot</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard/professional"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Return to Professional Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* 1. WHY PAY THIS FEE SECTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Why Pay Rs. 50 for Verification?</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  A verified professional profile helps clients identify professionals who have completed ListPak&apos;s verification process.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Build More Trust</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Clients are more likely to feel confident contacting professionals whose profiles display a ListPak verification badge.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Stand Out From Unverified Profiles</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    The green verification badge makes your profile easier to distinguish from profiles that have not completed verification.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Increase Client Confidence</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Some clients may hesitate to contact an unfamiliar professional online. Verification gives them an additional trust signal when comparing professionals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Improve Your Professional Presence</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    A verified ListPak profile provides a stronger professional presentation for people searching for your skills and services.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Better Visibility Opportunities</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Verified professionals can be prioritized for appropriate verification-related discovery features on ListPak, where applicable.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                    <Lock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Unlock Profile Editing</span>
                  </div>
                  <p className="text-blue-800 leading-relaxed">
                    Verified professionals can edit and keep their approved profile information, bio, skills, and portfolio up to date.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Keep Your Information Updated</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Being able to maintain your profile helps ensure clients see your latest skills, services, portfolio, and contact details.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Only Rs. 50</span>
                  </div>
                  <p className="text-emerald-800 leading-relaxed">
                    The verification fee is intentionally affordable so that more Pakistani professionals can access the verification system.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. PAYMENT INSTRUCTIONS & SUBMISSION FORM */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-extrabold text-slate-900">Payment Instructions</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send <strong className="text-emerald-600">Rs. 50</strong> using any of the official payment accounts below and upload the screenshot proof.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Method 1: EasyPaisa */}
                <div
                  onClick={() => setPaymentMethod('EasyPaisa')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer space-y-3 ${
                    paymentMethod === 'EasyPaisa'
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <span>EasyPaisa Mobile</span>
                    </div>
                    {paymentMethod === 'EasyPaisa' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selected</span>
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border-2 border-slate-300"></span>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">
                      EasyPaisa Account Number
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm sm:text-base font-extrabold text-slate-900 select-all tracking-wider">
                        0340 2885226
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyAccount(e, '0340 2885226', 'easypaisa')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                          copiedField === 'easypaisa'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300/80 active:scale-95'
                        }`}
                        title="Copy EasyPaisa Number"
                      >
                        {copiedField === 'easypaisa' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Copy Number</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-500 block font-medium">Title: EasyPaisa Transfer Desk</span>
                </div>

                {/* Method 2: Mashreq Bank */}
                <div
                  onClick={() => setPaymentMethod('Mashreq Bank')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer space-y-3 ${
                    paymentMethod === 'Mashreq Bank'
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <Building className="w-4 h-4" />
                      </div>
                      <span>Mashreq Bank Account</span>
                    </div>
                    {paymentMethod === 'Mashreq Bank' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selected</span>
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border-2 border-slate-300"></span>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">
                      Mashreq Account Number
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm sm:text-base font-extrabold text-slate-900 select-all tracking-wider">
                        089200179683
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyAccount(e, '089200179683', 'mashreq')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                          copiedField === 'mashreq'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300/80 active:scale-95'
                        }`}
                        title="Copy Mashreq Account Number"
                      >
                        {copiedField === 'mashreq' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-blue-700" />
                            <span>Copy Number</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-500 block font-medium">Bank: Mashreq Bank Pakistan</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Verification Fee Amount</label>
                    <input
                      type="text"
                      disabled
                      value="Rs. 50 (PKR)"
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Transaction ID / Reference Number *</label>
                    <input
                      type="text"
                      required
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder="e.g. 02938472819 or TID-9988"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 font-mono"
                    />
                  </div>
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1.5">
                    Upload Payment Screenshot Proof *
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Attach a clear screenshot or receipt photo showing the Rs. 50 transfer (JPG, PNG, or WebP up to 5MB).
                  </p>

                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50 transition-colors">
                    <input
                      type="file"
                      id="paymentScreenshotInput"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="paymentScreenshotInput" className="cursor-pointer block space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-slate-400">
                        <span>Accepted: JPG, PNG, WebP (Max: 5MB)</span>
                        <span>•</span>
                        <a
                          href="https://mb2kb.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-bold underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Reduce size at MB2KB.com ↗
                        </a>
                      </div>
                    </label>
                  </div>

                  {screenshotBase64 && (
                    <div className="mt-3 p-3 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={screenshotBase64} alt="Receipt preview" className="w-12 h-12 rounded-xl object-cover border border-slate-300" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{screenshotFileName || 'Payment Proof'}</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">Ready for Submission</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setScreenshotBase64(null); setScreenshotFileName('') }}
                        className="text-xs text-red-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-xs text-slate-500">
                    Payment proof is verified by our compliance team before the green badge is awarded.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Submitting Request...' : 'Submit Verification Request (Rs. 50)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
