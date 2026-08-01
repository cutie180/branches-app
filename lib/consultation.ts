export const TOTAL_STEPS = 7

export const CONSULTATION_STEPS: string[] = [
  'What type of business do you want to list?\n(e.g. restaurant, shop, clinic, salon, real estate, etc.)',
  'What city or area is your business located in?',
  'What are your main products or services?',
  'What is your business contact number or WhatsApp?',
  "Do you have a website or social media page?\n(type 'no' if not)",
  'What are your business hours? (e.g. Mon–Sat, 9am–6pm)',
  'Any extra details you want on your listing?\n(special offers, parking, delivery, etc. — or type \'skip\')',
]

export const STEP_LABELS: string[] = [
  'Business Type',
  'Location',
  'Products / Services',
  'Contact Number',
  'Website / Social',
  'Business Hours',
  'Extra Details',
]

const ACK_PHRASES = [
  'Got it, noted! 👍',
  'Perfect, thank you 👍',
  'Great, that helps! 👍',
  'Understood 👍',
  'Noted! 👍',
  'Got it 👍',
  'Excellent! 👍',
]

const HIRING_PATTERNS: RegExp[] = [
  /\b(list|add|register|submit|post|create|get|want).{0,30}\b(business|listing|shop|store|company|clinic|restaurant)\b/i,
  /\bhow (do i|can i|to) (list|add|register|submit)\b/i,
  /\b(add|submit|post).{0,20}\b(my|a|our)\b.{0,20}\b(business|listing|shop)\b/i,
  /\b(i want|i need|i'd like).{0,30}\b(listing|listed|register|add)\b/i,
  /\b(create|make|get).{0,20}\b(listing|profile|page)\b/i,
  /\b(pricing|price|cost|fee|charge).{0,20}\b(listing|register|add)\b/i,
  /\b(sign up|signup|join|enroll).{0,20}\b(list|directory|site)\b/i,
]

export function detectListingIntent(text: string): boolean {
  return HIRING_PATTERNS.some(p => p.test(text))
}

export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function buildIntroMessage(): string {
  return (
    `Great! Let's get your business listed on PakBizBranches. 🎉\n\n` +
    `I'll ask you ${TOTAL_STEPS} quick questions — one at a time — to set up your listing.\n\n` +
    `Question 1 of ${TOTAL_STEPS}:\n${CONSULTATION_STEPS[0]}`
  )
}

export function buildStepMessage(step: number): string {
  return `Question ${step} of ${TOTAL_STEPS}:\n${CONSULTATION_STEPS[step - 1]}`
}

export function buildAckMessage(nextStep: number): string {
  const ack = ACK_PHRASES[(nextStep - 2) % ACK_PHRASES.length]
  return `${ack}\n\n${buildStepMessage(nextStep)}`
}

export function generateSummaryPrompt(answers: string[]): string {
  const details = STEP_LABELS
    .map((label, i) => `${label}: ${answers[i] ?? 'not provided'}`)
    .join('\n')

  return (
    `A business owner wants to be listed on PakBizBranches, a Pakistani business directory. ` +
    `Generate a professional business listing summary from their answers.\n\n` +
    `BUSINESS DETAILS:\n${details}\n\n` +
    `FORMAT YOUR RESPONSE EXACTLY LIKE THIS:\n` +
    `🏢 BUSINESS LISTING SUMMARY\n\n` +
    `Business Type: [value]\n` +
    `Location: [value]\n` +
    `Products / Services: [value]\n` +
    `Contact: [value]\n` +
    `Website / Social: [value]\n` +
    `Business Hours: [value]\n` +
    `Additional Info: [value]\n\n` +
    `Note:\n[Write 1-2 friendly sentences confirming the listing looks good and what happens next.]\n\n` +
    `Your listing is ready! We'll publish it on PakBizBranches shortly. Let's confirm the details to go live.`
  )
}

export async function createLeadDoc(
  sessionId: string,
  source: string
): Promise<string> {
  return `lead_${Date.now()}`
}

export async function updateLeadDoc(
  docId: string,
  answers: string[],
  currentStep: number,
  complete = false
): Promise<void> {
  // In-memory update placeholder
}

export async function trackAnalytics(
  event: string,
  sessionId: string,
  extra: Record<string, unknown> = {}
): Promise<void> {
  // In-memory analytics tracker
}
