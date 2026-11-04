// dados de exemplo guardados no localStorage, no lugar de um back-end real.
// quando o back-end existir, é só trocar estas funções por chamadas fetch.

const STORAGE_KEY = 'clientes'

const clientesIniciais = [
  { id: 1, nome: 'buzina', email: 'buzina@email.com', cidade: 'taubaté' },
  { id: 2, nome: 'buzinei-bibi', email: 'buzinei@email.com', cidade: 'são paulo' },
]

const salvarTodos = (clientes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes))
}

export const listarClientes = () => {
  try {
    const salvos = localStorage.getItem(STORAGE_KEY)
    if (salvos) return JSON.parse(salvos)
  } catch {
    // dado corrompido: volta para os exemplos
  }
  salvarTodos(clientesIniciais)
  return clientesIniciais
}

export const buscarCliente = (id) =>
  listarClientes().find((cliente) => String(cliente.id) === String(id))

export const salvarCliente = (cliente) => {
  const clientes = listarClientes()

  if (cliente.id) {
    salvarTodos(clientes.map((c) => (c.id === cliente.id ? cliente : c)))
    return cliente
  }

  const proximoId = clientes.reduce((maior, c) => Math.max(maior, c.id), 0) + 1
  const novo = { ...cliente, id: proximoId }
  salvarTodos([...clientes, novo])
  return novo
}

export const excluirCliente = (id) => {
  salvarTodos(listarClientes().filter((cliente) => cliente.id !== id))
}
