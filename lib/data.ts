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
  { id: 'professional-job-seeker', name: 'Professional / Job Seeker', icon: 'users', count: 1450, color: '#2563eb', desc: 'Verified personal profiles for professionals, freelancers, doctors, engineers, skilled workers & job seekers' },
  { id: 'hiring-company-hr', name: 'Hiring Company / HR', icon: 'briefcase', count: 980, color: '#0284c7', desc: 'Verified company hiring profiles, recruitment agencies, HR departments & job vacancy postings across Pakistan' },
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
    id: 'biz-orange-line-metro-lahore',
    slug: 'orange-line-metro-station-timing-and-routes',
    name: 'Orange Line Metro Station Timings & Routes',
    category: 'Transport & Logistics',
    categoryId: 'transportation',
    city: 'Lahore',
    province: 'Punjab',
    rating: 5.0,
    reviewCount: 124,
    verified: true,
    isClaimed: true,
    isFeatured: true,
    status: 'approved',
    phone: '(042) 111-222-627',
    whatsapp: '9242111222627',
    email: 'info@pma.punjab.gov.pk',
    website: 'https://pma.punjab.gov.pk/',
    address: 'Orange Line Metro Train Corridor, Raiwind Road to Dera Gujran, Lahore, Punjab, Pakistan',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=200&q=80',
    description: `The Orange Line Metro Train Lahore is Pakistan's premier automated rapid transit system, spanning 27.1 kilometers across Lahore with 26 state-of-the-art stations connecting Dera Gujran to Ali Town. Operating under the official management of the Punjab Mass-transit Authority (PMA), the Orange Line provides fast, air-conditioned, reliable, and eco-friendly public transport for hundreds of thousands of daily commuters across Lahore city.

### Orange Line Train Timing & Daily Schedule
Check the official **orange line train timing** for seamless daily transit across Lahore:
- **Daily Operating Hours**: 06:00 AM to 10:00 PM (Monday through Sunday, 7 Days a Week)
- **Peak Hour Frequency**: Trains arrive every 5 to 7 minutes during morning and evening rush hours.
- **Off-Peak Frequency**: Trains run every 8 to 10 minutes during regular hours.
- **Total Journey Duration**: Complete end-to-end trip from Dera Gujran Station to Ali Town Station takes approximately 45 minutes across all 26 stations.

### Complete Orange Line Station List & Route Map
The **orange train lahore route** stretches over 27.1 km, consisting of 24.3 km of elevated viaducts and 2.8 km of underground subway tracks with 2 central underground stations (Anarkali Station & GPO Station).

Here is the complete **orange train station list** and **orange line station list** in sequential order from Ali Town to Dera Gujran:

1. **Ali Town Station** - South Terminal (Raiwind Road & Thokar Niaz Baig access)
2. **Thokar Niaz Baig Station** - Major intercity bus terminal & Motorway M-2 junction
3. **Canal View Station** - Canal Bank Road, Doctors Hospital & Thokar junction
4. **Hanjarwal Station** - Multan Road residential & commercial center
5. **Wahdat Road Station** - Connecting Wahdat Colony, Allama Iqbal Town & Multan Road
6. **Awan Town Station** - Awan Town commercial market hub
7. **Sabzazar Station** - Sabzazar Housing Scheme & wholesale vegetable market
8. **Shahnoor Station (Khatam-e-Nabuwat)** - Shahnoor Studios & Multan Road industrial hub
9. **Salahuddin Road Station** - Local markets & surrounding residential sectors
10. **Bund Road Station** - Lahore Ring Road interchange & Multan Road exit
11. **Samanabad Station** - Samanabad Roundabout & central Lahore residential hub
12. **Gulshan-e-Ravi Station** - Gulshan-e-Ravi main boulevard & commercial zone
13. **Chauburji Station** - Historical Chauburji monument & Lower Mall junction
14. **Anarkali Station (Underground)** - Heritage station connecting Anarkali Bazaar, Old City & Lake Road
15. **GPO Station (Underground)** - Central business district, Mall Road, General Post Office & High Court
16. **Lakshmi Station** - Lakshmi Chowk food street & hotel center
17. **Railway Station** - Connected directly to Lahore Junction Railway Station for intercity train travelers
18. **Sultanpura Station** - Sultanpura Road & GT Road interchange
19. **UET (University of Engineering and Technology) Station** - Direct university campus access for students & staff
20. **Baghbanpura Station** - GT Road commercial corridor & historic Baghbanpura
21. **Shalamar Garden Station** - UNESCO World Heritage Shalimar Gardens tourist destination
22. **Pakistan Mint Station** - GT Road industrial area & Mint enclave
23. **Mahmood Booti Station** - Ring Road interchange & GT Road northern exit
24. **Salamatpura Station** - Northern GT Road residential sectors
25. **Islam Park Station** - Islam Park community neighborhood
26. **Dera Gujran Station** - North Terminal (Main Depot, Stabling Yard & Maintenance Facility)

### Fares, Tickets & Smart Cards
- **Single Journey Token**: Rs. 20 to Rs. 40 based on distance traveled.
- **Metro Smart Card**: Contactless rechargeable card available at ticket counters for fast tap-and-go access.
- **Discounts**: Concessionary fare options for students, senior citizens, and persons with disabilities.

### Key Facilities & Amenities
- Fully Air-Conditioned Trains & Covered Station Platforms
- Escalators, Elevators, and Tactile Paths for Differently-Abled Passengers
- 24/7 CCTV Security Surveillance & Dedicated Metro Police Force
- Seamless Integration with Lahore Speedo Feeder Bus Network`,
    services: [
      'Daily Passenger Rapid Transit',
      'Orange Line Train Timing Schedules',
      'Orange Line Station List & Route Navigation',
      'Metro Smart Card & Token Ticketing',
      'Feeder Bus Connections Across Lahore',
      'Student & Senior Citizen Discount Passes'
    ],
    operatingHours: { 'Monday - Sunday': '06:00 AM - 10:00 PM' },
    features: [
      '26 Modern Stations',
      'Air Conditioned Coaches',
      'Underground & Elevated Track',
      'Wheelchair Accessible',
      'Automated Token & Card Ticketing',
      '24/7 CCTV Security & Police'
    ],
    reviews: [
      {
        id: 'rev-orange-1',
        userName: 'Muhammad Kamran',
        rating: 5,
        date: '1 day ago',
        comment: 'The Orange Line Metro is a lifesaver for commuting across Lahore! Fast, clean, affordable, and always on time.'
      },
      {
        id: 'rev-orange-2',
        userName: 'Usman Ali',
        rating: 5,
        date: '3 days ago',
        comment: 'Very convenient route connecting Thokar Niaz Baig all the way to Dera Gujran. Great station facilities.'
      }
    ],
    faqs: [
      {
        question: 'What are the orange line train timing hours in Lahore?',
        answer: 'Orange Line Metro operates daily from 06:00 AM to 10:00 PM, 7 days a week, with trains every 5-7 minutes during peak hours.'
      },
      {
        question: 'How many stations are in the orange line station list?',
        answer: 'There are 26 stations on the Orange Line Lahore route, starting from Ali Town Station and ending at Dera Gujran Station.'
      }
    ]
  },
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

