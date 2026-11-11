const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

// "1500.5" → "R$ 1.500,50"; se não for número, devolve como veio
export const formatarPreco = (valor) => {
  const numero = Number(valor)
  return valor !== '' && valor != null && Number.isFinite(numero) ? moeda.format(numero) : valor
}
