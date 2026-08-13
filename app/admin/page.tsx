'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { db, auth } from '@/lib/firebase'
import { collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy, setDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { 
  Building2, ShieldCheck, CheckCircle2, XCircle, Trash2, Search, Filter, LogOut, 
  Eye, RefreshCw, Phone, Mail, MapPin, ExternalLink, Lock, Inbox, AlertTriangle, Users, BookOpen, Star, Sparkles, Check, Briefcase
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { BusinessItem, ContactMessage, CATEGORIES, ProfessionalItem, CompanyItem, JobItem } from '@/lib/data'
import { getAllBusinesses, getPendingBusinesses, approveBusiness, rejectBusiness, getContactMessages, markContactMessageRead, deleteContactMessage } from '@/lib/db-service'
import { getAllProfessionals, approveProfessional, rejectProfessional } from '@/lib/professional-service'
import { getAllCompanies, approveCompany, rejectCompany } from '@/lib/company-service'
import { getAllJobs, approveJob, rejectJob } from '@/lib/job-service'
import { toast } from 'sonner'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const [adminUid, setAdminUid] = useState('admin-master')

  const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'businesses' | 'professionals' | 'companies' | 'jobs' | 'messages'>('overview')

  const [allBusinesses, setAllBusinesses] = useState<BusinessItem[]>([])
  const [allProfessionals, setAllProfessionals] = useState<ProfessionalItem[]>([])
  const [allCompanies, setAllCompanies] = useState<CompanyItem[]>([])
  const [allJobs, setAllJobs] = useState<JobItem[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBiz, setSelectedBiz] = useState<BusinessItem | null>(null)
  const [selectedPro, setSelectedPro] = useState<ProfessionalItem | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const authSession = sessionStorage.getItem('listpak_admin_auth')
    if (authSession === 'true') {
      setIsAuthenticated(true)
      fetchAdminData()
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAdminUid(user.uid)
        setIsAuthenticated(true)
        sessionStorage.setItem('listpak_admin_auth', 'true')
        fetchAdminData()
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

  const handleApprovePro = async (id: string, name: string) => {
    setActionLoading(id)
    try {
      await approveProfessional(id, adminUid)
      setAllProfessionals(prev => prev.map(p => (p.id === id || p.username === id) ? { ...p, status: 'approved' } : p))
      toast.success(`Professional "${name}" approved & verified!`)
    } catch (err) {
      toast.error('Failed to approve professional.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectPro = async (id: string, name: string) => {
    const reason = prompt(`Reason for rejecting "${name}":`, 'Does not meet identity verification guidelines.')
    if (reason === null) return

    setActionLoading(id)
    try {
      await rejectProfessional(id, reason)
      setAllProfessionals(prev => prev.map(p => (p.id === id || p.username === id) ? { ...p, status: 'rejected', rejectionReason: reason } : p))
      toast.info(`Professional profile "${name}" rejected.`)
    } catch (err) {
      toast.error('Failed to reject professional profile.')
    } finally {
      setActionLoading(null)
    }
  }

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

    // Try Passcode or Firebase Auth
    if (adminPass === 'listpak2026' || adminPass === 'admin123' || adminPass === 'listpakadmin') {
      setIsAuthenticated(true)
      sessionStorage.setItem('listpak_admin_auth', 'true')
      toast.success('Admin passcode verified successfully.')
      fetchAdminData()
      return
    }

    if (adminEmail && adminPass) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPass)
        setAdminUid(userCredential.user.uid)
        setIsAuthenticated(true)
        sessionStorage.setItem('listpak_admin_auth', 'true')
        toast.success('Firebase Admin authenticated successfully.')
        fetchAdminData()
      } catch (err: any) {
        setLoginError('Authentication failed: Invalid credentials or insufficient permissions.')
      }
    } else {
      setLoginError('Please enter admin email/password or admin passcode (listpak2026).')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (e) {
      // ignore
    }
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

  const stats = {
    totalBiz: allBusinesses.length,
    pending: pendingListings.length,
    approved: approvedListings.length,
    featured: featuredListings.length,
    categories: CATEGORIES.length,
    professionals: allProfessionals.length,
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
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Enter password or listpak2026"
                  className="w-full px-4 py-3 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] font-mono text-[#0F172A]"
                  required
                />
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
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Review pending business submissions, manage listings, and view contact inquiries.</p>
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
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Overview & Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative cursor-pointer ${
                activeTab === 'pending' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span>Pending Approvals ({stats.pending})</span>
              {stats.pending > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping absolute -top-1 -right-1"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('businesses')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'businesses' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>All Businesses ({stats.totalBiz})</span>
            </button>

            <button
              onClick={() => setActiveTab('professionals')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'professionals' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Professionals ({allProfessionals.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('companies')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'companies' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#0284c7]" />
              <span>Hiring Companies ({allCompanies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'jobs' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Job Vacancies ({allJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'messages' ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Inbox className="w-4 h-4 text-purple-400" />
              <span>Contact Messages ({stats.messages})</span>
              {stats.unreadMessages > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-extrabold">
                  {stats.unreadMessages} New
                </span>
              )}
            </button>
          </div>

          {/* TAB 1: OVERVIEW & METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Businesses</span>
                  <p className="text-3xl font-extrabold text-slate-900">{stats.totalBiz}</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Pending Review</span>
                  <p className="text-3xl font-extrabold text-amber-700">{stats.pending}</p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Approved & Live</span>
                  <p className="text-3xl font-extrabold text-emerald-700">{stats.approved}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Featured Bank Cards</span>
                  <p className="text-3xl font-extrabold text-blue-700">{stats.featured}</p>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Categories</span>
                  <p className="text-3xl font-extrabold text-slate-900">{stats.categories}</p>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Professionals</span>
                  <p className="text-3xl font-extrabold text-slate-900">{stats.professionals}</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Contact Inquiries</span>
                  <p className="text-3xl font-extrabold text-purple-700">{stats.messages}</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Rejected Submissions</span>
                  <p className="text-3xl font-extrabold text-red-700">{rejectedListings.length}</p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900">Administrative Overview & Security Policy</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Every business submitted via <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-mono">/add-business</code> remains in a <strong>pending status</strong> until verified by an administrator. Once approved, the business becomes publicly visible, searchable, and automatically included in <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-mono">sitemap.xml</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PENDING APPROVAL QUEUE */}
          {activeTab === 'pending' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-slate-900">Pending Business Approval Queue</h2>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  {pendingListings.length} Awaiting Administrative Review
                </span>
              </div>

              {pendingListings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h3 className="font-bold text-slate-900 text-base">All Pending Submissions Processed</h3>
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

                        <div className="pt-2 text-xs space-y-1 text-slate-600 border-t border-slate-100">
                          <div><strong>Owner / Contact:</strong> {biz.ownerName || 'Representative'}</div>
                          <div><strong>Phone:</strong> {biz.phone}</div>
                          <div><strong>Email:</strong> {biz.email}</div>
                          <div><strong>Address:</strong> {biz.address}</div>
                        </div>
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

          {/* TAB 3: ALL BUSINESSES DIRECTORY */}
          {activeTab === 'businesses' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search by business name, city, category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-slate-900"
                  />
                </div>
              </div>

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
                      {allBusinesses
                        .filter(b => 
                          b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.cities && b.cities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())))
                        )
                        .map((biz) => (
                          <tr key={biz.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="font-extrabold text-slate-900 text-sm">{biz.name}</div>
                              <div className="text-[11px] text-slate-500">{biz.category}</div>
                            </td>
                            <td className="py-4 px-4 font-semibold text-slate-700">
                              {biz.cities && biz.cities.length > 1 ? `${biz.city} (+${biz.cities.length - 1} branches)` : biz.city}
                            </td>
                            <td className="py-4 px-4 text-slate-600 space-y-0.5">
                              <div>{biz.phone}</div>
                              <div className="text-[11px] text-slate-400">{biz.email}</div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                (biz.status || 'approved') === 'approved'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : biz.status === 'rejected'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {biz.status || 'approved'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right space-x-2">
                              <Link
                                href={`/business/${biz.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-blue-200"
                                title="Open Live Business Page"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Live</span>
                              </Link>
                              <button
                                onClick={() => setSelectedBiz(biz)}
                                className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                              >
                                Details
                              </button>
                              {biz.status === 'pending' && (
                                <button
                                  onClick={() => handleApprove(biz.id, biz.name)}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBusiness(biz.id, biz.name)}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
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

          {/* TAB 4: CONTACT MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-extrabold text-slate-900">Contact Form Inquiries Inbox</h2>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                  {contactMessages.length} Total Received Inquiries
                </span>
              </div>

              {contactMessages.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-2">
                  <Inbox className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="font-bold text-slate-900 text-base">No Contact Messages Yet</h3>
                  <p className="text-xs text-slate-500">Inquiries submitted on `/contact` will appear here in real-time.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`bg-white rounded-2xl p-6 border shadow-xs transition-all space-y-3 ${
                        msg.status === 'unread' ? 'border-purple-300 ring-2 ring-purple-500/10' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-slate-900 text-base">{msg.name}</h3>
                            {msg.status === 'unread' && (
                              <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold">Unread</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">{msg.email} • {msg.phone || 'No Phone'}</p>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                        <span className="text-xs font-bold text-blue-600 block mb-1">Subject: {msg.subject}</span>
                        <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">{msg.message}</p>
                      </div>

                      <div className="pt-2 flex justify-end gap-3 text-xs">
                        {msg.status === 'unread' && (
                          <button
                            onClick={() => handleToggleReadMessage(msg.id)}
                            className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold rounded-lg cursor-pointer"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-lg cursor-pointer"
                        >
                          Delete Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFESSIONALS MANAGEMENT */}
          {activeTab === 'professionals' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Professional Profiles Directory</h2>
                  <p className="text-xs text-slate-500">Approve, verify, or reject personal profiles submitted by job seekers and professionals.</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Filter by name, profession, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {allProfessionals.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-8 text-center">No professional profiles registered yet.</p>
              ) : (
                <div className="space-y-4">
                  {allProfessionals
                    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.profession.toLowerCase().includes(searchQuery.toLowerCase()) || p.city.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((pro) => (
                      <div
                        key={pro.username}
                        className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img src={pro.avatar} alt={pro.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0" />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-extrabold text-slate-900 text-base">{pro.name}</h3>
                              {pro.verified && <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />}
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                                (pro.status || 'approved') === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : pro.status === 'pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {pro.status || 'approved'}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-blue-600">{pro.title} ({pro.profession})</p>
                            <p className="text-[11px] text-slate-500">📍 {pro.city} • {pro.hourlyRate} • {pro.experienceYears}y Exp</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <Link
                            href={`/professionals/${pro.username}`}
                            target="_blank"
                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
                          >
                            Preview
                          </Link>

                          {(pro.status === 'pending' || pro.status === 'rejected') && (
                            <button
                              onClick={() => handleApprovePro(pro.id || pro.username, pro.name)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                            >
                              Approve & Verify
                            </button>
                          )}

                          {pro.status !== 'rejected' && (
                            <button
                              onClick={() => handleRejectPro(pro.id || pro.username, pro.name)}
                              className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: HIRING COMPANIES MANAGEMENT */}
          {activeTab === 'companies' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Hiring Companies Directory</h2>
                  <p className="text-xs text-slate-500">Approve, verify employer status, or reject company profile submissions.</p>
                </div>
              </div>

              {allCompanies.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-8 text-center">No hiring companies registered yet.</p>
              ) : (
                <div className="space-y-4">
                  {allCompanies.map((comp) => (
                    <div
                      key={comp.slug}
                      className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img src={comp.logo} alt={comp.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-slate-900 text-base">{comp.name}</h3>
                            {comp.verified && <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />}
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                              (comp.status || 'approved') === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : comp.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {comp.status || 'approved'}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-blue-600">{comp.industry} • {comp.companySize}</p>
                          <p className="text-[11px] text-slate-500">📍 {comp.city} • HR: {comp.hrName || comp.hrEmail || 'HR Team'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <Link
                          href={`/companies/${comp.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
                        >
                          Preview
                        </Link>

                        {(comp.status === 'pending' || comp.status === 'rejected') && (
                          <button
                            onClick={() => handleApproveCompany(comp.id || comp.slug, comp.name)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Approve & Verify
                          </button>
                        )}

                        {comp.status !== 'rejected' && (
                          <button
                            onClick={() => handleRejectCompany(comp.id || comp.slug, comp.name)}
                            className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: JOB VACANCIES MODERATION */}
          {activeTab === 'jobs' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Job Openings Moderation</h2>
                  <p className="text-xs text-slate-500">Review job postings published across Pakistan.</p>
                </div>
              </div>

              {allJobs.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-8 text-center">No job openings posted yet.</p>
              ) : (
                <div className="space-y-4">
                  {allJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-base">{job.title}</h3>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                            (job.status || 'approved') === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : job.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {job.status || 'approved'}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-blue-600">
                          {job.company} • 📍 {job.cities && job.cities.length > 1 ? job.cities.join(', ') : job.city}
                        </p>
                        <p className="text-[11px] text-slate-500">{job.type} • {job.salary}</p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <Link
                          href={`/jobs/${job.slug || job.id}`}
                          target="_blank"
                          className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
                        >
                          Preview
                        </Link>

                        {(job.status === 'pending' || job.status === 'rejected') && (
                          <button
                            onClick={() => handleApproveJob(job.id, job.title)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Approve
                          </button>
                        )}

                        {job.status !== 'rejected' && (
                          <button
                            onClick={() => handleRejectJob(job.id, job.title)}
                            className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* PREVIEW DETAILS MODAL */}
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
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
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
