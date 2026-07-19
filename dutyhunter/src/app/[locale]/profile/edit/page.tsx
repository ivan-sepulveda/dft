import type { Metadata } from 'next'
import EditProfileClient from './EditProfileClient'

export const metadata: Metadata = {
  title: 'Edit Profile | Duty Hunter',
  description: 'Update your display name and profile photo.',
}

export default function EditProfilePage() {
  return <EditProfileClient />
}
