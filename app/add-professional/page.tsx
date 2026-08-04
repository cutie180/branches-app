import AddProfessionalClient from './add-professional-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Free Professional Profile | ListPak Pakistan',
  description: 'Create your public professional profile on ListPak. Show case your portfolio, skills, experience, and get discovered by clients across Pakistan and Google Search.',
}

export default function AddProfessionalPage() {
  return <AddProfessionalClient />
}
