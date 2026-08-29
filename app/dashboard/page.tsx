'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { 
  Building2, MapPin, Phone, Mail, Globe, Upload, CheckCircle2, ShieldCheck, 
  Sparkles, ArrowRight, Star, Clock, AlertCircle, RefreshCw, ExternalLink, 
  Copy, LogIn, UserPlus, LogOut, X, Zap, ChevronRight, Eye, EyeOff, Lock
} from 'lucide-react'
import { BusinessItem } from '@/lib/data'
import { getUserBusinesses, updateBusinessPaymentProof } from '@/lib/db-service'
import { auth } from '@/lib/firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth'
import { toast } from 'sonner'

const PAYMENT_ACCOUNTS = {
  easypaisa: {
    name: 'Easypaisa',
    accountNumber: '03105694507',
    accountTitle: 'Mutahira Nisa',
    amount: 20
  },
  mashreq: {
    name: 'Mashreq Bank',
    accountNumber: '089200179683',
    accountTitle: 'Muhammad Imran',
    amount: 20
  }
}

export default function BusinessDashboardPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<{ uid?: string; name?: string; email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [userBusinesses, setUserBusinesses] = useState<BusinessItem[]>([])
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(false)

  // Auth Mode for non-logged in users
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [isSigningUp, setIsSigningUp] = useState(false)

  // Payment Proof Modal State
  const [activePaymentBiz, setActivePaymentBiz] = useState<BusinessItem | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'easypaisa' | 'mashreq'>('easypaisa')
  const [paymentRefNumber, setPaymentRefNumber] = useState('')
  const [paymentScreenshotBase64, setPaymentScreenshotBase64] = useState<string | null>(null)
  const [isUploadingPayment, setIsUploadingPayment] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Details Modal
  const [selectedBizModal, setSelectedBizModal] = useState<BusinessItem | null>(null)

  useEffect(() => {
    // Check session in storage
    const rawSession = sessionStorage.getItem('listpak_user_session') || localStorage.getItem('listpak_user_session')
    if (rawSession) {
      try {
        const parsed = JSON.parse(rawSession)
        if (parsed.email) {
          setCurrentUser(parsed)
          fetchBusinesses(parsed.email, parsed.uid || parsed.userId)
        }
      } catch (_) {}
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userObj = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Business Owner',
          email: fbUser.email || ''
        }
        setCurrentUser(userObj)
        fetchBusinesses(userObj.email, userObj.uid)
        sessionStorage.setItem('listpak_user_session', JSON.stringify({ ...userObj, role: 'business' }))
        localStorage.setItem('listpak_user_session', JSON.stringify({ ...userObj, role: 'business' }))
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const fetchBusinesses = async (email?: string, uid?: string) => {
    const identifier = email || uid || ''
    if (!identifier) return
    setIsLoadingBusinesses(true)
    try {
      const list = await getUserBusinesses(identifier)
      // Also try fallback by UID if different
      if (list.length === 0 && uid && uid !== identifier) {
        const byUid = await getUserBusinesses(uid)
        setUserBusinesses(byUid)
      } else {
        setUserBusinesses(list)
      }
    } catch (err) {
      console.warn('Failed to load user businesses:', err)
    } finally {
      setIsLoadingBusinesses(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both email and password.')
      return
    }

    setIsLoggingIn(true)
    try {
      let loggedUser = {
        name: loginEmail.split('@')[0],
        email: loginEmail.trim().toLowerCase(),
        uid: ''
      }

      try {
        const cred = await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword)
        if (cred.user) {
          loggedUser = {
            uid: cred.user.uid,
            name: cred.user.displayName || loginEmail.split('@')[0],
            email: cred.user.email || loginEmail.trim().toLowerCase()
          }
        }
      } catch (authErr: any) {
        const existingSession = localStorage.getItem('listpak_user_session')
        if (existingSession) {
          const parsed = JSON.parse(existingSession)
          if (parsed.email?.toLowerCase() === loginEmail.trim().toLowerCase()) {
            loggedUser = parsed
          } else {
            throw new Error(authErr?.message || 'Invalid credentials')
          }
        } else {
          throw new Error('Invalid email or password. Please verify your credentials.')
        }
      }

      setCurrentUser(loggedUser)
      sessionStorage.setItem('listpak_user_session', JSON.stringify({ ...loggedUser, role: 'business' }))
      localStorage.setItem('listpak_user_session', JSON.stringify({ ...loggedUser, role: 'business' }))
      fetchBusinesses(loggedUser.email, loggedUser.uid)
      toast.success(`Welcome back, ${loggedUser.name}!`)
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setLoginError('Please complete all required fields.')
      return
    }
    if (signupPassword.length < 6) {
      setLoginError('Password must be at least 6 characters.')
      return
    }

    setIsSigningUp(true)
    try {
      let newUser = {
        name: signupName.trim(),
        email: signupEmail.trim().toLowerCase(),
        uid: ''
      }

      try {
        const cred = await createUserWithEmailAndPassword(auth, signupEmail.trim(), signupPassword)
        if (cred.user) {
          await updateProfile(cred.user, { displayName: signupName.trim() })
          newUser.uid = cred.user.uid
        }
      } catch (authErr: any) {
        if (authErr?.code === 'auth/email-already-in-use') {
          throw new Error('This email is already registered. Please sign in instead.')
        }
      }

      setCurrentUser(newUser)
      sessionStorage.setItem('listpak_user_session', JSON.stringify({ ...newUser, role: 'business' }))
      localStorage.setItem('listpak_user_session', JSON.stringify({ ...newUser, role: 'business' }))
      toast.success('Your ListPak business account has been created!')
    } catch (err: any) {
      setLoginError(err.message || 'Signup failed. Please try again.')
    } finally {
      setIsSigningUp(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (_) {}
    sessionStorage.removeItem('listpak_user_session')
    localStorage.removeItem('listpak_user_session')
    setCurrentUser(null)
    setUserBusinesses([])
    toast.success('Signed out successfully.')
  }

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success(`Copied ${text} to clipboard!`)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, JPEG, WEBP).')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const rawBase64 = event.target?.result as string
      try {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          const maxDim = 1200
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width)
              width = maxDim
            } else {
              width = Math.round((width * maxDim) / height)
              height = maxDim
            }
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            const compressed = canvas.toDataURL('image/jpeg', 0.8)
            setPaymentScreenshotBase64(compressed)
          } else {
            setPaymentScreenshotBase64(rawBase64)
          }
        }
        img.onerror = () => setPaymentScreenshotBase64(rawBase64)
        img.src = rawBase64
      } catch (_) {
        setPaymentScreenshotBase64(rawBase64)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activePaymentBiz) return

    if (!paymentScreenshotBase64) {
      toast.error('Please attach your payment transfer screenshot.')
      return
    }

    setIsUploadingPayment(true)
    try {
      const account = PAYMENT_ACCOUNTS[selectedPaymentMethod]
      const targetId = activePaymentBiz.id || activePaymentBiz.slug
      const success = await updateBusinessPaymentProof(targetId, {
        paymentMethod: account.name,
        referenceNumber: paymentRefNumber.trim() || 'N/A',
        paymentScreenshot: paymentScreenshotBase64,
        amount: 20
      })

      if (!success) throw new Error('Update returned false')

      toast.success('Payment screenshot uploaded! Your listing is now queued at the top of the admin approval queue.')
      setActivePaymentBiz(null)
      setPaymentScreenshotBase64(null)
      setPaymentRefNumber('')

      if (currentUser?.email || currentUser?.uid) {
        fetchBusinesses(currentUser.email, currentUser.uid)
      }
    } catch (err) {
      toast.error('Failed to upload proof. Please try again.')
    } finally {
      setIsUploadingPayment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-20 flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-lg font-bold text-slate-800">Loading Business Dashboard...</h2>
        </main>
        <Footer />
      </div>
    )
  }

  // STATE A: Unauthenticated User -> Sleek Sign In / Sign Up Card
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
        <Navbar />
        <main className="max-w-md mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center w-full">
          <div className="w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Building2 className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {authMode === 'login' ? 'Business Dashboard Login' : 'Create Business Account'}
              </h1>
              <p className="text-xs text-slate-500">
                Log in to check the real-time approval status of your business listings, upload payment receipts, and manage branches.
              </p>
            </div>

            {/* Toggle Login / Signup */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setLoginError(''); }}
                className={`py-2 rounded-xl transition ${authMode === 'login' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setLoginError(''); }}
                className={`py-2 rounded-xl transition ${authMode === 'signup' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Create Account
              </button>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. owner@business.pk"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn ? <span>Signing In...</span> : <><span>Sign In to Dashboard</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="e.g. owner@business.pk"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSigningUp ? <span>Creating Account...</span> : <><span>Create Account &amp; Access Dashboard</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-slate-100 text-center">
              <Link
                href="/add-business"
                className="inline-flex items-center gap-1 text-xs text-blue-600 font-extrabold hover:underline"
              >
                <span>Need to submit a new business? Click here</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // STATE B: Authenticated Business Owner Dashboard
  const pendingCount = userBusinesses.filter(b => (b.status || '').toLowerCase() === 'pending' || (b.paymentStatus || '').toUpperCase() === 'PENDING').length
  const approvedCount = userBusinesses.filter(b => (b.status || '').toLowerCase() === 'approved').length
  const rejectedCount = userBusinesses.filter(b => (b.status || '').toLowerCase() === 'rejected').length

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="bg-white border-b border-slate-200/90 pt-8 pb-10 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Business Owner Dashboard
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Welcome, {currentUser.name || currentUser.email}
              </h1>
              <p className="text-xs text-slate-500">
                Track your submitted business listings, upload verification receipts, and monitor approval status in real-time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/add-business"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <Building2 className="w-4 h-4" />
                <span>+ Register Another Business</span>
              </Link>

              <button
                onClick={() => fetchBusinesses(currentUser.email, currentUser.uid)}
                disabled={isLoadingBusinesses}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                title="Refresh listings"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingBusinesses ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Listings</span>
              <p className="text-2xl font-extrabold text-slate-900">{userBusinesses.length}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Pending Review</span>
              <p className="text-2xl font-extrabold text-amber-900">{pendingCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Approved &amp; Live</span>
              <p className="text-2xl font-extrabold text-emerald-900">{approvedCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Modifications Needed</span>
              <p className="text-2xl font-extrabold text-slate-900">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LISTINGS CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {userBusinesses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-5 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900">No Business Listings Registered Yet</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You have not submitted any business profiles under <strong>{currentUser.email}</strong> yet. Register your business today to reach thousands of customers across Pakistan.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/add-business"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Register Your First Business Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Your Registered Businesses ({userBusinesses.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userBusinesses.map((biz) => {
                const isApproved = (biz.status || '').toLowerCase() === 'approved'
                const isRejected = (biz.status || '').toLowerCase() === 'rejected'
                const isPending = !isApproved && !isRejected
                const hasPaymentProof = Boolean(biz.paymentScreenshot || biz.paymentDetails?.paymentScreenshot)

                return (
                  <div 
                    key={biz.id || biz.slug}
                    className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {biz.category || 'Services'}
                        </span>

                        {isApproved ? (
                          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Approved &amp; Live</span>
                          </span>
                        ) : isPending ? (
                          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1 animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Under Review (1–2 Hours)</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-200 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                            <span>Revision Needed</span>
                          </span>
                        )}
                      </div>

                      {/* Business Title & Location */}
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900">{biz.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{biz.city || 'Pakistan'} • {biz.address || 'Commercial Center'}</span>
                        </p>
                      </div>

                      {/* Moderation & Verification Notice Banner */}
                      {isPending && (
                        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold">
                            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                            <span>Awaiting Admin Approval (1–2 Hours)</span>
                          </div>
                          <p className="text-[11px] text-amber-800 leading-relaxed">
                            {hasPaymentProof 
                              ? 'Your PKR 20 payment proof has been attached. Our compliance team is verifying your details to publish your listing.'
                              : 'Please upload your PKR 20 verification payment screenshot so your business moves to the top of the admin approval queue.'
                            }
                          </p>
                        </div>
                      )}

                      {isApproved && (
                        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-[11px] font-medium">
                            Your business is live and searchable by customers nationwide!
                          </span>
                        </div>
                      )}

                      {isRejected && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-900 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold">
                            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                            <span>Modification Notice</span>
                          </div>
                          <p className="text-[11px] text-red-800">
                            {biz.rejectionReason || 'Please verify your contact and location details to satisfy directory guidelines.'}
                          </p>
                        </div>
                      )}

                      {/* Key details list */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                        <div>
                          <span className="text-slate-400 block font-medium">Phone:</span>
                          <span className="font-bold text-slate-800">{biz.phone || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Submitted:</span>
                          <span className="font-bold text-slate-800">
                            {biz.submittedAt ? new Date(biz.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBizModal(biz)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                      >
                        View Details
                      </button>

                      {isApproved ? (
                        <Link
                          href={`/business/${biz.slug}`}
                          target="_blank"
                          className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-xs text-center flex items-center justify-center gap-1.5 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Live Listing</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setActivePaymentBiz(biz)
                            setPaymentScreenshotBase64(biz.paymentScreenshot || null)
                          }}
                          className={`flex-1 px-4 py-2 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                            hasPaymentProof
                              ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/20'
                          }`}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{hasPaymentProof ? 'Update Payment Proof' : 'Request Approval (Rs. 20)'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </main>

      {/* POPUP MODAL: REQUEST APPROVAL & PAYMENT SCREENSHOT UPLOAD */}
      {activePaymentBiz && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 my-8 animate-in zoom-in-95">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  Approval Request &amp; Fee
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Request Fast Approval: PKR 20
                </h3>
                <p className="text-xs text-slate-500">
                  Business: <strong>{activePaymentBiz.name}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setActivePaymentBiz(null); setPaymentScreenshotBase64(null); }}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Choose Transfer Account:</label>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setSelectedPaymentMethod('easypaisa')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition ${
                    selectedPaymentMethod === 'easypaisa'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between font-extrabold text-xs text-emerald-800 mb-1">
                    <span>Easypaisa</span>
                    <span>Rs. 20</span>
                  </div>
                  <div className="text-[11px] text-slate-700 space-y-0.5">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleCopy('03105694507', 'dash-ep'); }}
                      className="font-mono font-bold hover:text-blue-600 flex items-center gap-1"
                    >
                      <span>03105694507</span>
                      <Copy className="w-3 h-3 text-slate-400" />
                    </button>
                    <p className="text-slate-500 text-[10px]">Mutahira Nisa</p>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedPaymentMethod('mashreq')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition ${
                    selectedPaymentMethod === 'mashreq'
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between font-extrabold text-xs text-blue-800 mb-1">
                    <span>Mashreq Bank</span>
                    <span>Rs. 20</span>
                  </div>
                  <div className="text-[11px] text-slate-700 space-y-0.5">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleCopy('089200179683', 'dash-mb'); }}
                      className="font-mono font-bold hover:text-blue-600 flex items-center gap-1"
                    >
                      <span>089200179683</span>
                      <Copy className="w-3 h-3 text-slate-400" />
                    </button>
                    <p className="text-slate-500 text-[10px]">Muhammad Imran</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitProof} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Transaction Reference ID (Optional)
                </label>
                <input
                  type="text"
                  value={paymentRefNumber}
                  onChange={(e) => setPaymentRefNumber(e.target.value)}
                  placeholder="e.g. TRX9823472"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Payment Transfer Screenshot *
                </label>
                {paymentScreenshotBase64 ? (
                  <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-2 flex items-center gap-3">
                    <img src={paymentScreenshotBase64} alt="Proof" className="w-16 h-16 rounded-xl object-cover border" />
                    <div className="flex-1 text-xs">
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Screenshot Attached</span>
                      </span>
                      <label className="text-[11px] text-blue-600 hover:underline cursor-pointer block mt-0.5">
                        <span>Change image</span>
                        <input type="file" accept="image/*" onChange={handleScreenshotChange} className="hidden" />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition">
                    <Upload className="w-6 h-6 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">Click to select payment screenshot</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG, WEBP (Max 10MB)</span>
                    <input type="file" accept="image/*" onChange={handleScreenshotChange} className="hidden" />
                  </label>
                )}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => { setActivePaymentBiz(null); setPaymentScreenshotBase64(null); }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingPayment || !paymentScreenshotBase64}
                  className="flex-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isUploadingPayment ? <span>Submitting...</span> : <><span>Submit &amp; Request Approval</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL: DETAILS PREVIEW */}
      {selectedBizModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 my-8 animate-in zoom-in-95">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedBizModal.name}</h3>
                <p className="text-xs text-slate-500">{selectedBizModal.category} in {selectedBizModal.city}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBizModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-500 block">Address:</span>
                <p className="font-medium">{selectedBizModal.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-slate-500 block">Phone:</span>
                  <p className="font-medium">{selectedBizModal.phone || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block">WhatsApp:</span>
                  <p className="font-medium">{selectedBizModal.whatsapp || 'N/A'}</p>
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Description:</span>
                <p className="font-medium leading-relaxed max-h-36 overflow-y-auto bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedBizModal.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedBizModal(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
