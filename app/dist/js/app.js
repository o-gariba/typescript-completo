import { NegociacaoController } from "./controllers/negociacao-controller.js";
const negociacao = new NegociacaoController();
const forms = document.querySelector('.form');
if (forms) {
    forms.addEventListener('submit', e => {
        e.preventDefault();
        negociacao.adiciona();
    });
}
else {
    throw Error('Não foi possível inicializar a aplicação. Verifice se o formulário está no local correto do código HTML');
}
const botaoImporta = document.querySelector('#botao-importa');
if (!botaoImporta)
    throw Error('Botão importa não encontrado!');
else {
    botaoImporta.addEventListener('click', () => {
        negociacao.importaDados();
    });
}
//# sourceMappingURL=app.js.map