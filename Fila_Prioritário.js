/**
 * @typedef {Object} Pessoa
 * @property {string} nome
 * @property {"idoso" | "gestante" | "normal"} prioridade
 */

/**
 * Adiciona uma pessoa ao fim da fila.
 * @param {Pessoa[]} fila
 * @param {Pessoa} pessoa
 * @returns {void}
 */
function entrarNaFila(fila, pessoa) {
  fila.push(pessoa);
}

/**
 * Remove e retorna a próxima pessoa a ser atendida,
 * respeitando prioridade e ordem de chegada dentro do mesmo grupo.
 * @param {Pessoa[]} fila
 * @returns {Pessoa | undefined}
 */
function chamarProximo(fila) {
  // Procura o primeiro idoso ou gestante da fila
  const indicePrioritario = fila.findIndex(
    pessoa =>
      pessoa.prioridade === "idoso" ||
      pessoa.prioridade === "gestante"
  );

  if (indicePrioritario !== -1) {
    return fila.splice(indicePrioritario, 1)[0];
  }

  // Se não houver prioritários, atende o primeiro normal
  return fila.shift();
}

/**
 * Atende todas as pessoas da fila em ordem, imprimindo cada atendimento.
 * @param {Pessoa[]} fila
 * @returns {void}
 */
function atenderTodos(fila) {
  while (fila.length > 0) {
    const pessoa = chamarProximo(fila);
    console.log(`Atendendo: ${pessoa.nome}`);
  }
}

let fila = [];

entrarNaFila(fila, {
  nome: "Carlos",
  prioridade: "normal"
});

entrarNaFila(fila, {
  nome: "Marta",
  prioridade: "gestante"
});

entrarNaFila(fila, {
  nome: "José",
  prioridade: "idoso"
});

entrarNaFila(fila, {
  nome: "Paula",
  prioridade: "normal"
});

atenderTodos(fila);
