import { useParams } from 'react-router-dom'
import Formulario from '../../components/ui/formulario'
import Campo from '../../components/ui/campo'
import Input from '../../components/ui/input'
import fornecedoresService from '../../services/fornecedores-service'
import { useFormularioApi } from '../../hooks/use-formulario-api'

const inicial = {
  RAZAO_SOCIAL: '',
  NOME_FANTASIA: '',
  CNPJ: '',
  TELEFONE: '',
  EMAIL: '',
}

const FornecedoresForm = () => {
  const { id } = useParams()
  const form = useFormularioApi({ service: fornecedoresService, id, inicial, voltarPara: '/fornecedores' })
  const { dados, alterar } = form

  const campo = (name, props = {}) => (
    <Input name={name} value={dados[name]} onChange={alterar} required {...props} />
  )

  return (
    <Formulario title={id ? 'EDITAR FORNECEDOR' : 'CADASTRO DE FORNECEDOR'} voltarPara="/fornecedores" form={form}>
      <Campo label="RAZÃO SOCIAL" required>
        {campo('RAZAO_SOCIAL', { placeholder: 'DIGITE A RAZÃO SOCIAL COMPLETA' })}
      </Campo>
      <Campo label="NOME FANTASIA" required>
        {campo('NOME_FANTASIA', { placeholder: 'DIGITE O NOME FANTASIA' })}
      </Campo>
      <Campo label="CNPJ" required>
        {campo('CNPJ', { placeholder: '00.000.000/0000-00', mask: '99.999.999/9999-99' })}
      </Campo>
      <Campo label="TELEFONE" required>
        {campo('TELEFONE', { type: 'tel', placeholder: '(00) 00000-0000', mask: '(99) 99999-9999' })}
      </Campo>
      <Campo label="E-MAIL" required className="md:col-span-2">
        {campo('EMAIL', { type: 'email', placeholder: 'CONTATO@EMPRESA.COM' })}
      </Campo>
    </Formulario>
  )
}

export default FornecedoresForm
