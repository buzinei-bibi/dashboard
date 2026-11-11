// conversa com o back-end em php. o endereço vem do arquivo .env (VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function request(endpoint, method, dados = null) {
  const config = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }

  if (dados) config.body = JSON.stringify(dados)

  let response
  try {
    response = await fetch(`${API_URL}${endpoint}`, config)
  } catch {
    throw new Error('NÃO FOI POSSÍVEL CONECTAR À API')
  }

  // 204 = nenhum conteúdo (ex.: busca sem resultado)
  if (response.status === 204) return null

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || `ERRO NA REQUISIÇÃO: ${response.status}`)
  }

  return data
}

const api = {
  get: (endpoint) => request(endpoint, 'GET'),
  post: (endpoint, dados) => request(endpoint, 'POST', dados),
  put: (endpoint, dados) => request(endpoint, 'PUT', dados),
  delete: (endpoint) => request(endpoint, 'DELETE'),
}

// monta um serviço de crud para um recurso da api (clientes, fornecedores, produtos)
export const criarServico = (recurso) => ({
  getAll: () => api.get(`/${recurso}/`),
  getByID: (id) => api.get(`/${recurso}/?id=${encodeURIComponent(id)}`),
  getBySearch: (busca) => api.get(`/${recurso}/?search=${encodeURIComponent(busca)}`),
  create: (dados) => api.post(`/${recurso}/`, dados),
  update: (id, dados) => api.put(`/${recurso}/?id=${encodeURIComponent(id)}`, dados),
  delete: (id) => api.delete(`/${recurso}/?id=${encodeURIComponent(id)}`),
})

export default api
