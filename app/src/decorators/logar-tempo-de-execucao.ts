export function logarTempoExecucao(emSegundos: boolean = false) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value

        descriptor.value = function(...args: Array<any>) {
            const t1 = performance.now()
            // chama o método original
            const retorno = metodoOriginal.apply(this, args)
            const t2 = performance.now()

            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / 1000} seg`)
        
            retorno
        }

        return descriptor
    }
}

// o descriptor nos dá acesso a implementação do método decorado através do descriptor.value. Ou seja, ele sabe qual o método que vamos avaliar a performance de execução