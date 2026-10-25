'use client'

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react'
import { excerpt } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Image from 'next/image'
import SearchFilters from '@/components/search/search-filters'
import { MOCK_BUSINESSES, MOCK_JOBS, MOCK_PROFESSIONALS, ProfessionalItem, BusinessItem } from '@/lib/data'
import { getAllBusinesses, normalizeSlug } from '@/lib/db-service'
import { getAllProfessionals } from '@/lib/professional-service'
import { getPublicJobPath } from '@/lib/job-url'
import Link from 'next/link'
import { Search, MapPin, Building2, Briefcase, Users, ShieldCheck, Star, ArrowRight, Grid, List, CheckCircle2, Filter, RotateCw } from 'lucide-react'

const BIZ_CACHE_KEY = 'listpak_approved_businesses_cache_v2'
const BIZ_CACHE_TIMESTAMP_KEY = 'listpak_approved_businesses_ts_v2'
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCity = searchParams.get('city') || ''
  const initialCategory = searchParams.get('category') || ''
  const initialTab = (searchParams.get('type') as 'businesses' | 'jobs' | 'professionals') || 'businesses'

  const [activeTab, setActiveTab] = useState<'businesses' | 'jobs' | 'professionals'>(initialTab)
  const [query, setQuery] = useState(initialQuery)
  const [selectedCity, setSelectedCity] = useState(initialCity)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [onlyVerified, setOnlyVerified] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  // Data states
  const [businessesList, setBusinessesList] = useState<BusinessItem[]>(MOCK_BUSINESSES)
  const [professionalsList, setProfessionalsList] = useState<ProfessionalItem[]>(MOCK_PROFESSIONALS)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatusText, setSyncStatusText] = useState<string>('')

  // Sync approved businesses from Firestore / DB with 7-day client cache
  const syncBusinesses = useCallback(async (force: boolean = false) => {
    try {
      setIsSyncing(true)
      const data = await getAllBusinesses(false)
      if (data && data.length > 0) {
        setBusinessesList(data)
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(BIZ_CACHE_KEY, JSON.stringify(data))
            localStorage.setItem(BIZ_CACHE_TIMESTAMP_KEY, Date.now().toString())
            setSyncStatusText('Updated just now')
          } catch (_) {}
        }
      }
    } catch (err) {
      console.warn('Could not sync businesses from database:', err)
    } finally {
      setIsSyncing(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const rawCached = localStorage.getItem(BIZ_CACHE_KEY)
      const rawTs = localStorage.getItem(BIZ_CACHE_TIMESTAMP_KEY)
      const now = Date.now()
      const ts = rawTs ? parseInt(rawTs, 10) : 0
      const isCacheValid = rawCached && ts && (now - ts < SEVEN_DAYS_MS)

      if (rawCached) {
        const parsed = JSON.parse(rawCached)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBusinessesList(parsed)
          const daysAgo = Math.floor((now - ts) / (24 * 60 * 60 * 1000))
          setSyncStatusText(daysAgo === 0 ? '7-day cache • Today' : `7-day cache • ${daysAgo}d ago`)
        }
      }

      // If cache is missing or older than 7 days, refresh from database
      if (!isCacheValid) {
        syncBusinesses(false)
      }
    } catch (_) {
      syncBusinesses(false)
    }
  }, [syncBusinesses])

  // Load professionals
  useEffect(() => {
    async function loadPros() {
      try {
        const data = await getAllProfessionals(false)
        if (data && data.length > 0) {
          setProfessionalsList(data)
        }
      } catch (err) {
        // fallback to mock
      }
    }
    loadPros()
  }, [])

  // Filtered Businesses with Character & Word Token Matching across all fields
  const filteredBusinesses = useMemo(() => {
    const rawQ = (query || '').trim().toLowerCase()
    const queryTokens = rawQ ? rawQ.split(/\s+/).filter(Boolean) : []

    return businessesList.filter(biz => {
      // 1. Character & Multi-Token Matching
      if (queryTokens.length > 0) {
        const name = (biz.name || '').toLowerCase()
        const desc = (biz.description || '').toLowerCase()
        const cat = (biz.category || '').toLowerCase()
        const catId = (biz.categoryId || '').toLowerCase()
        const subCats = Array.isArray(biz.secondaryCategories) ? biz.secondaryCategories.join(' ').toLowerCase() : ''
        const city = (biz.city || '').toLowerCase()
        const cities = Array.isArray(biz.cities) ? biz.cities.join(' ').toLowerCase() : ''
        const addr = (biz.address || '').toLowerCase()
        const locs = Array.isArray(biz.locations)
          ? biz.locations.map(l => `${l.city} ${l.address || ''}`).join(' ').toLowerCase()
          : ''
        const services = Array.isArray(biz.services) ? biz.services.join(' ').toLowerCase() : ''
        const features = Array.isArray(biz.features) ? biz.features.join(' ').toLowerCase() : ''
        const owner = (biz.ownerName || '').toLowerCase()
        const slug = (biz.slug || '').toLowerCase()

        const searchableBlob = `${name} ${cat} ${catId} ${subCats} ${city} ${cities} ${addr} ${locs} ${services} ${features} ${owner} ${slug} ${desc}`

        // Ensure every search character/word token is present in the searchable blob
        const matchesAllTokens = queryTokens.every(token => searchableBlob.includes(token))
        if (!matchesAllTokens) return false
      }

      // 2. City Filter
      if (selectedCity) {
        const selCity = selectedCity.toLowerCase()
        const cityMatch =
          biz.city?.toLowerCase() === selCity ||
          (biz.cities && biz.cities.some(c => c.toLowerCase() === selCity)) ||
          (biz.locations && biz.locations.some(l => l.city?.toLowerCase() === selCity))
        if (!cityMatch) return false
      }

      // 3. Category Filter
      if (selectedCategory) {
        const selCat = selectedCategory.toLowerCase()
        const catMatch =
          biz.category?.toLowerCase().includes(selCat) ||
          biz.categoryId?.toLowerCase() === selCat ||
          (biz.secondaryCategories && biz.secondaryCategories.some(c => c.toLowerCase().includes(selCat)))
        if (!catMatch) return false
      }

      // 4. Verified Filter
      if (onlyVerified && !biz.verified) {
        return false
      }

      // 5. Rating Filter
      if ((biz.rating || 0) < minRating) {
        return false
      }

      return true
    })
  }, [query, selectedCity, selectedCategory, onlyVerified, minRating, businessesList])

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesQuery = !query || 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())

      const matchesCity = !selectedCity || 
        job.city.toLowerCase().includes(selectedCity.toLowerCase()) || 
        (job.cities && job.cities.some(c => c.toLowerCase() === selectedCity.toLowerCase()))
      const matchesCategory = !selectedCategory || job.category.toLowerCase().includes(selectedCategory.toLowerCase())

      return matchesQuery && matchesCity && matchesCategory
    })
  }, [query, selectedCity, selectedCategory])

  // Filtered Professionals
  const filteredProfessionals = useMemo(() => {
    return professionalsList.filter(pro => {
      const matchesQuery = !query || 
        pro.name.toLowerCase().includes(query.toLowerCase()) ||
        pro.title.toLowerCase().includes(query.toLowerCase()) ||
        pro.profession.toLowerCase().includes(query.toLowerCase()) ||
        pro.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))

      const matchesCity = !selectedCity || pro.city.toLowerCase() === selectedCity.toLowerCase()
      const matchesCategory = !selectedCategory || pro.category.toLowerCase().includes(selectedCategory.toLowerCase())
      const matchesVerified = !onlyVerified || pro.verified
      const matchesRating = pro.rating >= minRating

      return matchesQuery && matchesCity && matchesCategory && matchesVerified && matchesRating
    })
  }, [query, selectedCity, selectedCategory, onlyVerified, minRating, professionalsList])

  const handleReset = () => {
    setQuery('')
    setSelectedCity('')
    setSelectedCategory('')
    setOnlyVerified(false)
    setMinRating(0)
  }

  const currentCount = 
    activeTab === 'businesses' ? filteredBusinesses.length :
    activeTab === 'jobs' ? filteredJobs.length : filteredProfessionals.length

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* Top Search Hero Header */}
      <section className="bg-[#0F172A] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Enterprise Search & Discovery
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Explore approved businesses, active job openings, and expert professionals across Pakistan.
              </p>
            </div>

            {/* View Switcher & Sync Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => syncBusinesses(true)}
                disabled={isSyncing}
                title="Refresh listings from database"
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-400' : ''}`} />
                <span className="hidden sm:inline">{isSyncing ? 'Updating...' : 'Sync Listings'}</span>
              </button>

              <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Search Box Input */}
          <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-xl border border-slate-200/80 flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/60">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search business name, character, service, job title, or keyword..."
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold px-2 py-1 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="lg:hidden flex-1 px-4 py-3 bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Filter className="w-4 h-4" />
                <span>Filter Options</span>
              </button>
            </div>
          </div>

          {/* Search Tabs & Cache Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pt-2">
            <div className="flex items-center gap-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab('businesses')}
                className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors shrink-0 cursor-pointer ${
                  activeTab === 'businesses'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Businesses</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {filteredBusinesses.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('jobs')}
                className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors shrink-0 cursor-pointer ${
                  activeTab === 'jobs'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Job Openings</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {filteredJobs.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('professionals')}
                className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors shrink-0 cursor-pointer ${
                  activeTab === 'professionals'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Professionals</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {filteredProfessionals.length}
                </span>
              </button>
            </div>

            {syncStatusText && (
              <span className="text-[11px] text-slate-400 font-medium pb-2 sm:pb-3 shrink-0">
                {syncStatusText}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Search Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filter Sidebar */}
          <div className={`lg:block ${showMobileFilter ? 'block' : 'hidden'}`}>
            <SearchFilters
              selectedCity={selectedCity}
              selectedCategory={selectedCategory}
              onlyVerified={onlyVerified}
              minRating={minRating}
              onCityChange={setSelectedCity}
              onCategoryChange={setSelectedCategory}
              onVerifiedChange={setOnlyVerified}
              onRatingChange={setMinRating}
              onReset={handleReset}
              totalCount={currentCount}
            />
          </div>

          {/* Results Grid / List */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Active Pill Tags */}
            {(selectedCity || selectedCategory || onlyVerified || minRating > 0 || query) && (
              <div className="flex items-center gap-2 flex-wrap text-xs bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-500">Active Filters:</span>
                {query && <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-200">Search: &quot;{query}&quot;</span>}
                {selectedCity && <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">City: {selectedCity}</span>}
                {selectedCategory && <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold border border-purple-200">Category: {selectedCategory}</span>}
                {onlyVerified && <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold border border-amber-200">Verified Only</span>}
                {minRating > 0 && <span className="px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-700 font-semibold border border-yellow-200">{minRating}+ Stars</span>}
              </div>
            )}

            {/* TAB 1: BUSINESSES */}
            {activeTab === 'businesses' && (
              filteredBusinesses.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No businesses match your search filters</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Try searching with different characters, business names, services, or clear your filters to explore all Pakistani businesses.
                  </p>
                  <button onClick={handleReset} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer">
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
                  {filteredBusinesses.map((biz) => {
                    const itemSlug = biz.slug || normalizeSlug(biz.name || 'business')
                    const logoUrl = biz.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'
                    const branchCount = biz.locations && biz.locations.length > 1 
                      ? biz.locations.length - 1 
                      : (biz.cities && biz.cities.length > 1 ? biz.cities.length - 1 : 0)

                    return (
                      <div key={biz.id || itemSlug} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Image 
                                src={logoUrl} 
                                alt={biz.name} 
                                width={48} 
                                height={48} 
                                loading="lazy" 
                                sizes="48px" 
                                className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0" 
                              />
                              <div>
                                <Link 
                                  href={`/business/${itemSlug}`} 
                                  className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors flex items-center gap-1.5"
                                >
                                  <span>{biz.name}</span>
                                  {biz.verified && (
                                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                  )}
                                </Link>
                                <p className="text-xs text-slate-500 font-medium">{biz.category}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg text-amber-700 text-xs font-bold shrink-0">
                              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                              <span>{biz.rating && biz.rating > 0 ? biz.rating : '4.8'}</span>
                              <span className="text-slate-400 font-normal">({biz.reviewCount || (biz.reviews ? biz.reviews.length : 0)})</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {excerpt(biz.description, 180)}
                          </p>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">
                              {biz.address || biz.city}
                              {branchCount > 0 ? ` (+${branchCount} branches)` : ''}
                            </span>
                          </div>

                          {biz.services && biz.services.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap pt-1">
                              {biz.services.slice(0, 3).map((service, idx) => (
                                <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60 truncate max-w-[140px]">
                                  {service}
                                </span>
                              ))}
                              {biz.services.length > 3 && (
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  +{biz.services.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Open Verified</span>
                          </div>

                          <Link
                            href={`/business/${itemSlug}`}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
                          >
                            <span>View Business</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            )}

            {/* TAB 2: JOBS */}
            {activeTab === 'jobs' && (
              filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No job openings found</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Try adjusting your title or city parameters to discover available job opportunities in Pakistan.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {job.type}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{job.postedDate}</span>
                        </div>
                        <Link href={getPublicJobPath(job)} className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors block">
                          {job.title}
                        </Link>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="font-medium text-slate-700">{job.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.city}</span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-600">{job.salary}</span>
                        </div>
                      </div>

                      <Link
                        href={getPublicJobPath(job)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                      >
                        Apply Now
                      </Link>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* TAB 3: PROFESSIONALS */}
            {activeTab === 'professionals' && (
              filteredProfessionals.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No verified professionals match query</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Try searching for different skills like Next.js, Marketing, CA, or Medical.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProfessionals.map((pro) => (
                    <div key={pro.username} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Image src={pro.avatar} alt={pro.name} width={56} height={56} loading="lazy" sizes="56px" className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                          <div>
                            <Link href={`/professionals/${pro.username}`} className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors flex items-center gap-1.5">
                              <span>{pro.name}</span>
                              {pro.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                            </Link>
                            <p className="text-xs text-slate-500 font-medium">{pro.title}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{pro.city}</span>
                              <span>•</span>
                              <span className="font-bold text-amber-600">★ {pro.rating}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {pro.bio}
                        </p>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          {pro.skills.map((skill) => (
                            <span key={skill} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900">{pro.hourlyRate}</span>
                        <Link
                          href={`/professionals/${pro.username}`}
                          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <span>View Talent Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
