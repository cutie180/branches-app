import fs from 'fs';

// =========================================================================
// 1. UPDATE lib/blog-data.ts
// =========================================================================
const blogDataPath = './lib/blog-data.ts';
let blogData = fs.readFileSync(blogDataPath, 'utf8');

// Retitle restaurants-in-pakistan
blogData = blogData.replace(
  `  'restaurants-in-pakistan': {
    slug: 'restaurants-in-pakistan',
    title: 'Restaurants in Pakistan 2026: Food, Cuisines & Places to Eat',
    metaTitle: 'Restaurants in Pakistan 2026: Best Food, Cuisines & Places to Eat',
    metaDescription: 'Explore restaurants in Pakistan by city, cuisine, budget and occasion. Learn how to find family restaurants, fine dining, affordable food and local places to eat.',`,
  `  'restaurants-in-pakistan': {
    slug: 'restaurants-in-pakistan',
    title: '25 Best Restaurants in Pakistan 2026 – Karachi, Lahore & Islamabad',
    metaTitle: '25 Best Restaurants in Pakistan 2026 – Karachi, Lahore & Islamabad',
    metaDescription: 'Pakistan\\'s best restaurants in 2026 across Karachi, Lahore & Islamabad — top picks by cuisine, area & budget, with contact details.',`
);

// Retitle best-universities-computer-science-pakistan
blogData = blogData.replace(
  `  'best-universities-computer-science-pakistan': {
    slug: 'best-universities-computer-science-pakistan',
    title: 'Best Universities for Computer Science, IT & Software Engineering in Pakistan',
    metaTitle: 'Best Universities for Computer Science in Pakistan 2026: CS, IT & Software Engineering',
    metaDescription: 'Compare universities for Computer Science, IT and Software Engineering in Pakistan. Learn what to check for programs, accreditation, admissions, fees, facilities and careers.',`,
  `  'best-universities-computer-science-pakistan': {
    slug: 'best-universities-computer-science-pakistan',
    title: 'Best Universities for Computer Science in Pakistan 2026 – Top 12 Ranked',
    metaTitle: 'Best Universities for Computer Science in Pakistan 2026 – Top 12 Ranked',
    metaDescription: 'Top universities for BS Computer Science in Pakistan 2026: NUST, FAST-NUCES, LUMS, COMSATS & more — fees, merit, cities & admission details compared.',`
);

// Retitle best-software-houses-pakistan-2026
blogData = blogData.replace(
  `  'best-software-houses-pakistan-2026': {
    slug: 'best-software-houses-pakistan-2026',
    title: 'Best Software Houses in Pakistan 2026: How to Compare IT Companies',
    metaTitle: 'Best Software Houses in Pakistan 2026: Compare IT Companies',
    metaDescription: 'Compare software houses and IT companies in Pakistan by services, city, technology, industries, careers, and evidence instead of relying on generic rankings.',`,
  `  'best-software-houses-pakistan-2026': {
    slug: 'best-software-houses-pakistan-2026',
    title: 'Top 15 Software Houses in Pakistan 2026 – Ranked by Clients & Reviews',
    metaTitle: 'Top 15 Software Houses in Pakistan 2026 – Ranked by Clients & Reviews',
    metaDescription: 'Pakistan\\'s top software houses in 2026: Systems Limited, Arbisoft, Netsol, 10Pearls & more. Services, locations & contact details — compare and hire.',`
);

