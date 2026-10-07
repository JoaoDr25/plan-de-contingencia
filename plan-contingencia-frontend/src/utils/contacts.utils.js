export function normalizeAdditionalContacts(otro) {
  const contacts = Array.isArray(otro) ? otro : otro ? [otro] : []

  return contacts.filter((contact) => contact?.nombreEntidad?.trim())
}
