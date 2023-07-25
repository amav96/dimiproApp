import { Layout } from '@package'
import {FormContract} from '../../../components/FormContract/FormContract'
import './_addContract.scss'

const AddContract = () => {
  return (
    <div className='add-contract-container'>
        <Layout title='Add Contract'>
          <FormContract />
        </Layout>

    </div>
  )
}

export default AddContract