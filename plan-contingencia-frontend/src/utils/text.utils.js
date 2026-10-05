export function toTitleCase(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return value
  }

  return value
    .toLowerCase()
    .replace(
      /(^|\s|[([{-])([a-záéíóúñü])/g,
      (match, prefix, letter) => prefix + letter.toUpperCase(),
    )
}

export function toSentenceCase(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return value
  }

  const normalized = value.trim().toLowerCase()

  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}
