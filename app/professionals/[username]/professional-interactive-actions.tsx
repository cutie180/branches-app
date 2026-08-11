'use client'

import React, { useState } from 'react'
import { Mail, Star, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'

export interface ReviewItem {
  id: string
  userName: string
  rating: number
  date: string
  comment: string
}

export interface FaqItem {
  question: string
  answer: string
}

interface ProfessionalHeroActionsProps {
  proName: string
}

export function ProfessionalHeroActions({ proName }: ProfessionalHeroActionsProps) {
  const [showContactModal, setShowContactModal] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!senderName || !senderEmail || !message) {
      toast.error('Please enter all required fields.')
      return
    }
    setShowContactModal(false)
    setSenderName('')
    setSenderEmail('')
    setMessage('')
    toast.success(`Message dispatched directly to ${proName}!`)
  }

  return (
    <>
      {/* Contact Button Island trigger */}
      <button
        onClick={() => setShowContactModal(true)}
        className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
      >
        <Mail className="w-4 h-4" />
        <span>Contact Professional</span>
      </button>

      {/* Contact Inquiry Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 font-sans">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Send Inquiry to {proName}</h3>
              <button onClick={() => setShowContactModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg">✕</button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Inquiry Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project scope or consulting requirements..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

interface ProfessionalReviewsSectionProps {
  proName: string
  initialReviews: ReviewItem[]
}

export function ProfessionalReviewsSection({ proName, initialReviews }: ProfessionalReviewsSectionProps) {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewerRating, setReviewerRating] = useState(5)
  const [reviewerComment, setReviewerComment] = useState('')
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews)

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewerName || !reviewerComment) {
      toast.error('Please complete all review fields.')
      return
    }
    const newRev: ReviewItem = {
      id: 'rev-' + Date.now(),
      userName: reviewerName,
      rating: reviewerRating,
      date: 'Just now',
      comment: reviewerComment,
    }
    setReviews([newRev, ...reviews])
    setShowReviewModal(false)
    setReviewerName('')
    setReviewerComment('')
    toast.success('Thank you! Your review has been recorded.')
  }

  return (
    <>
      {/* Interactive Reviews Section */}
      <div id="professional-reviews-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Ratings & Client Reviews</h2>
            <p className="text-xs text-slate-500">Feedback from clients and colleagues on ListPak.</p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            Write a Review
          </button>
        </div>

        <div className="space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-900">{rev.userName}</span>
                  <span className="text-slate-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic">No reviews submitted yet.</p>
          )}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 font-sans">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Write Review for {proName}</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg">✕</button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Asad Shah"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating</label>
                <select
                  value={reviewerRating}
                  onChange={(e) => setReviewerRating(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-amber-600"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Below Average</option>
                  <option value={1}>1 Star - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Review *</label>
                <textarea
                  rows={4}
                  required
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  placeholder="Share your experience working with this professional..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export function ProfessionalFaqsSection({ faqs }: { faqs: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
      <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-blue-600" />
        <span>Frequently Asked Questions</span>
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full p-4 text-left font-bold text-xs text-slate-900 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span>{faq.question}</span>
              <span>{openFaq === idx ? '−' : '+'}</span>
            </button>
            {openFaq === idx && (
              <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProfessionalInteractiveActions(props: ProfessionalHeroActionsProps) {
  return <ProfessionalHeroActions {...props} />
}
