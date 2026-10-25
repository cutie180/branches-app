export interface CityFaqItem {
  question: string
  answer: string
}

export interface CitySeoOverride {
  title: string
  description: string
  intro?: string
  faqs: CityFaqItem[]
}

export const CITY_SEO_OVERRIDES: Record<string, CitySeoOverride> = {
  lahore: {
    title: 'Businesses in Lahore – 60+ Verified Local Listings | ListPak',
    description:
      'Browse 60+ verified businesses in Lahore — restaurants, software houses, services & more. Find contact numbers, addresses & reviews, or list your business free.',
    intro:
      "Lahore is Pakistan's commercial and cultural capital, home to one of the country's densest business ecosystems — from Food Street restaurants and Township hardware markets to Gulberg software houses and Johar Town clinics. This directory lists verified Lahore businesses across restaurants & food, technology & IT, healthcare, real estate, retail, construction and more, with contact numbers, addresses and operating hours for each listing. Business owners can add their Lahore listing free and get a Google-indexed profile.",
    faqs: [
      {
        question: 'How many businesses are listed in Lahore on ListPak?',
        answer:
          'ListPak lists 60+ verified businesses in Lahore across categories including restaurants & food, technology & IT, healthcare, real estate, retail and construction.',
      },
      {
        question: "How can I find a business's contact number in Lahore?",
        answer:
          'Every Lahore business listing on ListPak shows the verified contact number, address and operating hours — open any listing from this page.',
      },
      {
        question: 'How do I add my business in Lahore to ListPak?',
        answer:
          'Adding your Lahore business to ListPak is free. Submit your business name, category, contact number and address, and your listing goes live as a Google-indexed profile.',
      },
    ],
  },

  islamabad: {
    title: 'Businesses in Islamabad – 55+ Verified Local Listings | ListPak',
    description:
      'Browse 55+ verified businesses in Islamabad — tech companies, restaurants, services & more. Contact numbers, addresses & reviews, or list your business free.',
    intro:
      "Islamabad's planned sectors host Pakistan's highest concentration of tech companies, consultancies and government-adjacent services, alongside a growing restaurant and retail scene in F-6, F-7, Blue Area and G-9 Markaz. This directory lists verified Islamabad businesses across technology & IT, restaurants & food, healthcare, professional services and more, with contact numbers, addresses and operating hours. Business owners can add their Islamabad listing free.",
    faqs: [
      {
        question: 'How many businesses are listed in Islamabad on ListPak?',
        answer:
          'ListPak lists 55+ verified businesses in Islamabad across technology & IT, restaurants & food, healthcare, professional services and more.',
      },
      {
        question: "How can I find a business's contact number in Islamabad?",
        answer:
          'Every Islamabad business listing on ListPak shows the verified contact number, address and operating hours — open any listing from this page.',
      },
      {
        question: 'How do I add my business in Islamabad to ListPak?',
        answer:
          'Adding your Islamabad business to ListPak is free. Submit your business name, category, contact number and address, and your listing goes live as a Google-indexed profile.',
      },
    ],
  },

  karachi: {
    title: 'Businesses in Karachi – 30+ Verified Local Listings | ListPak',
    description:
      'Browse 30+ verified businesses in Karachi — restaurants, healthcare, tech & more. Contact numbers, addresses & reviews, or list your business free.',
    intro:
      "Karachi is Pakistan's largest city and financial hub, with business districts from Clifton and DHA to Saddar and SITE industrial area. This directory lists verified Karachi businesses across restaurants & food, healthcare, technology & IT, retail and more, with contact numbers, addresses and operating hours for each listing. Business owners can add their Karachi listing free and get a Google-indexed profile.",
    faqs: [
      {
        question: 'How many businesses are listed in Karachi on ListPak?',
        answer:
          'ListPak lists 30+ verified businesses in Karachi across restaurants & food, healthcare, technology & IT, retail and more.',
      },
      {
        question: "How can I find a business's contact number in Karachi?",
        answer:
          'Every Karachi business listing on ListPak shows the verified contact number, address and operating hours — open any listing from this page.',
      },
      {
        question: 'How do I add my business in Karachi to ListPak?',
        answer:
          'Adding your Karachi business to ListPak is free. Submit your business name, category, contact number and address, and your listing goes live as a Google-indexed profile.',
      },
    ],
  },

  gujranwala: {
    title: 'Businesses in Gujranwala – Local Business Directory | ListPak',
    description:
      'Find businesses in Gujranwala, Pakistan — contact numbers, addresses & reviews. List your Gujranwala business free on ListPak.',
    faqs: [
      {
        question: 'How can I find businesses in Gujranwala?',
        answer:
          "Browse ListPak's Gujranwala directory for verified local businesses with contact numbers, addresses and operating hours.",
      },
      {
        question: 'How do I add my business in Gujranwala to ListPak?',
        answer:
          'Adding your Gujranwala business to ListPak is free. Submit your business name, category, contact number and address, and your listing goes live as a Google-indexed profile.',
      },
    ],
  },

  faisalabad: {
    title: 'Businesses in Faisalabad – Local Business Directory | ListPak',
    description:
      'Find businesses in Faisalabad, Pakistan — contact numbers, addresses & reviews. List your Faisalabad business free on ListPak.',
    faqs: [
      {
        question: 'How can I find businesses in Faisalabad?',
        answer:
          "Browse ListPak's Faisalabad directory for verified local businesses with contact numbers, addresses and operating hours.",
      },
      {
        question: 'How do I add my business in Faisalabad to ListPak?',
        answer:
          'Adding your Faisalabad business to ListPak is free. Submit your business name, category, contact number and address, and your listing goes live as a Google-indexed profile.',
      },
    ],
  },

  multan: {
    title: 'Businesses in Multan – Local Business Directory | ListPak',
    description:
      'Find businesses in Multan, Pakistan — contact numbers, addresses & reviews. List your Multan business free on ListPak.',
    faqs: [
      {
        question: 'How can I find businesses in Multan?',
        answer:
          "Browse ListPak's Multan directory for verified local businesses with contact numbers, addresses and operating hours.",
      },
      {
        question: 'How do I add my business in Multan to ListPak?',
        answer:
          'Adding your Multan business to ListPak is free. Submit your business name, category, contact number and address, and your listing goes live as a Google-indexed profile.',
      },
    ],
  },

  sialkot: {
    title: 'Businesses in Sialkot – Local Business Directory | ListPak',
    description:
      'Find businesses in Sialkot, Pakistan — contact numbers, addresses & reviews. List your Sialkot business free on ListPak.',
    faqs: [
      {
        question: 'How can I find businesses in Sialkot?',
        answer:
          "Browse ListPak's Sialkot directory for verified local businesses with contact numbers, addresses and operating hours.",
      },
      {
        question: 'How do I add my business in Sialkot to ListPak?',
        answer:
          'Adding your Sialkot business to ListPak is free. Submit your business name, category, contact number and address, and your listing goes live as a Google-indexed profile.',
      },
    ],
  },
}

