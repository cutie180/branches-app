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

export interface BusinessLocation {
  id?: string
  city: string
  address: string
  isPrimary?: boolean
  phone?: string
  lat?: number
  lng?: number
}

export interface BusinessItem {
  id: string
  slug: string
  name: string
  category: string
  categoryId: string
  city: string
  cities?: string[]
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
  locations?: BusinessLocation[]
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
    "id": "1hhe5gCFlU8VU4RsROWN",
    "slug": "multan-blue-pottery-emporium-multan",
    "name": "Multan Blue Pottery Emporium",
    "category": "retail",
    "categoryId": "services",
    "city": "Multan",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 61 4581234",
    "whatsapp": "+92 301 7776655",
    "email": "artisan@multanbluepottery.pk",
    "website": "https://www.listpak.com",
    "address": "Gulgasht Colony Commercial Area",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Multan Blue Pottery Emporium showcases traditional Multani blue clay pottery, handmade vases, decorative tiles, plates, and mugs. Each piece is hand-painted by local master artisans using generational techniques.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "3SaUCo0SbDEPju2i2cQT",
    "slug": "quetta-dry-fruits-wholesale-quetta",
    "name": "Quetta Dry Fruits Wholesale",
    "category": "logistics",
    "categoryId": "services",
    "city": "Quetta",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 81 2824321",
    "whatsapp": "+92 321 4443322",
    "email": "wholesale@quettadryfruits.pk",
    "website": "https://www.listpak.com",
    "address": "Jinnah Road near Cantt",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Quetta Dry Fruits Wholesale brings you the finest selection of premium almonds, walnuts, pistachios, figs, and pine nuts direct from Balochistan orchards. Fresh, organic, and vacuum packed for longevity.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "BR0AUglnO16leqNtKkWc",
    "slug": "al-zaban-hardware-store",
    "name": "AL ZABAN HARDWARE STORE",
    "category": "Construction & Building",
    "categoryId": "construction",
    "city": "Lahore",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "042 35110830",
    "whatsapp": "03351108300",
    "email": "contact@business.pk",
    "website": "https://alzaban.com/",
    "address": "Plot No. 3, Block No. 11, Sector B1, Township, Lahore, Pakistan",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "AL ZABAN HARDWARE STOREis an e-commerce platform and retail enterprise headquartered in Lahore, Pakistan. Operating with the foundational slogan \"Your one-stop shop for quality products,\" the store serves as a comprehensive marketplace for specialized hardware, architectural fittings, power tools, pest control remedies, and general home improvement solutions. The website caters to a wide spectrum of customers, including professional contractors, interior designers, woodworkers, and general homeowners seeking reliable hardware components. The digital store interface is designed for user convenience, incorporating structured navigation menus, direct communication channels, high-resolution product listings, customer feedback, and built-in virtual support tools.\n\n---\n\n**Contact Information & Location Details**\n\nThe platform maintains transparent operational channels, giving customers multiple direct methods to reach out for order placement, inquiries, or physical visits:\n\n* **Official Business Name:** [AL ZABAN HARDWARE STORE](https://alzaban.com/)\n* **Physical Address:** [Plot No. 3, Block No. 11, Sector B1, Township, Lahore, Pakistan](https://alzaban.com/)\n* **Landline Phone:** 042 35110830\n* **WhatsApp Business Line:** [03351108300](https://alzaban.com/)\n* **Official Email Address:** [info@alzaban.com](https://alzaban.com/)\n\n---\n\n**Product Categories & Sub-Categories Breakdown**\n\nThe platform organizes its large selection of goods across several distinct primary departments and specialized sub-categories:\n\n* **Kitchen Accessories:** Features specialized utility items, including flexible kitchen hood pipes, double stainless steel sink bowls, pull-out wire baskets, double corner racks, and cutlery organizers like knife and fork holders.\n* **Door Accessories:** Includes security mechanisms and essential entryway hardware, such as traditional round knob locks, handle door locks, rim door gate locks, and electronic security rim locks.\n* **Hardware:** Encompasses core construction fasteners and heavy-duty locking mechanisms, including drywall screws, countersink drill bits, and main door locks.\n* **Power Tools:** Provides machinery and heavy-duty electric equipment ranging from industrial automatic edge banding machines to portable cordless air blowers.\n* **Furniture Accessories:** Offers specialized fittings for cabinetry and furniture construction, such as heavy-duty anti-rust stainless steel sofa legs and cabinet/drawer locks.\n* **Medicines (Pest Control):** Offers structural protection treatments, such as specialized termite control remedies.\n* **Additional Primary Categories:** Includes Bathroom Accessories, Home Improvements, and Hand Tools.\n\n---\n\n**Featured Products Highlight**\n\nThe homepage features a range of products suited for various budgets and applications:\n\n* **Industrial Machinery:** The automatic edge banding machine stands out as a premium industrial offering priced at Rs 2,100,000.00 with a full 5.0-star rating.\n* **Security & Door Locks:** Premium electronic items include the [Yale Electric Rim Lock](https://alzaban.com/) listed at Rs 19,900.00 and the EZZEA Electric Rim Lock at Rs 5,200.00. Standard mechanical options include the [MAIN DOOR LOCK 9995 MAE](https://alzaban.com/) at Rs 6,450.00, the [HANDLE DOOR LOCK 173GP](https://alzaban.com/) at Rs 2,990.00, the WELKA Gate Lock at Rs 2,400.00, and the stainless steel Round Lock #87891 at Rs 1,700.00.\n* **Kitchen Fixtures:** Key listings include the extra-wide [Stainless Steel Kitchen Sink Bowl Double](https://alzaban.com/) priced at Rs 10,500.00, Pull-Out Kitchen Baskets at Rs 6,150.00, Double Corner Racks at Rs 2,990.00, Wellmax Knife & Fork Holders at Rs 1,900.00, and 4-inch Kitchen Hood Aluminum Flexible Pipes at Rs 850.00.\n* **Tools, Fasteners & Furniture Fittings:** Practical day-to-day hardware includes the Cordless Blower at Rs 9,800.00, Cyber Lock Drawer Locks at Rs 760.00, Front Line TC Termite Killer at Rs 400.00, Countersink Drill Bits at Rs 250.00, heavy-duty stainless steel Sofa Legs at Rs 130.00, and standard Drywall Screws at Rs 90.00.\n\n---\n\n**E-Commerce Features, Guarantees & Platform Layout**\n\n* **Customer Care Policies:** The store offers free delivery nationwide on all orders valued above Rs 5,000. Additionally, customer purchases are safeguarded through a standard 7-day return policy and a 100% protected secure checkout system.\n* **Interactive Shopping Tools:** Visitors can interact with a direct AI Assistant widget located on the page to ask product questions or quickly initiate inquiries via an integrated WhatsApp chat button.\n",
    "services": [
      "Automatic Edge Banding Machine",
      "Countersink Drill Bit"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [
      {
        "id": "rev-starter-1-1786075940076",
        "comment": "Excellent service and a very professional team at AL ZABAN HARDWARE STORE. Highly recommended for anyone looking for reliable solutions.",
        "userName": "Tariq Mehmood",
        "date": "Just now",
        "rating": 5
      },
      {
        "rating": 5,
        "userName": "Saima Khan",
        "comment": "Great overall experience from start to finish with AL ZABAN HARDWARE STORE. Friendly staff and outstanding customer support.",
        "id": "rev-starter-2-1786075940076",
        "date": "1 day ago"
      },
      {
        "userName": "Bilal Ahmed",
        "rating": 5,
        "date": "2 days ago",
        "id": "rev-starter-3-1786075940076",
        "comment": "AL ZABAN HARDWARE STORE exceeded expectations with quality service, quick response times, and professional communication."
      },
      {
        "id": "rev-starter-4-1786075940076",
        "comment": "Very satisfied with the experience at AL ZABAN HARDWARE STORE. Everything was handled efficiently and exactly as promised.",
        "userName": "Hamza Sheikh",
        "rating": 5,
        "date": "3 days ago"
      },
      {
        "date": "4 days ago",
        "comment": "Highly recommended. The staff at AL ZABAN HARDWARE STORE were knowledgeable, courteous, and delivered excellent service throughout.",
        "id": "rev-starter-5-1786075940076",
        "rating": 5,
        "userName": "Zainab Fatima"
      }
    ],
    "faqs": []
  },
  {
    "id": "KdDmW9DMhmQw6uDSvmQ4",
    "slug": "karachi-biryani-house-karachi",
    "name": "Karachi Biryani House",
    "category": "restaurants",
    "categoryId": "services",
    "city": "Karachi",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 21 34567890",
    "whatsapp": "+92 300 1234567",
    "email": "contact@karachibiryani.pk",
    "website": "https://www.karachibiryani.pk",
    "address": "Block 2, Saddar Commercial Area",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Welcome to Karachi Biryani House. We serve the most authentic and traditional Karachi biryani, beef pullao, and hot chicken tikka in town. All ingredients are freshly sourced and prepared using original recipes.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "Qzf825oSlQIghNdLIKrh",
    "slug": "hyderabad-premium-sweets-hyderabad",
    "name": "Hyderabad Premium Sweets",
    "category": "restaurants",
    "categoryId": "services",
    "city": "Hyderabad",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 22 2785566",
    "whatsapp": "+92 300 9334455",
    "email": "rabri@hyderabadsweets.pk",
    "website": "https://www.listpak.com",
    "address": "Latifabad Block 2",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Hyderabad Premium Sweets is famous for authentic Hyderabadi Rabri, Sohan Halwa, and traditional Pakistani desserts. Prepared with pure milk and high-quality ingredients since 1985.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "RTQfc6iAEZQRPo9MdFrX",
    "slug": "sialkot-sports-goods-mfg-sialkot",
    "name": "Sialkot Sports Goods MFG",
    "category": "retail",
    "categoryId": "services",
    "city": "Sialkot",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 52 4291122",
    "whatsapp": "+92 334 1212121",
    "email": "export@sialkotsports.pk",
    "website": "https://www.sialkotsports.pk",
    "address": "Small Industrial Estate",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Sialkot Sports Goods MFG is an industry-leading manufacturer of footballs, cricket bats, sports apparel, boxing gloves, and protective gear. Exporting high-grade sports gear globally for over 20 years.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "T8IKlTFQquniBoB0ZeU8",
    "slug": "sngpl-online-bill-check-14-digit",
    "name": "SNGPL online bill check 14 digit",
    "category": "Solar & Renewable Energy",
    "categoryId": "solar",
    "city": "Lahore",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": " +92-42-99082000",
    "whatsapp": " +92-42-99082000",
    "email": "contact@business.pk",
    "website": "https://www.sngpl.com.pk/",
    "address": "Gas House, 21-Kashmir Road, P.O. Box No. 56, Lahore 54000, Pakistan",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "**Sui Northern Gas Pipelines Limited (SNGPL) – Online Bill Checking Portal**\n\nSui Northern Gas Pipelines Limited (SNGPL) is the largest integrated gas company in North-Central Pakistan, serving millions of residential, commercial, and industrial consumers across Punjab, Khyber Pakhtunkhwa (KPK), and Azad Jammu & Kashmir (AJK). The official SNGPL web portal provides a dedicated, consumer-centric digital platform designed to streamline utility management, eliminate the dependency on physical mail delivery, and allow instant access to monthly billing information from any device.\n\n**Primary Purpose & Utility**\nThe portal's core feature is the duplicate bill inquiry service, which allows consumers to check, view, and download their monthly gas utility statements online. To access an e-bill, users simply enter their unique **14-digit Account ID** (also referred to as the Consumer ID/Number), which is permanently printed on the upper section of any previous hard-copy gas bill. Once entered, the system instantly fetches the latest billing cycle data without requiring user registration or portal authentication.\n\n**Key Features & Capabilities**\n\n* **Instant Bill View & Print:** Users can view detailed billing summaries, including current charges, arrears, meter reading dates, gas consumption units (HM³), and the final due date. The portal allows downloading or printing official duplicate bills in PDF format for physical record-keeping or offline payment.\n* **Payment Facilitation:** While the portal provides the generated bill, it seamlessly integrates with digital banking ecosystems. Users can utilize their 14-digit ID to pay directly through internet banking apps, ATM networks, and popular mobile financial services such as JazzCash, Easypaisa, and 1Link portals.\n* **Consumer Complaint & Tracking Services:** Beyond billing, the platform includes dedicated modules for logging service complaints, tracking new gas connection applications, checking meter replacement statuses, and viewing seasonal billing tariffs and load-shedding schedules.\n* **Safety & Regulatory Information:** The website serves as an official communication hub for gas conservation awareness, billing calculator tools, safety guidelines regarding gas leaks, and official corporate announcements from the management.",
    "services": [
      "General Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [
      {
        "userName": "Tariq Mehmood",
        "comment": "Excellent service and a very professional team at SNGPL online bill check 14 digit. Highly recommended for anyone looking for reliable solutions.",
        "rating": 5,
        "id": "rev-starter-1-1786081359550",
        "date": "Just now"
      },
      {
        "id": "rev-starter-2-1786081359550",
        "userName": "Saima Khan",
        "comment": "Great overall experience from start to finish with SNGPL online bill check 14 digit. Friendly staff and outstanding customer support.",
        "rating": 5,
        "date": "1 day ago"
      },
      {
        "userName": "Bilal Ahmed",
        "rating": 5,
        "comment": "SNGPL online bill check 14 digit exceeded expectations with quality service, quick response times, and professional communication.",
        "date": "2 days ago",
        "id": "rev-starter-3-1786081359550"
      },
      {
        "id": "rev-starter-4-1786081359550",
        "date": "3 days ago",
        "comment": "Very satisfied with the experience at SNGPL online bill check 14 digit. Everything was handled efficiently and exactly as promised.",
        "rating": 5,
        "userName": "Hamza Sheikh"
      },
      {
        "date": "4 days ago",
        "userName": "Zainab Fatima",
        "rating": 5,
        "id": "rev-starter-5-1786081359550",
        "comment": "Highly recommended. The staff at SNGPL online bill check 14 digit were knowledgeable, courteous, and delivered excellent service throughout."
      }
    ],
    "faqs": []
  },
  {
    "id": "WYVXkwSLgw3ROdrWD4rw",
    "slug": "pm-ramzan-relief-package-cnic-eligibility-portal",
    "name": "PM Ramzan Relief Package CNIC Eligibility Portal",
    "category": "Technology & IT",
    "categoryId": "technology",
    "city": "Islamabad",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "03038940443",
    "whatsapp": "03038940443",
    "email": "contact@business.pk",
    "website": "https://pmrrp.nitb.gov.pk/",
    "address": "Islamabad Pakistan",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "The **Prime Minister's Ramzan Relief Package (PMRRP)** online portal and eligibility verification ecosystem, developed and managed by the National Information Technology Board (NITB) under the Government of Pakistan, is designed to deliver seamless digital access and transparent public welfare distribution across the nation. This specialized government e-services platform enables citizens across all provinces to quickly verify their eligibility for the **Ramzan Relief Package** and the **Nigehban Rashan Program** without needing to physically visit government centers or wait in long, exhausting queues during the holy month.\n\nTo perform an online status inquiry, citizens can use official government digital web portals or utilize the designated shortcode SMS verification system. To check eligibility via mobile phone, simply open your messaging app, type your 13-digit Computerized National Identity Card (CNIC) number without any spaces, dashes, or special characters (e.g., 1234567890123), and send it directly to **9999**. Within a few moments, the automated government system processes the CNIC against the national database and sends an immediate reply SMS detailing your eligibility status for the **Rs. 10,000 cash distribution**, subsidized flour, or \"Rashan Riayat\" family utility package.\n\nOur service platform acts as an educational and technical guidance portal to help citizens seamlessly navigate these online portals, understand eligibility benchmarks, check BISP and utility store enrollment criteria, and resolve technical discrepancies with CNIC identification numbers. By leveraging modern digital infrastructure, government data APIs, and real-time verification systems, we strive to simplify public utility access, enhance digital literacy among underprivileged communities, and ensure equitable relief distribution for every deserving household in Pakistan.\n\n",
    "services": [
      "CNIC 9999 SMS Verification Guide",
      "PM Ramzan Relief Package Eligibility Check"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [
      {
        "userName": "Tariq Mehmood",
        "date": "Just now",
        "id": "rev-starter-1-1786079899409",
        "comment": "Excellent service and a very professional team at PM Ramzan Relief Package CNIC Eligibility Portal. Highly recommended for anyone looking for reliable solutions.",
        "rating": 5
      },
      {
        "comment": "Great overall experience from start to finish with PM Ramzan Relief Package CNIC Eligibility Portal. Friendly staff and outstanding customer support.",
        "id": "rev-starter-2-1786079899409",
        "userName": "Saima Khan",
        "rating": 5,
        "date": "1 day ago"
      },
      {
        "id": "rev-starter-3-1786079899409",
        "rating": 5,
        "userName": "Bilal Ahmed",
        "comment": "PM Ramzan Relief Package CNIC Eligibility Portal exceeded expectations with quality service, quick response times, and professional communication.",
        "date": "2 days ago"
      },
      {
        "rating": 5,
        "id": "rev-starter-4-1786079899409",
        "comment": "Very satisfied with the experience at PM Ramzan Relief Package CNIC Eligibility Portal. Everything was handled efficiently and exactly as promised.",
        "userName": "Hamza Sheikh",
        "date": "3 days ago"
      },
      {
        "comment": "Highly recommended. The staff at PM Ramzan Relief Package CNIC Eligibility Portal were knowledgeable, courteous, and delivered excellent service throughout.",
        "id": "rev-starter-5-1786079899409",
        "userName": "Zainab Fatima",
        "rating": 5,
        "date": "4 days ago"
      }
    ],
    "faqs": []
  },
  {
    "id": "bZkvrEzwnVfpkRA1FH8n",
    "slug": "rs-25000-prize-bond-draw-schedule",
    "name": "Rs 25000 Prize Bond Draw Schedule",
    "category": "Finance & Banking",
    "categoryId": "finance",
    "city": "Lahore",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "03038548545",
    "whatsapp": "03038548545",
    "email": "contact@business.pk",
    "website": "https://www.listpak.com",
    "address": "State Bank of Pakistan Islamabad",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "If you are looking to maximize your financial investments with complete security and lucrative returns, keeping track of the **Rs. 25,000 Premium Prize Bond draw schedule** is essential. Issued by the Central Directorate of National Savings (CDNS) in collaboration with the State Bank of Pakistan (SBP), the Rs. 25,000 bond remains one of the most popular and trusted investment instruments in the country.\n\n### What Makes the Rs. 25,000 Premium Prize Bond Special?\n\nUnlike standard, unregistered prize bonds, the Rs. 25,000 Premium Prize Bond is a registered financial security linked directly to your CNIC and bank account. This provides investors with a dual advantage:\n\n1. **Bi-Annual Profit Payouts:** Regular profit rate returns deposited directly into your linked bank account every six months.\n2. **Quarterly Lucky Draws:** A chance to win massive monetary rewards four times a year without risking your initial principal investment.\n\n### How the Draw Schedule Works\n\nThe State Bank of Pakistan conducts draws for the Rs. 25,000 denomination on a strict quarterly basis—typically taking place in **March, June, September, and December**. The draw events rotate across major regional SBP Banking Services Corporation offices, including Karachi, Lahore, Rawalpindi, Peshawar, and Multan.\n\n### Prize Distribution Breakdown\n\nEach quarterly draw features an impressive prize pool distribution:\n\n* **1st Prize:** 2 winners receive **Rs. 30,000,000 (3 Crore)** each.\n* **2nd Prize:** 5 winners receive **Rs. 10,000,000 (1 Crore)** each.\n* **3rd Prize:** 700 winners receive **Rs. 300,000** each.\n\n### How to Check Your Results\n\nTo verify your bond serial numbers, simply visit our website or the official National Savings portal (`savings.gov.pk`) following each draw date. You can search your bond numbers instantly or download the complete official PDF winning lists. Stay updated with our latest draw schedule postings to ensure you never miss an upcoming balloting date or prize claim deadline!",
    "services": [
      "Prize Bonds"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [
      {
        "rating": 5,
        "userName": "Tariq Mehmood",
        "date": "Just now",
        "id": "rev-starter-1-1786082478597",
        "comment": "Excellent service and a very professional team at Rs 25000 Prize Bond Draw Schedule. Highly recommended for anyone looking for reliable solutions."
      },
      {
        "userName": "Saima Khan",
        "rating": 5,
        "date": "1 day ago",
        "comment": "Great overall experience from start to finish with Rs 25000 Prize Bond Draw Schedule. Friendly staff and outstanding customer support.",
        "id": "rev-starter-2-1786082478597"
      },
      {
        "userName": "Bilal Ahmed",
        "date": "2 days ago",
        "id": "rev-starter-3-1786082478597",
        "rating": 5,
        "comment": "Rs 25000 Prize Bond Draw Schedule exceeded expectations with quality service, quick response times, and professional communication."
      },
      {
        "userName": "Hamza Sheikh",
        "date": "3 days ago",
        "rating": 5,
        "id": "rev-starter-4-1786082478597",
        "comment": "Very satisfied with the experience at Rs 25000 Prize Bond Draw Schedule. Everything was handled efficiently and exactly as promised."
      },
      {
        "rating": 5,
        "id": "rev-starter-5-1786082478597",
        "date": "4 days ago",
        "comment": "Highly recommended. The staff at Rs 25000 Prize Bond Draw Schedule were knowledgeable, courteous, and delivered excellent service throughout.",
        "userName": "Zainab Fatima"
      }
    ],
    "faqs": []
  },
  {
    "id": "biz-750-prize-bond-list-2025",
    "slug": "750-prize-bond-list-2025",
    "name": "750 Prize Bond List 2025",
    "category": "finance",
    "categoryId": "finance",
    "city": "Lahore",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "03038548545",
    "whatsapp": "03038548545",
    "email": "contact@business.pk",
    "website": "https://www.listpak.com",
    "address": "State Bank of Pakistan Islamabad",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "If you are looking to check the official winning numbers and draw schedules for the **Rs. 750 Prize Bond List 2025**, keeping track of balloting results is essential. Issued and backed by the Central Directorate of National Savings (CDNS) and the State Bank of Pakistan (SBP), the Rs. 750 prize bond is one of the most widely held financial securities in Pakistan.\n\n### About the Rs. 750 Prize Bond\n\nThe Rs. 750 denomination prize bond offers investors a completely safe capital investment with zero risk to the principal amount, along with the opportunity to win substantial cash rewards through quarterly lucky draws.\n\n### Rs. 750 Prize Bond Draw Schedule & Balloting\n\nThe State Bank of Pakistan conducts the official draw for the Rs. 750 prize bond four times a year on a quarterly basis:\n- **January**\n- **April**\n- **July**\n- **October**\n\nDraws rotate across SBP Banking Services Corporation branches in major cities, including Lahore, Karachi, Rawalpindi, Peshawar, Multan, and Faisalabad.\n\n### Prize Money & Prize Pool Distribution\n\nEach draw of the Rs. 750 prize bond awards thousands of lucky winners across three main categories:\n\n- **1st Prize:** 1 lucky winner receives **Rs. 1,500,000 (15 Lakh PKR)**\n- **2nd Prize:** 3 lucky winners receive **Rs. 500,000 (5 Lakh PKR)** each\n- **3rd Prize:** 1,696 winners receive **Rs. 9,300** each\n\n### How to Check 750 Prize Bond Draw Results Online\n\n1. **Search Bond Serial Number**: Enter your specific 6-digit prize bond number into our online search tool to check instant matches.\n2. **Download PDF Winner Lists**: Access full official draw result lists published directly following SBP balloting.\n3. **Verify Historical Draw Results**: Look up previous 750 prize bond lists from 2024, 2025, and upcoming 2026 draw schedules.",
    "services": [
      "Prize Bonds",
      "750 Prize Bond Draw Search",
      "Quarterly Draw Schedules",
      "SBP Official Winner List PDF"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing",
      "Instant Online Result Search",
      "Official SBP Draw Schedules"
    ],
    "reviews": [
      {
        "comment": "Excellent platform for checking 750 Prize Bond List 2025 draw results quickly and accurately.",
        "date": "Just now",
        "id": "rev-pb-1",
        "rating": 5,
        "userName": "Tariq Mehmood"
      },
      {
        "userName": "Saima Khan",
        "rating": 5,
        "date": "1 day ago",
        "id": "rev-pb-2",
        "comment": "Very easy to search bond numbers for Rs 750 prize bond. Highly recommended!"
      }
    ],
    "faqs": []
  },
  {
    "id": "biz-orange-line-metro-lahore",
    "slug": "orange-line-metro-station-timing-and-routes",
    "name": "Orange Line Metro Station Timings & Routes",
    "category": "Transport & Logistics",
    "categoryId": "transportation",
    "city": "Lahore",
    "province": "Punjab",
    "rating": 5,
    "reviewCount": 124,
    "verified": true,
    "isClaimed": true,
    "isFeatured": true,
    "status": "approved",
    "phone": "(042) 111-222-627",
    "whatsapp": "9242111222627",
    "email": "info@pma.punjab.gov.pk",
    "website": "https://pma.punjab.gov.pk/",
    "address": "Orange Line Metro Train Corridor, Raiwind Road to Dera Gujran, Lahore, Punjab, Pakistan",
    "coverImage": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=200&q=80",
    "description": "The Orange Line Metro Train Lahore is Pakistan's premier automated rapid transit system, spanning 27.1 kilometers across Lahore with 26 state-of-the-art stations connecting Dera Gujran to Ali Town. Operating under the official management of the Punjab Mass-transit Authority (PMA), the Orange Line provides fast, air-conditioned, reliable, and eco-friendly public transport for hundreds of thousands of daily commuters across Lahore city.\n\n### Orange Line Train Timing & Daily Schedule\nCheck the official **orange line train timing** for seamless daily transit across Lahore:\n- **Daily Operating Hours**: 06:00 AM to 10:00 PM (Monday through Sunday, 7 Days a Week)\n- **Peak Hour Frequency**: Trains arrive every 5 to 7 minutes during morning and evening rush hours.\n- **Off-Peak Frequency**: Trains run every 8 to 10 minutes during regular hours.\n- **Total Journey Duration**: Complete end-to-end trip from Dera Gujran Station to Ali Town Station takes approximately 45 minutes across all 26 stations.\n\n### Complete Orange Line Station List & Route Map\nThe **orange train lahore route** stretches over 27.1 km, consisting of 24.3 km of elevated viaducts and 2.8 km of underground subway tracks with 2 central underground stations (Anarkali Station & GPO Station).\n\nHere is the complete **orange train station list** and **orange line station list** in sequential order from Ali Town to Dera Gujran:\n\n1. **Ali Town Station** - South Terminal (Raiwind Road & Thokar Niaz Baig access)\n2. **Thokar Niaz Baig Station** - Major intercity bus terminal & Motorway M-2 junction\n3. **Canal View Station** - Canal Bank Road, Doctors Hospital & Thokar junction\n4. **Hanjarwal Station** - Multan Road residential & commercial center\n5. **Wahdat Road Station** - Connecting Wahdat Colony, Allama Iqbal Town & Multan Road\n6. **Awan Town Station** - Awan Town commercial market hub\n7. **Sabzazar Station** - Sabzazar Housing Scheme & wholesale vegetable market\n8. **Shahnoor Station (Khatam-e-Nabuwat)** - Shahnoor Studios & Multan Road industrial hub\n9. **Salahuddin Road Station** - Local markets & surrounding residential sectors\n10. **Bund Road Station** - Lahore Ring Road interchange & Multan Road exit\n11. **Samanabad Station** - Samanabad Roundabout & central Lahore residential hub\n12. **Gulshan-e-Ravi Station** - Gulshan-e-Ravi main boulevard & commercial zone\n13. **Chauburji Station** - Historical Chauburji monument & Lower Mall junction\n14. **Anarkali Station (Underground)** - Heritage station connecting Anarkali Bazaar, Old City & Lake Road\n15. **GPO Station (Underground)** - Central business district, Mall Road, General Post Office & High Court\n16. **Lakshmi Station** - Lakshmi Chowk food street & hotel center\n17. **Railway Station** - Connected directly to Lahore Junction Railway Station for intercity train travelers\n18. **Sultanpura Station** - Sultanpura Road & GT Road interchange\n19. **UET (University of Engineering and Technology) Station** - Direct university campus access for students & staff\n20. **Baghbanpura Station** - GT Road commercial corridor & historic Baghbanpura\n21. **Shalamar Garden Station** - UNESCO World Heritage Shalimar Gardens tourist destination\n22. **Pakistan Mint Station** - GT Road industrial area & Mint enclave\n23. **Mahmood Booti Station** - Ring Road interchange & GT Road northern exit\n24. **Salamatpura Station** - Northern GT Road residential sectors\n25. **Islam Park Station** - Islam Park community neighborhood\n26. **Dera Gujran Station** - North Terminal (Main Depot, Stabling Yard & Maintenance Facility)\n\n### Fares, Tickets & Smart Cards\n- **Single Journey Token**: Rs. 20 to Rs. 40 based on distance traveled.\n- **Metro Smart Card**: Contactless rechargeable card available at ticket counters for fast tap-and-go access.\n- **Discounts**: Concessionary fare options for students, senior citizens, and persons with disabilities.\n\n### Key Facilities & Amenities\n- Fully Air-Conditioned Trains & Covered Station Platforms\n- Escalators, Elevators, and Tactile Paths for Differently-Abled Passengers\n- 24/7 CCTV Security Surveillance & Dedicated Metro Police Force\n- Seamless Integration with Lahore Speedo Feeder Bus Network",
    "services": [
      "Daily Passenger Rapid Transit",
      "Orange Line Train Timing Schedules",
      "Orange Line Station List & Route Navigation",
      "Metro Smart Card & Token Ticketing",
      "Feeder Bus Connections Across Lahore",
      "Student & Senior Citizen Discount Passes"
    ],
    "operatingHours": {
      "Monday - Sunday": "06:00 AM - 10:00 PM"
    },
    "features": [
      "26 Modern Stations",
      "Air Conditioned Coaches",
      "Underground & Elevated Track",
      "Wheelchair Accessible",
      "Automated Token & Card Ticketing",
      "24/7 CCTV Security & Police"
    ],
    "reviews": [
      {
        "comment": "The Orange Line Metro is a lifesaver for commuting across Lahore! Fast, clean, affordable, and always on time.",
        "rating": 5,
        "date": "1 day ago",
        "id": "rev-orange-1",
        "userName": "Muhammad Kamran"
      },
      {
        "date": "3 days ago",
        "id": "rev-orange-2",
        "userName": "Usman Ali",
        "comment": "Very convenient route connecting Thokar Niaz Baig all the way to Dera Gujran. Great station facilities.",
        "rating": 5
      }
    ],
    "faqs": [
      {
        "answer": "Orange Line Metro operates daily from 06:00 AM to 10:00 PM, 7 days a week, with trains every 5-7 minutes during peak hours.",
        "question": "What are the orange line train timing hours in Lahore?"
      },
      {
        "answer": "There are 26 stations on the Orange Line Lahore route, starting from Ali Town Station and ending at Dera Gujran Station.",
        "question": "How many stations are in the orange line station list?"
      }
    ]
  },
  {
    "id": "gEtBygWVOCIPsYhXiYYs",
    "slug": "lahore-tech-systems-lahore",
    "name": "Lahore Tech Systems",
    "category": "technology",
    "categoryId": "services",
    "city": "Lahore",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 42 35712345",
    "whatsapp": "+92 321 9876543",
    "email": "info@lahoretech.pk",
    "website": "https://www.lahoretech.pk",
    "address": "45-C, Gulberg III",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Lahore Tech Systems is a premium software development and digital transformation agency in Lahore. We specialize in custom web apps, mobile apps development, cloud deployment, UI/UX design, and SEO services.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "hpMvQHZlUAnuYKLoAyUL",
    "slug": "gujranwala-electrical-machinery-gujranwala",
    "name": "Gujranwala Electrical Machinery",
    "category": "construction",
    "categoryId": "services",
    "city": "Gujranwala",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 55 3841122",
    "whatsapp": "+92 333 8889900",
    "email": "sales@gujranwalamachinery.pk",
    "website": "https://www.listpak.com",
    "address": "G.T. Road Industrial Zone",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Gujranwala Electrical Machinery designs and manufactures heavy-duty electric motors, water pumps, industrial fans, and generators. Certified for performance and energy efficiency across Pakistan.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "l2DGmXU6T5j2TkPJ8p5j",
    "slug": "faisalabad-textile-outlets-faisalabad",
    "name": "Faisalabad Textile Outlets",
    "category": "retail",
    "categoryId": "services",
    "city": "Faisalabad",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 41 8543210",
    "whatsapp": "+92 345 6789012",
    "email": "sales@faisalabadtextile.pk",
    "website": "https://www.listpak.com",
    "address": "D-Ground Commercial Plaza",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Faisalabad Textile Outlets brings you high-quality unstitched lawn, linen, cotton fabrics, and home textiles direct from our industrial mills. Enjoy premium export-quality clothing at wholesale rates.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "qvvoKMMR887MCQ6W8KmG",
    "slug": "peshawar-traditional-chappal-center-peshawar",
    "name": "Peshawar Traditional Chappal Center",
    "category": "retail",
    "categoryId": "services",
    "city": "Peshawar",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 91 2598765",
    "whatsapp": "+92 312 3456789",
    "email": "orders@peshawarichappal.pk",
    "website": "https://www.listpak.com",
    "address": "Khyber Bazaar",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Discover authentic Peshawari Chappals hand-crafted from premium pure leather. Our chappals combine traditional designs with modern comfort. Shipping throughout Pakistan and worldwide.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "rEsdVN2FRZ813XebyOUs",
    "slug": "rawalpindi-realtors-builders-rawalpindi",
    "name": "Rawalpindi Realtors & Builders",
    "category": "real-estate",
    "categoryId": "services",
    "city": "Rawalpindi",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 51 5731122",
    "whatsapp": "+92 300 8556677",
    "email": "deal@pindirealtors.pk",
    "website": "https://www.listpak.com",
    "address": "Phase 4, Bahria Town",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Rawalpindi Realtors & Builders is a trusted real estate consultation agency in Rawalpindi. We assist in buying, selling, and leasing residential plots, commercial properties, and luxury apartments in Bahria Town and DHA.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  },
  {
    "id": "rKDe20jKUZSgUX2aK7wz",
    "slug": "rahber-travels",
    "name": "Rahber Travels",
    "category": "Travel & Tourism",
    "categoryId": "travel",
    "city": "Lahore",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "0307-5553045",
    "whatsapp": "+92-42-37521777",
    "email": "contact@business.pk",
    "website": "https://www.listpak.com",
    "address": "Band Road East, Dholanwal Nagra Town, Lahore, Punjab, Pakistan",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Rahber Travels—frequently referred to as Rehbar Travels, Rahbar Travel, or Rehbar Bus Service—is a long-standing travel operator and passenger transport service provider headquartered in Lahore, Punjab. Operating within Pakistan’s bustling intercity transport sector, the business fulfills dual roles as both a public road transit operator and a regional tourist assistance service. Registered as a verified business entity in Lahore since October 2011, Rahber Travels caters to a broad demographic of daily commuters, family travelers, students, and tourists seeking accessible, budget-conscious road transit across Punjab and neighboring territories. By combining traditional bus line operations with localized travel coordination, the company serves as an essential link in regional mobility.\n\n**Strategic Location & Terminal Infrastructure**\n\nThe operational center and primary terminal facilities for Rahber Travels are situated on Band Road East, located in Dholanwal Nagra Town, Lahore. This location provides significant logistical advantages within the provincial capital's transport grid:\n\n* **Arterial Highway Access:** Band Road is widely recognized as one of Lahore's primary transit arteries, serving as a high-volume corridor for major intercity terminals, cargo depots, and commercial transport hubs.\n* **Seamless Route Connectivity:** Operating from Band Road grants Rahber Travels immediate access to key outbound routes, including the Lahore Ring Road, the M-2 Motorway connecting Lahore to Islamabad, and the Grand Trunk Road (GT Road) leading to northern and southern Punjab.\n* **Multi-Modal Accessibility:** The terminal location enables travelers arriving from various sectors of Lahore to easily access departure points via local taxis, auto-rickshaws, city feeder buses, and rideshare platforms.\n\n\n\nRahber Travels delivers a diverse portfolio of transportation and travel management services designed to accommodate various trip requirements:\n\n* **Intercity Passenger Transport:** Managing scheduled bus departures connecting Lahore with diverse regional towns, secondary commercial hubs, and major provincial cities.\n* **Direct Booking & Ticketing Management:** Offering advance seat reservations, route inquiries, and scheduling updates through dedicated operational contact channels, including landline connections (+92-42-111254333 and +92-42-37521777) and mobile booking lines (0307-5553045).\n* **Tourist Assistance & Local Route Guidance:** Providing travel advisories, regional map directions, connecting transit information, and local destination tips for incoming and outgoing tourists navigating Lahore.\n* **Luggage & Express Terminal Handling:** Facilitating structured baggage check-ins, parcel coordination, and organized boarding procedures at its Band Road terminal.\n\n\n\nPakistan’s road transport ecosystem is highly competitive, dominated by large luxury express fleets and established regional carriers. Rahber Travels operates directly alongside well-known national transport brands, including Faisal Movers, Baloch Transport, Daewoo Express, Niazi Express, and Skyways.\n\nWhile large luxury operators typically focus on high-end luxury coaches connecting major metropolitan centers, Rahber Travels maintains a specialized market niche. It focuses heavily on accessible ticketing, localized transit routes, and flexible departures out of central transport nodes like Band Road. By offering competitive fare structures and maintaining a persistent physical presence in Lahore’s transport district, the company caters to commuters who prioritize direct, economical route options over premium luxury amenities.\n\n\n\nWith over a decade of verified directory presence and persistent brand recognition under names like Rehbar Adda Lahore, Rahber Travels remains an integral player in Lahore's transport economy. Its commitment to maintaining accessible line communication, strategic terminal location, and dependable passenger transit ensures that it continues to support thousands of passengers navigating Punjab’s extensive highway system every year.",
    "services": [
      "Traveling",
      "Tourism"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [
      {
        "userName": "Tariq Mehmood",
        "rating": 5,
        "id": "rev-starter-1-1786075259986",
        "comment": "Excellent service and a very professional team at Rahber Travels. Highly recommended for anyone looking for reliable solutions.",
        "date": "Just now"
      },
      {
        "rating": 5,
        "date": "1 day ago",
        "userName": "Saima Khan",
        "comment": "Great overall experience from start to finish with Rahber Travels. Friendly staff and outstanding customer support.",
        "id": "rev-starter-2-1786075259986"
      },
      {
        "id": "rev-starter-3-1786075259986",
        "userName": "Bilal Ahmed",
        "comment": "Rahber Travels exceeded expectations with quality service, quick response times, and professional communication.",
        "date": "2 days ago",
        "rating": 5
      },
      {
        "comment": "Very satisfied with the experience at Rahber Travels. Everything was handled efficiently and exactly as promised.",
        "date": "3 days ago",
        "rating": 5,
        "userName": "Hamza Sheikh",
        "id": "rev-starter-4-1786075259986"
      },
      {
        "userName": "Zainab Fatima",
        "id": "rev-starter-5-1786075259986",
        "rating": 5,
        "comment": "Highly recommended. The staff at Rahber Travels were knowledgeable, courteous, and delivered excellent service throughout.",
        "date": "4 days ago"
      }
    ],
    "faqs": []
  },
  {
    "id": "y9aedlzMIGoQprjE5W0C",
    "slug": "islamabad-diagnostic-clinic-islamabad",
    "name": "Islamabad Diagnostic Clinic",
    "category": "healthcare",
    "categoryId": "services",
    "city": "Islamabad",
    "province": "Pakistan",
    "rating": 5,
    "reviewCount": 5,
    "verified": true,
    "isClaimed": true,
    "isFeatured": false,
    "status": "approved",
    "phone": "+92 51 2281234",
    "whatsapp": "+92 333 5556677",
    "email": "support@isbclinic.pk",
    "website": "https://www.isbclinic.pk",
    "address": "Sector F-7 Markaz",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    "description": "Islamabad Diagnostic Clinic offers state-of-the-art medical testing, MRI scans, CT scans, blood tests, and outpatient consultancy. Managed by highly qualified medical professionals and pathologists in the federal capital.",
    "services": [
      "Professional Services"
    ],
    "operatingHours": {
      "Monday - Saturday": "09:00 AM - 07:00 PM"
    },
    "features": [
      "Verified Listing"
    ],
    "reviews": [],
    "faqs": []
  }
]

export interface ProfessionalCustomSocialLink {
  platform?: string
  name?: string
  url: string
}

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
  cities?: string[]
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

export interface ProfessionalVerificationPaymentDetails {
  amount: number
  transactionRef?: string
  paymentMethod?: string
  paymentScreenshot?: string
  submittedAt?: string
  reviewedAt?: string
  reviewedBy?: string
  notes?: string
}

export interface ProfessionalVerificationRequest {
  id: string
  professionalProfileId: string
  username: string
  proName: string
  profession: string
  city: string
  avatar?: string
  amount: number
  paymentMethod: string
  paymentReference: string
  paymentScreenshot: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
}

export interface ProfessionalItem {
  id?: string
  userId?: string
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
  gender?: string
  avatar: string
  coverImage?: string
  bio: string
  about?: string
  skills: string[]
  experienceYears: number
  verified: boolean
  isFeatured?: boolean
  
  // Decoupled Status System
  status?: 'pending' | 'approved' | 'rejected' | 'draft'
  profileStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DRAFT'
  verificationStatus?: 'UNVERIFIED' | 'VERIFIED'
  verificationRequestStatus?: 'NOT_REQUESTED' | 'PENDING' | 'APPROVED' | 'REJECTED'
  verificationPaymentDetails?: ProfessionalVerificationPaymentDetails
  
  submittedAt?: string
  approvedAt?: string
  approvedBy?: string
  verifiedAt?: string
  verifiedBy?: string
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
  },
  {
    id: 'pro-unverified-1',
    username: 'bilal-ahmed-dev',
    slug: 'bilal-ahmed-dev',
    name: 'Bilal Ahmed',
    title: 'Junior React & Node.js Developer',
    profession: 'Software Developer',
    category: 'Technology & IT',
    specialization: 'Frontend & API Development',
    city: 'Faisalabad',
    province: 'Punjab',
    country: 'Pakistan',
    address: 'D Ground, Faisalabad, Pakistan',
    rating: 4.8,
    reviewCount: 4,
    hourlyRate: 'PKR 1,800 / hr',
    availability: 'Available for Freelance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    bio: 'Self-motivated frontend engineer with 2 years practical experience building modern responsive dashboards in React, JavaScript, and Tailwind CSS.',
    about: 'Bilal is an energetic frontend engineer from Faisalabad focused on crafting responsive, fast, and accessible user interfaces. Approved by ListPak moderators.',
    skills: ['React', 'JavaScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Git & GitHub', 'REST APIs'],
    experienceYears: 2,
    verified: false,
    isFeatured: false,
    status: 'approved',
    profileStatus: 'APPROVED',
    verificationStatus: 'UNVERIFIED',
    verificationRequestStatus: 'NOT_REQUESTED',
    submittedAt: '2026-08-10T10:00:00.000Z',
    approvedAt: '2026-08-11T12:30:00.000Z',
    approvedBy: 'admin-master',
    phone: '+92 345 7766554',
    email: 'bilal.ahmed@faisalabaddev.pk',
    whatsapp: '923457766554',
    github: 'https://github.com/bilalahmed-dev',
    portfolio: 'https://bilal-dev.vercel.app',
    languages: ['Urdu', 'English', 'Punjabi'],
    education: [
      { degree: 'BS Information Technology', institution: 'University of Agriculture Faisalabad', year: '2024' }
    ]
  },
  {
    id: 'pro-pending-1',
    username: 'dr-imran-ashraf',
    slug: 'dr-imran-ashraf',
    name: 'Dr. Imran Ashraf',
    title: 'Consultant Orthopedic Surgeon',
    profession: 'Doctor',
    category: 'Healthcare & Medical',
    specialization: 'Joint Replacement & Trauma Surgery',
    city: 'Multan',
    province: 'Punjab',
    country: 'Pakistan',
    address: 'Nishtar Road, Multan, Pakistan',
    rating: 5.0,
    reviewCount: 2,
    hourlyRate: 'PKR 2,000 / consult',
    availability: 'Evening Clinic 5 PM - 9 PM',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    bio: 'Orthopedic specialist with 9 years clinical experience in fracture management, arthroscopy, sports injuries, and joint restoration.',
    about: 'Dr. Imran Ashraf has handled thousands of orthopedic trauma and elective joint reconstructive procedures across Nishtar Hospital Multan.',
    skills: ['Orthopedic Surgery', 'Joint Replacement', 'Trauma Management', 'Arthroscopic Surgery', 'Bone Health'],
    experienceYears: 9,
    verified: false,
    isFeatured: false,
    status: 'pending',
    profileStatus: 'PENDING',
    verificationStatus: 'UNVERIFIED',
    verificationRequestStatus: 'NOT_REQUESTED',
    submittedAt: '2026-08-18T14:20:00.000Z',
    phone: '+92 300 8877665',
    email: 'dr.imran.ashraf@orthomultan.pk',
    whatsapp: '923008877665',
    languages: ['Urdu', 'English', 'Saraiki'],
    education: [
      { degree: 'MBBS, FCPS Orthopedics', institution: 'Nishtar Medical University Multan', year: '2016' }
    ]
  }
]

export const MOCK_VERIFICATION_REQUESTS: ProfessionalVerificationRequest[] = [
  {
    id: 'ver-req-1',
    professionalProfileId: 'pro-unverified-1',
    username: 'bilal-ahmed-dev',
    proName: 'Bilal Ahmed',
    profession: 'Software Developer',
    city: 'Faisalabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    amount: 50,
    paymentMethod: 'EasyPaisa (Mashreq Pay)',
    paymentReference: 'EP-9823746192',
    paymentScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    status: 'PENDING',
    submittedAt: '2026-08-19T09:15:00.000Z'
  }
]

export interface ProfessionalInquiry {
  id: string
  proUsername: string
  proName: string
  senderName: string
  senderEmail: string
  senderWhatsApp: string
  message: string
  createdAt: string
  status?: 'new' | 'replied' | 'archived'
}
