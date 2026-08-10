export function required(value) {
    if (
        value === null ||
        value === undefined ||
        String(value).trim() === ''
    ) {
        return 'Este campo es obligatorio'
    }
    return true
}

export function minLength(length) {
    return value => {
        if (
            value === null ||
            value === undefined ||
            String(value).length < length
        ) {
            return `Debe contener al menos ${length} caracteres`
        }
        return true
    }
}


export function maxLength(length) {
    return value => {
        if (
            value !== null &&
            value !== undefined &&
            String(value).length > length
        ) {
            return `No puede superar los ${length} caracteres`
        }
        return true
    }
}