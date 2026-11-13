import React from 'react'
import Loading from '../../components/loading'
import Card from '../../components/layout/card/card'
import Table from '../../components/layout/table/table'
import Button from '../../components/ui/button'
import Modal from '../../components/ui/modal'
import SearchInput from '../../components/ui/search-input'
import vendasService from '../../services/vendas-service'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BsPencilFill, BsTrashFill } from 'react-icons/bs'
import { labelFormaPagamento, labelStatus } from './vendas-opcoes'

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Soma PRECO_UNIT * QTDE de todos os produtos da venda
const totalDaVenda = (venda) =>
  (venda.PRODUTOS || []).reduce(
    (total, produto) => total + Number(produto.PRECO_UNIT || 0) * Number(produto.QTDE || 0),
    0
  )

const VendasList = () => {
  const [loading, setLoading] = React.useState(true);
  const [vendas, setVendas] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [vendaId, setVendaId] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await vendasService.delete(vendaId)
      toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      setModalOpen(false)
      carregarLista(search)
    }
  }

  // Função para carregar registros da tabela
  const carregarLista = async (busca) => {
    try {
      setLoading(true);
      const dados = busca
        ? await vendasService.getBySearch(busca)
        : await vendasService.getAll()
      // Verifica se a resposta da API é nula (204 = nenhuma venda)
      if (dados === null) {
        setVendas([])
        toast.info("nenhum registro encontrado")
      } else {
        setVendas(dados.data)
      }
    } catch (error) {
      setVendas([])
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      carregarLista(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const columns = [
    {
      header: "código",
      accessor: "ID_VENDA",
    },
    {
      header: "data",
      accessor: "DATA",
    },
    {
      header: "cliente",
      accessor: "CLIENTE",
      render: (row) => (
        <div>
          <p>{row.CLIENTE?.NOME}</p>
          <span className='text-slate-500 dark:text-purple-200/60 font-semibold text-xs'>{row.CLIENTE?.CPF}</span>
        </div>
      )
    },
    {
      header: "produtos",
      accessor: "PRODUTOS",
      render: (row) => (
        <div className="flex flex-col">
          {(row.PRODUTOS || []).map((produto, index) => (
            <span key={index}>{produto.QTDE}x {produto.PRODUTO}</span>
          ))}
          {(row.PRODUTOS || []).length === 0 && (
            <span className='text-slate-500 dark:text-purple-200/60 text-xs'></span>
          )}
        </div>
      )
    },
    {
      header: "pagamento",
      accessor: "FORMA_PGTO",
      render: (row) => labelFormaPagamento(row.FORMA_PGTO),
    },
    {
      header: "status",
      accessor: "STATUS",
      render: (row) => labelStatus(row.STATUS),
    },
    {
      header: "$ total",
      accessor: "TOTAL",
      render: (row) => formatarMoeda(totalDaVenda(row)),
    },
    {
      header: "ações",
      accessor: "acoes",
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/vendas/edit/${row.ID_VENDA}`}>
            <Button
              className="
              text-purple-700 dark:text-purple-300 hover:bg-purple-200/40 dark:hover:bg-white/10
              "
            >
              <BsPencilFill />
            </Button>
          </Link>

          <Button
            onClick={() => {
              setVendaId(row.ID_VENDA)
              setModalOpen(true)
            }}
            className="text-red-600 dark:text-red-400 hover:bg-red-100/70 dark:hover:bg-red-500/10"
          >
            <BsTrashFill />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card title="lista de vendas" button="vendas">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="pesquisar venda por cliente, CPF, produto ou marca..."
      />
      {loading ? (
        <Loading />
      ) : (
        <Table data={vendas} columns={columns} />
      )}
      <Modal
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </Card>
  )
}

export default VendasList
