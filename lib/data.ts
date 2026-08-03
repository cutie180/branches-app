export const CITIES = Array.from(new Set([
  // Major Metropolitan Cities (Top Priority)
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta',
  'Faisalabad', 'Multan', 'Gujranwala', 'Sialkot', 'Hyderabad', 'Abbottabad',
  
  // Punjab
  'Sargodha', 'Bahawalpur', 'Sahiwal', 'Gujrat', 'Sheikhupura', 'Jhang', 
  'Bahawalnagar', 'Sadiqabad', 'Kasur', 'Okara', 'Rahim Yar Khan', 'Mianwali', 
  'Vehari', 'Khanewal', 'Mandi Bahauddin', 'Toba Tek Singh', 'Jhelum', 'Bhalwal',
  'Daska', 'Burewala', 'Hafizabad', 'Chiniot', 'Kamoke', 'Pattoki',
  'Jaranwala', 'Kamalia', 'Renala Khurd', 'Samundri', 'Wazirabad',
  'Murree', 'Mian Channu', 'Bhakkar', 'Lalamusa', 'Shakargarh', 'Layyah',
  'Dinga', 'Pakpattan', 'Arifwala', 'Baddomalhi', 'Gojra', 'Ahmedpur East', 
  'Chichawatni', 'Chishtian', 'Mailsi', 'Haroonabad', 'Hasilpur', 'Bhera', 
  'Chakwal', 'Attock', 'Fateh Jang', 'Pindigheb', 'Jand', 'Wah Cantonment',
  'Taxila', 'Hazro', 'Hassan Abdal', 'Sarai Alamgir', 'Dina', 'Sohawa',
  'Kallar Syedan', 'Gujar Khan', 'Kahuta',

  // Khyber Pakhtunkhwa
  'Kohat', 'Lakki Marwat', 'Bannu', 'Karak', 'Tank', 'Hangu', 'Dera Ismail Khan',
  'Mansehra', 'Haripur', 'Havelian', 'Batkhela', 'Mardan', 'Swabi',
  'Nowshera', 'Charsadda', 'Timergara', 'Mingora', 'Saidu Sharif',
  'Kabal', 'Chitral',

  // Sindh
  'Sukkur', 'Larkana', 'Nawabshah', 'Khairpur', 'Mirpur Khas', 'Ghotki', 
  'Jacobabad', 'Shikarpur', 'Dadu', 'Moro', 'Tando Adam', 'Tando Allahyar', 
  'Tando Muhammad Khan', 'Matli', 'Kotri', 'Sehwan', 'Gambat', 'Kandhkot', 
  'Kashmor', 'Mehar', 'Shujabad', 'Warah',

  // Balochistan
  'Gwadar', 'Turbat', 'Pasni', 'Ormara', 'Jiwani', 'Khuzdar', 'Hub', 'Uthal', 
  'Belapat', 'Wadh', 'Nushki', 'Dalbandin', 'Taftan', 'Ziarat', 'Sibi', 'Harnai', 
  'Kohlu', 'Duki', 'Barkhan', 'Loralai', 'Mach', 'Bolan', 'Dera Bugti', 
  'Dera Murad Jamali', 'Sui', 'Pir Koh', 'Usta Muhammad', 'Gandakha', 
  'Jhal Magsi', 'Kachhi', 'Sohbatpur', 'Chaman', 'Zhob', 'Mastung', 'Kalat',

  // Gilgit Baltistan & Azad Kashmir
  'Gilgit', 'Skardu', 'Hunza', 'Nagar', 'Diamer', 'Astore', 'Ghanche', 'Kharmang', 
  'Shigar', 'Baltistan', 'Roundu', 'Ghizer', 'Gakuch', 'Khaplu', 'Muzaffarabad', 
  'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber', 'Hattian Bala', 'Haveli', 'Bagh', 
  'Sudhanoti', 'Poonch', 'Neelum Valley', 'Athmuqam', 'Jhelum Valley', 
  'Leepa Valley', 'Pallandri', 'Trarkhel', 'Hajira', 'Sehnsa'
]))

export const TOP_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
  'Hyderabad', 'Abbottabad', 'Sargodha', 'Bahawalpur', 'Sahiwal',
  'Mardan', 'Sukkur', 'Larkana', 'Gwadar', 'Muzaffarabad'
]

