export function domInjector(seletor) {
    return function (target, propertyKey) {
        let elemento;
        const getter = function () {
            if (!elemento) {
                elemento = document.querySelector(seletor);
                console.log(`Buscando elemnto do DOM com o seletor ${seletor} para injetar em ${propertyKey}`);
            }
            return elemento;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter
        });
    };
}
//# sourceMappingURL=dom-injector.js.map