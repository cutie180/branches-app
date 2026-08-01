'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { Building2, ShieldCheck, CheckCircle2, XCircle, Trash2, Search, Filter, LogOut, Eye, RefreshCw, Phone, Mail, MapPin, ExternalLink, Lock } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface Business {
  docId: string
  businessId: string
  businessName: string
  contactPerson?: string
  email?: string
  phone: string
  whatsapp?: string
  city: string
  address: string
  category: string
  subCategory?: string
  description: string
  websiteUrl?: string
  status: string
  createdAt: any
  slug: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPass, setAdminPass] = useState('')
  const [loginError, setLoginError] = useState('')

  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    const authSession = sessionStorage.getItem('listpak_admin_auth')
    if (authSession === 'true') {
      setIsAuthenticated(true)
      fetchBusinesses()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPass === 'listpak2026' || adminPass === 'admin123') {
      setIsAuthenticated(true)
      sessionStorage.setItem('listpak_admin_auth', 'true')
      setLoginError('')
      fetchBusinesses()
    } else {
      setLoginError('Invalid admin passcode. Please enter listpak2026')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('listpak_admin_auth')
  }

  const fetchBusinesses = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'businesses'))
      const snapshot = await getDocs(q)
      const list: Business[] = []
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Omit<Business, 'docId'>
        list.push({ ...data, docId: docSnap.id })
      })
      // Sort newest first
      list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      setBusinesses(list)
    } catch (err) {
      console.error('Error fetching businesses from Firestore:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (docId: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    setActionLoading(docId)
    try {
      const docRef = doc(db, 'businesses', docId)
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      })
      setBusinesses(prev => prev.map(b => b.docId === docId ? { ...b, status: newStatus } : b))
      if (selectedBiz && selectedBiz.docId === docId) {
        setSelectedBiz({ ...selectedBiz, status: newStatus })
      }
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Failed to update business status')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteBusiness = async (docId: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return

    setActionLoading(docId)
    try {
      const docRef = doc(db, 'businesses', docId)
      await deleteDoc(docRef)
      setBusinesses(prev => prev.filter(b => b.docId !== docId))
      if (selectedBiz?.docId === docId) {
        setSelectedBiz(null)
      }
    } catch (err) {
      console.error('Error deleting business:', err)
      alert('Failed to delete business listing')
    } finally {
      setActionLoading(null)
    }
  }

  const filteredBusinesses = businesses.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      b.businessName.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      (b.businessId && b.businessId.toLowerCase().includes(q)) ||
      (b.phone && b.phone.includes(q))
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: businesses.length,
    approved: businesses.filter(b => b.status === 'approved').length,
    pending: businesses.filter(b => b.status === 'pending').length,
    rejected: businesses.filter(b => b.status === 'rejected').length,
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

            <h1 className="text-2xl font-extrabold text-[#0F172A] text-center mb-2">ListPak Admin Panel</h1>
            <p className="text-xs text-[#64748B] text-center mb-8">Enter your admin passcode to access business management dashboard.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider">Admin Passcode</label>
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Enter admin passcode (listpak2026)"
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
                Login to Admin Dashboard
              </button>
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
                <ShieldCheck className="w-8 h-8 text-[#16A34A]" />
                ListPak Admin Panel
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Review business nature, approve verified listings, or remove businesses.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchBusinesses}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* STATS OVERVIEW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-[#D9E2F1] rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Total Registered</div>
              <div className="text-3xl font-extrabold text-[#0F172A]">{stats.total}</div>
            </div>

            <div className="bg-white border border-[#D9E2F1] rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-[#16A34A] uppercase tracking-wider mb-1">Approved & Live</div>
              <div className="text-3xl font-extrabold text-[#16A34A]">{stats.approved}</div>
            </div>

            <div className="bg-white border border-[#D9E2F1] rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Pending Review</div>
              <div className="text-3xl font-extrabold text-amber-600">{stats.pending}</div>
            </div>

            <div className="bg-white border border-[#D9E2F1] rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Rejected</div>
              <div className="text-3xl font-extrabold text-red-600">{stats.rejected}</div>
            </div>
          </div>

          {/* CONTROLS & SEARCH */}
          <div className="bg-white border border-[#D9E2F1] rounded-2xl p-5 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Filter Tabs */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {(['all', 'pending', 'approved', 'rejected'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all shrink-0 cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-[#F4F7FC] text-[#475569] hover:bg-slate-200'
                  }`}
                >
                  {st} ({st === 'all' ? stats.total : stats[st]})
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search business, ID, city, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
              />
            </div>

          </div>

          {/* BUSINESSES TABLE / LIST */}
          <div className="bg-white border border-[#D9E2F1] rounded-2xl shadow-[0_8px_40px_rgba(15,23,42,0.08)] overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-[#64748B]">Loading registered businesses from database...</div>
            ) : filteredBusinesses.length === 0 ? (
              <div className="p-12 text-center text-[#64748B]">No businesses found matching your filter criteria.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#EEF4FF] border-b border-[#D9E2F1] text-[#0F172A] font-bold uppercase tracking-wider">
                      <th className="py-4 px-4">ID & Business Name</th>
                      <th className="py-4 px-4">Category & City</th>
                      <th className="py-4 px-4">Contact Info</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9E2F1]">
                    {filteredBusinesses.map((biz) => (
                      <tr key={biz.docId} className="hover:bg-[#F4F7FC] transition-colors">
                        
                        {/* Name & ID */}
                        <td className="py-4 px-4">
                          <div className="font-extrabold text-[#0F172A] text-sm">{biz.businessName}</div>
                          <div className="text-[11px] text-[#2563EB] font-semibold mt-0.5">ID: {biz.businessId || 'N/A'}</div>
                        </td>

                        {/* Category & City */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-[#0F172A]">{biz.category}</div>
                          <div className="text-[11px] text-[#64748B]">{biz.city}</div>
                        </td>

                        {/* Contact Info */}
                        <td className="py-4 px-4 text-[#475569] space-y-1">
                          <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#2563EB]" /> {biz.phone}</div>
                          {biz.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-[#2563EB]" /> {biz.email}</div>}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                            biz.status === 'approved'
                              ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                              : biz.status === 'rejected'
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {biz.status || 'pending'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedBiz(biz)}
                            className="px-3 py-1.5 bg-[#EEF4FF] text-[#2563EB] hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Details
                          </button>

                          {biz.status !== 'approved' && (
                            <button
                              onClick={() => handleUpdateStatus(biz.docId, 'approved')}
                              disabled={actionLoading === biz.docId}
                              className="px-3 py-1.5 bg-[#16A34A] hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Approve
                            </button>
                          )}

                          {biz.status !== 'rejected' && (
                            <button
                              onClick={() => handleUpdateStatus(biz.docId, 'rejected')}
                              disabled={actionLoading === biz.docId}
                              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Reject
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteBusiness(biz.docId, biz.businessName)}
                            disabled={actionLoading === biz.docId}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* DETAILS MODAL */}
        {selectedBiz && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-[#D9E2F1] rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-[#D9E2F1] pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0F172A]">{selectedBiz.businessName}</h3>
                  <p className="text-xs text-[#2563EB] font-bold">Business ID: {selectedBiz.businessId}</p>
                </div>
                <button
                  onClick={() => setSelectedBiz(null)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4 text-xs text-[#475569]">
                <div className="grid grid-cols-2 gap-4 bg-[#F4F7FC] p-4 rounded-xl border border-[#D9E2F1]">
                  <div>
                    <span className="font-bold text-[#0F172A] block">Category:</span>
                    <span>{selectedBiz.category} {selectedBiz.subCategory ? `(${selectedBiz.subCategory})` : ''}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block">City & Location:</span>
                    <span>{selectedBiz.city}</span>
                  </div>
                </div>

                <div className="bg-[#F4F7FC] p-4 rounded-xl border border-[#D9E2F1]">
                  <span className="font-bold text-[#0F172A] block mb-1">Full Address:</span>
                  <span>{selectedBiz.address}</span>
                </div>

                <div className="bg-[#F4F7FC] p-4 rounded-xl border border-[#D9E2F1]">
                  <span className="font-bold text-[#0F172A] block mb-1">Business Description / Nature:</span>
                  <p className="leading-relaxed whitespace-pre-line text-[#0F172A] font-medium">{selectedBiz.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#F4F7FC] p-4 rounded-xl border border-[#D9E2F1]">
                  <div>
                    <span className="font-bold text-[#0F172A] block">Phone:</span>
                    <span>{selectedBiz.phone}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block">WhatsApp:</span>
                    <span>{selectedBiz.whatsapp || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block">Email:</span>
                    <span>{selectedBiz.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block">Website:</span>
                    <span>{selectedBiz.websiteUrl || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D9E2F1] flex justify-between items-center">
                <Link
                  href={`/business/${selectedBiz.slug}`}
                  target="_blank"
                  className="text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1"
                >
                  <span>Preview Live Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedBiz.docId, 'approved')}
                    className="px-4 py-2 bg-[#16A34A] hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedBiz.docId, 'rejected')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDeleteBusiness(selectedBiz.docId, selectedBiz.businessName)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Remove
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
