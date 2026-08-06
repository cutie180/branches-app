# PakBizBranches - Pakistan Business Directory

A comprehensive business directory platform for Pakistan, built with Next.js, TypeScript, and Firebase. Features include business listings, category-based browsing, city-wise search, admin panel, and more.

## Features

### For Users
- **Business Directory**: Browse businesses by category and location
- **Advanced Search**: Search by business name, category, or city
- **Business Details**: View comprehensive business information with contact details
- **City Coverage**: Businesses listed across major Pakistani cities
- **Category Organization**: 12+ business categories including Restaurants, Real Estate, Technology, Healthcare, and more
- **SEO Optimized**: Meta tags, sitemaps, and structured data for better search visibility

### For Business Owners
- **Free Business Listing**: Add your business for free with instant approval
- **Business Management**: Update business information through admin panel
- **Direct Contact**: Customers can contact directly via phone, WhatsApp, and email
- **Professional Display**: Beautiful business pages with logos and detailed information

### For Administrators
- **Secure Admin Panel**: Firebase authentication with email/password login
- **Business Management**: Approve, edit, or delete business listings
- **Security Features**: 1-hour block for failed login attempts
- **User Management**: Admin role-based access control

## Tech Stack

- **Frontend**: Next.js 16.1.6, React 19, TypeScript
- **Styling**: TailwindCSS 4.2.0, Radix UI components
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Vercel (ready)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (optional for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pakbizbranches.git
   cd pakbizbranches
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase (Optional)**
   - Create a Firebase project at https://console.firebase.google.com
   - Copy your Firebase config to `lib/firebase.ts`
   - Enable Authentication with Email/Password provider
   - Set up Firestore database

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Admin Setup

### Create Admin Users

Run the admin setup script to create admin users:

```bash
npm run setup-admin
```

This will create admin users with the following credentials:
- **Email**: admin@pakbizbranches.online
- **Email**: support@pakbizbranches.online
- **Default Password**: Admin@2026!Secure (change immediately)

### Access Admin Panel

1. Navigate to `/admin`
2. Login with admin credentials
3. Manage businesses, view statistics, and monitor submissions

## Project Structure

```
branches/
|-- app/                    # Next.js app directory
|   |-- [slug]/            # Dynamic business pages
|   |-- admin/             # Admin panel
|   |-- add-business/      # Business submission form
|   |-- categories/        # Category pages
|   |-- cities/           # City pages
|   |-- blog/             # Blog section
|   |-- about/            # About page
|   |-- contact/          # Contact page
|   |-- developer/        # Developer documentation
|   |-- globals.css       # Global styles
|   |-- layout.tsx        # Root layout
|   |-- page.tsx          # Homepage
|-- components/            # Reusable components
|   |-- ui/               # UI components
|   |-- navbar.tsx        # Navigation
|   |-- footer.tsx        # Footer
|   |-- admin-login.tsx   # Admin authentication
|-- lib/                   # Utilities and configurations
|   |-- firebase.ts       # Firebase configuration
|   |-- email-service.ts  # Email service
|   |-- blog-data.ts      # Blog content
|   |-- data.ts           # Static data
|-- scripts/              # Utility scripts
|   |-- create-admin-user.ts  # Admin user creation
|-- public/               # Static assets
|-- .gitignore           # Git ignore rules
|-- README.md            # This file
|-- package.json         # Dependencies
|-- next.config.mjs      # Next.js configuration
|-- tailwind.config.js   # Tailwind configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup-admin` - Create admin users

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration (optional - defaults work for development)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Business Categories

The platform supports 12+ business categories:
- Restaurants & Food
- Real Estate
- Technology
- Healthcare
- Education
- Retail
- Construction
- Automotive
- Finance
- Travel & Tourism
- Beauty & Wellness
- Logistics & Transportation

## Cities Covered

Major Pakistani cities including:
- Karachi, Lahore, Islamabad
- Rawalpindi, Faisalabad, Multan
- Peshawar, Quetta, Gujranwala
- And 190+ more cities

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## Security Features

- **Firebase Authentication**: Secure admin login with email/password
- **Failed Login Protection**: 1-hour block after 3 failed attempts
- **Input Validation**: Form validation with Zod schemas
- **XSS Protection**: Built-in Next.js security features
- **CSRF Protection**: Next.js CSRF middleware

## SEO & Performance

- **Static Generation**: Pre-built pages for better performance
- **Meta Tags**: Optimized meta tags for all pages
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine friendly
- **Structured Data**: JSON-LD for business listings
- **Image Optimization**: Next.js Image component

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Email: support@pakbizbranches.online
- Website: [https://www.listpak.com](https://www.listpak.com)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Powered by [Firebase](https://firebase.google.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**PakBizBranches** - Connecting Businesses Across Pakistan