export interface CompanyItem {
  id: string
  slug: string
  name: string
  logo: string
  coverImage?: string
  description: string
  industry: string
  category?: string
  companySize: string
  employeeCount?: number
  establishedYear: string
  registrationNumber?: string
  companyType: 'Private' | 'Public' | 'Government' | 'NGO' | 'Startup' | 'Educational Institution' | 'Recruitment Agency' | 'Other'
  headquarters: string
  branchLocations?: string[]
  website?: string
  careersUrl?: string
  googleMapUrl?: string

  // HR Contact
  hrName?: string
  hrDesignation?: string
  hrEmail?: string
  companyEmail?: string
  phone?: string
  whatsapp?: string
  address?: string
  city: string
  province?: string
  country?: string

  // Social Links
  linkedin?: string // Highlighted
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  github?: string
  customSocialLinks?: ProfessionalCustomSocialLink[]

  // Status & Verification
  verified: boolean
  isFeatured?: boolean
  status?: 'pending' | 'approved' | 'rejected'
  submittedAt?: string
  approvedAt?: string
  approvedBy?: string
  rejectionReason?: string

  reviews?: { id: string; userName: string; rating: number; date: string; comment: string }[]
  faqs?: { question: string; answer: string }[]
  activeJobsCount?: number
}

export interface JobItem {
  id: string
  slug?: string
  title: string
  company: string
  companySlug: string
  companyLogo: string
  city: string
  province?: string
  country?: string
  category: string
  department?: string
  type: string
  employmentType?: string
  salary: string
  experience: string
  education?: string
  skills?: string[]
  vacancies?: number
  genderPreference?: string
  ageRequirement?: string
  deadline?: string
  joiningDate?: string
  workingHours?: string
  shiftType?: string
  benefits?: string[]
  postedDate: string
  description: string
  responsibilities: string[]
  requirements: string[]
  preferredQualifications?: string[]
  applicationWebsite?: string
  applicationEmail?: string
  applicationMethod?: string
  applicationUrl?: string
  verified?: boolean
  isFeatured?: boolean
  status?: 'pending' | 'approved' | 'rejected'
}

