import React from 'react'
import Loading from '../../components/loading'
import Card from '../../components/layout/card/card'
import Table from '../../components/layout/table/table'
import Button from '../../components/ui/button'
import Modal from '../../components/ui/modal'
import SearchInput from '../../components/ui/search-input'
import comprasService from '../../services/compras-service'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BsPencilFill, BsTrashFill } from 'react-icons/bs'

import { labelFormaPagamento, labelStatus } from './compras-opcoes'

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Soma PRECO_UNIT * QTDE de todos os produtos da compra
const totalDaCompra = (compra) =>
  (compra.PRODUTOS || []).reduce(
    (total, produto) => total + Number(produto.PRECO_UNIT || 0) * Number(produto.QTDE || 0),
    0
  )

const ComprasList = () => {
  const [loading, setLoading] = React.useState(true);
  const [compras, setCompras] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [compraId, setCompraId] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await comprasService.delete(compraId)
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
        ? await comprasService.getBySearch(busca)
        : await comprasService.getAll()
      // Verifica se a resposta da API é nula (204 = nenhuma compra)
      if (dados === null) {
        setCompras([])
        toast.info("nenhum registro encontrado")
      } else {
        setCompras(dados.data)
      }
    } catch (error) {
      setCompras([])
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
      accessor: "ID_COMPRA",
    },
    {
      header: "data",
      accessor: "DATA",
    },
    {
      header: "fornecedor",
      accessor: "FORNECEDOR",
      render: (row) => (
        <div>
          <p>{row.FORNECEDOR?.NOME_FANTASIA || row.FORNECEDOR?.RAZAO_SOCIAL}</p>
          <span className='text-slate-500 dark:text-purple-200/60 font-semibold text-xs'>{row.FORNECEDOR?.CNPJ}</span>
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
      header: "total",
      accessor: "TOTAL",
      render: (row) => formatarMoeda(totalDaCompra(row)),
    },
    {
      header: "ações",
      accessor: "acoes",
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/compras/edit/${row.ID_COMPRA}`}>
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
              setCompraId(row.ID_COMPRA)
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
    <Card title="lista de compras" button="compras">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="pesquisar compra por fornecedor, CNPJ, produto ou marca..."
      />
      {loading ? (
        <Loading />
      ) : (
        <Table data={compras} columns={columns} />
      )}
      <Modal
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </Card>
  )
}

export default ComprasList
