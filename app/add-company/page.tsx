import AddCompanyClient from './add-company-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register Hiring Company & HR Profile | ListPak Pakistan',
  description: 'Create a verified hiring profile for your company on ListPak. Post job openings, build employer branding, and discover top candidates across Pakistan.',
}

export default function AddCompanyPage() {
  return <AddCompanyClient />
}
