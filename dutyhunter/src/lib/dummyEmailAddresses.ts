// Block list for known dummy/placeholder emails — distinct from
// disposableEmailDomains.ts, which blocks entire temp-mail provider domains.
// Split into two checks since a dummy email can be fake in either half:
//   - local part is always fake, regardless of domain
//     (noemail@gmail.com, test@aol.com — a real domain doesn't make it real)
//   - domain is always fake, regardless of local part
//     (jsmith@domain.com — a normal-looking local part doesn't make it real)
const DUMMY_EMAIL_LOCAL_PARTS = new Set([
  'noemail',
  'test',
  'abc',
  'xyz',
  '123',
  '321',
  'someone',
  'noone',
  'no',
  'none',
  'na',
  'user',
  'name',
  'noreply',
])

// example.com, example.org, and example.net are reserved by IANA (RFC 2606)
// specifically for documentation and testing — no real signup should ever
// use one.
const DUMMY_EMAIL_DOMAINS = new Set([
  'noemail.com',
  'domain.com',
  'test.com',
  'none.com',
  'noreply.com',
  'na.com',
  'example.com',
  'example.org',
  'example.net',
])

/**
 * Returns true if the email's local part or domain matches a known
 * dummy/placeholder pattern. Only checks against the known lists — never
 * flags unfamiliar local parts or domains.
 */
export function isDummyEmail(email: string): boolean {
  const normalized = email.toLowerCase().trim()
  const atIndex = normalized.lastIndexOf('@')
  if (atIndex === -1) return false

  const localPart = normalized.slice(0, atIndex)
  const domain = normalized.slice(atIndex + 1)

  return DUMMY_EMAIL_LOCAL_PARTS.has(localPart) || DUMMY_EMAIL_DOMAINS.has(domain)
}
