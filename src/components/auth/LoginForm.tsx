// import Form from '../../components/Form/Form'
import React, { useState } from 'react';
import { Form, Select, Input } from '../form';

export function LoginForm() {

  const [inputs, setInputs] = useState({
    // firstName : {
    //   placeholder : 'Nombre',
    //   name: 'firstName',
    //   value: '',
    //   type: 'text',
    //   rules: {
    //     required: true
    //   }
    // },
    // lastName: {
    //   placeholder : 'Apellido',
    //   name: 'lastName',
    //   value: '',
    //   type: 'text',
    //   rules: {
    //     required: true
    //   }
    // }
    
  })

  let paises = [
    {name: 'argentina', id: 1},
    {name: 'uruguay', id: 2},
    {name: 'chile', id: 3},
    {name: 'paraguay', id: 4},
    {name: 'colombia', id: 5},
    {name: 'ecuador', id: 6},
    {name: 'bolivia', id: 7},
    {name: 'usa', id: 8},
    {name: 'canada', id: 9},
    {name: 'españa', id: 10},
    {name: 'philiphas', id: 11},
    {name: 'nigeria', id: 12},
    {name: 'ruanda', id: 13},
    {name: 'puerto rico', id: 14},
    {name: 'brasil', id: 15},
  ];

  const [va, setVal] = useState('value')

  return (
    <div className='my-2 flex justify-center flex-column grid grid-cols-12 gap-2'>
      <Input
      value={va}
      name={'firstName'}
      placeholder={'nombre'}
      onChange={() => console.log('testing')}
      />
      <Select
      name={'pais'}
      options={paises}
      value={1}
      />
     
      {/* <Form
      inputs={inputs}
      /> */}
    </div>
  )
}
