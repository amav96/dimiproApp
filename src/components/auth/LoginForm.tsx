// import BaseForm from '../../components/Form/BaseForm'
import { BaseInput } from '../form/BaseInput';
import React, { useState } from 'react';
import '../form/BaseForm.scss'
import { LoginValues } from '../../types/auth/login';
import BaseForm from '../form/BaseForm';


export function LoginForm() {

  const [inputValues, setInputValues] = useState<LoginValues>({
    firstName: "",
    lastName: "",
    }
  )

  const validationSchema =  {
    firstName: {
        rules: {
          required: true
        }
      },
    lastName: {
        rules: {
            required: true
        }
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputValues((prev: LoginValues) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }

  const [inputs, setInputs] = useState({
    firstName : {
      placeholder : 'Nombre',
      name: 'firstName',
      value: 'alvaro',
      type: 'text'
    },
    lastName: {
      placeholder : 'Aliaga',
      name: 'lastName',
      value: '',
      type: 'text'
    }
  })


  // setTimeout(() => {
  //   console.log('try')
  //   setInputs((prev) => ({
  //     ...prev,
  //     firstName: {
  //       ...prev.firstName,
  //       test: 'gege'
  //     }
  //   }))
  // }, 3000);

  return (
    <div className='my-2 flex justify-center'>
      <BaseForm
      inputs={inputs}
      />
      {/* <form onSubmit={handleSubmit} className='baseForm grid grid-cols-12 gap-2'>
        <BaseInput
          value={inputValues.firstName}
          rules={validationSchema.firstName.rules}
          name='firstName'
          onChange={handleChange}
        />
        <BaseInput
          value={inputValues.lastName}
          rules={validationSchema.lastName.rules}
          name='lastName'
          onChange={handleChange}
        />
        <button type="submit"> enviar</button>
      </form> */}
    </div>
  )
}
