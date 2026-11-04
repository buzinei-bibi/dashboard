import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from 'react-icons/io5'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Avatar from '../../components/ui/Avatar'
import { listarClientes, excluirCliente } from '../../services/clientes'

const ClientesList = () => {
  const [clientes, setClientes] = useState(listarClientes)
  const [busca, setBusca] = useState('')

  const termo = busca.toLowerCase()
  const clientesFiltrados = clientes.filter((cliente) =>
    [cliente.nome, cliente.email, cliente.cidade].some((campo) =>
      (campo || '').toLowerCase().includes(termo)
    )
  )

  const handleExcluir = (id) => {
    if (confirm('TEM CERTEZA QUE DESEJA EXCLUIR ESTE CLIENTE?')) {
      excluirCliente(id)
      setClientes(listarClientes())
    }
  }

  const columns = [
    {
      header: 'código',
      accessor: 'id',
      render: (row) => (
        <span className="text-gradient font-semibold tracking-wide">#{row.id}</span>
      ),
    },
    {
      header: 'nome',
      accessor: 'nome',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar alt={`foto de ${row.nome}`} />
          <span>{row.nome}</span>
        </div>
      ),
    },
    {
      header: 'e-mail',
      accessor: 'email',
      render: (row) => <span className="text-slate-500 dark:text-purple-200/60">{row.email}</span>,
    },
    {
      header: 'cidade',
      accessor: 'cidade',
      render: (row) =>
        row.cidade && (
          <span className="px-2.5 py-1 bg-linear-to-r from-purple-100 to-fuchsia-100 dark:from-purple-400/10 dark:to-fuchsia-400/10 text-purple-700 dark:text-purple-200 text-xs font-medium rounded-full border border-purple-200 dark:border-purple-400/20 whitespace-nowrap">
            {row.cidade}
          </span>
        ),
    },
    {
      header: 'ações',
      accessor: 'acoes',
      render: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/clientes/editar/${row.id}`}
            className="btn-primary px-3 py-1.5 text-xs !rounded-lg"
          >
            editar
          </Link>
          <button
            type="button"
            onClick={() => handleExcluir(row.id)}
            className="px-3 py-1.5 bg-red-50/50 dark:bg-transparent hover:bg-red-100/70 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg border border-red-200 dark:border-red-400/30 cursor-pointer"
          >
            excluir
          </button>
        </div>
      ),
    },
  ]

  const plural = clientesFiltrados.length !== 1 ? 's' : ''

  return (
    <Card title="lista de clientes" button="clientes">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b border-purple-100 dark:border-white/10">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="buscar por nome, e-mail ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="rounded-xl border border-purple-200 dark:border-white/10 bg-field pl-9 pr-3 py-2.5 text-sm w-full placeholder:text-slate-400 dark:placeholder:text-purple-200/30 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20"
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
        </div>
        <span className="text-xs text-slate-500 dark:text-purple-200/60 font-medium whitespace-nowrap tracking-wide">
          {clientesFiltrados.length} cliente{plural} encontrado{plural}
        </span>
      </div>

      {clientesFiltrados.length > 0 ? (
        <div className="rounded-xl overflow-hidden border border-purple-100 dark:border-white/10">
          <Table data={clientesFiltrados} columns={columns} />
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm">nenhum cliente encontrado</div>
      )}
    </Card>
  )
}

export default ClientesList
