export function getCurrentDate() {
    
    return new Date().toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

export function formatDate(value) {

    if (!value) {
        return ''
    }
    const dateString = String(value)

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {

        const [year, month, day] = dateString.split('-')

        return `${day}/${month}/${year}`
    }
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return ''
    }

    return new Intl.DateTimeFormat('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date)
}


export function formatTime(value) {

    if (!value) {
        return ''
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return ''
    }

    return new Intl.DateTimeFormat('es-CO', {
        timeZone: 'America/Bogota',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date)

}


export function formatHour(value) {

    if (!value) {
        return ''
    }

    const match = String(value).match(/^(\d{2}):(\d{2})$/)

    if (!match) {
        return value
    }

    const hours = Number(match[1])
    const minutes = match[2]
    const period = hours >= 12 ? 'p. m.' : 'a. m.'
    const formattedHours = hours % 12 || 12

    return `${String(formattedHours).padStart(2, '0')}:${minutes} ${period}`
}