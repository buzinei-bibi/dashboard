import React from 'react'
import Loading from '../../components/loading'
import Card from '../../components/layout/card/card'
import Table from '../../components/layout/table/table'
import Button from '../../components/ui/button'
import Modal from '../../components/ui/modal'
import SearchInput from '../../components/ui/search-input'
import produtosService from '../../services/produtos-service'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BsPencilFill, BsTrashFill } from 'react-icons/bs'

const SuppliersList = () => {
  const [loading, setLoading] = React.useState(true);
  const [produtos, setProdutos] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [produtoId, setProdutoId] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await produtosService.delete(produtoId)
      const { status, message } = response

      toast.success(message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      setModalOpen(false)
      carregarLista()
    }
  }

  // Função para carregar registros da tabela
  const carregarLista = async (busca) => {
    try {
      setLoading(true);
      const dados = busca
        ? await produtosService.getBySearch(busca)
        : await produtosService.getAll()
      // Verifica se a resposta da API é nula
      if (dados === null) {
        setProdutos([])
        toast.info("Nenhum registro encontrado")
      } else {
        setProdutos(dados.data)
      }
    } catch (error) {
      setProdutos([])
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
      accessor: "ID_PRODUTO",
    },

    {
  header: "imagem",
  accessor: "IMAGEM",
  render: (row) =>
    row.IMAGEM ? (
      <img
        src={row.IMAGEM}
        alt={row.PRODUTO}
        className="w-16 h-16 rounded-md object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    ) : null,
},
    {
      header: "produto",
      accessor: "PRODUTO",
      render: (row) => (
        <div>
          <p>{row.PRODUTO}</p>
          <span className='text-slate-500 dark:text-purple-200/60 font-semibold text-xs'>{row.MARCA.MARCA}</span>
        </div>
      )
    },
    {
      header: "quantidade",
      accessor: "QUANTIDADE",
    },
    {
      header: "$ preço",
      accessor: "PRECO_UNIT",
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/produtos/edit/${row.ID_PRODUTO}`}>
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
              setProdutoId(row.ID_PRODUTO)
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
    <Card title="Lista de Produtos" button="produtos">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar produto por nome, marca ou preço..."
      />
      {loading ? (
        <Loading />
      ) : (
        <Table data={produtos} columns={columns} />
      )}
      <Modal
        open={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </Card>
  )
}

export default SuppliersList