export const MOCK_COMPANIES: CompanyItem[] = [
  {
    id: 'comp-1',
    slug: 'tech-solutions-pakistan',
    name: 'Tech Solutions Pakistan',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    description: 'Tech Solutions Pakistan is a leading software engineering house and IT consultancy specializing in web application development, cloud architecture, and mobile products for North American and European clients.',
    industry: 'Technology & IT',
    category: 'Software & Cloud Services',
    companySize: '50 - 200 Employees',
    employeeCount: 140,
    establishedYear: '2015',
    registrationNumber: 'SECP-0092817',
    companyType: 'Private',
    headquarters: 'Blue Area, Islamabad, Pakistan',
    branchLocations: ['Lahore', 'Karachi'],
    website: 'https://techsolutions.pk',
    careersUrl: 'https://techsolutions.pk/careers',
    hrName: 'Mariam Farooq',
    hrDesignation: 'Head of Talent Acquisition & HR',
    hrEmail: 'careers@techsolutions.pk',
    companyEmail: 'info@techsolutions.pk',
    phone: '+92 51 8899770',
    whatsapp: '923005544332',
    address: 'Plot 42, Sector G-7/1, Blue Area, Islamabad',
    city: 'Islamabad',
    province: 'Federal Capital',
    country: 'Pakistan',
    linkedin: 'https://linkedin.com/company/techsolutionspk',
    facebook: 'https://facebook.com/techsolutionspk',
    github: 'https://github.com/techsolutionspk',
    twitter: 'https://twitter.com/techsolutionspk',
    verified: true,
    isFeatured: true,
    status: 'approved',
    activeJobsCount: 2,
    reviews: [
      { id: 'cr1', userName: 'Hamza Shaikh', rating: 5, date: '1 month ago', comment: 'Great engineering culture, modern tech stack (Next.js/React), and smooth onboarding process.' }
    ],
    faqs: [
      { question: 'Does Tech Solutions offer remote work options?', answer: 'Yes, we support hybrid working models and full-time remote roles for senior engineers.' }
    ]
  },
  {
    id: 'comp-2',
    slug: 'modern-builders-contractors',
    name: 'Modern Builders & Contractors',
    logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    description: 'Modern Builders is a premier civil construction firm executing commercial high-rise towers, residential housing schemes, and infrastructure projects across Punjab and Islamabad.',
    industry: 'Construction & Building',
    category: 'Civil Contracting & Architecture',
    companySize: '200 - 500 Employees',
    employeeCount: 320,
    establishedYear: '2008',
    companyType: 'Private',
    headquarters: 'Saddar, Rawalpindi, Pakistan',
    website: 'https://modernbuilders.pk',
    hrName: 'Engr. Kamran Shah',
    hrDesignation: 'General Manager HR & Admin',
    hrEmail: 'hr@modernbuilders.pk',
    phone: '+92 51 5566778',
    whatsapp: '923335566778',
    address: 'Saddar Executive Tower, Rawalpindi',
    city: 'Rawalpindi',
    province: 'Punjab',
    country: 'Pakistan',
    linkedin: 'https://linkedin.com/company/modernbuilderspk',
    verified: true,
    isFeatured: true,
    status: 'approved',
    activeJobsCount: 1
  }
]

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

