/**
 * Aplica uma função de transformação a cada item de um array.
 * @template T, U
 * @param {T[]} array
 * @param {(item: T, indice: number) => U} callback
 * @returns {U[]} novo array com os itens transformados
 */
function meuMap(array, callback) {
    const resultado = [];

    for (let i = 0; i < array.length; i++) {
        resultado.push(callback(array[i], i));
    }

    return resultado;
}

/**
 * Retorna um novo array só com os itens que passaram no teste.
 * @template T
 * @param {T[]} array
 * @param {(item: T, indice: number) => boolean} callback
 * @returns {T[]} novo array filtrado
 */
function meuFilter(array, callback) {
    const resultado = [];

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i)) {
            resultado.push(array[i]);
        }
    }

    return resultado;
}

/**
 * Reduz um array a um único valor acumulado.
 * @template T, U
 * @param {T[]} array
 * @param {(acumulador: U, item: T, indice: number) => U} callback
 * @param {U} valorInicial
 * @returns {U} valor final acumulado
 */
function meuReduce(array, callback, valorInicial) {
    let acumulador = valorInicial;

    for (let i = 0; i < array.length; i++) {
        acumulador = callback(acumulador, array[i], i);
    }

    return acumulador;
}

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Pega somente os números pares
const pares = meuFilter(numeros, (n) => n % 2 === 0);

// 2. Eleva cada número par ao quadrado
const quadrados = meuMap(pares, (n) => n * n);

// 3. Soma todos os quadrados
const resultado = meuReduce(quadrados, (acc, n) => acc + n, 0);

console.log(pares);       // [2, 4, 6, 8, 10]
console.log(quadrados);   // [4, 16, 36, 64, 100]
console.log(resultado);   // 220
