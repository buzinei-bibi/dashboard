import { useParams } from 'react-router-dom'
import Formulario from '../../components/ui/formulario'
import Campo from '../../components/ui/campo'
import Input from '../../components/ui/input'
import clientesService from '../../services/clientes-service'
import { useFormularioApi } from '../../hooks/use-formulario-api'

const inicial = {
  NOME: '',
  DATA_NASCIMENTO: '',
  CPF: '',
  EMAIL: '',
  WHATSAPP: '',
  ENDERECO: {
    LOGRADOURO: '',
    NUMERO: '',
    COMPLEMENTO: '',
    BAIRRO: '',
    CIDADE: '',
    ESTADO: '',
    CEP: '',
  },
}

const ClientesForm = () => {
  const { id } = useParams() // pega o id da URL, ex: /clientes/editar/3
  const form = useFormularioApi({ service: clientesService, id, inicial, voltarPara: '/clientes' })
  const { dados, alterar } = form

  const campo = (name, value, props = {}) => (
    <Input name={name} value={value} onChange={alterar} required {...props} />
  )

  return (
    <Formulario title={id ? 'EDITAR CLIENTE' : 'CADASTRO DE CLIENTE'} voltarPara="/clientes" form={form}>
      <Campo label="NOME" required className="md:col-span-2">
        {campo('NOME', dados.NOME, { placeholder: 'DIGITE SEU NOME COMPLETO' })}
      </Campo>
      <Campo label="DATA DE NASCIMENTO" required>
        {campo('DATA_NASCIMENTO', dados.DATA_NASCIMENTO?.slice(0, 10), { type: 'date' })}
      </Campo>
      <Campo label="CPF" required>
        {campo('CPF', dados.CPF, { placeholder: '000.000.000-00', mask: '999.999.999-99' })}
      </Campo>
      <Campo label="E-MAIL" required>
        {campo('EMAIL', dados.EMAIL, { type: 'email', placeholder: 'SEU@EMAIL.COM' })}
      </Campo>
      <Campo label="WHATSAPP" required>
        {campo('WHATSAPP', dados.WHATSAPP, { type: 'tel', placeholder: '(00) 00000-0000', mask: '(99) 99999-9999' })}
      </Campo>
      <Campo label="CEP" required>
        {campo('ENDERECO.CEP', dados.ENDERECO.CEP, { placeholder: '00000-000', mask: '99999-999' })}
      </Campo>
      <Campo label="LOGRADOURO" required>
        {campo('ENDERECO.LOGRADOURO', dados.ENDERECO.LOGRADOURO, { placeholder: 'RUA, AVENIDA, ETC.' })}
      </Campo>
      <Campo label="NÚMERO" required>
        {campo('ENDERECO.NUMERO', dados.ENDERECO.NUMERO, { placeholder: 'NÚMERO' })}
      </Campo>
      <Campo label="COMPLEMENTO">
        {campo('ENDERECO.COMPLEMENTO', dados.ENDERECO.COMPLEMENTO, { required: false, placeholder: 'BLOCO, APARTAMENTO, ETC.' })}
      </Campo>
      <Campo label="BAIRRO" required>
        {campo('ENDERECO.BAIRRO', dados.ENDERECO.BAIRRO, { placeholder: 'DIGITE SEU BAIRRO' })}
      </Campo>
      <Campo label="CIDADE" required>
        {campo('ENDERECO.CIDADE', dados.ENDERECO.CIDADE, { placeholder: 'DIGITE SUA CIDADE' })}
      </Campo>
      <Campo label="ESTADO" required>
        {campo('ENDERECO.ESTADO', dados.ENDERECO.ESTADO, { placeholder: 'SP', maxLength: 2 })}
      </Campo>
    </Formulario>
  )
}

export default ClientesForm
