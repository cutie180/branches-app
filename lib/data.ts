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
  isFeatured?: boolean
  status?: 'pending' | 'approved' | 'rejected'
  submittedAt?: string
  approvedAt?: string
  approvedBy?: string
  rejectionReason?: string
  ownerName?: string
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

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: string
  status: 'unread' | 'read'
}

export const MOCK_BUSINESSES: BusinessItem[] = [
  {
    id: 'biz-bank-1',
    slug: 'hbl-habib-bank-limited',
    name: 'HBL (Habib Bank Limited)',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Karachi',
    province: 'Sindh',
    rating: 4.9,
    reviewCount: 450,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 21 111 111 425',
    whatsapp: '9221111111425',
    email: 'info@hbl.com',
    website: 'https://hbl.com',
    address: 'HBL Tower, I.I. Chundrigar Road, Karachi',
    coverImage: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=200&q=80',
    description: 'Habib Bank Limited is Pakistan premier commercial bank offering retail banking, corporate finance, digital mobile banking, and international trade services across nationwide branches.',
    services: ['Digital Mobile Banking', 'Personal & Home Loans', 'Corporate Finance', 'Commercial Credit', 'Foreign Exchange'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM', 'Saturday': '09:00 AM - 01:30 PM' },
    features: ['State Bank Regulated', '24/7 ATM Service', 'Digital App Solutions', 'International Remittance'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-bank-2',
    slug: 'ubl-united-bank-limited',
    name: 'UBL (United Bank Limited)',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Karachi',
    province: 'Sindh',
    rating: 4.8,
    reviewCount: 380,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 21 111 825 888',
    whatsapp: '9221111825888',
    email: 'customer.service@ubl.com.pk',
    website: 'https://ubldigital.com',
    address: 'UBL Head Office, I.I. Chundrigar Road, Karachi',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0a67daf40954?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=200&q=80',
    description: 'United Bank Limited is a flagship Pakistani financial institution leading digital payment innovations, Islamic banking solutions, and corporate investment banking.',
    services: ['UBL Digital Mobile App', 'Ameen Islamic Banking', 'Auto & Home Finance', 'SME Business Loans'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM' },
    features: ['Instant Online Transfer', 'Ameen Shariah Compliant', 'Nationwide Branches'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-bank-3',
    slug: 'meezan-bank-pakistan',
    name: 'Meezan Bank Limited',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Karachi',
    province: 'Sindh',
    rating: 4.95,
    reviewCount: 620,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 21 111 331 331',
    whatsapp: '9221111331331',
    email: 'info@meezanbank.com',
    website: 'https://meezanbank.com',
    address: 'Meezan House, C-25 Estate Avenue, SITE, Karachi',
    coverImage: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    description: 'Meezan Bank is Pakistan largest premier Islamic commercial bank operating strictly under 100 percent Riba-free Shariah principles with nationwide branches and mobile banking.',
    services: ['Riba-Free Account', 'Islamic Car Ijarah', 'Easy Home Mortgage', 'Sukuk Investment'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM' },
    features: ['100% Shariah Certified', 'Largest Islamic Branch Network', 'Award Winning Digital App'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-bank-4',
    slug: 'mcb-bank-limited',
    name: 'MCB Bank Limited',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Lahore',
    province: 'Punjab',
    rating: 4.85,
    reviewCount: 310,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 42 111 000 622',
    whatsapp: '9242111000622',
    email: 'info@mcb.com.pk',
    website: 'https://mcb.com.pk',
    address: 'MCB Building, 15 Main Gulberg, Jail Road, Lahore',
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80',
    description: 'MCB Bank Limited is one of Pakistan leading corporate banks providing comprehensive retail banking, wealth management, trade services, and consumer credit cards.',
    services: ['MCB Live Banking', 'Visa & Mastercard Debit', 'Commercial Trade Finance', 'Agricultural Loans'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM' },
    features: ['State Bank Regulated', 'Multi-Currency Accounts', 'Priority Banking'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-bank-5',
    slug: 'allied-bank-limited',
    name: 'Allied Bank Limited (ABL)',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Lahore',
    province: 'Punjab',
    rating: 4.8,
    reviewCount: 290,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 42 111 225 225',
    whatsapp: '9242111225225',
    email: 'cm@abl.com',
    website: 'https://abl.com',
    address: 'ABL Head Office, 3-Tipu Block, New Garden Town, Lahore',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80',
    description: 'Allied Bank Limited offers premier retail, commercial, and digital financial solutions across more than 1,400 branches in Pakistan.',
    services: ['myABL Digital App', 'Commercial Lending', 'Consumer Loans', 'Remittance Services'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM' },
    features: ['Over 1400+ Branches', '24/7 myABL Support', 'Secure Payments'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-bank-6',
    slug: 'bank-alfalah-limited',
    name: 'Bank Alfalah Limited',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Karachi',
    province: 'Sindh',
    rating: 4.85,
    reviewCount: 340,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 21 111 225 111',
    whatsapp: '9221111225111',
    email: 'contactus@bankalfalah.com',
    website: 'https://bankalfalah.com',
    address: 'BAF Centre, I.I. Chundrigar Road, Karachi',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=200&q=80',
    description: 'Bank Alfalah is a innovative commercial bank in Pakistan offering Alfa mobile wallet, credit card rewards, and corporate banking.',
    services: ['Alfa Mobile App & Wallet', 'Alfalah Credit Cards', 'Islamic Banking', 'Merchant Gateway Solutions'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM' },
    features: ['Alfa Digital Gateway', 'Instant Merchant Settlement', 'Nationwide ATMs'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-bank-7',
    slug: 'askari-bank-limited',
    name: 'Askari Bank Limited',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Rawalpindi',
    province: 'Punjab',
    rating: 4.75,
    reviewCount: 210,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 51 111 000 787',
    whatsapp: '9251111000787',
    email: 'info@askaribank.com.pk',
    website: 'https://askaribank.com.pk',
    address: 'Askari Bank Tower, AWT Plaza, The Mall, Rawalpindi',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80',
    description: 'Askari Bank Limited provides trusted consumer banking, corporate commercial financing, and Islamic financial products nationwide.',
    services: ['Askari Mobile App', 'Corporate Banking', 'Islamic Banking Services', 'Home & Auto Loans'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM' },
    features: ['State Bank Regulated', 'Dedicated Customer Support', 'Secure E-Banking'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-bank-8',
    slug: 'bank-al-habib-limited',
    name: 'Bank AL Habib Limited',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Karachi',
    province: 'Sindh',
    rating: 4.9,
    reviewCount: 390,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 21 111 014 014',
    whatsapp: '9221111014014',
    email: 'info@bankalhabib.com',
    website: 'https://bankalhabib.com',
    address: 'Mackinnons Building, I.I. Chundrigar Road, Karachi',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1556742049-0a67daf40954?auto=format&fit=crop&w=200&q=80',
    description: 'Bank AL Habib Limited is known for personal customer relationship banking, commercial trade support, and reliable digital branch banking.',
    services: ['AL Habib Digital App', 'Current & Savings Accounts', 'Trade Finance', 'Islamic Banking'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM' },
    features: ['High Customer Satisfaction', '1000+ Branch Network', 'Fast Local Transfers'],
    reviews: [],
    faqs: []
  },
  {
    id: 'biz-bank-9',
    slug: 'faysal-bank-limited',
    name: 'Faysal Bank Limited',
    category: 'Finance & Banking',
    categoryId: 'finance',
    city: 'Karachi',
    province: 'Sindh',
    rating: 4.85,
    reviewCount: 270,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 21 111 06 06 06',
    whatsapp: '9221111060606',
    email: 'customer-care@faysalbank.com',
    website: 'https://faysalbank.com',
    address: 'Faysal House, ST-02, Commercial Area, Main Shahrah-e-Faisal, Karachi',
    coverImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=200&q=80',
    description: 'Faysal Bank is a leading full-fledged Islamic commercial bank offering Shariah-compliant digital banking, wealth advisory, and auto financing.',
    services: ['Faysal Digibank App', 'Islamic Auto & Home Finance', 'Wealth Management', 'Commercial Credit'],
    operatingHours: { 'Monday - Friday': '09:00 AM - 05:00 PM' },
    features: ['100% Shariah Compliant', 'Digibank Mobile App', 'Premier Cards'],
    reviews: [],
    faqs: []
  },
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
    status: 'approved',
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
    features: ['ISO 9001 Certified', '24/7 Dedicated Support', 'Free Initial Consultation', 'Over 150 Delivered Projects'],
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
  // 18 Contact and Social Media Links
  phone?: string
  email?: string
  whatsapp?: string
  website?: string
  portfolio?: string
  linkedin?: string
  github?: string
  facebook?: string
  twitter?: string
  instagram?: string
  behance?: string
  dribbble?: string
  youtube?: string
  medium?: string
  stackoverflow?: string
  fiverr?: string
  upwork?: string
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
    verified: true,
    phone: '+92 300 1234567',
    email: 'hamza.shaikh@dev.pk',
    whatsapp: '923001234567',
    website: 'https://hamzashaikh.dev',
    portfolio: 'https://hamzashaikh.dev/portfolio',
    linkedin: 'https://linkedin.com/in/hamzashaikh',
    github: 'https://github.com/hamzashaikh',
    twitter: 'https://twitter.com/hamzashaikhdev',
    behance: 'https://behance.net/hamzashaikh',
    upwork: 'https://upwork.com/freelancers/~0123456789'
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
    verified: true,
    phone: '+92 21 35849201',
    email: 'dr.zainab@skincare.pk',
    whatsapp: '923219876543',
    website: 'https://drzainabmalik.pk',
    facebook: 'https://facebook.com/drzainabmalik',
    instagram: 'https://instagram.com/drzainabmalik',
    youtube: 'https://youtube.com/@drzainabmalik'
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
    verified: true,
    phone: '+92 51 8483920',
    email: 'shehryar@taxconsultant.pk',
    whatsapp: '923008889900',
    linkedin: 'https://linkedin.com/in/shehryarkhanfca',
    medium: 'https://medium.com/@shehryarkhanfca'
  }
]
