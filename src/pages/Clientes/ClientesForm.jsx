import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import { buscarCliente, salvarCliente } from '../../services/clientes'

const initialState = {
  nome: '',
  data_nascimento: '',
  cpf: '',
  email: '',
  whatsapp: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
}

const Campo = ({ label, children }) => (
  <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-purple-100/80">
    {label}
    {children}
  </label>
)

const ClientesForm = () => {
  const { id } = useParams() // pega o id da URL, ex: /clientes/editar/3
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(() => ({
    ...initialState,
    ...(id ? buscarCliente(id) : {}),
  }))

  if (id && !cliente.id) {
    return (
      <Card title="cliente não encontrado">
        <Link to="/clientes" className="text-purple-700 dark:text-purple-300 font-semibold hover:underline">
          ← voltar para a lista
        </Link>
      </Card>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCliente((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    salvarCliente(cliente)
    navigate('/clientes')
  }

  const campo = (name, props = {}) => (
    <Input name={name} value={cliente[name]} onChange={handleChange} {...props} />
  )

  return (
    <Card title={id ? 'editar cliente' : 'cadastro de cliente'}>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Campo label="nome">{campo('nome', { required: true, placeholder: 'digite seu nome' })}</Campo>
        <Campo label="data de nascimento">{campo('data_nascimento', { type: 'date' })}</Campo>
        <Campo label="cpf">{campo('cpf', { placeholder: '000.000.000-00' })}</Campo>
        <Campo label="e-mail">{campo('email', { type: 'email', placeholder: 'seu@email.com' })}</Campo>
        <Campo label="whatsapp">{campo('whatsapp', { placeholder: '(00) 00000-0000' })}</Campo>
        <Campo label="cep">{campo('cep', { placeholder: '00000-000' })}</Campo>
        <Campo label="logradouro">{campo('logradouro', { placeholder: 'rua, avenida, etc.' })}</Campo>
        <Campo label="número">{campo('numero', { placeholder: 'número' })}</Campo>
        <Campo label="complemento">{campo('complemento', { placeholder: 'bloco, apartamento, etc.' })}</Campo>
        <Campo label="bairro">{campo('bairro', { placeholder: 'digite seu bairro' })}</Campo>
        <Campo label="cidade">{campo('cidade', { placeholder: 'digite sua cidade' })}</Campo>
        <Campo label="estado">{campo('estado', { placeholder: 'digite seu estado' })}</Campo>

        <div className="md:col-span-2 flex justify-end gap-2 pt-4 mt-2 border-t border-purple-100 dark:border-white/10">
          <Link
            to="/clientes"
            className="px-4 py-2.5 rounded-xl border border-purple-200 dark:border-white/15 text-purple-700 dark:text-purple-200 text-sm font-semibold hover:bg-purple-200/40 dark:hover:bg-white/10"
          >
            voltar
          </Link>
          <button
            type="submit"
            className="btn-primary px-5 py-2.5 text-sm cursor-pointer"
          >
            salvar
          </button>
        </div>
      </form>
    </Card>
  )
}

export default ClientesForm
