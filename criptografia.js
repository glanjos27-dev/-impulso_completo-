/**
 * Criptografa um texto deslocando cada letra N posições no alfabeto.
 * Números, espaços e pontuações não são alterados.
 * @param {string} texto
 * @param {number} deslocamento quantidade de posições a deslocar (pode ser > 26)
 * @returns {string} texto criptografado
 */
function cifrarCesar(texto, deslocamento) {
  let resultado = "";

  // Garante que deslocamentos maiores que 26 funcionem
  deslocamento = deslocamento % 26;

  for (let i = 0; i < texto.length; i++) {
    const codigo = texto.charCodeAt(i);

    // Letras maiúsculas: A-Z
    if (codigo >= 65 && codigo <= 90) {
      const novoCodigo =
        ((codigo - 65 + deslocamento + 26) % 26) + 65;

      resultado += String.fromCharCode(novoCodigo);
    }
    // Letras minúsculas: a-z
    else if (codigo >= 97 && codigo <= 122) {
      const novoCodigo =
        ((codigo - 97 + deslocamento + 26) % 26) + 97;

      resultado += String.fromCharCode(novoCodigo);
    }
    // Espaços, números e pontuação
    else {
      resultado += texto[i];
    }
  }

  return resultado;
}

/**
 * Descriptografa um texto cifrado com cifrarCesar, usando o mesmo deslocamento.
 * @param {string} textoCifrado
 * @param {number} deslocamento
 * @returns {string} texto original
 */
function decifrarCesar(textoCifrado, deslocamento) {
  return cifrarCesar(textoCifrado, -deslocamento);
}

console.log(cifrarCesar("Ataque ao amanhecer!", 3));
// "Dwdtxh dr dpdqkhfhu!"

console.log(decifrarCesar("Dwdtxh dr dpdqkhfhu!", 3));
// "Ataque ao amanhecer!"
