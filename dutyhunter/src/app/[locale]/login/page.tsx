import type { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Log In | Duty Hunter',
  description: 'Log in to your Duty Hunter account.',
}

export default function LoginPage() {
  return <LoginClient />
}
