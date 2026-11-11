import ListaCrud from '../../components/ui/lista-crud'
import Avatar from '../../components/ui/avatar'
import clientesService from '../../services/clientes-service'
import { useListaApi } from '../../hooks/use-lista-api'

const columns = [
  {
    header: 'NOME',
    accessor: 'NOME',
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar alt={`foto de ${row.NOME}`} />
        <div className="flex flex-col">
          <span>{row.NOME}</span>
          <span className="text-xs text-slate-500 dark:text-purple-200/60">{row.EMAIL}</span>
        </div>
      </div>
    ),
  },
  {
    header: 'CPF',
    accessor: 'CPF',
    render: (row) => <span className="whitespace-nowrap text-slate-500 dark:text-purple-200/60">{row.CPF}</span>,
  },
  {
    header: 'CIDADE',
    accessor: 'CIDADE',
    render: (row) =>
      row.ENDERECO?.CIDADE && (
        <span className="px-2.5 py-1 bg-linear-to-r from-purple-100 to-fuchsia-100 dark:from-purple-400/10 dark:to-fuchsia-400/10 text-purple-700 dark:text-purple-200 text-xs font-medium rounded-full border border-purple-200 dark:border-purple-400/20 whitespace-nowrap">
          {row.ENDERECO.CIDADE}
          {row.ENDERECO.ESTADO && ` - ${row.ENDERECO.ESTADO}`}
        </span>
      ),
  },
]

const ClientesList = () => {
  const lista = useListaApi(clientesService)

  return (
    <ListaCrud
      title="LISTA DE CLIENTES"
      rota="clientes"
      rowKey="ID_CLIENTE"
      columns={columns}
      lista={lista}
      placeholder="BUSCAR POR NOME, CPF OU CIDADE..."
      singular="CLIENTE"
      plural="CLIENTES"
    />
  )
}

export default ClientesList
