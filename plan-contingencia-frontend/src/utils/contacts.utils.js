// Supports plans saved when "otro" was a single object instead of an array.
export function normalizeAdditionalContacts(otro) {
  const contacts = Array.isArray(otro) ? otro : otro ? [otro] : []

  return contacts.filter((contact) => contact?.nombreEntidad?.trim())
}
