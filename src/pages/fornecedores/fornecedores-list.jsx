import ListaCrud from '../../components/ui/lista-crud'
import fornecedoresService from '../../services/fornecedores-service'
import { useListaApi } from '../../hooks/use-lista-api'

const columns = [
  {
    header: 'RAZÃO SOCIAL',
    accessor: 'RAZAO_SOCIAL',
    render: (row) => (
      <div className="flex flex-col">
        <span>{row.RAZAO_SOCIAL}</span>
        <span className="text-xs text-slate-500 dark:text-purple-200/60">{row.NOME_FANTASIA}</span>
      </div>
    ),
  },
  {
    header: 'CNPJ',
    accessor: 'CNPJ',
    render: (row) => <span className="whitespace-nowrap text-slate-500 dark:text-purple-200/60">{row.CNPJ}</span>,
  },
  {
    header: 'CONTATO',
    accessor: 'TELEFONE',
    render: (row) => (
      <div className="flex flex-col">
        <span className="whitespace-nowrap">{row.TELEFONE}</span>
        <span className="text-xs text-slate-500 dark:text-purple-200/60">{row.EMAIL}</span>
      </div>
    ),
  },
]

const FornecedoresList = () => {
  const lista = useListaApi(fornecedoresService)

  return (
    <ListaCrud
      title="LISTA DE FORNECEDORES"
      rota="fornecedores"
      rowKey="ID_FORNECEDOR"
      columns={columns}
      lista={lista}
      placeholder="BUSCAR POR RAZÃO SOCIAL, NOME FANTASIA OU CNPJ..."
      singular="FORNECEDOR"
      plural="FORNECEDORES"
    />
  )
}

export default FornecedoresList
