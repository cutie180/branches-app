'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MOCK_BUSINESSES, MOCK_JOBS } from '@/lib/data'
import Link from 'next/link'
import { LayoutDashboard, Building2, Briefcase, Bookmark, TrendingUp, Eye, PhoneCall, Plus, ShieldCheck, Settings, CheckCircle2 } from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'listings' | 'bookmarks' | 'settings'>('analytics')

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center border border-white/20">
                L
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">Owner & User Dashboard</h1>
                <p className="text-slate-400 text-xs mt-0.5">Manage your ListPak business profiles, listings analytics, and saved bookmarks.</p>
              </div>
            </div>

            <Link
              href="/add-business"
              className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-xl shadow-md inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>List New Business</span>
            </Link>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pt-4">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'analytics' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Performance Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'listings' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>My Businesses</span>
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'bookmarks' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Bookmarks</span>
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* TAB 1: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Profile Views</span>
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-3xl font-extrabold text-slate-900">4,820</p>
                <span className="text-[11px] font-semibold text-emerald-600">↑ +14.2% from last month</span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Phone Calls Initiated</span>
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-3xl font-extrabold text-slate-900">312</p>
                <span className="text-[11px] font-semibold text-emerald-600">↑ +8.5% from last month</span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Verified Trust Score</span>
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-3xl font-extrabold text-slate-900">98%</p>
                <span className="text-[11px] font-semibold text-emerald-600">100% CNIC Verified</span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Active Job Applications</span>
                  <Briefcase className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-3xl font-extrabold text-slate-900">19</p>
                <span className="text-[11px] font-semibold text-slate-500">Across 2 open positions</span>
              </div>
            </div>

            {/* Managed Profiles Table Preview */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-extrabold text-slate-900">Active Business Profiles</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Business Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">City</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_BUSINESSES.slice(0, 2).map((biz) => (
                      <tr key={biz.id}>
                        <td className="p-3 font-bold text-slate-900">{biz.name}</td>
                        <td className="p-3">{biz.category}</td>
                        <td className="p-3">{biz.city}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                            Verified & Live
                          </span>
                        </td>
                        <td className="p-3">
                          <Link href={`/business/${biz.slug}`} className="text-blue-600 font-bold hover:underline">
                            Manage Listing &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY BUSINESSES */}
        {activeTab === 'listings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_BUSINESSES.slice(0, 2).map((biz) => (
              <div key={biz.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg">{biz.name}</h3>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500">{biz.address}</p>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Rating: ★ {biz.rating} ({biz.reviewCount} reviews)</span>
                  <Link href={`/business/${biz.slug}`} className="text-xs font-bold text-blue-600 hover:underline">
                    Edit Profile &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BOOKMARKS */}
        {activeTab === 'bookmarks' && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <Bookmark className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Your Saved Bookmarks</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Save businesses and jobs to access them quickly anytime from your ListPak account.
            </p>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
