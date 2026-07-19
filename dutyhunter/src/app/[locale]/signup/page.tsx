// Server wrapper for the signup route — sets metadata, renders SignUpClient.
import type { Metadata } from 'next'
import SignUpClient from './SignUpClient'

export const metadata: Metadata = {
  title: 'Sign Up | Duty Hunter',
  description: 'Create a Duty Hunter account to start tracking duty-free finds.',
}

export default function SignUpPage() {
  return <SignUpClient />
}
