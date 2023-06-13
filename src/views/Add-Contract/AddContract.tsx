import FormContract from '../../components/package/FormContract/FormContract'
import './_add-contract.scss'

const AddContract = () => {
  return (
    <div className='add-contract-container'>
        <h1 className='c-text-2xl'>Crear contrato</h1>

        <FormContract />
    </div>
  )
}

export default AddContract