export const CATEGORIES = [
  { id: 'restaurants', name: 'Restaurants & Food', icon: 'restaurant', count: 8420, color: '#f59e0b', desc: 'Find local cafes, fine dining, fast food, and food caterers' },
  { id: 'real-estate', name: 'Real Estate & Property', icon: 'real-estate', count: 5210, color: '#10b981', desc: 'Verified property dealers, builders, and real estate consultants' },
  { id: 'technology', name: 'Technology & IT', icon: 'technology', count: 4890, color: '#3b82f6', desc: 'Software houses, web developers, mobile apps, and IT agencies' },
  { id: 'healthcare', name: 'Healthcare & Medical', icon: 'healthcare', count: 6320, color: '#ef4444', desc: 'Hospitals, specialist doctors, diagnostic labs, and pharmacies' },
  { id: 'education', name: 'Education & Training', icon: 'education', count: 3780, color: '#8b5cf6', desc: 'Schools, universities, academies, and professional institutes' },
  { id: 'retail', name: 'Retail & Shopping', icon: 'retail', count: 9100, color: '#ec4899', desc: 'Boutiques, wholesale stores, electronic shops, and markets' },
  { id: 'construction', name: 'Construction & Building', icon: 'construction', count: 2340, color: '#f97316', desc: 'Architects, civil engineers, building contractors, and materials' },
  { id: 'automotive', name: 'Automotive & Vehicles', icon: 'automotive', count: 3560, color: '#14b8a6', desc: 'Auto showrooms, workshops, car rental, and spare parts' },
  { id: 'finance', name: 'Finance & Banking', icon: 'finance', count: 1890, color: '#6366f1', desc: 'Chartered accountants, tax consultants, and financial advisors' },
  { id: 'travel', name: 'Travel & Tourism', icon: 'travel', count: 2670, color: '#0ea5e9', desc: 'Travel agencies, Umrah tour operators, and visa consultants' },
  { id: 'beauty', name: 'Beauty & Wellness', icon: 'beauty', count: 4120, color: '#d946ef', desc: 'Beauty salons, spas, fitness gyms, and skincare clinics' },
  { id: 'logistics', name: 'Logistics & Courier', icon: 'logistics', count: 1950, color: '#84cc16', desc: 'Goods transport, freight forwarders, and logistics services' },
  { id: 'home-services', name: 'Home Services & Repairs', icon: 'home-services', count: 3410, color: '#0284c7', desc: 'Plumbers, electricians, AC technicians, painters, and handymen' },
  { id: 'legal', name: 'Legal & Law Consultants', icon: 'legal', count: 1540, color: '#4f46e5', desc: 'Advocates, corporate lawyers, tax attorneys, and legal firms' },
  { id: 'solar-energy', name: 'Solar & Renewable Energy', icon: 'solar-energy', count: 2180, color: '#eab308', desc: 'Solar panel installers, inverter suppliers, and green energy firms' },
  { id: 'events', name: 'Event Management & Wedding', icon: 'events', count: 2890, color: '#f43f5e', desc: 'Marquees, wedding planners, catering, photography, and sound' },
  { id: 'manufacturing', name: 'Manufacturing & Industrial', icon: 'manufacturing', count: 1760, color: '#64748b', desc: 'Factories, industrial machinery, textile mills, and suppliers' },
  { id: 'agriculture', name: 'Agriculture & Farming', icon: 'agriculture', count: 1420, color: '#15803d', desc: 'Agri machinery, fertilizers, seed suppliers, and livestock' },
  { id: 'security', name: 'Security Services & Systems', icon: 'security', count: 1120, color: '#334155', desc: 'CCTV cameras, security guard agencies, and access control' },
  { id: 'printing', name: 'Printing & Packaging', icon: 'printing', count: 1680, color: '#9333ea', desc: 'Offset printing, box packaging, flex printing, and signage' },
  { id: 'furniture', name: 'Furniture & Interior Decor', icon: 'furniture', count: 2310, color: '#b45309', desc: 'Home furniture, office tables, interior designers, and decor' },
  { id: 'media', name: 'Media, PR & Advertising', icon: 'media', count: 1290, color: '#06b6d4', desc: 'Digital marketing agencies, billboards, PR, and video production' },
  { id: 'sports', name: 'Sports & Fitness Gyms', icon: 'sports', count: 1850, color: '#dc2626', desc: 'Fitness centers, sports gear, martial arts, and swimming pools' },
  { id: 'pets', name: 'Pets & Veterinary Clinics', icon: 'pets', count: 980, color: '#d97706', desc: 'Vet doctors, pet shops, animal food, and grooming salons' },
]

