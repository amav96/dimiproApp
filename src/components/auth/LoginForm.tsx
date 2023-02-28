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
    {name: 'Argentina', id: 1},
    {name: 'Uruguay', id: 2},
    {name: 'Chile', id: 3},
    {name: 'Paraguay', id: 4},
    {name: 'Colombia', id: 5},
    {name: 'Ecuador', id: 6},
    {name: 'Bolivia', id: 7},
    {name: 'Usa', id: 8},
    {name: 'Canada', id: 9},
    {name: 'España', id: 10},
    {name: 'Philiphas', id: 11},
    {name: 'Nigeria', id: 12},
    {name: 'Ruanda', id: 13},
    {name: 'Puerto rico', id: 14},
    {name: 'Brasil', id: 15},
  ];


  const [paisSelect, setPaisSelect] = useState<number | object>({name: 'Argentina', id: 1})

  const onChange = (value: object , index: number | string):void => {
    if(typeof value === 'number' || typeof value === 'object'){
      setPaisSelect(value)
    }
  }

  return (
    <div className='my-2 flex justify-center flex-column grid grid-cols-12 gap-2'>
      <Input
      value={'2'}
      name={'firstName'}
      placeholder={'nombre'}
      onChange={() => console.log('testing')}
      />
      <Select
      name={'pais'}
      options={paises}
      value={paisSelect}
      onChange={onChange}
      />

      {/* { <button className='col-span-12 bg-orange-300'
      onClick={() => setPaisSelect(2)}
      >
        agregar
      </button> } */}
     
      {/* <Form
      inputs={inputs}
      /> */}
    </div>
  )
}