// Retitle how-to-find-jobs-in-pakistan-2026
blogData = blogData.replace(
  `  'how-to-find-jobs-in-pakistan-2026': {
    slug: 'how-to-find-jobs-in-pakistan-2026',
    title: 'How to Find Jobs in Pakistan in 2026: A Practical Search Guide',
    metaTitle: 'How to Find Jobs in Pakistan in 2026: Practical Search Guide',
    metaDescription: 'Learn how to find and verify government, private, remote, internship, and city-based jobs in Pakistan with a practical application system.',`,
  `  'how-to-find-jobs-in-pakistan-2026': {
    slug: 'how-to-find-jobs-in-pakistan-2026',
    title: 'How to Find Jobs in Pakistan 2026 – Step-by-Step Guide (Free)',
    metaTitle: 'How to Find Jobs in Pakistan 2026 – Step-by-Step Guide (Free)',
    metaDescription: 'Find jobs in Pakistan in 2026: where to search, how to apply, fresher tips & the latest Karachi, Lahore & Islamabad vacancies on ListPak Jobs.',`
);

// Retitle top-business-directory-websites-pakistan
blogData = blogData.replace(
  `  'top-business-directory-websites-pakistan': {
    slug: 'top-business-directory-websites-pakistan',
    title: 'Top Business Directory Websites in Pakistan: Citations & Free Listings',
    metaTitle: 'Top Business Directory Websites in Pakistan: Citations & Free Listings',
    metaDescription: 'Learn how business directories help Pakistani businesses build Google visibility, improve local SEO, and earn trusted customer citations.',`,
  `  'top-business-directory-websites-pakistan': {
    slug: 'top-business-directory-websites-pakistan',
    title: 'Top Business Directories in Pakistan Compared (2026 Guide)',
    metaTitle: 'Top Business Directories in Pakistan Compared (2026 Guide)',
    metaDescription: 'Compare the top online business directories in Pakistan in 2026. Discover how to list your company on ListPak and build high-authority local citations.',`
);

// Ensure best-universities-computer-science-pakistan has content link
blogData = blogData.replace(
  `    category: 'CS & Tech Education',
    date: 'August 13, 2026',
    readTime: '16 min read',
    excerpt: 'Compare universities for Computer Science, IT and Software Engineering in Pakistan. Learn what to check for programs, accreditation, admissions, fees, facilities and careers.',
    faqs: [`,
  `    category: 'CS & Tech Education',
    date: 'August 13, 2026',
    dateModified: 'October 20, 2026',
    readTime: '16 min read',
    excerpt: 'Top universities for BS Computer Science in Pakistan 2026: NUST, FAST-NUCES, LUMS, COMSATS & more — fees, merit, cities & admission details compared.',
    content: NEW_BLOG_CONTENT['best-universities-computer-science-pakistan'],
    relatedSlugs: ['best-software-houses-pakistan-2026', 'it-jobs-in-pakistan', 'jobs-in-pakistan'],
    faqs: [`
);

