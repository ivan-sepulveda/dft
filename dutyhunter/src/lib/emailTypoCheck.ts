const KNOWN_DOMAIN_TYPOS: Record<string, string> = {
  // Gmail
  'gmial.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.con': 'gmail.com',
  // Yahoo
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'yhoo.com': 'yahoo.com',
  // Hotmail
  'hotmal.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  // Outlook
  'outlok.com': 'outlook.com',
  'outllok.com': 'outlook.com',
  'outlook.co': 'outlook.com',
}

/**
 * Checks an email's domain against a list of known typos of common providers.
 * Returns the suggested correct domain if a typo is detected, or null if the
 * domain looks fine (including domains not in our list at all — we only flag
 * known typos, never guess at unfamiliar domains).
 */
export function checkEmailDomainTypo(email: string): string | null {
  const atIndex = email.lastIndexOf('@')
  if (atIndex === -1) return null

  const domain = email.slice(atIndex + 1).toLowerCase().trim()
  const suggestion = KNOWN_DOMAIN_TYPOS[domain]

  if (!suggestion) return null

  const localPart = email.slice(0, atIndex)
  return `${localPart}@${suggestion}`
}