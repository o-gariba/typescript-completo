var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inspect } from "../decorators/inspect.js";
import { logarTempoExecucao } from "../decorators/logar-tempo-de-execucao.js";
export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (elemento)
            this.elemento = elemento;
        else {
            throw new Error(`Seletor ${seletor} não exite no DOM. Verifique com atenção!`);
        }
    }
    update(modelo) {
        let template = this.template(modelo);
        this.elemento.innerHTML = template;
    }
}
__decorate([
    inspect,
    logarTempoExecucao()
], View.prototype, "update", null);
//# sourceMappingURL=view.js.map