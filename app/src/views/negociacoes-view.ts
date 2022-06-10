import { escape } from "../decorators/escape.js";
import { Negociacoes } from "../models/negociacoes.js"
import { View } from "./view.js"

export class NegociacoesView extends View<Negociacoes>{

    @escape
    protected template(modelo: Negociacoes): string {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>PRODUTO</th>
                    </tr>
                </thead>
                <tbody>
                    ${modelo.lista().map(negociacao => {
                        return `
                            <tr>
                                <td>${this.formataData(negociacao.data)}</td>
                                <td>${negociacao._quantidade}</td>
                                <td>${negociacao._valor}</td>
                                <td>${negociacao.volume}</td>
                            </tr>
                        `
                    }).join('')}
                </tbody>
            </table>  
        `
    }

    private formataData(data: Date): string {
        return new Intl.DateTimeFormat().format(data);
    }
}