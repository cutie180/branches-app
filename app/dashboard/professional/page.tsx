'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ProfessionalItem, MOCK_PROFESSIONALS } from '@/lib/data'
import { getAllProfessionals, updateProfessionalProfile } from '@/lib/professional-service'
import Link from 'next/link'
import { 
  User, Briefcase, MapPin, Phone, Mail, Globe, ShieldCheck, Sparkles, Star, 
  Linkedin, Github, Edit3, Plus, Trash2, CheckCircle2, Save, FileText, ExternalLink,
  MessageCircle, RefreshCw, Eye
} from 'lucide-react'
import { toast } from 'sonner'

export default function ProfessionalDashboardPage() {
  const [profile, setProfile] = useState<ProfessionalItem>(MOCK_PROFESSIONALS[0])
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'socials' | 'reviews'>('profile')
  const [isSaving, setIsSaving] = useState(false)

  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    async function loadData() {
      const all = await getAllProfessionals(true)
      if (all.length > 0) {
        setProfile(all[0])
      }
    }
    loadData()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateProfessionalProfile(profile.username, profile)
      toast.success('Professional Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile.')
    } finally {
      setIsSaving(false)
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile(p => ({ ...p, skills: [...p.skills, skillInput.trim()] }))
      setSkillInput('')
    }
  }

  const removeSkill = (sk: string) => {
    setProfile(p => ({ ...p, skills: p.skills.filter(s => s !== sk) }))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-white">{profile.name}</h1>
                  {profile.verified && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                </div>
                <p className="text-xs text-blue-400 font-semibold">{profile.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">/professionals/{profile.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/professionals/${profile.username}`}
                target="_blank"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-blue-400" />
                <span>View Public Profile</span>
              </Link>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex flex-wrap gap-2 text-xs font-bold">
          {[
            { id: 'profile', label: 'Edit Profile & Details' },
            { id: 'experience', label: 'Skills & Education' },
            { id: 'socials', label: 'Social & Portfolio Links' },
            { id: 'reviews', label: 'Client Reviews (' + (profile.reviews?.length || 0) + ')' }
          ].map((tab: any) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: EDIT PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900">Personal Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(p => ({ ...p, name: e.target.value, fullName: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Professional Title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile(p => ({ ...p, city: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Availability</label>
                <input
                  type="text"
                  value={profile.availability || ''}
                  onChange={(e) => setProfile(p => ({ ...p, availability: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp</label>
                <input
                  type="tel"
                  value={profile.whatsapp || ''}
                  onChange={(e) => setProfile(p => ({ ...p, whatsapp: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">Short Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">Detailed About Section</label>
              <textarea
                rows={5}
                value={profile.about || ''}
                onChange={(e) => setProfile(p => ({ ...p, about: e.target.value }))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === 'experience' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900">Manage Skills & Credentials</h2>

            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">Add Skill</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="e.g. Next.js, Clinical Dermatology..."
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <button onClick={addSkill} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">Add</button>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                {profile.skills.map((s) => (
                  <span key={s} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    <span>{s}</span>
                    <button onClick={() => removeSkill(s)} className="text-red-600">✕</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SOCIAL LINKS */}
        {activeTab === 'socials' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Manage Social Links</h2>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <label className="block font-bold text-blue-900 text-xs mb-1">LinkedIn Profile (Highlighted)</label>
              <input
                type="url"
                value={profile.linkedin || ''}
                onChange={(e) => setProfile(p => ({ ...p, linkedin: e.target.value }))}
                className="w-full px-4 py-2 bg-white border border-blue-300 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">GitHub</label>
                <input
                  type="url"
                  value={profile.github || ''}
                  onChange={(e) => setProfile(p => ({ ...p, github: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Portfolio Website</label>
                <input
                  type="url"
                  value={profile.portfolio || ''}
                  onChange={(e) => setProfile(p => ({ ...p, portfolio: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Client Reviews</h2>
            <div className="space-y-3">
              {profile.reviews && profile.reviews.length > 0 ? (
                profile.reviews.map(r => (
                  <div key={r.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{r.userName}</span>
                      <span className="text-amber-500 font-extrabold">★ {r.rating}</span>
                    </div>
                    <p className="text-slate-600">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No reviews received yet.</p>
              )}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
