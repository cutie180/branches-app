'use client'

import React, { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

interface JobInteractiveApplyProps {
  jobTitle: string
  companyName: string
}

export default function JobInteractiveApply({ jobTitle, companyName }: JobInteractiveApplyProps) {
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [applicantPhone, setApplicantPhone] = useState('')
  const [coverNote, setCoverNote] = useState('')

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applicantName || !applicantEmail) {
      toast.error('Please enter name and email.')
      return
    }
    setShowApplyModal(false)
    setApplicantName('')
    setApplicantEmail('')
    setApplicantPhone('')
    setCoverNote('')
    toast.success(`Application submitted to ${companyName} HR team!`)
  }

  return (
    <>
      <button
        onClick={() => setShowApplyModal(true)}
        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>Apply on ListPak</span>
      </button>

      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 font-sans">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Apply for {jobTitle}</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg">✕</button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Hamza Shaikh"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cover Note / Intro</label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Brief message for the HR hiring manager..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