export interface BusinessItem {
  id: string
  slug: string
  name: string
  category: string
  categoryId: string
  city: string
  province: string
  rating: number
  reviewCount: number
  verified: boolean
  isClaimed: boolean
  phone: string
  whatsapp: string
  email: string
  website: string
  address: string
  coverImage: string
  logo: string
  description: string
  services: string[]
  operatingHours: { [key: string]: string }
  features: string[]
  reviews: {
    id: string
    userName: string
    rating: number
    date: string
    comment: string
    avatar?: string
  }[]
  faqs: { question: string; answer: string }[]
}

export const MOCK_BUSINESSES: BusinessItem[] = [
  {
    id: 'biz-1',
    slug: 'tech-solutions-pakistan',
    name: 'Tech Solutions Pakistan',
    category: 'Technology & IT',
    categoryId: 'technology',
    city: 'Islamabad',
    province: 'ICT',
    rating: 4.9,
    reviewCount: 48,
    verified: true,
    isClaimed: true,
    phone: '+92 51 8483920',
    whatsapp: '923001234567',
    email: 'info@techsolutions.pk',
    website: 'https://techsolutions.pk',
    address: 'Plot 14, Sector I-9/3, Software Technology Park, Islamabad',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    description: 'Tech Solutions Pakistan is a leading software development and AI integration agency in Islamabad. We specialize in custom web development, mobile apps, enterprise cloud solutions, and UI/UX engineering for international and domestic enterprises.',
    services: ['Custom Software Development', 'Mobile App Development (iOS & Android)', 'Cloud Solutions & DevOps', 'AI & Data Engineering', 'Enterprise UI/UX Design'],
    operatingHours: {
      'Monday - Friday': '09:00 AM - 06:00 PM',
      'Saturday': '10:00 AM - 02:00 PM',
      'Sunday': 'Closed'
    },
    features: ['ISO 9001 Certified', '24/7 Dedicated Support', 'Free Initial Consultation', 'Over 150+ Delivered Projects'],
    reviews: [
      { id: 'r1', userName: 'Asad Ali Khan', rating: 5, date: '2 weeks ago', comment: 'Exceptional work delivered by the team! Built our web portal smoothly on deadline.' },
      { id: 'r2', userName: 'Fatima Zafar', rating: 5, date: '1 month ago', comment: 'Very professional developers in Islamabad. Highly recommended for custom SaaS products.' }
    ],
    faqs: [
      { question: 'Do you offer free project estimates?', answer: 'Yes, we provide free discovery sessions and detailed project estimates.' },
      { question: 'What technologies do you specialize in?', answer: 'Next.js, React, Node.js, Python, PostgreSQL, AWS, and GCP.' }
    ]
  },
  {
    id: 'biz-2',
    slug: 'green-valley-restaurant',
    name: 'Green Valley Restaurant',
    category: 'Restaurants & Food',
    categoryId: 'restaurants',
    city: 'Karachi',
    province: 'Sindh',
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    isClaimed: true,
    phone: '+92 21 35849201',
    whatsapp: '923219876543',
    email: 'reservations@greenvalley.pk',
    website: 'https://greenvalley.pk',
    address: 'Block 4, Gulshan-e-Iqbal, Main University Road, Karachi',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    description: 'Premier authentic Pakistani Karahi, BBQ, and continental dining experience in Karachi. Family-friendly atmosphere with outdoor rooftop seating and private party halls.',
    services: ['Family Dining', 'Outdoor BBQ', 'Catering & Event Services', 'Home Delivery', 'Rooftop Reservations'],
    operatingHours: {
      'Monday - Sunday': '12:00 PM - 01:00 AM'
    },
    features: ['Valet Parking Available', 'Air Conditioned Family Rooms', '100% Halal Food Certified', 'Wheelchair Accessible'],
    reviews: [
      { id: 'r3', userName: 'Tariq Mehmood', rating: 5, date: '3 days ago', comment: 'Best mutton karahi in Gulshan! Staff is super attentive.' }
    ],
    faqs: [
      { question: 'Is advance reservation required for big families?', answer: 'Advance reservation is recommended on weekends for groups over 10.' }
    ]
  },
  {
    id: 'biz-3',
    slug: 'al-rehman-traders-wholesalers',
    name: 'Al-Rehman Traders & Wholesalers',
    category: 'Retail & Shopping',
    categoryId: 'retail',
    city: 'Lahore',
    province: 'Punjab',
    rating: 4.7,
    reviewCount: 62,
    verified: true,
    isClaimed: false,
    phone: '+92 42 37654321',
    whatsapp: '923334567890',
    email: 'sales@alrehmantraders.com',
    website: 'https://alrehmantraders.com',
    address: 'Hall Road Electronics Market, Lahore',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=200&q=80',
    description: 'Wholesale distributor of electronic appliances, solar panels, and smart home hardware across Pakistan. Official distributor for top international electronics brands.',
    services: ['Wholesale Electronics Distribution', 'Solar Inverter Supplies', 'Bulk Orders Delivery', 'B2B Procurement'],
    operatingHours: {
      'Monday - Saturday': '10:00 AM - 08:00 PM',
      'Sunday': 'Closed'
    },
    features: ['Nationwide Bulk Freight', 'Genuine Warranty Guarantee', 'Official Brand Partner'],
    reviews: [
      { id: 'r4', userName: 'Usman Chaudhry', rating: 5, date: '1 week ago', comment: 'Genuine wholesale rates and immediate dispatch to Rawalpindi.' }
    ],
    faqs: [
      { question: 'Do you deliver to KPK and Balochistan?', answer: 'Yes, we supply bulk shipments nationwide.' }
    ]
  },
  {
    id: 'biz-4',
    slug: 'modern-builders-contractors',
    name: 'Modern Builders & Contractors',
    category: 'Construction & Building',
    categoryId: 'construction',
    city: 'Rawalpindi',
    province: 'Punjab',
    rating: 4.9,
    reviewCount: 39,
    verified: true,
    isClaimed: true,
    phone: '+92 51 5567890',
    whatsapp: '923015551234',
    email: 'info@modernbuilders.pk',
    website: 'https://modernbuilders.pk',
    address: 'Phase 4, Bahria Town, Rawalpindi',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=200&q=80',
    description: 'Turnkey residential and commercial construction experts in Islamabad-Rawalpindi. Architectural design, interior fitting, gray structure, and luxury finishings.',
    services: ['Turnkey House Construction', 'Architectural Design 3D', 'Commercial Plaza Building', 'Interior Renovation'],
    operatingHours: {
      'Monday - Saturday': '09:00 AM - 07:00 PM'
    },
    features: ['Architect Council Registered', 'Fixed Rate Contracts', 'Structure Warranty 10 Years'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-5',
    slug: 'city-medical-store-pharmacy',
    name: 'City Medical Store & Pharmacy',
    category: 'Healthcare & Medical',
    categoryId: 'healthcare',
    city: 'Faisalabad',
    province: 'Punjab',
    rating: 4.8,
    reviewCount: 51,
    verified: true,
    isClaimed: true,
    phone: '+92 41 8765432',
    whatsapp: '923126667788',
    email: 'help@citymedical.pk',
    website: 'https://citymedical.pk',
    address: 'D-Ground Commercial Area, Faisalabad',
    coverImage: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=200&q=80',
    description: '24/7 authentic pharmacy offering temperature-controlled medicine storage, surgical supplies, and instant home medicine delivery in Faisalabad.',
    services: ['24/7 Prescription Medicines', 'Surgical Equipment Supply', 'Home Delivery Medicine', 'Free Blood Pressure Check'],
    operatingHours: {
      'Monday - Sunday': '24 Hours Open'
    },
    features: ['Licensed Qualified Pharmacists', 'Cold-Chain Storage', 'Online Whatsapp Ordering'],
    reviews: [],
    faqs: []
  }
]

export interface JobItem {
  id: string
  title: string
  company: string
  companySlug: string
  companyLogo: string
  city: string
  category: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  salary: string
  experience: string
  postedDate: string
  description: string
  responsibilities: string[]
  requirements: string[]
  applicationWebsite?: string
  applicationEmail?: string
  applicationMethod: 'website' | 'email' | 'both'
}

export const MOCK_JOBS: JobItem[] = [
  {
    id: 'job-101',
    title: 'Senior Full Stack Software Engineer (Next.js & Node)',
    company: 'Tech Solutions Pakistan',
    companySlug: 'tech-solutions-pakistan',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    city: 'Islamabad',
    category: 'Technology & IT',
    type: 'Full-time',
    salary: 'PKR 250,000 - 380,000 / month',
    experience: '3 - 5 Years',
    postedDate: '1 day ago',
    description: 'We are seeking a talented Senior Full Stack Engineer to lead web product engineering in our Islamabad technology center.',
    responsibilities: [
      'Architect scalable web applications using Next.js, React, and TypeScript',
      'Optimize API routes, database queries (PostgreSQL/Firebase), and caching strategies',
      'Collaborate with UI/UX designers to translate Figma models into responsive components',
      'Mentor junior engineers and establish clean code standards'
    ],
    requirements: [
      'Strong proficiency with Next.js App Router, React 19, TypeScript, and Tailwind CSS',
      'Hands-on backend experience with Node.js / Express or Python API frameworks',
      'Experience with AWS or GCP Cloud deployment pipelines'
    ],
    applicationWebsite: 'https://techsolutions.pk/careers/job-101',
    applicationEmail: 'careers@techsolutions.pk',
    applicationMethod: 'both'
  },
  {
    id: 'job-102',
    title: 'Senior Civil Project Manager',
    company: 'Modern Builders & Contractors',
    companySlug: 'modern-builders-contractors',
    companyLogo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=200&q=80',
    city: 'Rawalpindi',
    category: 'Construction & Building',
    type: 'Full-time',
    salary: 'PKR 180,000 - 260,000 / month',
    experience: '5+ Years',
    postedDate: '3 days ago',
    description: 'Supervise multi-story residential and commercial construction sites across Bahria Town & DHA Islamabad.',
    responsibilities: [
      'Manage daily site operations, contractor schedules, and structural quality control',
      'Ensure compliance with local building codes and safety regulations',
      'Review engineering drawings, BOQs, and material requisitions'
    ],
    requirements: [
      'B.Sc Civil Engineering degree (PEC Registered)',
      'Proven track record in high-rise building execution'
    ],
    applicationEmail: 'hr@modernbuilders.pk',
    applicationMethod: 'email'
  },
  {
    id: 'job-103',
    title: 'Digital Marketing & Growth Specialist',
    company: 'Green Valley Restaurant Group',
    companySlug: 'green-valley-restaurant',
    companyLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    city: 'Karachi',
    category: 'Restaurants & Food',
    type: 'Full-time',
    salary: 'PKR 120,000 - 180,000 / month',
    experience: '2 - 4 Years',
    postedDate: 'Just now',
    description: 'Drive customer growth, social media campaigns, local SEO, and delivery partner relationships for our restaurant brand in Karachi.',
    responsibilities: [
      'Create viral Meta & TikTok video content for food promotions',
      'Manage local Google Business Profile listing reviews and ads',
      'Analyze customer acquisition cost (CAC) and campaign ROI'
    ],
    requirements: [
      'Proven experience in F&B marketing or agency growth management',
      'Proficiency with Meta Ads Manager, Google Ads, and basic video editing'
    ],
    applicationWebsite: 'https://greenvalley.pk/careers',
    applicationEmail: 'jobs@greenvalley.pk',
    applicationMethod: 'both'
  }
]

export interface ProfessionalItem {
  username: string
  name: string
  title: string
  category: string
  city: string
  rating: number
  hourlyRate: string
  avatar: string
  bio: string
  skills: string[]
  experienceYears: number
  verified: boolean
}

export const MOCK_PROFESSIONALS: ProfessionalItem[] = [
  {
    username: 'hamza-shaikh-dev',
    name: 'Hamza Shaikh',
    title: 'Principal UI/UX Architect & Next.js Lead',
    category: 'Technology & IT',
    city: 'Lahore',
    rating: 4.95,
    hourlyRate: 'PKR 4,500 / hr',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Over 8+ years experience designing enterprise web applications, design systems, and cloud architectures for startups in US, UK, and Pakistan.',
    skills: ['Next.js', 'React', 'Tailwind CSS', 'Figma', 'TypeScript', 'System Architecture'],
    experienceYears: 8,
    verified: true
  },
  {
    username: 'dr-zainab-malik',
    name: 'Dr. Zainab Malik',
    title: 'Consultant Dermatologist & Skincare Specialist',
    category: 'Healthcare & Medical',
    city: 'Karachi',
    rating: 4.9,
    hourlyRate: 'PKR 3,000 / consultation',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    bio: 'Board-certified dermatologist with 10+ years expertise in clinical skincare, laser treatments, and aesthetic medicine.',
    skills: ['Clinical Dermatology', 'Laser Therapy', 'Cosmetic Procedures', 'Medical Research'],
    experienceYears: 10,
    verified: true
  },
  {
    username: 'shehryar-khan-ca',
    name: 'Shehryar Khan, FCA',
    title: 'Chartered Accountant & Tax Consultant',
    category: 'Finance & Banking',
    city: 'Islamabad',
    rating: 4.88,
    hourlyRate: 'PKR 6,000 / hr',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Helping Pakistani SMBs and foreign entities with FBR tax filing, corporate registration (SECP), and financial auditing.',
    skills: ['FBR Tax Advisory', 'SECP Registration', 'Corporate Audit', 'Financial Modeling'],
    experienceYears: 12,
    verified: true
  }
]
