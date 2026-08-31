import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Layout/Card/Card'
import Table from '../../components/Layout/Table/Table'

const ClientsList = () => {
  const [busca, setBusca] = useState('')

  const clientes = [
    {
      id: 1,
      nome: "buzina",
      email: "buzina@email.com",
      cidade: "taubaté",
    },
    {
      id: 2,
      nome: "buzinei-bibi",
      email: "buzinei@email.com",
      cidade: "são paulo",
    },
  ];

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.cidade.toLowerCase().includes(busca.toLowerCase())
  )

  const handleExcluir = (id) => {
    if (confirm('tem certeza que deseja excluir este cliente?')) {
      console.log('excluir cliente', id)
    }
  }

  const columns = [
    {
      header: "código",
      accessor: "id",
      render: (row) => (
        <span className="text-purple-700 font-semibold tracking-wide">#{row.id}</span>
      ),
    },
    {
      header: "nome",
      accessor: "nome",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
            {row.nome.charAt(0)}
          </div>
          <span className="text-gray-800">{row.nome}</span>
        </div>
      ),
    },
    {
      header: "e-mail",
      accessor: "email",
      render: (row) => (
        <span className="text-gray-500">{row.email}</span>
      ),
    },
    {
      header: "cidade",
      accessor: "cidade",
      render: (row) => (
        <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
          {row.cidade}
        </span>
      ),
    },
    {
      header: "ações",
      accessor: "acoes",
      render: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/clientes/editar/${row.id}`}
            className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-md shadow-sm transition-all duration-150"
          >
            editar
          </Link>
          <button
            onClick={() => handleExcluir(row.id)}
            className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold rounded-md border border-red-200 transition-all duration-150"
          >
            excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <Card title="lista de clientes" button="clientes">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="buscar por nome, e-mail ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-shadow"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
        </div>
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap tracking-wide">
          {clientesFiltrados.length} cliente{clientesFiltrados.length !== 1 ? 's' : ''} encontrado{clientesFiltrados.length !== 1 ? 's' : ''}
        </span>
      </div>

      {clientesFiltrados.length > 0 ? (
        <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
          <Table data={clientesFiltrados} columns={columns} />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-300 text-sm">
          nenhum cliente encontrado
        </div>
      )}
    </Card>
  )
}

export default ClientsList