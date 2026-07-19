// Shape of the "locations" and "countries" namespaces in the translation
// files, used to type the raw useMessages() result for the tLocation/
// tCountry helpers scattered across the airport pages.
export type LocaleMessages = {
  locations?: Record<string, string>
  countries?: Record<string, string>
}
