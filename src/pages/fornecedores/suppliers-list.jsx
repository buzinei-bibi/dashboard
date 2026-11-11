import React from 'react'
import Loading from '../../components/loading'
import Card from '../../components/layout/card/card'
import Table from '../../components/layout/table/table'
import Button from '../../components/ui/button'
import Modal from '../../components/ui/modal'
import SearchInput from '../../components/ui/search-input'
import fornecedoresService from '../../services/fornecedores-service'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BsPencilFill, BsTrashFill } from 'react-icons/bs'

const SuppliersList = () => {
  const [loading, setLoading] = React.useState(true);
  const [fornecedores, setFornecedores] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [fornecedorId, setFornecedorId] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fornecedoresService.delete(fornecedorId)
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
        ? await fornecedoresService.getBySearch(busca)
        : await fornecedoresService.getAll()
      // Verifica se a resposta da API é nula
      if (dados === null) {
        setFornecedores([])
        toast.info("Nenhum registro encontrado")
      } else {
        setFornecedores(dados.data)
      }
    } catch (error) {
      setFornecedores([])
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
      header: "Código",
      accessor: "ID_FORNECEDOR",
    },
    {
      header: "Razão Social",
      accessor: "RAZAO_SOCIAL",
      render: (row) => (
        <div>
          <p>{row.RAZAO_SOCIAL}</p>
          <span className='text-slate-500 dark:text-purple-200/60 font-semibold text-xs'>{row.NOME_FANTASIA}</span>
        </div>
      )
    },
    {
      header: "CNPJ",
      accessor: "CNPJ",
    },
    {
      header: "Contato",
      accessor: "TELEFONE",
      render: (row) => (
        <div>
          <p>{row.TELEFONE}</p>
          <span className='text-slate-500 dark:text-purple-200/60 font-semibold text-xs'>{row.EMAIL}</span>
        </div>
      )
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/fornecedores/edit/${row.ID_FORNECEDOR}`}>
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
              setFornecedorId(row.ID_FORNECEDOR)
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
    <Card title="Lista de Fornecedores" button="fornecedores">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar fornecedor por nome, CNPJ ou e-mail..."
      />
      {loading ? (
        <Loading />
      ) : (
        <Table data={fornecedores} columns={columns} />
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