// Check if new posts exist, if not append before closing brace of BLOG_POSTS
const newBlogDataEntries = `
  'restaurants-in-lahore': {
    slug: 'restaurants-in-lahore',
    title: '15 Best Restaurants in Lahore 2026 – Food Street to MM Alam Road',
    metaTitle: '15 Best Restaurants in Lahore 2026 – Food Street to MM Alam Road',
    metaDescription: 'The best restaurants in Lahore in 2026: Monal, Salt\\'n Pepper, Food Street favourites & rooftop spots — cuisines, locations & contact numbers.',
    focusKeyword: 'Restaurants in Lahore',
    category: 'Lahore Food Guide',
    date: 'October 20, 2026',
    dateModified: 'October 20, 2026',
    readTime: '14 min read',
    excerpt: 'The best restaurants in Lahore in 2026: Monal, Salt\\'n Pepper, Food Street favourites & rooftop spots — cuisines, locations & contact numbers.',
    authorName: 'ListPak Editorial Team',
    authorUrl: 'https://www.listpak.com/about/',
    content: NEW_BLOG_CONTENT['restaurants-in-lahore'],
    relatedSlugs: ['restaurants-in-karachi', 'restaurants-in-pakistan', 'businesses-in-lahore-by-category'],
    faqs: [
      {
        question: 'What are the top must-visit restaurants in Lahore for tourists?',
        answer: 'Monal Lahore, Haveli Restaurant at Fort Road Food Street, Salt\\'n Pepper Village, Andaaz Restaurant, and Butt Karahi Lakshmi Chowk are famous for traditional Lahori taste and views.'
      },
      {
        question: 'Where can I find upscale fine dining restaurants in Lahore?',
        answer: 'MM Alam Road and Gulberg offer upscale dining including Café Aylanto, Cosa Nostra, Arcadian Café, and Fujiyama at Avari.'
      },
      {
        question: 'What is the average food cost per person in Lahore?',
        answer: 'Street food and traditional joints cost PKR 500–1,200 per head. Casual family dining ranges from PKR 1,500–3,000, and luxury fine dining ranges from PKR 3,500–7,000 per person.'
      },
      {
        question: 'How can a Lahore restaurant owner get listed on ListPak?',
        answer: 'Restaurant managers can create a free verified listing on ListPak by clicking \\'Add Business\\', providing menu links, address, phone number, and branch timings.'
      }
    ]
  },
  'best-solar-companies-pakistan': {
    slug: 'best-solar-companies-pakistan',
    title: 'Top 10 Solar Companies in Pakistan 2026 – Prices, Panels & Installers',
    metaTitle: 'Top 10 Solar Companies in Pakistan 2026 – Prices, Panels & Installers',
    metaDescription: 'Best solar companies in Pakistan 2026: compare installers in Karachi, Lahore & Islamabad — panel prices, net metering & contact details.',
    focusKeyword: 'Solar Companies in Pakistan',
    category: 'Solar Energy & Technology',
    date: 'October 20, 2026',
    dateModified: 'October 20, 2026',
    readTime: '15 min read',
    excerpt: 'Best solar companies in Pakistan 2026: compare installers in Karachi, Lahore & Islamabad — panel prices, net metering & contact details.',
    authorName: 'ListPak Editorial Team',
    authorUrl: 'https://www.listpak.com/about/',
    content: NEW_BLOG_CONTENT['best-solar-companies-pakistan'],
    relatedSlugs: ['best-software-houses-pakistan-2026', 'top-business-directory-websites-pakistan'],
    faqs: [
      {
        question: 'Which are the best solar installation companies in Pakistan?',
        answer: 'Top recognized solar providers include ZN Solar Energy, Reon Energy, SkyElectric, Premier Energy, Alpha Solar, Inverex, and Pantera Energy.'
      },
      {
        question: 'What is the current cost of a 10kW on-grid solar system in Pakistan?',
        answer: 'In 2026, a Tier-1 10kW on-grid solar setup with net metering generally costs between PKR 1,150,000 to PKR 1,450,000 depending on panel tier (Longi/Jinko) and inverter brand.'
      },
      {
        question: 'How long does NEPRA net metering approval take?',
        answer: 'Net metering processing through DISCOs (LESCO, K-Electric, IESCO) typically requires 4 to 8 weeks from initial green-meter application to bidirectional meter installation.'
      },
      {
        question: 'Can commercial solar businesses list their services on ListPak?',
        answer: 'Yes, solar engineering, procurement, and construction (EPC) companies can list on ListPak under Solar Energy to receive local residential and industrial inquiries.'
      }
    ]
  },
  'best-free-business-listing-websites-pakistan-2026': {
    slug: 'best-free-business-listing-websites-pakistan-2026',
    title: '12 Best Free Business Listing Sites in Pakistan 2026 (ListPak Ranked #1)',
    metaTitle: '12 Best Free Business Listing Sites in Pakistan 2026 (ListPak Ranked #1)',
    metaDescription: 'Free business listing sites in Pakistan that actually get you Google visibility in 2026 — features, traffic & how to list on each. Start with ListPak.',
    focusKeyword: 'Free Business Listing Sites in Pakistan',
    category: 'Local SEO & Growth',
    date: 'October 20, 2026',
    dateModified: 'October 20, 2026',
    readTime: '15 min read',
    excerpt: 'Free business listing sites in Pakistan that actually get you Google visibility in 2026 — features, traffic & how to list on each. Start with ListPak.',
    authorName: 'ListPak Editorial Team',
    authorUrl: 'https://www.listpak.com/about/',
    content: NEW_BLOG_CONTENT['best-free-business-listing-websites-pakistan-2026'],
    relatedSlugs: ['top-business-directory-websites-pakistan', 'how-to-list-business-free-listpak-guide'],
    faqs: [
      {
        question: 'Why is ListPak ranked #1 for free business listings in Pakistan?',
        answer: 'ListPak provides free instant business publishing, verified badge reviews, rich JSON-LD schema (LocalBusiness) for Google rich results, WhatsApp lead integration, and zero mandatory subscription fees.'
      },
      {
        question: 'Do free business listings help my Google search ranking in Pakistan?',
        answer: 'Yes. High-quality local citations provide NAP (Name, Address, Phone) consistency and trusted backlinks that help your business rank in Google Local Packs and Maps.'
      },
      {
        question: 'What details do I need to submit a business listing?',
        answer: 'You need your legal business name, category, complete street address, phone/WhatsApp number, website or social link, working hours, and a clear description of your services.'
      },
      {
        question: 'Are there hidden charges when listing on ListPak?',
        answer: 'No. Standard business listings on ListPak are 100% free with no hidden renewal charges or required monthly commitments.'
      }
    ]
  },
  'best-banks-in-pakistan': {
    slug: 'best-banks-in-pakistan',
    title: 'Top 10 Banks in Pakistan 2026 – Best for Accounts, Loans & Digital Banking',
    metaTitle: 'Top 10 Banks in Pakistan 2026 – Best for Accounts, Loans & Digital Banking',
    metaDescription: 'Pakistan\\'s best banks in 2026 ranked: Meezan, HBL, UBL, MCB, Allied & more — account types, digital banking, branches & contact details.',
    focusKeyword: 'Best Banks in Pakistan',
    category: 'Finance & Banking',
    date: 'October 20, 2026',
    dateModified: 'October 20, 2026',
    readTime: '15 min read',
    excerpt: 'Pakistan\\'s best banks in 2026 ranked: Meezan, HBL, UBL, MCB, Allied & more — account types, digital banking, branches & contact details.',
    authorName: 'ListPak Editorial Team',
    authorUrl: 'https://www.listpak.com/about/',
    content: NEW_BLOG_CONTENT['best-banks-in-pakistan'],
    relatedSlugs: ['best-software-houses-pakistan-2026', 'jobs-in-pakistan'],
    faqs: [
      {
        question: 'Which is the best bank in Pakistan for digital banking apps?',
        answer: 'HBL Mobile, Meezan Bank Mobile, and Bank Alfalah Alfa app are rated among the highest for reliability, Raast instant transfers, bill payments, and biometric login.'
      },
      {
        question: 'Which is the top Islamic bank in Pakistan?',
        answer: 'Meezan Bank is the largest Islamic commercial bank in Pakistan, offering Shariah-compliant retail accounts, car Ijarah, and home financing with over 1,000 branches nationwide.'
      },
      {
        question: 'What documents are required to open a digital bank account in Pakistan?',
        answer: 'A valid CNIC / Smart NIC, proof of income or student ID, mobile number registered under your own CNIC, and biometric face verification via app.'
      },
      {
        question: 'Which bank has the largest branch network in Pakistan?',
        answer: 'Habib Bank Limited (HBL) and National Bank of Pakistan (NBP) operate the largest physical branch and ATM networks, reaching nearly every district nationwide.'
      }
    ]
  }
`;

if (!blogData.includes("'restaurants-in-lahore':")) {
  blogData = blogData.replace(/\n\}\s*$/, `${newBlogDataEntries}\n}\n`);
}

fs.writeFileSync(blogDataPath, blogData, 'utf8');
console.log('Successfully updated lib/blog-data.ts with Phase 3 blog entries.');
