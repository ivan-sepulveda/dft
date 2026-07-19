import type { Metadata } from 'next'
import ForgotPasswordClient from './ForgotPasswordClient'

export const metadata: Metadata = {
  title: 'Forgot Password | Duty Hunter',
  description: 'Reset your Duty Hunter account password.',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />
}
