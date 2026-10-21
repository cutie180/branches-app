import sitemap from '../app/sitemap'

async function run() {
  console.log('Generating sitemap entries...')
  const entries = await sitemap()
  console.log(`Total sitemap entries: ${entries.length}`)

  const now = new Date()
  const todayStr = now.toISOString().slice(0, 10)

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().slice(0, 10)

  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const dateDistribution: Record<string, number> = {}
  let todayCount = 0
  let yesterdayCount = 0
  let olderThan7DaysCount = 0
  let futureCount = 0

  for (const entry of entries) {
    const d = new Date(entry.lastModified as any)
    const dStr = d.toISOString().slice(0, 10)
    dateDistribution[dStr] = (dateDistribution[dStr] || 0) + 1

    if (dStr === todayStr) {
      todayCount++
    } else if (dStr === yesterdayStr) {
      yesterdayCount++
    }

    if (d.getTime() < sevenDaysAgo.getTime()) {
      olderThan7DaysCount++
      console.error(`ERROR: URL ${entry.url} has lastmod older than 7 days: ${dStr}`)
    }
    if (d.getTime() > now.getTime() + 1000) {
      futureCount++
      console.error(`ERROR: URL ${entry.url} has lastmod in future: ${dStr}`)
    }
  }

  console.log('\n--- Date Distribution in Sitemap ---')
  const sortedDates = Object.keys(dateDistribution).sort().reverse()
  for (const d of sortedDates) {
    const isToday = d === todayStr ? ' (TODAY)' : ''
    const isYesterday = d === yesterdayStr ? ' (YESTERDAY)' : ''
    console.log(`  ${d}: ${dateDistribution[d]} URLs${isToday}${isYesterday}`)
  }

  console.log('\n--- Verification Summary ---')
  console.log(`Total URLs: ${entries.length}`)
  console.log(`URLs showing Today: ${todayCount}`)
  console.log(`URLs showing Yesterday: ${yesterdayCount}`)
  console.log(`URLs older than 7 days: ${olderThan7DaysCount}`)
  console.log(`URLs in the future: ${futureCount}`)

  if (todayCount === 0) {
    console.error('FAIL: No URLs showing today!')
    process.exit(1)
  }
  if (yesterdayCount === 0) {
    console.error('FAIL: No URLs showing yesterday!')
    process.exit(1)
  }
  if (olderThan7DaysCount > 0) {
    console.error('FAIL: Found URLs older than 7 days!')
    process.exit(1)
  }
  if (futureCount > 0) {
    console.error('FAIL: Found URLs in the future!')
    process.exit(1)
  }

  console.log('\n✅ ALL SITEMAP LASTMOD CHECKS PASSED PERFECTLY!')
}

run().catch((err) => {
  console.error('Script failed:', err)
  process.exit(1)
})
