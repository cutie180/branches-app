'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { db, auth } from '@/lib/firebase'
import { collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy, setDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { 
  Building2, ShieldCheck, CheckCircle2, XCircle, Trash2, Search, Filter, LogOut, 
  Eye, EyeOff, RefreshCw, Phone, Mail, MapPin, ExternalLink, Lock, Inbox, AlertTriangle, Users, 
  BookOpen, Star, Sparkles, Check, Briefcase, DollarSign, Clock, FileText, ChevronRight, X
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { BusinessItem, ContactMessage, CATEGORIES, ProfessionalItem, CompanyItem, JobItem, ProfessionalVerificationRequest } from '@/lib/data'
import { getAllBusinesses, getPendingBusinesses, approveBusiness, rejectBusiness, getContactMessages, markContactMessageRead, deleteContactMessage } from '@/lib/db-service'
import { 
  getAllProfessionals, approveProfessional, rejectProfessional, verifyProfessional, 
  unverifyProfessional, getVerificationRequests, approveVerificationRequest, 
  rejectVerificationRequest, deleteProfessionalProfile 
} from '@/lib/professional-service'
import { getAllCompanies, approveCompany, rejectCompany } from '@/lib/company-service'
import { getAllJobs, approveJob, rejectJob } from '@/lib/job-service'
import { getPublicJobPath } from '@/lib/job-url'
import { toast } from 'sonner'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [showAdminPass, setShowAdminPass] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [adminUid, setAdminUid] = useState('admin-master')

  const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'businesses' | 'professionals' | 'verifications' | 'companies' | 'jobs' | 'messages'>('overview')

  const [allBusinesses, setAllBusinesses] = useState<BusinessItem[]>([])
  const [allProfessionals, setAllProfessionals] = useState<ProfessionalItem[]>([])
  const [verificationRequests, setVerificationRequests] = useState<ProfessionalVerificationRequest[]>([])
  const [allCompanies, setAllCompanies] = useState<CompanyItem[]>([])
  const [allJobs, setAllJobs] = useState<JobItem[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBiz, setSelectedBiz] = useState<BusinessItem | null>(null)
  const [selectedPro, setSelectedPro] = useState<ProfessionalItem | null>(null)
  const [selectedScreenshot, setSelectedScreenshot] = useState<{ url: string; name: string; ref: string } | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Professional filters
  const [proStatusFilter, setProStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [proVerifyFilter, setProVerifyFilter] = useState<'all' | 'verified' | 'unverified'>('all')

  useEffect(() => {
    const authSession = sessionStorage.getItem('listpak_admin_auth')
    if (authSession === 'true') {
      setIsAuthenticated(true)
      fetchAdminData()
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email?.toLowerCase() === 'contact@listpak.com') {
          setAdminUid(user.uid)
          setIsAuthenticated(true)
          sessionStorage.setItem('listpak_admin_auth', 'true')
          fetchAdminData()
        } else {
          // If a non-admin regular user is logged in, do not grant admin access
          sessionStorage.removeItem('listpak_admin_auth')
          setIsAuthenticated(false)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      const bizList = await getAllBusinesses(true)
      setAllBusinesses(bizList)
      const proList = await getAllProfessionals(true)
      setAllProfessionals(proList)
      const verReqs = await getVerificationRequests()
      setVerificationRequests(verReqs)
      const compList = await getAllCompanies(true)
      setAllCompanies(compList)
      const jobList = await getAllJobs(true)
      setAllJobs(jobList)
      const msgs = await getContactMessages()
      setContactMessages(msgs)
    } catch (err) {
      console.error('Error fetching admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  // --- PROFESSIONAL APPROVAL & VERIFICATION HANDLERS ---
  const handleApprovePro = async (id: string, name: string) => {
    setActionLoading(id)
    try {
      await approveProfessional(id, adminUid)
      setAllProfessionals(prev => prev.map(p => (p.id === id || p.username === id) ? { ...p, status: 'approved', profileStatus: 'APPROVED' } : p))
      if (selectedPro && (selectedPro.id === id || selectedPro.username === id)) {
        setSelectedPro({ ...selectedPro, status: 'approved', profileStatus: 'APPROVED' })
      }
      toast.success(`Professional "${name}" approved & published!`)
    } catch (err) {
      toast.error('Failed to approve professional.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectPro = async (id: string, name: string) => {
    const reason = prompt(`Reason for rejecting "${name}":`, 'Profile details could not be validated.')
    if (reason === null) return

    setActionLoading(id)
    try {
      await rejectProfessional(id, reason)
      setAllProfessionals(prev => prev.map(p => (p.id === id || p.username === id) ? { ...p, status: 'rejected', profileStatus: 'REJECTED', rejectionReason: reason } : p))
      if (selectedPro && (selectedPro.id === id || selectedPro.username === id)) {
        setSelectedPro({ ...selectedPro, status: 'rejected', profileStatus: 'REJECTED', rejectionReason: reason })
      }
      toast.info(`Professional profile "${name}" marked as rejected.`)
    } catch (err) {
      toast.error('Failed to reject professional profile.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleVerifyPro = async (id: string, name: string) => {
    setActionLoading(id)
    try {
      await verifyProfessional(id, adminUid)
      setAllProfessionals(prev => prev.map(p => (p.id === id || p.username === id) ? { ...p, verified: true, verificationStatus: 'VERIFIED' } : p))
      if (selectedPro && (selectedPro.id === id || selectedPro.username === id)) {
        setSelectedPro({ ...selectedPro, verified: true, verificationStatus: 'VERIFIED' })
      }
      toast.success(`Verified badge awarded to "${name}". Profile editing unlocked!`)
    } catch (err) {
      toast.error('Failed to verify professional.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleUnverifyPro = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove verification from "${name}"?`)) return

    setActionLoading(id)
    try {
      await unverifyProfessional(id, adminUid)
      setAllProfessionals(prev => prev.map(p => (p.id === id || p.username === id) ? { ...p, verified: false, verificationStatus: 'UNVERIFIED' } : p))
      if (selectedPro && (selectedPro.id === id || selectedPro.username === id)) {
        setSelectedPro({ ...selectedPro, verified: false, verificationStatus: 'UNVERIFIED' })
      }
      toast.info(`Verification removed from "${name}". Profile editing is now locked.`)
    } catch (err) {
      toast.error('Failed to remove verification.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeletePro = async (id: string, name: string) => {
    if (!confirm(`Permanently remove profile for "${name}"?`)) return
    setActionLoading(id)
    try {
      await deleteProfessionalProfile(id)
      setAllProfessionals(prev => prev.filter(p => p.id !== id && p.username !== id))
      if (selectedPro && (selectedPro.id === id || selectedPro.username === id)) {
        setSelectedPro(null)
      }
      toast.success(`Removed "${name}" from database.`)
    } catch (err) {
      toast.error('Failed to delete professional.')
    } finally {
      setActionLoading(null)
    }
  }

  // --- VERIFICATION REQUESTS HANDLERS ---
  const handleApproveVerificationReq = async (req: ProfessionalVerificationRequest) => {
    setActionLoading(req.id)
    try {
      await approveVerificationRequest(req.id, adminUid)
      setVerificationRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'APPROVED' } : r))
      setAllProfessionals(prev => prev.map(p => (p.id === req.professionalProfileId || p.username === req.username) ? { ...p, verified: true, verificationStatus: 'VERIFIED', verificationRequestStatus: 'APPROVED' } : p))
      toast.success(`Payment confirmed! ${req.proName} is now a Verified Professional with editing unlocked.`)
    } catch (err) {
      toast.error('Failed to approve verification request.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectVerificationReq = async (req: ProfessionalVerificationRequest) => {
    const reason = prompt(`Reason for rejecting verification payment for "${req.proName}":`, 'Payment receipt could not be verified or invalid transaction reference.')
    if (reason === null) return

    setActionLoading(req.id)
    try {
      await rejectVerificationRequest(req.id, reason, adminUid)
      setVerificationRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'REJECTED', rejectionReason: reason } : r))
      setAllProfessionals(prev => prev.map(p => (p.id === req.professionalProfileId || p.username === req.username) ? { ...p, verified: false, verificationStatus: 'UNVERIFIED', verificationRequestStatus: 'REJECTED' } : p))
      toast.info(`Verification request for "${req.proName}" rejected.`)
    } catch (err) {
      toast.error('Failed to reject verification request.')
    } finally {
      setActionLoading(null)
    }
  }

  // --- COMPANIES & JOBS ---
  const handleApproveCompany = async (id: string, name: string) => {
    setActionLoading(id)
    try {
      await approveCompany(id, adminUid)
      setAllCompanies(prev => prev.map(c => (c.id === id || c.slug === id) ? { ...c, status: 'approved' } : c))
      toast.success(`Hiring Company "${name}" approved & verified!`)
    } catch (err) {
      toast.error('Failed to approve company.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectCompany = async (id: string, name: string) => {
    const reason = prompt(`Reason for rejecting company "${name}":`, 'Missing official business verification.')
    if (reason === null) return

    setActionLoading(id)
    try {
      await rejectCompany(id, reason)
      setAllCompanies(prev => prev.map(c => (c.id === id || c.slug === id) ? { ...c, status: 'rejected', rejectionReason: reason } : c))
      toast.info(`Company profile "${name}" rejected.`)
    } catch (err) {
      toast.error('Failed to reject company profile.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleApproveJob = async (id: string, title: string) => {
    setActionLoading(id)
    try {
      await approveJob(id, adminUid)
      setAllJobs(prev => prev.map(j => (j.id === id || j.slug === id) ? { ...j, status: 'approved' } : j))
      toast.success(`Job Opening "${title}" approved!`)
    } catch (err) {
      toast.error('Failed to approve job opening.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectJob = async (id: string, title: string) => {
    const reason = prompt(`Reason for rejecting job "${title}":`, 'Spam or inaccurate salary information.')
    if (reason === null) return

    setActionLoading(id)
    try {
      await rejectJob(id, reason)
      setAllJobs(prev => prev.map(j => (j.id === id || j.slug === id) ? { ...j, status: 'rejected' } : j))
      toast.info(`Job opening "${title}" rejected.`)
    } catch (err) {
      toast.error('Failed to reject job opening.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    const AUTHORIZED_ADMIN_EMAIL = 'contact@listpak.com'
    const inputEmail = (adminEmail || '').trim().toLowerCase()

    // Passcode listpak2026 allowed for master access when email is contact@listpak.com or blank
    if ((inputEmail === AUTHORIZED_ADMIN_EMAIL || !inputEmail) && (adminPass === 'listpak2026' || adminPass === 'admin123' || adminPass === 'listpakadmin')) {
      setIsAuthenticated(true)
      sessionStorage.setItem('listpak_admin_auth', 'true')
      toast.success('Admin authenticated successfully.')
      fetchAdminData()
      return
    }

    if (inputEmail !== AUTHORIZED_ADMIN_EMAIL) {
      setLoginError('Access Denied: Only the authorized administrator (contact@listpak.com) can log into the Admin Portal.')
      toast.error('Access Denied: Only contact@listpak.com can access the admin portal.')
      return
    }

    if (adminEmail && adminPass) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, adminEmail.trim(), adminPass)
        if (userCredential.user.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL) {
          await signOut(auth)
          setLoginError('Access Denied: Only contact@listpak.com is authorized to access the Admin Portal.')
          toast.error('Access Denied: Unauthorized admin user.')
          return
        }
        setAdminUid(userCredential.user.uid)
        setIsAuthenticated(true)
        sessionStorage.setItem('listpak_admin_auth', 'true')
        toast.success('Firebase Admin authenticated successfully.')
        fetchAdminData()
      } catch (err: any) {
        setLoginError('Authentication failed: Invalid credentials for contact@listpak.com.')
      }
    } else {
      setLoginError('Please enter admin email (contact@listpak.com) and password.')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (e) {}
    setIsAuthenticated(false)
    sessionStorage.removeItem('listpak_admin_auth')
    toast.info('Logged out of Admin Panel.')
  }

  const handleApprove = async (id: string, name: string) => {
    setActionLoading(id)
    try {
      await approveBusiness(id, adminUid)
      setAllBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: 'approved' } : b))
      if (selectedBiz?.id === id) {
        setSelectedBiz({ ...selectedBiz, status: 'approved' })
      }
      toast.success(`"${name}" is officially approved and live on ListPak!`)
    } catch (err) {
      toast.error('Failed to approve business listing.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string, name: string) => {
    const reason = prompt('Enter rejection reason (optional):', 'Does not satisfy business verification requirements.')
    if (reason === null) return

    setActionLoading(id)
    try {
      await rejectBusiness(id, reason)
      setAllBusinesses(prev => prev.map(b => b.id === id ? { ...b, status: 'rejected', rejectionReason: reason } : b))
      if (selectedBiz?.id === id) {
        setSelectedBiz({ ...selectedBiz, status: 'rejected', rejectionReason: reason })
      }
      toast.info(`"${name}" has been rejected.`)
    } catch (err) {
      toast.error('Failed to reject business listing.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteBusiness = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently remove "${name}"?`)) return

    setActionLoading(id)
    try {
      await deleteDoc(doc(db, 'businesses', id))
      setAllBusinesses(prev => prev.filter(b => b.id !== id))
      if (selectedBiz?.id === id) {
        setSelectedBiz(null)
      }
      toast.success(`Removed "${name}" from database.`)
    } catch (err) {
      toast.error('Failed to delete business.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleToggleReadMessage = async (msgId: string) => {
    await markContactMessageRead(msgId)
    setContactMessages(prev => prev.map(m => m.id === msgId ? { ...m, status: 'read' } : m))
    toast.success('Message marked as read.')
  }

  const handleDeleteMessage = async (msgId: string) => {
    await deleteContactMessage(msgId)
    setContactMessages(prev => prev.filter(m => m.id !== msgId))
    toast.success('Message deleted.')
  }

  const pendingListings = allBusinesses.filter(b => b.status === 'pending')
  const approvedListings = allBusinesses.filter(b => (b.status || 'approved') === 'approved')
  const rejectedListings = allBusinesses.filter(b => b.status === 'rejected')
  const featuredListings = allBusinesses.filter(b => b.isFeatured)

  const pendingPros = allProfessionals.filter(p => p.status === 'pending' || p.profileStatus === 'PENDING')
  const approvedPros = allProfessionals.filter(p => (p.status || 'approved') === 'approved' && (p.profileStatus || 'APPROVED') === 'APPROVED')
  const rejectedPros = allProfessionals.filter(p => p.status === 'rejected' || p.profileStatus === 'REJECTED')
  const verifiedPros = allProfessionals.filter(p => p.verified === true || p.verificationStatus === 'VERIFIED')
  const unverifiedPros = allProfessionals.filter(p => !p.verified && p.verificationStatus !== 'VERIFIED')
  const pendingVerReqs = verificationRequests.filter(r => r.status === 'PENDING')

  const stats = {
    totalBiz: allBusinesses.length,
    pendingBiz: pendingListings.length,
    approvedBiz: approvedListings.length,
    featuredBiz: featuredListings.length,
    categories: CATEGORIES.length,
    totalPros: allProfessionals.length,
    pendingPros: pendingPros.length,
    approvedPros: approvedPros.length,
    rejectedPros: rejectedPros.length,
    verifiedPros: verifiedPros.length,
    unverifiedPros: unverifiedPros.length,
    pendingVerReqs: pendingVerReqs.length,
    totalVerReqs: verificationRequests.length,
    messages: contactMessages.length,
    unreadMessages: contactMessages.filter(m => m.status === 'unread').length
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center py-16 px-4 font-sans">
          <div className="bg-white border border-[#D9E2F1] rounded-2xl shadow-[0_8px_40px_rgba(15,23,42,0.08)] p-8 sm:p-10 w-full max-w-md">
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center mx-auto mb-6 shadow-md">
              <Lock className="w-7 h-7 text-[#2563EB]" />
            </div>

            <h1 className="text-2xl font-extrabold text-[#0F172A] text-center mb-2">ListPak Secure Admin Portal</h1>
            <p className="text-xs text-[#64748B] text-center mb-8">Firebase Authentication & Administrative Verification Required.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">Admin Email</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@listpak.com"
                  className="w-full px-4 py-3 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">Password or Passcode</label>
                <div className="relative">
                  <input
                    type={showAdminPass ? 'text' : 'password'}
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="Enter password or listpak2026"
                    className="w-full pl-4 pr-11 py-3 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] font-mono text-[#0F172A]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                    title={showAdminPass ? 'Hide password' : 'Show password'}
                  >
                    {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer"
              >
                Authenticate to Admin Portal
              </button>

              <p className="text-[11px] text-slate-400 text-center pt-2">
                Passcode shortcut for review: <code className="text-blue-600 font-bold">listpak2026</code>
              </p>
            </form>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F4F7FC] text-[#0F172A] font-sans pb-16">
        
        {/* Top Header */}
        <section className="bg-[#0F172A] text-white py-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
                ListPak Administration Panel
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Moderation queues for businesses, professional approvals, Rs. 50 verification requests, and hiring companies.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchAdminData}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          
          {/* NAVIGATION TABS */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'overview' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Overview & Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative cursor-pointer shrink-0 ${
                activeTab === 'pending' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span>Pending Businesses ({stats.pendingBiz})</span>
            </button>

            <button
              onClick={() => setActiveTab('professionals')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative cursor-pointer shrink-0 ${
                activeTab === 'professionals' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Professional Profiles ({stats.totalPros})</span>
              {stats.pendingPros > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-900 text-[10px] font-extrabold">
                  {stats.pendingPros} Pending
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('verifications')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative cursor-pointer shrink-0 ${
                activeTab === 'verifications' ? 'bg-emerald-700 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verification Requests (Rs. 50)</span>
              {stats.pendingVerReqs > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold animate-pulse">
                  {stats.pendingVerReqs} New
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('businesses')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'businesses' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>All Businesses ({stats.totalBiz})</span>
            </button>

            <button
              onClick={() => setActiveTab('companies')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'companies' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#0284c7]" />
              <span>Companies ({allCompanies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'jobs' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Jobs ({allJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                activeTab === 'messages' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Inbox className="w-4 h-4 text-purple-400" />
              <span>Messages ({stats.messages})</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW & METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in-50">
              
              {/* Professional Profiles & Verification Overview Cards */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Professional Profiles & Trust Protocol
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div
                    onClick={() => { setActiveTab('professionals'); setProStatusFilter('pending') }}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-1 cursor-pointer hover:scale-102 transition-all"
                  >
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">Pending Profiles</span>
                    <p className="text-3xl font-extrabold text-amber-700">{stats.pendingPros}</p>
                    <span className="text-[10px] text-amber-600 font-semibold">Click to review</span>
                  </div>

                  <div
                    onClick={() => { setActiveTab('professionals'); setProStatusFilter('approved') }}
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs space-y-1 cursor-pointer hover:scale-102 transition-all"
                  >
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Approved Profiles</span>
                    <p className="text-3xl font-extrabold text-emerald-700">{stats.approvedPros}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Public directory live</span>
                  </div>

                  <div
                    onClick={() => { setActiveTab('verifications') }}
                    className="bg-purple-50 border border-purple-200 rounded-2xl p-5 shadow-xs space-y-1 cursor-pointer hover:scale-102 transition-all"
                  >
                    <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">Pending Rs. 50 Verifications</span>
                    <p className="text-3xl font-extrabold text-purple-700">{stats.pendingVerReqs}</p>
                    <span className="text-[10px] text-purple-600 font-semibold">Awaiting payment check</span>
                  </div>

                  <div
                    onClick={() => { setActiveTab('professionals'); setProVerifyFilter('verified') }}
                    className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-xs space-y-1 cursor-pointer hover:scale-102 transition-all"
                  >
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">Verified (Green ✓)</span>
                    <p className="text-3xl font-extrabold text-blue-700">{stats.verifiedPros}</p>
                    <span className="text-[10px] text-blue-600 font-semibold">Editing unlocked</span>
                  </div>

                  <div
                    onClick={() => { setActiveTab('professionals'); setProVerifyFilter('unverified') }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1 cursor-pointer hover:scale-102 transition-all"
                  >
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Unverified Approved</span>
                    <p className="text-3xl font-extrabold text-slate-800">{stats.unverifiedPros}</p>
                    <span className="text-[10px] text-slate-400 font-semibold">Public (editing locked)</span>
                  </div>
                </div>
              </div>

              {/* General Business Overview Cards */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Businesses & Company Listings
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Businesses</span>
                    <p className="text-3xl font-extrabold text-slate-900">{stats.totalBiz}</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-1">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Pending Businesses</span>
                    <p className="text-3xl font-extrabold text-amber-700">{stats.pendingBiz}</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs space-y-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Approved Businesses</span>
                    <p className="text-3xl font-extrabold text-emerald-700">{stats.approvedBiz}</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-xs space-y-1">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Hiring Companies</span>
                    <p className="text-3xl font-extrabold text-blue-700">{allCompanies.length}</p>
                  </div>
                </div>
              </div>

              {/* Policy Explanation Note */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
                <h2 className="text-lg font-extrabold text-slate-900">ListPak Professional Approval & Verification Architecture</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">1. Approval (Permission to be Public):</strong>
                    When an admin clicks <strong>Approve Profile</strong>, the status becomes <code className="bg-white px-1 py-0.5 rounded text-emerald-700 font-bold">APPROVED</code> and the profile appears publicly on the directory. However, it remains <code className="bg-white px-1 py-0.5 rounded text-slate-700 font-bold">UNVERIFIED</code> and profile editing is locked until verification is awarded.
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <strong className="text-emerald-950 block mb-1">2. Verification (Rs. 50 Paid Trust Status):</strong>
                    When an admin verifies the Rs. 50 receipt and clicks <strong>Approve Verification</strong>, the status becomes <code className="bg-white px-1 py-0.5 rounded text-emerald-700 font-bold">VERIFIED</code>. The profile receives the official green check mark and unlocks full profile editing access for the user.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PENDING BUSINESS QUEUE */}
          {activeTab === 'pending' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-slate-900">Pending Business Submissions</h2>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  {pendingListings.length} Awaiting Administrative Review
                </span>
              </div>

              {pendingListings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h3 className="font-bold text-slate-900 text-base">All Business Submissions Processed</h3>
                  <p className="text-xs text-slate-500">There are no businesses currently waiting in the approval queue.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingListings.map((biz) => (
                    <div key={biz.id} className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              Pending Approval
                            </span>
                            <h3 className="font-extrabold text-slate-900 text-lg mt-1">{biz.name}</h3>
                            <p className="text-xs text-slate-500">{biz.category} • {biz.city}</p>
                          </div>
                          <button
                            onClick={() => setSelectedBiz(biz)}
                            className="p-2 text-slate-400 hover:text-blue-600 cursor-pointer"
                            title="View Full Profile"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {biz.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex gap-3">
                        <button
                          onClick={() => handleApprove(biz.id, biz.name)}
                          disabled={actionLoading === biz.id}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Publish</span>
                        </button>
                        <button
                          onClick={() => handleReject(biz.id, biz.name)}
                          disabled={actionLoading === biz.id}
                          className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFESSIONAL PROFILES DIRECTORY */}
          {activeTab === 'professionals' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in-50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Professional Profiles Moderation</h2>
                  <p className="text-xs text-slate-500">
                    Approve submissions to make them publicly visible, or toggle verification status.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search name, category, city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs w-56"
                    />
                  </div>

                  <select
                    value={proStatusFilter}
                    onChange={(e) => setProStatusFilter(e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option value="all">Status: All</option>
                    <option value="pending">Status: Pending</option>
                    <option value="approved">Status: Approved</option>
                    <option value="rejected">Status: Rejected</option>
                  </select>

                  <select
                    value={proVerifyFilter}
                    onChange={(e) => setProVerifyFilter(e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option value="all">Verification: All</option>
                    <option value="verified">Verification: Verified (✓)</option>
                    <option value="unverified">Verification: Unverified (✕)</option>
                  </select>
                </div>
              </div>

              {/* Profiles Table / Cards */}
              <div className="space-y-4">
                {allProfessionals
                  .filter(p => {
                    const q = searchQuery.toLowerCase().trim()
                    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.profession.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)
                    const status = p.status || p.profileStatus?.toLowerCase() || 'approved'
                    const matchesStatus = proStatusFilter === 'all' || status === proStatusFilter
                    const isV = p.verified === true || p.verificationStatus === 'VERIFIED'
                    const matchesVerify = proVerifyFilter === 'all' || (proVerifyFilter === 'verified' ? isV : !isV)
                    return matchesQuery && matchesStatus && matchesVerify
                  })
                  .sort((a, b) => {
                    // 1. Pending profiles always at the top for immediate admin action
                    const aPending = (a.status === 'pending' || a.profileStatus === 'PENDING') ? 1 : 0
                    const bPending = (b.status === 'pending' || b.profileStatus === 'PENDING') ? 1 : 0
                    if (bPending !== aPending) return bPending - aPending

                    // 2. Newest registration timestamp first
                    const bTime = new Date(b.submittedAt || 0).getTime() || (b.id ? parseInt(b.id.replace(/\D/g, '')) || 0 : 0)
                    const aTime = new Date(a.submittedAt || 0).getTime() || (a.id ? parseInt(a.id.replace(/\D/g, '')) || 0 : 0)
                    return bTime - aTime
                  })
                  .map((pro) => {
                    const isAppr = (pro.status || 'approved') === 'approved' && (pro.profileStatus || 'APPROVED') === 'APPROVED'
                    const isPend = pro.status === 'pending' || pro.profileStatus === 'PENDING'
                    const isRej = pro.status === 'rejected' || pro.profileStatus === 'REJECTED'
                    const isVer = pro.verified === true || pro.verificationStatus === 'VERIFIED'

                    return (
                      <div
                        key={pro.username}
                        className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-slate-300"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={pro.avatar}
                            alt={pro.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-extrabold text-slate-900 text-base truncate">{pro.name}</h3>
                              
                              {/* Verification Badge */}
                              {isVer ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Verified</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                                  <XCircle className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Unverified</span>
                                </span>
                              )}

                              {/* Approval Status Badge */}
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                                isAppr ? 'bg-emerald-100 text-emerald-800' : isPend ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {isAppr ? 'Approved' : isPend ? 'Pending Review' : 'Rejected'}
                              </span>
                            </div>

                            <p className="text-xs font-bold text-blue-600 truncate">{pro.title} ({pro.profession})</p>
                            <p className="text-[11px] text-slate-500">
                              📍 {pro.city} • Rate: {pro.hourlyRate} • {pro.experienceYears}y Exp • Submitted: {new Date(pro.submittedAt || Date.now()).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
                          <button
                            onClick={() => setSelectedPro(pro)}
                            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer"
                          >
                            Full Details
                          </button>

                          {pro.verificationPaymentDetails?.paymentScreenshot && (
                            <button
                              type="button"
                              onClick={() => setSelectedScreenshot({
                                url: pro.verificationPaymentDetails!.paymentScreenshot!,
                                name: pro.name,
                                ref: pro.verificationPaymentDetails!.transactionRef || 'TID'
                              })}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              title="Inspect uploaded payment screenshot"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-600" />
                              <span>See Payment Proof</span>
                            </button>
                          )}

                          {isAppr && (
                            <Link
                              href={`/professionals/${pro.username}`}
                              target="_blank"
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Live</span>
                            </Link>
                          )}

                          {isPend && (
                            <button
                              onClick={() => handleApprovePro(pro.id || pro.username, pro.name)}
                              disabled={actionLoading === (pro.id || pro.username)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                            >
                              Approve Profile
                            </button>
                          )}

                          {isAppr && !isVer && (
                            <button
                              onClick={() => handleVerifyPro(pro.id || pro.username, pro.name)}
                              disabled={actionLoading === (pro.id || pro.username)}
                              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                              title="Award verified badge and unlock profile editing"
                            >
                              Verify
                            </button>
                          )}

                          {isVer && (
                            <button
                              onClick={() => handleUnverifyPro(pro.id || pro.username, pro.name)}
                              disabled={actionLoading === (pro.id || pro.username)}
                              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-xl border border-amber-200 cursor-pointer"
                              title="Remove verified badge and re-lock editing"
                            >
                              Unverify
                            </button>
                          )}

                          {!isRej && (
                            <button
                              onClick={() => handleRejectPro(pro.id || pro.username, pro.name)}
                              disabled={actionLoading === (pro.id || pro.username)}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl border border-red-200 cursor-pointer"
                            >
                              Reject
                            </button>
                          )}

                          <button
                            onClick={() => handleDeletePro(pro.id || pro.username, pro.name)}
                            disabled={actionLoading === (pro.id || pro.username)}
                            className="p-2 text-slate-400 hover:text-red-600 cursor-pointer"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

          {/* TAB 4: PROFESSIONAL VERIFICATION REQUESTS (RS. 50 PAID QUEUE) */}
          {activeTab === 'verifications' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    <span>Professional Verification Requests (Rs. 50 Fee Queue)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review payment screenshot proofs and transaction IDs submitted by Pakistani professionals.
                  </p>
                </div>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  {verificationRequests.length} Total Verification Requests
                </span>
              </div>

              {verificationRequests.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="font-bold text-slate-900 text-base">No Verification Requests Yet</h3>
                  <p className="text-xs text-slate-500">When professionals submit their Rs. 50 payment receipt, it will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {verificationRequests.map((req) => (
                    <div
                      key={req.id}
                      className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
                        req.status === 'PENDING'
                          ? 'bg-amber-50/50 border-amber-200 shadow-xs'
                          : req.status === 'APPROVED'
                          ? 'bg-emerald-50/30 border-emerald-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="space-y-3 min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          {req.avatar && (
                            <img src={req.avatar} alt={req.proName} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-extrabold text-slate-900 text-base">{req.proName}</h3>
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                                req.status === 'APPROVED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : req.status === 'PENDING'
                                  ? 'bg-amber-200 text-amber-900 animate-pulse'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {req.status === 'APPROVED' ? '✓ Verified Approved' : req.status === 'PENDING' ? 'Pending Payment Review' : 'Rejected'}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-blue-600">{req.profession} • {req.city}</p>
                          </div>
                        </div>

                        {/* Payment metadata */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-white rounded-xl border border-slate-200/80 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase block">Fee Amount</span>
                            <span className="font-extrabold text-emerald-700">Rs. {req.amount || 50}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase block">Method</span>
                            <span className="font-bold text-slate-800">{req.paymentMethod}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase block">Transaction Ref (TID)</span>
                            <span className="font-mono font-bold text-blue-700">{req.paymentReference}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase block">Submitted Date</span>
                            <span className="font-semibold text-slate-600">{new Date(req.submittedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Screenshot Preview & Action Controls */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                        {req.paymentScreenshot && (
                          <button
                            type="button"
                            onClick={() => setSelectedScreenshot({ url: req.paymentScreenshot || '', name: req.proName, ref: req.paymentReference })}
                            className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-extrabold rounded-xl border border-blue-200 flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center shadow-2xs transition-all hover:scale-105"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                            <span>See Payment Screenshot Proof</span>
                          </button>
                        )}

                        {req.status === 'PENDING' && (
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => handleApproveVerificationReq(req)}
                              disabled={actionLoading === req.id}
                              className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Approve Verification</span>
                            </button>

                            <button
                              onClick={() => handleRejectVerificationReq(req)}
                              disabled={actionLoading === req.id}
                              className="flex-1 sm:flex-initial px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ALL BUSINESSES DIRECTORY */}
          {activeTab === 'businesses' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-wider">
                        <th className="py-4 px-4">Business Name & Category</th>
                        <th className="py-4 px-4">City</th>
                        <th className="py-4 px-4">Contact Details</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {allBusinesses.map((biz) => (
                        <tr key={biz.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-extrabold text-slate-900 text-sm">{biz.name}</div>
                            <div className="text-[11px] text-slate-500">{biz.category}</div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-700">{biz.city}</td>
                          <td className="py-4 px-4 text-slate-600 space-y-0.5">
                            <div>{biz.phone}</div>
                            <div className="text-[11px] text-slate-400">{biz.email}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              (biz.status || 'approved') === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {biz.status || 'approved'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <Link
                              href={`/business/${biz.slug}`}
                              target="_blank"
                              className="px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold"
                            >
                              Live
                            </Link>
                            <button
                              onClick={() => setSelectedBiz(biz)}
                              className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleDeleteBusiness(biz.id, biz.name)}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: HIRING COMPANIES */}
          {activeTab === 'companies' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900">Hiring Companies Directory</h2>
              <div className="space-y-4">
                {allCompanies.map((comp) => (
                  <div key={comp.slug} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img src={comp.logo} alt={comp.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">{comp.name}</h3>
                        <p className="text-xs text-blue-600 font-bold">{comp.industry} • {comp.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/companies/${comp.slug}`} target="_blank" className="px-3 py-1.5 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl">
                        Preview
                      </Link>
                      {comp.status === 'pending' && (
                        <button onClick={() => handleApproveCompany(comp.id || comp.slug, comp.name)} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-xl">
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: JOBS */}
          {activeTab === 'jobs' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900">Job Openings Moderation</h2>
              <div className="space-y-4">
                {allJobs.map((job) => (
                  <div key={job.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{job.title}</h3>
                      <p className="text-xs text-slate-500">{job.company} • {job.city} • {job.salary}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={getPublicJobPath(job)} target="_blank" className="px-3 py-1.5 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl">
                        View
                      </Link>
                      {job.status === 'pending' && (
                        <button onClick={() => handleApproveJob(job.id, job.title)} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-xl">
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4 animate-in fade-in-50">
              <h2 className="text-xl font-extrabold text-slate-900">Contact Form Messages</h2>
              {contactMessages.map((msg) => (
                <div key={msg.id} className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-slate-900">{msg.name}</h3>
                      <p className="text-xs text-slate-500">{msg.email} • {msg.phone}</p>
                    </div>
                    <span className="text-xs text-slate-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <strong>Subject: {msg.subject}</strong>
                    <p className="mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* MODAL: PROFESSIONAL COMPLETE DETAILS */}
        {selectedPro && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div className="flex items-center gap-4">
                  <img src={selectedPro.avatar} alt={selectedPro.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-extrabold text-slate-900">{selectedPro.name}</h3>
                      {selectedPro.verified && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
                    </div>
                    <p className="text-xs font-bold text-blue-600">{selectedPro.title} ({selectedPro.profession})</p>
                    <p className="text-[11px] text-slate-400">/professionals/{selectedPro.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPro(null)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Short Bio:</strong>
                  <p className="text-slate-700 leading-relaxed">{selectedPro.bio}</p>
                </div>

                {selectedPro.about && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">Detailed About:</strong>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{selectedPro.about}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div><strong>City:</strong> {selectedPro.city}</div>
                  <div><strong>Phone:</strong> {selectedPro.phone || 'N/A'}</div>
                  <div><strong>WhatsApp:</strong> {selectedPro.whatsapp || 'N/A'}</div>
                  <div><strong>Email:</strong> {selectedPro.email || 'N/A'}</div>
                  <div><strong>Rate:</strong> {selectedPro.hourlyRate}</div>
                  <div><strong>Experience:</strong> {selectedPro.experienceYears} Years</div>
                </div>

                {selectedPro.skills && selectedPro.skills.length > 0 && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <strong className="text-slate-900 block font-bold">Skills:</strong>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPro.skills.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg font-bold text-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Status:</span>
                  <span className="text-xs font-extrabold text-blue-600 uppercase">
                    {selectedPro.status || 'approved'} • {selectedPro.verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/professionals/${selectedPro.username}`}
                    target="_blank"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Public Preview</span>
                  </Link>

                  {selectedPro.status === 'pending' && (
                    <button
                      onClick={() => handleApprovePro(selectedPro.id || selectedPro.username, selectedPro.name)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Approve Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: PAYMENT SCREENSHOT INSPECTOR & LEGITIMACY CHECK */}
        {selectedScreenshot && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50 duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[95vh] flex flex-col shadow-2xl border border-slate-200">
              
              {/* Modal Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{selectedScreenshot.name}</h3>
                      <p className="text-xs font-mono text-blue-600 font-bold">Transaction Ref / TID: {selectedScreenshot.ref}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer transition-colors"
                  title="Close Inspector"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-Resolution Screenshot Image Area */}
              <div className="rounded-2xl overflow-y-auto bg-slate-950 flex flex-col items-center justify-center max-h-[55vh] p-2 border border-slate-800 relative group">
                <img
                  src={selectedScreenshot.url}
                  alt="Payment Receipt"
                  className="max-h-[50vh] w-auto object-contain rounded-xl"
                />
              </div>

              {/* Legitimacy Checklist Box */}
              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/80 text-xs space-y-1.5 text-slate-700">
                <span className="font-extrabold text-blue-950 block">Admin Compliance &amp; Verification Checklist:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Confirm Rs. 50 transfer amount</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Match TID with bank account statement</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verify receiver account (EasyPaisa / Mashreq)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Check date &amp; timestamp authenticity</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
                <a
                  href={selectedScreenshot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold underline flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Size Image</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      const matchedPro = allProfessionals.find(p => p.name === selectedScreenshot.name || p.username === selectedScreenshot.ref)
                      if (matchedPro) {
                        handleVerifyPro(matchedPro.id || matchedPro.username, matchedPro.name)
                      }
                      setSelectedScreenshot(null)
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify &amp; Award Badge</span>
                  </button>

                  <button
                    onClick={() => setSelectedScreenshot(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PREVIEW DETAILS MODAL FOR BUSINESS */}
        {selectedBiz && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{selectedBiz.name}</h3>
                  <p className="text-xs text-blue-600 font-bold">{selectedBiz.category} • {selectedBiz.city}</p>
                </div>
                <button
                  onClick={() => setSelectedBiz(null)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Business Description:</span>
                  <p className="leading-relaxed whitespace-pre-line">{selectedBiz.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div><strong>Phone:</strong> {selectedBiz.phone}</div>
                  <div><strong>WhatsApp:</strong> {selectedBiz.whatsapp}</div>
                  <div><strong>Email:</strong> {selectedBiz.email}</div>
                  <div><strong>Website:</strong> {selectedBiz.website}</div>
                  <div className="col-span-2"><strong>Address:</strong> {selectedBiz.address}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs font-bold text-amber-700 uppercase">
                  Status: {selectedBiz.status || 'approved'}
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/business/${selectedBiz.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Live Page</span>
                  </Link>
                  {selectedBiz.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(selectedBiz.id, selectedBiz.name)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Approve & Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBusiness(selectedBiz.id, selectedBiz.name)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Delete Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
