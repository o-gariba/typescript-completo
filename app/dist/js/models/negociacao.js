export default class Negociacao {
    constructor(_data, _quantidade, _valor) {
        this._data = _data;
        this._quantidade = _quantidade;
        this._valor = _valor;
    }
    static criaDe(data, quantidadeString, valorString) {
        const exp = /-/g;
        const date = new Date(data.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }
    paraTexto() {
        return `
            Data: ${this.data},
            Quantidade: ${this._quantidade},
            Valor: ${this._valor}
        `;
    }
    get data() {
        const novaData = new Date(this._data.getTime());
        return novaData;
    }
    get volume() {
        return this._quantidade * this._valor;
    }
    ehIgual(negociacao) {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}
//# sourceMappingURL=negociacao.js.map