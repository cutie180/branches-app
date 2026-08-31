import React from 'react'
import Link from 'next/link'
import { Compass, Building2, Briefcase, MapPin, Users, Grid, BookOpen, ArrowRight } from 'lucide-react'

export default function ExplorePakistanLinks() {
  const exploreLinks = [
    {
      title: 'Pakistan Business Directory',
      description: 'Search verified companies, manufacturers, local services, and shops across Pakistan.',
      href: '/search',
      icon: Building2,
      color: 'text-blue-600 bg-blue-50 border-blue-200/60',
    },
    {
      title: 'Jobs in Pakistan',
      description: 'Find active job openings, careers, and corporate vacancies in Lahore, Karachi, Islamabad.',
      href: '/jobs',
      icon: Briefcase,
      badge: 'Hiring',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
    },
    {
      title: 'Pakistani Cities Directory',
      description: 'Discover local businesses, services, and community resources across 150+ Pakistani cities.',
      href: '/cities',
      icon: MapPin,
      color: 'text-amber-600 bg-amber-50 border-amber-200/60',
    },
    {
      title: 'Pakistani Professionals',
      description: 'Connect with verified Pakistani doctors, engineers, legal consultants, and IT experts.',
      href: '/professionals',
      icon: Users,
      color: 'text-purple-600 bg-purple-50 border-purple-200/60',
    },
    {
      title: 'Business Categories',
      description: 'Browse commercial sectors from real estate, health, and IT to food, education, and transport.',
      href: '/categories',
      icon: Grid,
      color: 'text-sky-600 bg-sky-50 border-sky-200/60',
    },
    {
      title: 'Pakistan Business Blog',
      description: 'Read the latest guides, market trends, business insights, and commercial updates.',
      href: '/blog',
      icon: BookOpen,
      color: 'text-rose-600 bg-rose-50 border-rose-200/60',
    },
  ]

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>ListPak Ecosystem</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Explore Pakistan Directory & Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover companies, employment opportunities, verified professionals, and economic hubs.
          </p>
        </div>
      </div>

      {/* Grid of Verified Existing Routes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exploreLinks.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.title}
              href={item.href}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-blue-50/50 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {item.badge ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      {item.badge}
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>
                
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>View {item.title.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}
