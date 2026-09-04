/**
 * Cria um tabuleiro vazio de 9 posições.
 * @returns {(null | "X" | "O")[]}
 */
function criarTabuleiroVazio() {
    return [
        null, null, null,
        null, null, null,
        null, null, null
    ];
}

/**
 * Imprime o tabuleiro atual no console, formatado em 3x3.
 * @param {(null | "X" | "O")[]} tabuleiro
 * @returns {void}
 */
function renderizarTabuleiro(tabuleiro) {
    console.log(
        (tabuleiro[0] ?? " ") + " | " +
        (tabuleiro[1] ?? " ") + " | " +
        (tabuleiro[2] ?? " ")
    );

    console.log("-----------");

    console.log(
        (tabuleiro[3] ?? " ") + " | " +
        (tabuleiro[4] ?? " ") + " | " +
        (tabuleiro[5] ?? " ")
    );

    console.log("-----------");

    console.log(
        (tabuleiro[6] ?? " ") + " | " +
        (tabuleiro[7] ?? " ") + " | " +
        (tabuleiro[8] ?? " ")
    );
}

/**
 * Verifica se uma jogada é válida (posição existente e livre).
 * @param {(null | "X" | "O")[]} tabuleiro
 * @param {number} posicao posição de 1 a 9
 * @returns {boolean}
 */
function jogadaValida(tabuleiro, posicao) {
    return (
        posicao >= 1 &&
        posicao <= 9 &&
        tabuleiro[posicao - 1] === null
    );
}

/**
 * Verifica se há um vencedor no tabuleiro atual.
 * @param {(null | "X" | "O")[]} tabuleiro
 * @returns {"X" | "O" | null}
 */
function verificarVencedor(tabuleiro) {
    // As 8 combinações possíveis:
    // 3 linhas + 3 colunas + 2 diagonais
    const combinacoes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < combinacoes.length; i++) {
        const combinacao = combinacoes[i];

        const a = combinacao[0];
        const b = combinacao[1];
        const c = combinacao[2];

        if (
            tabuleiro[a] !== null &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {
            return tabuleiro[a];
        }
    }

    return null;
}

/**
 * Verifica se o jogo empatou (tabuleiro cheio e sem vencedor).
 * @param {(null | "X" | "O")[]} tabuleiro
 * @returns {boolean}
 */
function verificarEmpate(tabuleiro) {
    if (verificarVencedor(tabuleiro) !== null) {
        return false;
    }

    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === null) {
            return false;
        }
    }

    return true;
}

/**
 * Roda o jogo completo: alterna jogadores, pede jogadas via prompt,
 * valida, atualiza o tabuleiro e verifica vitória/empate até o fim.
 * @returns {void}
 */
function jogar() {
    const tabuleiro = criarTabuleiroVazio();
    let jogador = "X";
    let jogoTerminou = false;

    console.log("=== JOGO DA VELHA ===");
    console.log("Escolha uma posição de 1 a 9.");
    console.log("");

    while (!jogoTerminou) {
        renderizarTabuleiro(tabuleiro);

        let posicao;

        // Continua pedindo enquanto a jogada for inválida
        while (true) {
            const entrada = prompt(
                "Jogador " + jogador + ", escolha uma posição (1-9):"
            );

            // Converte o texto recebido pelo prompt para número
            posicao = Number(entrada);

            if (jogadaValida(tabuleiro, posicao)) {
                break;
            }

            console.log("Jogada inválida! Escolha uma posição livre de 1 a 9.");
        }

        // Atualiza o tabuleiro
        tabuleiro[posicao - 1] = jogador;

        // Verifica se houve vencedor
        const vencedor = verificarVencedor(tabuleiro);

        if (vencedor !== null) {
            renderizarTabuleiro(tabuleiro);
            console.log("Jogador " + vencedor + " venceu!");
            jogoTerminou = true;
            continue;
        }

        // Verifica se houve empate
        if (verificarEmpate(tabuleiro)) {
            renderizarTabuleiro(tabuleiro);
            console.log("Empate!");
            jogoTerminou = true;
            continue;
        }

        // Troca o jogador
        if (jogador === "X") {
            jogador = "O";
        } else {
            jogador = "X";
        }
    }

    console.log("Fim de jogo!");
}

jogar();