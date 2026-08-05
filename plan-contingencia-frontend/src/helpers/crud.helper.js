export function getCrudActions(row) {

    const actions = ['view']

    if (row.estado === 'Activo' || row.estado === 'Inactivo') {
        actions.push('edit')
        actions.push('delete')
    }
    return actions
}