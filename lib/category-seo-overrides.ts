export interface CategoryFaqItem {
  question: string
  answer: string
}

export interface CategorySeoOverride {
  title: string
  description: string
  intro: string
  faqs: CategoryFaqItem[]
}

export const CATEGORY_SEO_OVERRIDES: Record<string, CategorySeoOverride> = {
  restaurants: {
    title: 'Restaurants & Food in Pakistan – Best Places to Eat | ListPak',
    description:
      'Find the best restaurants in Pakistan — Karachi, Lahore, Islamabad & more. Cuisines, contact numbers, addresses & reviews. List your restaurant free.',
    intro:
      "From Karachi's Burns Road to Lahore's Food Street and Islamabad's Margalla-view rooftops, Pakistan's restaurant scene covers BBQ, desi, fast food, Chinese and continental. Browse verified restaurant listings by city with contact numbers and addresses, or add your restaurant free.",
    faqs: [
      {
        question: 'How do I find restaurants in Pakistan on ListPak?',
        answer:
          "Browse ListPak's restaurants directory by city to find verified dining spots across Karachi, Lahore, Islamabad and other major cities with addresses, contact numbers and customer reviews.",
      },
      {
        question: 'Which cities have the most restaurant listings?',
        answer:
          'Karachi, Lahore and Islamabad have the highest concentration of restaurant listings on ListPak, covering everything from traditional desi and street food to fine dining and continental cafes.',
      },
      {
        question: 'How do I list my restaurant for free?',
        answer:
          "Click 'Add Business' on ListPak, select the Restaurants category, enter your location, contact number and menu details, and submit your free listing for directory review.",
      },
    ],
  },

  finance: {
    title: 'Banks & Finance Companies in Pakistan | ListPak',
    description:
      'Banks and finance companies in Pakistan — Meezan Bank, HBL, UBL, MCB, Allied Bank & more. Branches, contact numbers & details. Browse free on ListPak.',
    intro:
      "Pakistan's banking sector includes full-service commercial banks, Islamic banks and microfinance providers. ListPak lists verified bank and finance company profiles — including Meezan Bank, HBL, UBL, MCB and Allied Bank — with contact details and locations.",
    faqs: [
      {
        question: 'Which banks are listed on ListPak?',
        answer:
          'ListPak features major commercial and Islamic banks in Pakistan, including Meezan Bank, HBL, UBL, MCB, Allied Bank, Bank Alfalah and regional branches.',
      },
      {
        question: "How do I find a bank's contact number?",
        answer:
          'Search by bank name or browse the finance category to view verified head office and branch contact numbers, official helpline numbers, and branch addresses.',
      },
      {
        question: 'Can finance companies list for free?',
        answer:
          "Yes, banks, financial institutions, microfinance providers and accounting firms can create a free verified profile on ListPak by clicking 'Add Business'.",
      },
    ],
  },

  technology: {
    title: 'IT Companies & Software Houses in Pakistan | ListPak',
    description:
      'IT companies and software houses in Pakistan — Lahore, Islamabad, Karachi. Services, contact numbers & profiles. Compare and hire, or list your company free.',
    intro:
      "Pakistan's IT industry is concentrated in Lahore, Islamabad and Karachi, home to software houses, startups and outsourcing firms serving global clients. Browse verified technology company profiles with services and contact details.",
    faqs: [
      {
        question: 'Which are the top software houses listed on ListPak?',
        answer:
          'ListPak lists leading IT firms and software houses across Lahore, Islamabad and Karachi offering web development, mobile apps, cloud services and enterprise solutions.',
      },
      {
        question: 'How do I hire an IT company in Pakistan?',
        answer:
          'Browse verified technology company profiles, review their service offerings and contact details, and connect directly with company representatives through their listing.',
      },
      {
        question: 'How do I list my software house for free?',
        answer:
          "Click 'Add Business' on ListPak, choose the Technology category, input your services, portfolio link, and office details, and get your company listed free.",
      },
    ],
  },

  automotive: {
    title: 'Car Dealers & Automotive Services in Pakistan | ListPak',
    description:
      'Car dealers, showrooms and automotive services in Pakistan — Suzuki, Toyota, Honda dealers & workshops. Contact numbers & locations on ListPak.',
    intro:
      "Pakistan's automotive industry includes car dealerships, authorized brand centers, auto repair workshops and vehicle spare part suppliers. Browse verified automotive businesses in Lahore, Karachi, Islamabad and across Pakistan with direct contact numbers, or list your dealership free.",
    faqs: [
      {
        question: 'How do I find car dealers in Pakistan?',
        answer:
          "Browse ListPak's automotive directory to find verified new and used car dealerships, authorized brand showrooms, and auto workshops across Pakistani cities.",
      },
      {
        question: 'Which auto brands are listed?',
        answer:
          'Listings cover dealerships and repair specialists for top automakers including Suzuki, Toyota, Honda, Hyundai, Kia, and commercial vehicle providers.',
      },
      {
        question: 'How do I list my dealership for free?',
        answer:
          "Click 'Add Business' on ListPak, select Automotive, enter your dealership address, showroom details and contact numbers, and publish your profile free.",
      },
    ],
  },

  'real-estate': {
    title: 'Real Estate Agents & Property Companies in Pakistan | ListPak',
    description:
      'Real estate agencies and property companies in Pakistan — Karachi, Lahore, Islamabad. Buy, sell and rent with verified agents. List your agency free.',
    intro:
      "Pakistan's property market spans residential and commercial sectors in DHA, Bahria Town, Gulberg, Blue Area, and emerging urban schemes. Connect with verified real estate agents, builders, and property management consultants across Karachi, Lahore, Islamabad and beyond.",
    faqs: [
      {
        question: 'How do I find real estate agents in Pakistan?',
        answer:
          'Search ListPak by city to browse verified real estate agencies, property dealers, and builders with phone numbers, office locations, and active property consultations.',
      },
      {
        question: 'Which cities are covered?',
        answer:
          'ListPak covers real estate markets across Pakistan, with top agencies and builders in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad and other major hubs.',
      },
      {
        question: 'How do I list my agency for free?',
        answer:
          "Property dealers and real estate companies can list free on ListPak by clicking 'Add Business', choosing Real Estate, and submitting their agency details.",
      },
    ],
  },

  travel: {
    title: 'Travel Agencies & Tour Companies in Pakistan | ListPak',
    description:
      'Travel agencies and tour operators in Pakistan — flights, Umrah packages, tours & car rentals. Contact numbers & details. List your agency free.',
    intro:
      "Whether booking domestic tours to Hunza and Skardu, international flights, visa assistance, or Hajj and Umrah travel packages, finding a verified travel agency is vital. Browse licensed tour operators and travel agents in Pakistan with direct contact numbers and office addresses.",
    faqs: [
      {
        question: 'How do I find travel agencies in Pakistan?',
        answer:
          "Explore ListPak's travel category to locate verified travel agencies and tour operators by city, complete with phone numbers, addresses, and service details.",
      },
      {
        question: 'Do agencies offer Umrah packages?',
        answer:
          'Yes, many listed travel agencies in Karachi, Lahore, Islamabad and other cities provide comprehensive Umrah packages, flight bookings, and hotel arrangements.',
      },
      {
        question: 'How do I list my travel agency for free?',
        answer:
          "Submit your agency profile for free on ListPak by selecting 'Add Business', choosing Travel, and entering your contact details and travel services.",
      },
    ],
  },

  healthcare: {
    title: 'Hospitals, Clinics & Healthcare in Pakistan | ListPak',
    description:
      'Hospitals, clinics and healthcare providers in Pakistan — Karachi, Lahore, Islamabad. Contact numbers, addresses & services. List your clinic free.',
    intro:
      "Quality healthcare begins with reliable provider information. ListPak's healthcare directory brings together hospitals, specialized clinics, diagnostic labs, pharmacies, and medical centers across Pakistan's major cities with emergency numbers, addresses, and services.",
    faqs: [
      {
        question: 'How do I find hospitals and clinics in Pakistan?',
        answer:
          "Browse ListPak's healthcare directory by city to find verified hospitals, private clinics, emergency centers, and diagnostic laboratories with direct contact numbers.",
      },
      {
        question: 'Which cities are covered?',
        answer:
          'ListPak features healthcare providers across Karachi, Lahore, Islamabad, Rawalpindi, Multan, Faisalabad, Peshawar and other Pakistani cities.',
      },
      {
        question: 'How do I list my clinic for free?',
        answer:
          "Medical practices, clinics, hospitals, and diagnostic labs can register their facility free on ListPak by clicking 'Add Business' and submitting their details.",
      },
    ],
  },

  categories: {
    title: 'Business Categories in Pakistan – Browse by Industry | ListPak',
    description:
      'Browse Pakistani businesses by category: restaurants, technology, healthcare, real estate, finance, automotive, travel & more — with city filters.',
    intro:
      "Explore Pakistan's most comprehensive business directory across 26 industry categories. Whether you need an IT company in Lahore, a restaurant in Karachi, real estate advisors in Islamabad, or financial services nationwide, ListPak connects you to verified businesses with direct contact numbers.",
    faqs: [
      {
        question: 'How many business categories are on ListPak?',
        answer:
          'ListPak organizes businesses across Pakistan into 26 distinct industry categories including technology, healthcare, real estate, restaurants, finance, automotive, and travel.',
      },
      {
        question: 'Can I filter businesses by category and city?',
        answer:
          'Yes, each category page allows you to filter businesses by city — such as Karachi, Lahore, and Islamabad — to find local providers near you.',
      },
      {
        question: 'How do I list my business under a category?',
        answer:
          "Listing your business is free on ListPak. Click 'Add Business', select your primary industry category, enter your location and phone number, and publish your profile.",
      },
    ],
  },
}

export function getCategorySeoOverride(categoryId: string): CategorySeoOverride | null {
  return CATEGORY_SEO_OVERRIDES[categoryId.toLowerCase()] || null
}
