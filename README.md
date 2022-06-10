# Anotações feitas durante o curso "TypeScript: evoluindo seu js"

Um dos intuitos de usarmos o typescritp é para termos uma VISUALIZAÇÃO DE ERROS O MAIS RÁPIDO POSSÍVEL, ainda no ambiente de desenvolvimento, não somente na produção ou no navegador.

Precisamos instalar o compilador TS do npm

O navegador não entende a linguagem typeScript

O intuito é que mais para frente todo código escrito em TS virará automaticamente JS dentro da pasta /dist

Precisamos configurar o compilador do TS manualmente, o vscode não consegue. O arquivo que vai fazer isso é o tsconfig.json (na pasta root do programa). Precisamos tmb vincular o compilador no package.json do nosso projeto

Podemos configurar o compilador para que ele só compile CASO NÃO TENHA NENHUM ERRO!

Podemos também automatizar a compilação de arquivos, informando isso no package.json, com um novo script "watch": "tsc -w"

A sintaxe do ts usa outra notação para atributos privados, ao invés de # usamos "private _<var>" 

Podemos definir como padrão para que o ts não coloque <any> para as variaveis declaradas, assim precisaremos especificar os tipos necessáriamente
No tsconfig: noImplicityAny

até dados que vem do html podem ser tipados

É sempre legal tipar também os métodos, avisando qual a saída dele (return). Isso evita erros na hora de codar

Podemos declarar métodos que retornam uma lista que não deve ser alterada dpois d criada, por exemplo, com o type ReadonlyArray<T>.

Posso explicitar NO CONSTRUCTOR se os atributos são privates, além dos types de cada um, e não preciso fazer atribuições no corpo de constructor, ele já faz isso por dbaixo dos panos

Em ts, as duas linhas abaixo são exatamente iguais:


> private negociacoes: Array<Negociacao> = []

> private negociacoes: Negociacao[] = []

Essas linhas tmb são similares:

> lista(): ReadonlyArray<T> {}

> lista(): readonly <T>[] {}

Ao invés de criar getters em propriedades privadas de uma classe (que não podem ser alteradas), posso deixar todos `public readonly <propriedade>`

Mas isso ainda deixa um problema, pois posso alterar o objeto com métodos próprios (pois não altero a referencia, mas o objeto)

Para resolver essa vulnerabilidade, posso voltar a data no formato private , no getter, criar uma const com a data de entrada e retonar essa cópia. Assim nunca altero o valor de input da negociação, apenas sua cópia

# Anotações do curso 2 de TS

Vamos adotar uma abordagem declarativa para a exibição das negociações no nosso html

Ou seja, vamos declarar como o html e o ts vai se comportaar ao receber uma nova entrada de dados

Vamos criar uma classe que vai fazer o papel de renderizar tudo, que lembre o comportamento de um React da vida.

Para isso declaramos um return de string com o html e uma div no código html do site que vai receber o return

Uma propriedade `protected` pode ser acessada apenas por classes filhas

Uma classe abstrata não pode ser instanciada!!

Um método abstrato (só funciona em classes abstradas) OBRIGA classes filhas a o implementarem 

Métodos que não fazem sentido em ter acesso no view posso colocar a visibilidade como protected tanto no pai QUANTO NA FILHA 

Quando querermos usar variaveis em mais de um lugar com valores necessários apenas para leitura, podemos criar enums. São criadas de maneira mto similar a classes:

> export enum DiasDaSemana {
>   DOMINGO = 0,
>   SEXTA = 6
> } 

Quando eu quero invocar um método de uma classe sem a necessidade de instancia-la, defino o método como (public) static

# Anotações do curso 3

Requisitos não funcionais é tudo que a aplicação deve ter sem que o cliente tenha pedido. Ex: rapidez na renderização ou execução de trechos do código

Como isolar um teste de performance e como usá-lo no código todo? Usando DECORATORS

Decorator é uma função, ela é invocada em cima dos métodos que queremos medir a performance usando @<decorator>(), o compilador tmb precisa ter uma ativação específica para que ele funcione ("experimentalDecorators")

Relembrando o que é PROTOTYPE, é a herança na prática dentro do js. Quando invocamos um método de um objeto, ele verifica se o próprio objeto tem esse método implementado, caso não tenha o js pergunta se o prototype tem esse método (herançã direta do objeto criado), se não tiver, o js pergunta para o prototype do prototype se o método está la, e assim por diante...

O decorator sempre vai devolver o descriptor, por isso é legal colocá-lo logo no inicio da escrita da função

Esqueleto de um decorator básico:

```
export function inspect() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value

        descriptor.value = function(...args: any[]) {
            const retorno = metodoOriginal.apply(this, args)
            return retorno
        }

        return descriptor
    }
}
``` 

Ordem de execução dos decorators: eles correm na ordem que foram colocados

Posso mudar a forma de construir um decorator quando sei que não vou passar parametros (vide inspect.ts)

Decorator é exclusivo do TS!!

Interface (formato) no ts: vamos definir um tipo para ser usado no código

Uma interface NUNCA pode ser instanciada

É uma boa ideia criarmos classes Services para fazer tarefas como: importar dados de uma api e exibilos

Toda classe abstrata, quando é extendida por uma filha, precisa passar seu constructor (msm que não tenha tido alterações) para o constructor da classe filha através do super()

Não posso ter mais de uma classe mãe para puxar herança no TS

Quando preciso criar uma classe abstrata apenas para obrigar suas filhas a implementar um método, posso mudar a configuração de classe abstrata para INTERFACE. 

Nas classes filhas, ao invés de usar extends uso implements <classeMãe>

Uma interface pode fazer extends para mais de uma interface. Mais útil do que implementar várias interfaces em cada nova classe criada (lembrando que classes só podem extends de uma interface)