import type { Metadata } from 'next'
import ResetPasswordClient from './ResetPasswordClient'

export const metadata: Metadata = {
  title: 'Reset Password | Duty Hunter',
  description: 'Choose a new password for your Duty Hunter account.',
}

export default function ResetPasswordPage() {
  return <ResetPasswordClient />
}
