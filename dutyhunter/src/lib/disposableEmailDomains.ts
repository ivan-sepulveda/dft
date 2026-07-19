// Blocklist of temp-mail provider domains, checked at signup.
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  // Temp-Mail
  'temp-mail.org',
  'temp-mail.io',
  'tempmail.com',
  'tempmail.net',
  // 10 Minute Mail
  '10minutemail.com',
  '10minutemail.net',
  '10minmail.com',
  // Guerrilla Mail
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'sharklasers.com',
  // Mailinator
  'mailinator.com',
  'mailinator.net',
  'mailinator2.com',
  // OpenInbox
  'openinbox.io',
  // Other common disposables
  'yopmail.com',
  'throwawaymail.com',
  'trashmail.com',
  'getnada.com',
  'dispostable.com',
  'fakeinbox.com',
  'mintemail.com',
  'mohmal.com',
  'temp-inbox.com',
  'emailondeck.com',
  'moakt.com',
  '33mail.com',
  'maildrop.cc',
  'inboxkitten.com',
  'burnermail.io',
  'dysonc.com',
])

/**
 * Returns true if the email's domain matches a known disposable/temporary
 * email provider. Only checks against the known list — never flags
 * unfamiliar domains as disposable.
 */
export function isDisposableEmail(email: string): boolean {
  const atIndex = email.lastIndexOf('@')
  if (atIndex === -1) return false

  const domain = email
    .slice(atIndex + 1)
    .toLowerCase()
    .trim()
  return DISPOSABLE_EMAIL_DOMAINS.has(domain)
}
