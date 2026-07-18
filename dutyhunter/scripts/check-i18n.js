const fs = require('fs')
const path = require('path')

const MESSAGES_DIR = path.join(__dirname, '..', 'src', 'messages')
const BASE_LOCALE = 'en'

function flattenKeys(obj, prefix = '') {
  let keys = []
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(flattenKeys(obj[key], fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys
}

function loadLocale(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`)
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw)
}

function main() {
  const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith('.json'))
  const locales = files.map((f) => f.replace('.json', ''))

  if (!locales.includes(BASE_LOCALE)) {
    console.error(`Base locale "${BASE_LOCALE}.json" not found in ${MESSAGES_DIR}`)
    process.exit(1)
  }

  const baseKeys = new Set(flattenKeys(loadLocale(BASE_LOCALE)))
  let hasErrors = false

  for (const locale of locales) {
    if (locale === BASE_LOCALE) continue

    const localeKeys = new Set(flattenKeys(loadLocale(locale)))

    const missing = [...baseKeys].filter((k) => !localeKeys.has(k))
    const extra = [...localeKeys].filter((k) => !baseKeys.has(k))

    if (missing.length > 0 || extra.length > 0) {
      hasErrors = true
      console.error(`\n✗ ${locale}.json is out of sync with ${BASE_LOCALE}.json`)
      if (missing.length > 0) {
        console.error(`  Missing keys (${missing.length}):`)
        missing.forEach((k) => console.error(`    - ${k}`))
      }
      if (extra.length > 0) {
        console.error(`  Extra keys not in ${BASE_LOCALE}.json (${extra.length}):`)
        extra.forEach((k) => console.error(`    + ${k}`))
      }
    } else {
      console.log(`✓ ${locale}.json matches ${BASE_LOCALE}.json (${localeKeys.size} keys)`)
    }
  }

  if (hasErrors) {
    console.error('\ni18n key check failed.\n')
    process.exit(1)
  } else {
    console.log('\nAll locale files are in sync.\n')
  }
}

main()
