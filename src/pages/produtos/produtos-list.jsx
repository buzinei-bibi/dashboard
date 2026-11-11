import ListaCrud from '../../components/ui/lista-crud'
import produtosService from '../../services/produtos-service'
import { useListaApi } from '../../hooks/use-lista-api'
import { formatarPreco } from '../../utils/formatar'

const columns = [
  {
    header: 'PRODUTO',
    accessor: 'PRODUTO',
    render: (row) => (
      <div className="flex flex-col">
        <span>{row.PRODUTO}</span>
        <span className="text-xs text-slate-500 dark:text-purple-200/60">{row.DESCRICAO}</span>
      </div>
    ),
  },
  {
    header: 'PREÇO / QUANTIDADE',
    accessor: 'PRECO_UNIT',
    render: (row) => (
      <div className="flex flex-col">
        <span className="whitespace-nowrap font-semibold">{formatarPreco(row.PRECO_UNIT)}</span>
        <span className="text-xs text-slate-500 dark:text-purple-200/60">QUANTIDADE: {row.QTDE}</span>
      </div>
    ),
  },
  {
    header: 'MARCA',
    accessor: 'MARCA',
    render: (row) =>
      row.MARCA?.MARCA && (
        <span className="px-2.5 py-1 bg-linear-to-r from-purple-100 to-fuchsia-100 dark:from-purple-400/10 dark:to-fuchsia-400/10 text-purple-700 dark:text-purple-200 text-xs font-medium rounded-full border border-purple-200 dark:border-purple-400/20 whitespace-nowrap">
          {row.MARCA.MARCA}
          {row.MARCA.ID_MARCA && <span className="opacity-60"> · ID {row.MARCA.ID_MARCA}</span>}
        </span>
      ),
  },
]

const ProdutosList = () => {
  const lista = useListaApi(produtosService)

  return (
    <ListaCrud
      title="LISTA DE PRODUTOS"
      rota="produtos"
      rowKey="ID_PRODUTO"
      columns={columns}
      lista={lista}
      placeholder="BUSCAR POR NOME, DESCRIÇÃO OU PREÇO..."
      singular="PRODUTO"
      plural="PRODUTOS"
    />
  )
}

export default ProdutosList