export interface ProfessionalWorkExperience {
  id?: string
  title: string
  company: string
  duration: string
  description: string
}

export interface ProfessionalEducation {
  id?: string
  degree: string
  institution: string
  year: string
}

export interface ProfessionalCertification {
  id?: string
  title: string
  issuer: string
  year: string
}

export interface ProfessionalCustomSocialLink {
  name: string
  url: string
}

export interface ProfessionalItem {
  id?: string
  username: string
  slug?: string
  name: string
  fullName?: string
  title: string
  profession: string
  category: string
  specialization?: string
  city: string
  province?: string
  country?: string
  address?: string
  googleMapUrl?: string
  rating: number
  reviewCount?: number
  hourlyRate: string
  availability?: string
  avatar: string
  coverImage?: string
  bio: string
  about?: string
  skills: string[]
  experienceYears: number
  verified: boolean
  isFeatured?: boolean
  status?: 'pending' | 'approved' | 'rejected'
  submittedAt?: string
  approvedAt?: string
  approvedBy?: string
  rejectionReason?: string

  // Contact Info
  phone?: string
  email?: string
  whatsapp?: string
  website?: string
  portfolio?: string
  resumeUrl?: string
  currentCompany?: string

  // Arrays
  education?: ProfessionalEducation[]
  certifications?: ProfessionalCertification[]
  languages?: string[]
  previousExperience?: ProfessionalWorkExperience[]
  servicesOffered?: string[]
  reviews?: {
    id: string
    userName: string
    rating: number
    date: string
    comment: string
  }[]
  faqs?: { question: string; answer: string }[]

  // Dedicated Social Links
  linkedin?: string // Highlighted / Highest priority
  github?: string
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  behance?: string
  dribbble?: string
  stackoverflow?: string
  medium?: string
  fiverr?: string
  upwork?: string
  freelancer?: string
  kaggle?: string
  researchgate?: string
  orcid?: string
  googleScholar?: string
  customSocialLinks?: ProfessionalCustomSocialLink[]

  // Dynamic profession-specific fields
  dynamicFields?: Record<string, any>
}

