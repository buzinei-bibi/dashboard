import { useParams } from 'react-router-dom'
import Formulario from '../../components/ui/formulario'
import Campo from '../../components/ui/campo'
import Input from '../../components/ui/input'
import produtosService from '../../services/produtos-service'
import { useFormularioApi } from '../../hooks/use-formulario-api'

const inicial = {
  PRODUTO: '',
  DESCRICAO: '',
  PRECO_UNIT: '',
  QUANTIDADE: '',
  MARCA: {
    ID_MARCA: '',
    MARCA: '',
  },
}

const ProdutosForm = () => {
  const { id } = useParams()
  const form = useFormularioApi({ service: produtosService, id, inicial, voltarPara: '/produtos' })
  const { dados, alterar } = form

  const campo = (name, value, props = {}) => (
    <Input name={name} value={value} onChange={alterar} required {...props} />
  )

  return (
    <Formulario title={id ? 'EDITAR PRODUTO' : 'CADASTRO DE PRODUTO'} voltarPara="/produtos" form={form}>
      <Campo label="PRODUTO" required>
        {campo('PRODUTO', dados.PRODUTO, { placeholder: 'DIGITE O NOME DO PRODUTO' })}
      </Campo>
      <Campo label="DESCRIÇÃO" required>
        {campo('DESCRICAO', dados.DESCRICAO, { placeholder: 'DIGITE A DESCRIÇÃO DO PRODUTO' })}
      </Campo>
      <Campo label="preço unitário (r$)" required>
        {campo('PRECO_UNIT', dados.PRECO_UNIT, { type: 'number', min: 0, step: '0.01', placeholder: '1000.00' })}
      </Campo>
      <Campo label="QUANTIDADE" required>
        {campo('QUANTIDADE', dados.QUANTIDADE, { type: 'number', min: 0, step: 1, placeholder: '0' })}
      </Campo>
      <Campo label="MARCA" required className="md:col-span-2">
        {campo('MARCA.MARCA', dados.MARCA.MARCA, { placeholder: 'DIGITE A MARCA' })}
      </Campo>
    </Formulario>
  )
}

export default ProdutosForm
