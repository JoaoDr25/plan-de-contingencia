export function toTitleCase(value) {

    if (typeof value !== 'string' || !value.trim()) {
        return value
    }

    return value
        .toLowerCase()
        .replace(/(^|\s|[([{-])([a-záéíóúñü])/g, (match, prefix, letter) => prefix + letter.toUpperCase())
}
