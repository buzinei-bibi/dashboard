import { Link } from 'react-router-dom'
import Card from './card'
import Table from './table'
import Loading from './loading'
import Modal from './modal'
import SearchInput from './search-input'

// card de lista com busca, tabela, botões editar/excluir e confirmação de exclusão
// rota: "clientes" | "fornecedores" | "produtos"; rowKey: campo de id, ex: "ID_CLIENTE"
const ListaCrud = ({ title, rota, rowKey, columns, lista, placeholder, singular, plural }) => {
  const { itens, busca, setBusca, carregando, processando, modalAberto, pedirExclusao, cancelarExclusao, confirmarExclusao } = lista

  const colunas = [
    {
      header: 'CÓDIGO',
      accessor: rowKey,
      render: (row) => <span className="text-gradient font-semibold tracking-wide">#{row[rowKey]}</span>,
    },
    ...columns,
    {
      header: 'AÇÕES',
      accessor: 'acoes',
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/${rota}/editar/${row[rowKey]}`} className="btn-primary px-3 py-1.5 text-xs !rounded-lg">
            EDITAR
          </Link>
          <button
            type="button"
            onClick={() => pedirExclusao(row[rowKey])}
            className="px-3 py-1.5 bg-red-50/50 dark:bg-transparent hover:bg-red-100/70 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg border border-red-200 dark:border-red-400/30 cursor-pointer"
          >
            EXCLUIR
          </button>
        </div>
      ),
    },
  ]

  const total = itens.length

  return (
    <Card title={title} button={rota}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b border-purple-100 dark:border-white/10">
        <SearchInput value={busca} onChange={(e) => setBusca(e.target.value)} placeholder={placeholder} />
        {!carregando && (
          <span className="text-xs text-slate-500 dark:text-purple-200/60 font-medium whitespace-nowrap tracking-wide">
            {total} {total === 1 ? singular : plural} ENCONTRADO{total === 1 ? '' : 'S'}
          </span>
        )}
      </div>

      {carregando ? (
        <Loading inline />
      ) : total > 0 ? (
        <div className="rounded-xl overflow-hidden border border-purple-100 dark:border-white/10">
          <Table data={itens} columns={colunas} rowKey={rowKey} />
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm">NENHUM {singular} ENCONTRADO</div>
      )}

      {processando && <Loading text="EXCLUINDO..." />}

      <Modal
        open={modalAberto}
        title={`excluir ${singular}?`}
        description={`tem certeza de que deseja excluir este ${singular}? essa ação não pode ser desfeita.`}
        onConfirm={confirmarExclusao}
        onCancel={cancelarExclusao}
      />
    </Card>
  )
}

export default ListaCrud
