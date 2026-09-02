/**
 * Valida os dados de cadastro de um usuário.
 * @param {Object} usuario
 * @param {string} usuario.nome
 * @param {number} usuario.idade
 * @param {string} usuario.email
 * @param {string} usuario.senha
 * @returns {{ valido: boolean, erros: string[] }}
 */
function validarCadastro(usuario) {
  const erros = [];

  // Nome
  if (typeof usuario.nome !== "string" || usuario.nome.length < 3) {
    erros.push("Nome muito curto");
  }

  // Idade
  if (typeof usuario.idade !== "number" || usuario.idade < 18) {
    erros.push("Idade mínima não atingida");
  }

  // Email
  const posicaoArroba = usuario.email?.indexOf("@");

  if (
    typeof usuario.email !== "string" ||
    posicaoArroba === -1 ||
    usuario.email.indexOf(".", posicaoArroba) === -1
  ) {
    erros.push("Email inválido");
  }

  // Senha
  if (typeof usuario.senha !== "string" || usuario.senha.length < 6) {
    erros.push("Senha muito curta");
  }

  if (typeof usuario.senha !== "string" || !/\d/.test(usuario.senha)) {
    erros.push("Senha deve conter pelo menos um número");
  }

  return {
    valido: erros.length === 0,
    erros
  };
}

const usuario = {
  nome: "Maria Silva",
  idade: 17,
  email: "maria.silva@gmail.com",
  senha: "123"
};

console.log(validarCadastro(usuario));
