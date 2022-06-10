import { Imprimivel } from "./imprimivel.js";

export function imprimir(...args: Array<Imprimivel>) {
    for (let objeto of args) {
        console.log(objeto.paraTexto())
    }
}