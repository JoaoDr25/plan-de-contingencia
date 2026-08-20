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

export function onlyLetters(value) {

    if (
        value === null ||
        value === undefined ||
        String(value).trim() === ''
    ) {
        return true
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(String(value))) {
        return 'Solo se permiten letras'
    }
    return true
}

export function phone(value) {

    if (
        value === null ||
        value === undefined ||
        String(value).trim() === ''
    ) {
        return true
    }
    if (!/^\d{7,10}$/.test(String(value))) {
        return 'Ingrese un número de teléfono válido'
    }
    return true
}