export function getCitySeoOverride(citySlug: string): CitySeoOverride | undefined {
  if (!citySlug) return undefined
  const norm = citySlug.toLowerCase().trim()
  return CITY_SEO_OVERRIDES[norm]
}

export const HOMEPAGE_SEO = {
  title: 'Pakistan Business Directory – Find Businesses Free | ListPak',
  description:
    "ListPak is Pakistan's free business directory. Find verified businesses by city & category — or add your business listing free and get found on Google.",
  faqs: [
    {
      question: 'What is ListPak?',
      answer:
        'ListPak is a free business directory for Pakistan. It helps people find verified local businesses by city and category, and lets businesses create a free listing that appears on Google.',
    },
    {
      question: 'Is it free to add my business on ListPak?',
      answer:
        'Yes. Creating a business listing on ListPak is completely free — add your business name, category, city, contact number and address, and your listing goes live as a Google-indexed profile.',
    },
    {
      question: 'How do I find businesses near me on ListPak?',
      answer:
        "Browse ListPak's city pages — including Lahore, Karachi, Islamabad, Gujranwala, Faisalabad, Multan and Sialkot — or search by category such as restaurants, technology, healthcare or real estate.",
    },
    {
      question: 'Which cities does ListPak cover?',
      answer:
        'ListPak covers businesses across Pakistan, including Lahore, Karachi, Islamabad, Rawalpindi, Gujranwala, Faisalabad, Multan, Sialkot, Peshawar, Quetta and many more cities.',
    },
  ],
}
