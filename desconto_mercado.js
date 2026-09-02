/**
 * Soma o valor total de todos os itens do carrinho (preço x quantidade).
 * @param {Array<{ nome: string, preço: number, quantidade: number }>} carrinho
 * @returns {number} valor total antes de qualquer desconto
 */
function calcularSubtotal(carrinho) {
  return carrinho.reduce((total, item) => {
    return total + item.preço * item.quantidade;
  }, 0);
}

/**
 * Cálculo do fechamento da compra aplicando os descontos contratuais.
 * @param {Array<{ nome: string, preço: number, quantidade: number }>} carrinho
 * @param {boolean} clienteVip
 * @returns {{ subtotal: number, descontoAplicado: string, total: number }}
 */
function fecharCompra(carrinho, clienteVip) {
  const subtotal = calcularSubtotal(carrinho);

  let total = subtotal;
  let descontoAplicado = "Nenhum";

  // Primeiro desconto: 10% se subtotal > 100
  if (subtotal > 100) {
    total *= 0.90;
    descontoAplicado = "10%";
  }

  // Segundo desconto: 5% VIP sobre o valor já descontado
  if (clienteVip === true) {
    total *= 0.95;

    if (subtotal > 100) {
      descontoAplicado = "10% + 5% VIP";
    } else {
      descontoAplicado = "5% VIP";
    }
  }

  // Arredonda para 2 casas decimais
  total = Math.round((total + Number.EPSILON) * 100) / 100;

  return {
    subtotal: Math.round((subtotal + Number.EPSILON) * 100) / 100,
    descontoAplicado,
    total
  };
}

const carrinho = [
  { nome: "Arroz", preço: 25.9, quantidade: 2 },
  { nome: "Feijão", preço: 8.5, quantidade: 3 },
  { nome: "Sabão em pó", preço: 15.0, quantidade: 1 }
];

console.log(fecharCompra(carrinho, true));
