/**
 * Calcula a média de um conjunto de notas.
 * @param {number[]} notas
 * @returns {number} média das notas
 */
function calcularMedia(notas) {
  const soma = notas.reduce((total, nota) => total + nota, 0);
  return soma / notas.length;
}

/**
 * Define o status de aprovação com base na média final.
 * @param {number} media
 * @returns {"Aprovado" | "Recuperação" | "Reprovado"}
 */
function definirStatus(media) {
  if (media >= 7) {
    return "Aprovado";
  }

  if (media >= 5) {
    return "Recuperação";
  }

  return "Reprovado";
}

/**
 * Gera o boletim completo de uma turma.
 * @param {Array<{ nome: string, notas: number[] }>} turma
 * @returns {{
 *   alunos: Array<{ nome: string, media: number, status: string }>,
 *   mediaGeralTurma: number,
 *   melhorAluno: { nome: string, media: number },
 *   piorAluno: { nome: string, media: number }
 * }}
 */
function gerarBoletim(turma) {
  const alunos = turma.map(aluno => {
    const media = calcularMedia(aluno.notas);

    return {
      nome: aluno.nome,
      media: Number(media.toFixed(2)),
      status: definirStatus(media)
    };
  });

  const mediaGeralTurma = Number(
    (
      alunos.reduce((total, aluno) => total + aluno.media, 0) /
      alunos.length
    ).toFixed(2)
  );

  const melhorAluno = alunos.reduce((melhor, aluno) =>
    aluno.media > melhor.media ? aluno : melhor
  );

  const piorAluno = alunos.reduce((pior, aluno) =>
    aluno.media < pior.media ? aluno : pior
  );

  return {
    alunos,
    mediaGeralTurma,
    melhorAluno: {
      nome: melhorAluno.nome,
      media: melhorAluno.media
    },
    piorAluno: {
      nome: piorAluno.nome,
      media: piorAluno.media
    }
  };
}

const turma = [
  { nome: "Ana", notas: [8.5, 7.0, 9.2] },
  { nome: "Bruno", notas: [4.0, 5.5, 6.0] },
  { nome: "Carla", notas: [10, 10, 9.5] },
  { nome: "Diego", notas: [3.0, 4.5, 2.0] },
];

console.log(gerarBoletim(turma));
