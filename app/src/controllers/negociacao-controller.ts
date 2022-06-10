import { domInjector } from "../decorators/dom-injector.js"
import { logarTempoExecucao } from "../decorators/logar-tempo-de-execucao.js"
import { DiasDaSemana } from "../enum/dias-da-semana.js"
import Negociacao from "../models/negociacao.js"
import { Negociacoes } from "../models/negociacoes.js"
import { NegociacoesService } from "../services/negociacoes-service.js"
import { imprimir } from "../utils/imprimir.js"
import { MensagemView } from "../views/mensagem-view.js"
import { NegociacoesView } from "../views/negociacoes-view.js"

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement

    @domInjector('#quantidade')
    private inputQuant: HTMLInputElement
    
    @domInjector('#valor')
    private inputValor: HTMLInputElement

    private negociacoes = new Negociacoes
    private negociacoesView = new NegociacoesView('#tabelaView')
    private msgView = new MensagemView('#mensagemView')

    private negociacoesService = new NegociacoesService

    constructor() {
        this.negociacoesView.update(this.negociacoes)
    }

    @logarTempoExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuant.value,
            this.inputValor.value
        )

        if (!this.ehDiaUtil(negociacao.data)) {
            this.msgView.update('Operação inválida! Apenas datas em dias úteis são aceitas')
            return ;
        }

        this.negociacoes.adiciona(negociacao)
        imprimir(negociacao, this.negociacoes)
        this.atualizaView()
        this.limparFormsEFoca()
    }

    public importaDados(): void {
        this.negociacoesService.obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacaoDeHoje => {
                    return !this.negociacoes.lista()
                        .some(negociacao => negociacao.ehIgual(negociacaoDeHoje))
                })
            })
            .then(negociacoesDeHoje => {
                for(let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao)
                }
                this.negociacoesView.update(this.negociacoes)
            })
    }


    private limparFormsEFoca(): void {
        this.inputData.value = '',
        this.inputQuant.value = '',
        this.inputValor.value = ''

        this.inputData.focus()
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes)
        this.msgView.update('Negociação adicionada com sucesso!')
    }

    private ehDiaUtil(data: Date): boolean {
        return (data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO)
    }
}