import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const initialState = {
  nome: '',
  data_nascimento: '',
  cpf: '',
  email: '',
  whatsapp: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: ''
}

const getClienteInicial = id => {
  if (!id) return initialState

  try {
    const clientesSalvos = JSON.parse(localStorage.getItem('clientes') || '[]')
    const clienteEncontrado = clientesSalvos.find(c => String(c.id) === id)
    return clienteEncontrado || initialState
  } catch {
    return initialState
  }
}

const ClientesForm = () => {
  const { id } = useParams() // pega o id da URL, ex: /clientes/editar/3
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(() => getClienteInicial(id))

  const handleChange = (e) => {
    const { name, value } = e.target
    setCliente(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // aqui você salva (POST se novo, PUT/atualização se id existir)
    console.log('salvando', cliente)
    navigate('/clientes')
  }

  return (
    <div>
      <div className="text-2xl font-bold bg-purple-500 text-white flex flex-col justify-center items-center h-10">
        {id ? 'EDITAR CLIENTE' : 'CADASTRO DE CLIENTE'}
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto p-4 bg-pink-200 rounded-lg shadow-md border border-black">
        <div className="mb-4">
          <label className="block mb-2">nome:</label>
          <input
            name="nome"
            required
            placeholder="digite seu nome"
            value={cliente.nome}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">data de nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            value={cliente.data_nascimento}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">cpf:</label>
          <input
            name="cpf"
            placeholder="0000.000.000-00"
            value={cliente.cpf}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">e-mail:</label>
          <input
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={cliente.email}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">whatsapp:</label>
          <input
            name="whatsapp"
            placeholder="(000) 00000-0000"
            value={cliente.whatsapp}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">endereço completo:</label>
          <input
            name="logradouro"
            placeholder="rua, avenida, etc."
            value={cliente.logradouro}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input
            name="numero"
            placeholder="número"
            value={cliente.numero}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input
            name="complemento"
            placeholder="bloco, apartamento, etc."
            value={cliente.complemento}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input
            name="bairro"
            placeholder="digite seu bairro"
            value={cliente.bairro}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input
            name="cidade"
            placeholder="digite sua cidade"
            value={cliente.cidade}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input
            name="estado"
            placeholder="digite seu estado"
            value={cliente.estado}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full mb-2"
          />
          <input
            name="cep"
            placeholder="00000-000"
            value={cliente.cep}
            onChange={handleChange}
            className="border border-black rounded p-1 w-full"
          />
        </div>

        <div className="md:col-span-2 flex gap-2">
          <Link
            to="/clientes"
            className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            voltar
          </Link>
          <button
            type="submit"
            className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClientesForm