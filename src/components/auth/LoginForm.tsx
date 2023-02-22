// import BaseForm from '../../components/Form/BaseForm'
import React, { useState } from 'react';
import '../form/BaseForm.scss'
import BaseForm from '../form/BaseForm';


export function LoginForm() {

  const [inputs, setInputs] = useState({
    firstName : {
      placeholder : 'Nombre',
      name: 'firstName',
      value: '',
      type: 'text',
      rules: {
        required: true
      }
    },
    lastName: {
      placeholder : 'Apellidoaa',
      name: 'lastName',
      value: 'valueDefault2',
      type: 'text',
      rules: {
        required: true
      }
    }
    
  })

  return (
    <div className='my-2 flex justify-center flex-column'>
      
     
      <BaseForm
      inputs={inputs}
      />
    </div>
  )
}
