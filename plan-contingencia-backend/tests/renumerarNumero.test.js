import { test } from "node:test";
import assert from "node:assert/strict";
import { prepararRenumeracion } from "../src/utils/renumerarNumero.js";

test("renumera desde 1 conservando identificadores y el orden de numeros anteriores", () => {
    const registros = [{ _id: "b", numero: 55 }, { _id: "a", numero: 11 }];
    assert.deepEqual(prepararRenumeracion(registros), [
        { _id: "a", numeroAnterior: 11, numero: 1 },
        { _id: "b", numeroAnterior: 55, numero: 2 }
    ]);
    assert.deepEqual(registros, [{ _id: "b", numero: 55 }, { _id: "a", numero: 11 }]);
});

test("admite colecciones vacias y numeracion ya consecutiva", () => {
    assert.deepEqual(prepararRenumeracion([]), []);
    const cambios = prepararRenumeracion([{ _id: "a", numero: 1 }, { _id: "b", numero: 2 }]);
    assert.ok(cambios.every((cambio) => cambio.numeroAnterior === cambio.numero));
});

test("rechaza numeros ausentes, no enteros, negativos o duplicados", () => {
    for (const numero of [undefined, null, 0, -1, 1.5, "1", NaN, Infinity]) {
        assert.throws(() => prepararRenumeracion([{ _id: "a", numero }]), /invalidos/);
    }
    assert.throws(() => prepararRenumeracion([
        { _id: "a", numero: 1 }, { _id: "b", numero: 1 }
    ]), /duplicados/);
});

test("los destinos quedan libres al actualizar en orden ascendente con indice unico", () => {
    for (const numeros of [[11, 12, 13], [1, 3, 4, 8], [2, 3, 4], [1, 2, 3]]) {
        const ocupados = new Set(numeros);
        const cambios = prepararRenumeracion(numeros.map((numero) => ({ _id: numero, numero })));
        for (const cambio of cambios) {
            ocupados.delete(cambio.numeroAnterior);
            assert.equal(ocupados.has(cambio.numero), false);
            ocupados.add(cambio.numero);
        }
        assert.deepEqual([...ocupados].sort((a, b) => a - b), numeros.map((_, index) => index + 1));
    }
});
