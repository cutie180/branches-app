export interface BusinessFaqItem {
  question: string
  answer: string
}

export interface BusinessSeoOverride {
  title: string
  description: string
  phone?: string
  whatsapp?: string
  address?: string
  faqs: BusinessFaqItem[]
}

/**
 * Strips markdown syntax (**, ##, bullets, links, code, etc.)
 * sitewide from schema descriptions to produce clean plain text.
 */
export function stripMarkdown(text: string): string {
  if (!text) return ''
  return text
    // Replace markdown links [text](url) with text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown headers (# Header)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold / italics (***text***, **text**, *text*, ___text___, __text__, _text_)
    .replace(/(\*{1,3}|_{1,3})(.*?)\1/g, '$2')
    // Remove bullet points / list markers (* item, - item, + item, 1. item)
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Remove blockquotes (> quote)
    .replace(/^\s*>\s+/gm, '')
    // Remove horizontal rules (---, ***, ___)
    .replace(/^(?:---|\*\*\*|___)\s*$/gm, '')
    // Remove inline code (`code`)
    .replace(/`([^`]+)`/g, '$1')
    // Remove code blocks (```code```)
    .replace(/```[\s\S]*?```/g, '')
    // Replace newlines with spaces and collapse multi-spaces
    .replace(/\r\n|\r|\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/**
 * Filter out synthetic/starter/template batch reviews.
 * Returns only genuine customer reviews.
 */
export function getRealReviews(
  reviews?: Array<{ id?: string; userName?: string; rating?: number; comment?: string; date?: string }>
): Array<{ id: string; userName: string; rating: number; comment: string; date: string }> {
  if (!Array.isArray(reviews)) return []
  const fakeNames = new Set([
    'tariq mehmood',
    'saima khan',
    'bilal ahmed',
    'hamza sheikh',
    'zainab fatima',
  ])
  return reviews
    .filter(r => {
      if (!r || !r.id || typeof r.id !== 'string') return false
      const id = r.id.toLowerCase()
      if (
        id.startsWith('rev-starter') ||
        id.startsWith('starter-') ||
        id.startsWith('rev-biz-') ||
        id.startsWith('rev-pb') ||
        id.startsWith('rev-orange')
      ) {
        return false
      }
      if (r.userName && fakeNames.has(r.userName.trim().toLowerCase())) {
        return false
      }
      return true
    })
    .map(r => ({
      id: r.id as string,
      userName: r.userName || 'Verified Reviewer',
      rating: typeof r.rating === 'number' ? r.rating : 5,
      comment: r.comment || '',
      date: r.date || 'Recently',
    }))
}

export const BUSINESS_SEO_OVERRIDES: Record<string, BusinessSeoOverride> = {
  'rahber-travels': {
    title: 'Rahber Travels Lahore – Contact Number, Adda Address & Timings | ListPak',
    description:
      'Rahber Travels contact number: 0307-5553045. Rehbar Adda on Band Road, Lahore — timings (open daily 10 AM–9 PM), routes & ticket info.',
    phone: '0307-5553045',
    faqs: [
      {
        question: 'What is the contact number of Rahber Travels in Lahore?',
        answer: 'You can contact Rahber Travels (also known as Rehbar Travels) in Lahore on 0307-5553045.',
      },
      {
        question: 'Where is Rehbar Adda Lahore located?',
        answer:
          "Rahber Travels' terminal (Rehbar Adda) is located on Band Road East, Dholanwal Nagra Town, Lahore, Punjab, Pakistan.",
      },
      {
        question: 'What are the timings of Rahber Travels Lahore?',
        answer: 'Rahber Travels is open daily from 10:00 AM to 9:00 PM.',
      },
      {
        question: 'Is Rahber Travels the same as Rehbar Travels?',
        answer:
          'Yes. Rahber Travels is also known as Rehbar Travels, Rahbar Travel and Rehbar Bus Service — they are the same Lahore-based intercity travel operator.',
      },
      {
        question: 'Does Rahber Travels offer intercity bus service?',
        answer:
          'Yes. Rahber Travels operates intercity passenger transport and travel services across Punjab and neighboring regions of Pakistan.',
      },
    ],
  },

  'nayatel': {
    title: 'Nayatel Helpline Number & Contact Details – Islamabad | ListPak',
    description:
      'Nayatel helpline: 1441 (24/7). SMS: 8116, WhatsApp: +92 51 111 11 44 44. Internet packages, coverage areas & Nayatel office details in Islamabad.',
    phone: '1441',
    whatsapp: '925111114444',
    faqs: [
      {
        question: 'What is the Nayatel helpline number?',
        answer: 'The Nayatel helpline number is 1441, available 24 hours a day, 7 days a week.',
      },
      {
        question: 'How can I contact Nayatel by SMS or WhatsApp?',
        answer:
          'You can reach Nayatel support by sending an SMS to 8116, or on WhatsApp at +92 (51) 111 11 44 44.',
      },
      {
        question: 'In which cities is Nayatel available?',
        answer: 'Nayatel provides fiber internet and TV services in Islamabad, Rawalpindi, Faisalabad and Peshawar.',
      },
      {
        question: 'What services does Nayatel offer?',
        answer:
          'Nayatel is a Fiber-to-the-Home (FTTH) operator offering high-speed broadband internet, cable television, and enterprise cloud and telecom services.',
      },
      {
        question: "Where is Nayatel's principal office?",
        answer: "Nayatel's principal office is in Islamabad, Pakistan.",
      },
    ],
  },

  'orange-line-metro-station-timing-and-routes': {
    title: 'Orange Line Metro Lahore – Timings, 26 Stations & Route | ListPak',
    description:
      'Orange Line Metro Lahore: 26 stations from Dera Gujran to Ali Town across 27.1 km. Train timings, station list, route & helpline (042) 111-222-627.',
    phone: '(042) 111-222-627',
    faqs: [
      {
        question: 'How many stations does the Orange Line Metro Lahore have?',
        answer: 'The Orange Line Metro Train in Lahore has 26 stations along a 27.1 km corridor.',
      },
      {
        question: 'What is the Orange Line Metro route in Lahore?',
        answer:
          'The Orange Line runs from Dera Gujran to Ali Town, following the corridor from Raiwind Road to Dera Gujran in Lahore.',
      },
      {
        question: 'How many passengers use the Orange Line Metro daily?',
        answer: 'The Orange Line Metro Train serves over 250,000 passengers every day in Lahore.',
      },
      {
        question: 'What is the Orange Line Metro helpline number?',
        answer: 'You can contact the Orange Line Metro service on (042) 111-222-627.',
      },
    ],
  },

  'al-zaban-hardware-store': {
    title: 'Al Zaban Hardware Store Lahore – Contact Number & Location | ListPak',
    description:
      'Al Zaban Hardware Store contact: 0335-1108300. Township B1, Lahore address, timings (open daily 10 AM–9 PM) & hardware products and prices info.',
    phone: '0335-1108300',
    whatsapp: '03351108300',
    address: 'Plot No. 3, Block No. 11, Sector B1, Township, Lahore, Pakistan',
    faqs: [
      {
        question: 'What is the contact number of Al Zaban Hardware Store?',
        answer: 'You can contact Al Zaban Hardware Store on 0335-1108300, or on the landline 042-35110830.',
      },
      {
        question: 'Where is Al Zaban Hardware Store located?',
        answer:
          'Al Zaban Hardware Store is located at Plot No. 3, Block No. 11, Sector B1, Township, Lahore, Pakistan.',
      },
      {
        question: 'What are the timings of Al Zaban Hardware Store?',
        answer: 'Al Zaban Hardware Store is open daily from 10:00 AM to 9:00 PM.',
      },
      {
        question: 'What products does Al Zaban Hardware Store sell?',
        answer:
          'Al Zaban is a one-stop hardware store in Township, Lahore selling hardware, tools and construction and building supplies.',
      },
    ],
  },

  'monal-lahore': {
    title: 'Monal Restaurant Lahore – Timings, Menu & Contact Number | ListPak',
    description:
      'Monal Restaurant Lahore — iconic rooftop dining with Pakistani, Mughlai, Continental & BBQ cuisine. Location, timings & contact details on ListPak.',
    phone: '042-35789823',
    whatsapp: '923334767104',
    address: 'Park and Ride Plaza, Liberty Roundabout, Gulberg III, Lahore, Punjab, Pakistan',
    faqs: [
      {
        question: 'Where is Monal Restaurant located in Lahore?',
        answer:
          'Monal Restaurant is a rooftop fine-dining landmark located in the heart of Lahore, Punjab, Pakistan.',
      },
      {
        question: 'What cuisine does Monal Lahore serve?',
        answer: 'Monal Lahore serves Pakistani, Mughlai, Continental and Barbecue dishes.',
      },
      {
        question: 'What is Monal Restaurant Lahore known for?',
        answer:
          'Monal Lahore is known for its rooftop terraces, fine-dining ambiance and panoramic dining experience in Lahore.',
      },
    ],
  },

  'allure-beauty': {
    title: 'Allure Beauty Karachi – Contact Number & Online Beauty Store | ListPak',
    description:
      'Allure Beauty contact: +92 300 0725776. Karachi-based online store for authentic makeup, skincare & perfumes. Delivery across Pakistan.',
    phone: '+92 300 0725776',
    whatsapp: '923000725776',
    address:
      'Plot 03, Tipu Sultan Road, Karachi Memon Co-operative Housing Society, Karachi, Sindh, Pakistan',
    faqs: [
      {
        question: "What is Allure Beauty's contact number?",
        answer: 'You can contact Allure Beauty on +92 300 0725776.',
      },
      {
        question: 'Where is Allure Beauty located?',
        answer:
          'Allure Beauty is located at Plot 03, Tipu Sultan Road, Karachi Memon Co-operative Housing Society, Karachi, Sindh, Pakistan.',
      },
      {
        question: 'What does Allure Beauty sell?',
        answer:
          'Allure Beauty sells authentic makeup, skincare and perfumes from international brands and top Pakistani makeup brands.',
      },
      {
        question: 'Does Allure Beauty deliver outside Karachi?',
        answer:
          'Yes. Allure Beauty is an online store based in Karachi that delivers beauty products to customers across Pakistan.',
      },
    ],
  },
}

export function getBusinessSeoOverride(slug: string): BusinessSeoOverride | undefined {
  if (!slug) return undefined
  const norm = slug.toLowerCase().trim()
  return BUSINESS_SEO_OVERRIDES[norm]
}
