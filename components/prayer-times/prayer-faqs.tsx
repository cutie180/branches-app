import React from 'react'
import { HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PRAYER_FAQS } from '@/lib/prayer-service'

export default function PrayerFaqs() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
      
      {/* Section Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Clear answers regarding daily prayer schedules, city variations, and calculation methodology in Pakistan.
        </p>
      </div>

      {/* Accordion Component */}
      <Accordion type="single" collapsible className="w-full space-y-3">
        {PRAYER_FAQS.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border border-slate-200/80 rounded-2xl px-5 py-1 bg-slate-50/50 data-[state=open]:bg-blue-50/40 data-[state=open]:border-blue-200 transition-colors"
          >
            <AccordionTrigger className="text-left font-bold text-slate-900 text-sm sm:text-base hover:no-underline py-4">
              <span>{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-xs sm:text-sm leading-relaxed pb-4 pt-1">
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  )
}
