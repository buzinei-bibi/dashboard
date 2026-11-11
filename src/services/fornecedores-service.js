import api from "./api"

// O banco devolve as colunas de FORNECEDORES em minúsculo (id_fornecedor, razao_social...),
// mas as telas usam MAIÚSCULO (ID_FORNECEDOR, RAZAO_SOCIAL...). Aqui padronizamos as chaves.
const chavesEmMaiusculo = (registro) =>
    Object.fromEntries(
        Object.entries(registro).map(([chave, valor]) => [chave.toUpperCase(), valor])
    )

const padronizar = (resposta) => {
    if (resposta && Array.isArray(resposta.data)) {
        return { ...resposta, data: resposta.data.map(chavesEmMaiusculo) }
    }
    return resposta
}

const fornecedoresService = {
    getAll: async () => {
        return padronizar(await api.get(`/fornecedores/`))
    },
    getById: async (id) => {
        return padronizar(await api.get(`/fornecedores/?id=${id}`))
    },
    getByName: async (name) => {
        return padronizar(await api.get(`/fornecedores/?name=${name}`))
    },
    getByCity: async (city) => {
        return padronizar(await api.get(`/fornecedores/?city=${city}`))
    },
    getBySearch: async (search) => {
        return padronizar(await api.get(`/fornecedores/?search=${search}`))
    },
    create: async (dados) => {
        return await api.post(`/fornecedores/`, dados)
    },
    update: async (id, dados) => {
        return await api.put(`/fornecedores/?id=${id}`, dados)
    },
    delete: async (id) => {
        return await api.delete(`/fornecedores/?id=${id}`)
    },
}

export default fornecedoresService;