export const MOCK_PROFESSIONALS: ProfessionalItem[] = [
  {
    id: 'pro-1',
    username: 'hamza-shaikh-dev',
    slug: 'hamza-shaikh-dev',
    name: 'Hamza Shaikh',
    title: 'Principal UI/UX Architect & Next.js Lead',
    profession: 'Software Developer',
    category: 'Technology & IT',
    specialization: 'Full Stack & Mobile Development',
    city: 'Lahore',
    province: 'Punjab',
    country: 'Pakistan',
    address: 'Gulberg III, Lahore, Pakistan',
    rating: 4.95,
    reviewCount: 28,
    hourlyRate: 'PKR 4,500 / hr',
    availability: 'Open to Work',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    bio: 'Over 8+ years experience designing enterprise web applications, scalable APIs, design systems, and cloud architectures for international & Pakistani clients.',
    about: 'I am a passionate Principal Software Architect based in Lahore with over 8 years of hands-on experience building mission-critical web and mobile applications. Specializing in modern JavaScript/TypeScript technologies like Next.js, React, Node.js, and Tailwind CSS. I have built design systems used by over 500,000 active monthly users.',
    skills: ['Next.js', 'React', 'Tailwind CSS', 'Figma', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL'],
    experienceYears: 8,
    verified: true,
    isFeatured: true,
    status: 'approved',
    currentCompany: 'Apex Tech Solutions',
    phone: '+92 300 1234567',
    email: 'hamza.shaikh@dev.pk',
    whatsapp: '923001234567',
    website: 'https://hamzashaikh.dev',
    portfolio: 'https://hamzashaikh.dev/portfolio',
    resumeUrl: 'https://hamzashaikh.dev/resume.pdf',
    languages: ['Urdu', 'English', 'Punjabi'],
    servicesOffered: [
      'Custom Web Application Development',
      'Next.js & React Frontend Engineering',
      'UI/UX Design Systems & Wireframing',
      'API Integration & Performance Audit'
    ],
    education: [
      { degree: 'BS Computer Science', institution: 'FAST-NUCES Lahore', year: '2017' }
    ],
    certifications: [
      { title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2022' },
      { title: 'Meta Certified Frontend Developer', issuer: 'Meta', year: '2021' }
    ],
    previousExperience: [
      { title: 'Senior Frontend Architect', company: 'DevSinc', duration: '2021 - 2024', description: 'Led team of 12 engineers migrating monolithic apps to Next.js App Router.' },
      { title: 'Full Stack Engineer', company: 'Systems Limited', duration: '2018 - 2021', description: 'Developed fintech modules and real-time transaction processing dashboards.' }
    ],
    linkedin: 'https://linkedin.com/in/hamzashaikh',
    github: 'https://github.com/hamzashaikh',
    twitter: 'https://twitter.com/hamzashaikhdev',
    behance: 'https://behance.net/hamzashaikh',
    upwork: 'https://upwork.com/freelancers/~0123456789',
    stackoverflow: 'https://stackoverflow.com/users/1234567/hamzashaikh',
    dynamicFields: {
      programmingLanguages: 'TypeScript, JavaScript, Python, Go, SQL',
      frameworks: 'Next.js, React, Node.js, Express, Tailwind CSS',
      technologies: 'Docker, Vercel, Firebase, PostgreSQL, Redis',
      openToRemote: 'Yes - Available for Global Remote Contracts'
    },
    reviews: [
      { id: 'r1', userName: 'Omer Farooq', rating: 5, date: '2 weeks ago', comment: 'Hamza delivered an outstanding Next.js platform ahead of deadline. Code architecture is top tier!' },
      { id: 'r2', userName: 'Ayesha Tariq', rating: 5, date: '1 month ago', comment: 'Extremely professional, clear communication, and incredible attention to UI details.' }
    ],
    faqs: [
      { question: 'What is your standard project turn-around time?', answer: 'For medium-scale Web Applications, average delivery is 3 to 5 weeks including full QA & deployment.' },
      { question: 'Are you open to full-time remote opportunities?', answer: 'Yes, I am available for both project contracts and full-time remote senior leadership roles.' }
    ]
  },
  {
    id: 'pro-2',
    username: 'dr-zainab-malik',
    slug: 'dr-zainab-malik',
    name: 'Dr. Zainab Malik',
    title: 'Consultant Dermatologist & Skincare Specialist',
    profession: 'Doctor',
    category: 'Healthcare & Medical',
    specialization: 'Dermatology & Aesthetic Medicine',
    city: 'Karachi',
    province: 'Sindh',
    country: 'Pakistan',
    address: 'Clifton Block 5, Karachi, Pakistan',
    rating: 4.90,
    reviewCount: 42,
    hourlyRate: 'PKR 3,000 / consultation',
    availability: 'In-Clinic & Online',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    bio: 'Board-certified dermatologist with 10+ years expertise in clinical skincare, laser treatments, acne scars, and aesthetic medicine.',
    about: 'Dr. Zainab Malik is a leading consultant dermatologist in Karachi certified by PMDC and the College of Physicians and Surgeons Pakistan. She has treated over 15,000 patients with skin, hair, and nail conditions using state-of-the-art US-FDA approved laser lasers and evidence-based clinical protocols.',
    skills: ['Clinical Dermatology', 'Laser Therapy', 'Cosmetic Procedures', 'Acne Treatment', 'Anti-Aging Therapy'],
    experienceYears: 10,
    verified: true,
    isFeatured: true,
    status: 'approved',
    currentCompany: 'Skin & Laser Medical Center Clifton',
    phone: '+92 21 35849201',
    email: 'dr.zainab@skincare.pk',
    whatsapp: '923219876543',
    website: 'https://drzainabmalik.pk',
    languages: ['Urdu', 'English', 'Sindhi'],
    servicesOffered: [
      'Dermatological Consultation',
      'Laser Hair & Pigmentation Removal',
      'Chemical Peels & Hydrafacial',
      'Eczema & Psoriasis Clinical Management'
    ],
    education: [
      { degree: 'MBBS', institution: 'Dow University of Health Sciences', year: '2012' },
      { degree: 'FCPS Dermatology', institution: 'College of Physicians & Surgeons Pakistan', year: '2017' }
    ],
    certifications: [
      { title: 'PMDC Permanent Medical License', issuer: 'Pakistan Medical & Dental Council', year: '2013' },
      { title: 'Diplomate Aesthetic Medicine', issuer: 'American Academy of Aesthetic Medicine', year: '2019' }
    ],
    previousExperience: [
      { title: 'Consultant Dermatologist', company: 'South City Hospital', duration: '2018 - Present', description: 'In-patient dermatology consultations and laser procedural suite.' }
    ],
    linkedin: 'https://linkedin.com/in/drzainabmalik',
    facebook: 'https://facebook.com/drzainabmalik',
    instagram: 'https://instagram.com/drzainabmalik',
    youtube: 'https://youtube.com/@drzainabmalik',
    googleScholar: 'https://scholar.google.com/citations?user=zainabmalik',
    dynamicFields: {
      specialization: 'Dermatology & Cosmetic Surgery',
      pmdcNumber: 'PMDC-68291-S',
      hospitalClinic: 'Skin & Laser Medical Center Clifton',
      consultationFee: 'PKR 3,000',
      workingHours: 'Mon - Sat: 4:00 PM - 8:00 PM',
      emergencyAvailability: 'Yes - On-call for clinic emergencies'
    },
    reviews: [
      { id: 'r3', userName: 'Kashif Mehmood', rating: 5, date: '3 days ago', comment: 'Dr. Zainab cured my chronic skin allergy within 2 weeks. Highly knowledgeable doctor!' }
    ],
    faqs: [
      { question: 'Do I need a prior appointment for consultation?', answer: 'Yes, prior appointment via phone or WhatsApp is recommended to prevent wait times.' }
    ]
  },
  {
    id: 'pro-3',
    username: 'shehryar-khan-ca',
    slug: 'shehryar-khan-ca',
    name: 'Shehryar Khan, FCA',
    title: 'Chartered Accountant & Tax Advisory Partner',
    profession: 'Accountant',
    category: 'Finance & Banking',
    specialization: 'Taxation, Corporate Law & Auditing',
    city: 'Islamabad',
    province: 'Federal Capital',
    country: 'Pakistan',
    address: 'Blue Area, Islamabad, Pakistan',
    rating: 4.88,
    reviewCount: 19,
    hourlyRate: 'PKR 6,000 / hr',
    availability: 'Consulting',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fellow Chartered Accountant (FCA) assisting corporate clients & high net worth individuals with FBR income tax, SECP compliance, and corporate financial planning.',
    about: 'Shehryar Khan is an ICAP Fellow Chartered Accountant with 12+ years experience advising private limited companies, IT exporters, and multinational branch offices on Pakistani corporate law, tax optimization, withholding tax audits, and SECP annual returns.',
    skills: ['FBR Tax Advisory', 'SECP Compliance', 'Corporate Audit', 'Financial Modeling', 'Wealth Statement Filing'],
    experienceYears: 12,
    verified: true,
    isFeatured: true,
    status: 'approved',
    currentCompany: 'Shehryar & Co. Chartered Accountants',
    phone: '+92 51 8483920',
    email: 'shehryar@taxconsultant.pk',
    whatsapp: '923008889900',
    website: 'https://taxconsultant.pk',
    languages: ['Urdu', 'English'],
    servicesOffered: [
      'FBR Income Tax & Sales Tax Return Filing',
      'SECP Private Limited Company Registration',
      'Annual Financial Audit & Statements',
      'Foreign Remittance Tax Exemption Certificates'
    ],
    education: [
      { degree: 'CA (FCA Member)', institution: 'Institute of Chartered Accountants of Pakistan (ICAP)', year: '2012' }
    ],
    certifications: [
      { title: 'ICAP Practicing Certificate', issuer: 'ICAP', year: '2014' }
    ],
    linkedin: 'https://linkedin.com/in/shehryarkhanfca',
    medium: 'https://medium.com/@shehryarkhanfca',
    dynamicFields: {
      icapNumber: 'ICAP-FCA-5421',
      firmName: 'Shehryar & Co. Chartered Accountants',
      taxSpecialization: 'FBR Corporate & Foreign Income Tax',
      clientConsultation: 'In-Person (Islamabad) & Online Zoom'
    },
    reviews: [
      { id: 'r4', userName: 'Bilal Ahmad', rating: 5, date: '1 month ago', comment: 'Resolved our SECP registration and tax exemption smoothly. Recommended for tech startups!' }
    ]
  },
  {
    id: 'pro-4',
    username: 'tariq-mehmood-master-electrician',
    slug: 'tariq-mehmood-master-electrician',
    name: 'Tariq Mehmood',
    title: 'Licensed Industrial & Residential Electrician',
    profession: 'Electrician',
    category: 'Home Services & Repairs',
    specialization: 'Solar & High Voltage Wiring',
    city: 'Rawalpindi',
    province: 'Punjab',
    country: 'Pakistan',
    address: 'Saddar, Rawalpindi, Pakistan',
    rating: 4.85,
    reviewCount: 35,
    hourlyRate: 'PKR 1,500 / visit',
    availability: 'On-Call 24/7',
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    bio: 'Certified master electrician with 14 years experience handling residential DB box wiring, hybrid solar inverter setup, three-phase industrial connections, and emergency fault finding.',
    about: 'Tariq Mehmood provides reliable electrical contracting across Rawalpindi and Islamabad. Equipped with digital multi-meters, thermal imagery tools, and certified safety gear to execute clean conduit wiring, automatic generator changeover switches, and solar net-metering installations.',
    skills: ['Three-Phase Wiring', 'Solar Inverter Setup', 'DB Panel Design', 'Short Circuit Troubleshooting', 'Automatic Changeover'],
    experienceYears: 14,
    verified: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 333 5554433',
    email: 'tariq.electrician@gmail.com',
    whatsapp: '923335554433',
    languages: ['Urdu', 'Punjabi'],
    servicesOffered: [
      'Full House Electrical Conduit Wiring',
      'Solar Panel Inverter & Battery Cable Hookup',
      'Automatic Generator Changeover Switch',
      'Industrial Panel Repairs & Breaker Replacement'
    ],
    education: [
      { degree: 'Diploma in Electrical Engineering (DAE)', institution: 'Government Polytechnic Institute Rawalpindi', year: '2010' }
    ],
    certifications: [
      { title: 'Certified Master Wireman', issuer: 'Punjab Vocational Training Council', year: '2011' }
    ],
    dynamicFields: {
      skillType: 'Licensed Master Electrician & Solar Installer',
      dailyRate: 'PKR 3,500 / day',
      availableForTravel: 'Yes - Rawalpindi, Islamabad & Surrounding Districts',
      experience: '14 Years Field Experience',
      equipmentOwned: 'Digital Insulation Tester, Cable Crimper, Safety Ladders, Hole Saw Sets'
    },
    reviews: [
      { id: 'r5', userName: 'Asad Shah', rating: 5, date: '1 week ago', comment: 'Tariq Bhai solved a dangerous neutral wiring issue that 3 other electricians failed to locate. Excellent work!' }
    ]
  },
  {
    id: 'pro-5',
    username: 'saima-riaz-designer',
    slug: 'saima-riaz-designer',
    name: 'Saima Riaz',
    title: 'Senior Graphic Designer & Brand Identity Specialist',
    profession: 'Graphic Designer',
    category: 'Media, PR & Advertising',
    specialization: 'Brand Identity & Packaging Design',
    city: 'Lahore',
    province: 'Punjab',
    country: 'Pakistan',
    address: 'DHA Phase 5, Lahore, Pakistan',
    rating: 4.92,
    reviewCount: 31,
    hourlyRate: 'PKR 3,200 / hr',
    availability: 'Freelance',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    bio: 'Creative brand strategist and designer specializing in high-converting product packaging, logo identity systems, and social media creative assets.',
    about: 'Saima Riaz brings over 6 years of award-winning brand design experience. She has crafted brand guideline booklets, packaging boxes, vector illustrations, and digital campaigns for food brands, fashion labels, and tech startups across Pakistan and Dubai.',
    skills: ['Adobe Illustrator', 'Photoshop', 'Indesign', 'Figma', 'Brand Identity Systems', 'Packaging Design'],
    experienceYears: 6,
    verified: true,
    isFeatured: false,
    status: 'approved',
    phone: '+92 321 4400112',
    email: 'saima@riazdesign.com',
    whatsapp: '923214400112',
    website: 'https://behance.net/saimariaz',
    portfolio: 'https://dribbble.com/saimariaz',
    languages: ['Urdu', 'English'],
    servicesOffered: [
      'Complete Brand Logo & Guidelines Package',
      'Product Packaging Box & Label Design',
      'Social Media Campaign Banners & Carousel Templates',
      'Corporate Brochure & Company Profile Design'
    ],
    education: [
      { degree: 'BFA Graphic Design', institution: 'National College of Arts (NCA) Lahore', year: '2018' }
    ],
    behance: 'https://behance.net/saimariaz',
    dribbble: 'https://dribbble.com/saimariaz',
    instagram: 'https://instagram.com/saimariaz.design',
    fiverr: 'https://fiverr.com/saimariaz',
    dynamicFields: {
      behance: 'https://behance.net/saimariaz',
      dribbble: 'https://dribbble.com/saimariaz',
      designSoftware: 'Adobe Illustrator, Photoshop, InDesign, Figma, After Effects',
      portfolio: 'https://behance.net/saimariaz'
    },
    reviews: [
      { id: 'r6', userName: 'Mariam Ali', rating: 5, date: '2 weeks ago', comment: 'Saima designed the complete packaging for our organic tea brand. The aesthetics are top-class!' }
    ]
  },
  {
    id: 'pro-6',
    username: 'professor-adnan-tutor',
    slug: 'professor-adnan-tutor',
    name: 'Prof. Adnan Tariq',
    title: 'Senior Physics & Mathematics O/A Level Educator',
    profession: 'Teacher',
    category: 'Education & Training',
    specialization: 'Cambridge IGCSE & A Level Physics',
    city: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    country: 'Pakistan',
    address: 'University Town, Peshawar, Pakistan',
    rating: 4.96,
    reviewCount: 50,
    hourlyRate: 'PKR 2,500 / hr',
    availability: 'Online & Home Tuition',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    bio: 'Dedicated Cambridge educator with 15+ years experience mentoring students to secure A* grades in O-Level Physics, A-Level Mathematics, and SAT quantitative sections.',
    about: 'Professor Adnan Tariq has coached over 2,000 students across leading private schools in Peshawar and Islamabad. Known for interactive problem-solving techniques, past-paper drills, and conceptual clarity.',
    skills: ['O Level Physics', 'A Level Mathematics', 'Calculus', 'Past Paper Exam Drills', 'Online Coaching'],
    experienceYears: 15,
    verified: true,
    isFeatured: true,
    status: 'approved',
    phone: '+92 301 9988776',
    email: 'adnan.tariq@education.pk',
    whatsapp: '923019988776',
    languages: ['Urdu', 'English', 'Pashto'],
    servicesOffered: [
      'Cambridge O & A Level Online Live Classes',
      'One-on-One Home Tuition in Peshawar',
      'Exam Crash Course & Past Paper Revision',
      'SAT Math Prep & Entry Test Coaching'
    ],
    education: [
      { degree: 'M.Sc Applied Physics', institution: 'University of Peshawar', year: '2008' }
    ],
    youtube: 'https://youtube.com/@profadnandhysics',
    dynamicFields: {
      subjects: 'O-Level Physics (5054/0625), A-Level Physics (9702), Pure Mathematics',
      gradeLevels: 'Class 9, 10, O Level, A Level, F.Sc Pre-Engineering',
      teachingMode: 'Both Online Zoom & In-Person Home Coaching',
      teachingExperience: '15 Years in Top Educational Academies'
    },
    reviews: [
      { id: 'r7', userName: 'Zubair Khattak', rating: 5, date: '1 month ago', comment: 'Sir Adnan helped my son go from C grade to A* in A-Level Physics! Highly recommended teacher.' }
    ]
  }
]

