import { inspect } from "../decorators/inspect.js"
import { logarTempoExecucao } from "../decorators/logar-tempo-de-execucao.js"

export abstract class View<T> {
    protected elemento: HTMLElement

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor)
        if (elemento) this.elemento = elemento as HTMLElement
        else {
            throw new Error(`Seletor ${seletor} não exite no DOM. Verifique com atenção!`)
        }
    }

    @inspect
    @logarTempoExecucao()
    public update(modelo: T): void {
        let template = this.template(modelo)
        this.elemento.innerHTML = template;
    }

    protected abstract template(modelo: T): string;

}