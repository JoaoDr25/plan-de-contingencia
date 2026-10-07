// Supports plans saved when "otro" was a single object instead of an array.
export const normalizarContactosAdicionales = (otro) => {
    const lista = Array.isArray(otro) ? otro : otro ? [otro] : [];

    return lista.filter((contacto) => contacto?.nombreEntidad?.trim());
};
