/**
 * Strips accents/diacritics for accent-insensitive search matching.
 * "México" -> "mexico", "Città" -> "citta", "Köln" -> "koln"
 */
export function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
