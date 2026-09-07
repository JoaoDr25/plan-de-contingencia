const LOCAL_USER_FIELDS = [
    'rol',
    'estado',
    'firma',
    'firmaNombre'
]

function normalizeDocument(documento) {
    return String(documento ?? '').trim()
}

export function mergeUsersFromRepfora(localUsers, repforaUsers) {
    const localByDocument = new Map(
        localUsers.map(user => [normalizeDocument(user.documento), user])
    )

    let added = 0
    let preserved = 0

    const mergedUsers = repforaUsers.map(repforaUser => {
        const document = normalizeDocument(repforaUser.documento)
        const localUser = localByDocument.get(document)

        if (!localUser) {
            added += 1
            return {
                ...repforaUser,
                rol: repforaUser.rol || 'usuario',
                estado: repforaUser.estado || 'Activo',
                firma: repforaUser.firma ?? null,
                firmaNombre: repforaUser.firmaNombre ?? null
            }
        }

        preserved += 1

        return {
            ...localUser,
            ...repforaUser,
            rol: localUser.rol,
            estado: localUser.estado,
            firma: localUser.firma ?? null,
            firmaNombre: localUser.firmaNombre ?? null
        }
    })

    const repforaDocuments = new Set(
        repforaUsers.map(user => normalizeDocument(user.documento))
    )

    const localOnlyUsers = localUsers.filter(user => {
        return !repforaDocuments.has(normalizeDocument(user.documento))
    })

    return {
        users: [...mergedUsers, ...localOnlyUsers],
        added,
        preserved
    }
}

export { LOCAL_USER_FIELDS }