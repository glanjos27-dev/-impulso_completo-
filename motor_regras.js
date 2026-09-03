/**
 * @typedef {Object} Regra
 * @property {(numero: number) => boolean} teste
 * @property {string} resultado
 */

/**
 * Aplica uma lista de regras a um número, concatenando os resultados
 * de todas as regras cujo teste retornar true. Se nenhuma regra bater,
 * retorna o próprio número convertido em string.
 * @param {number} numero
 * @param {Regra[]} regras
 * @returns {string} resultado combinado, ou o próprio número se nenhuma regra bateu
 */
function aplicarRegras(numero, regras) {
    let resultado = "";

    for (let i = 0; i < regras.length; i++) {
        const regra = regras[i];

        if (regra.teste(numero)) {
            resultado += regra.resultado;
        }
    }

    if (resultado === "") {
        return String(numero);
    }

    return resultado;
}

/**
 * Percorre um intervalo de números aplicando as regras e imprime cada resultado.
 * @param {number} inicio
 * @param {number} fim
 * @param {Regra[]} regras
 * @returns {void}
 */
function rodarMotor(inicio, fim, regras) {
    for (let numero = inicio; numero <= fim; numero++) {
        console.log(aplicarRegras(numero, regras));
    }
}


// Regras originais
const regras = [
    {
        teste: (n) => n % 3 === 0,
        resultado: "Fizz"
    },
    {
        teste: (n) => n % 5 === 0,
        resultado: "Buzz"
    },

    // Regra nova 1: múltiplos de 7
    {
        teste: (n) => n % 7 === 0,
        resultado: "Bizz"
    },

    // Regra nova 2: números primos
    {
        teste: (n) => {
            if (n < 2) {
                return false;
            }

            for (let divisor = 2; divisor < n; divisor++) {
                if (n % divisor === 0) {
                    return false;
                }
            }

            return true;
        },
        resultado: "Prime"
    }
];


// Exemplos
console.log(aplicarRegras(15, regras));
// "FizzBuzz"

console.log(aplicarRegras(9, regras));
// "Fizz"

console.log(aplicarRegras(7, regras));
// "BizzPrime"

console.log(aplicarRegras(11, regras));
// "Prime"

console.log(aplicarRegras(1, regras));
// "1"


// Executa de 1 até 20
rodarMotor(1, 20, regras);