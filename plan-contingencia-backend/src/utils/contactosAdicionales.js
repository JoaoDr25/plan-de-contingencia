export const normalizarContactosAdicionales = (otro) => {
    const lista = Array.isArray(otro) ? otro : otro ? [otro] : [];

    return lista.filter((contacto) => contacto?.nombreEntidad?.trim());
};
