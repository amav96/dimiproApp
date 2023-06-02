
import React, { useState } from 'react';
import { Form, Modal, Button} from '@package';
import { Slot, GlobalInputs } from '@packageTypes'
import { formatTypeDate, getValuesInArrayObjects } from '@services/utils/Formatters';

export function LoginForm() {


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

  const test = (value: any, input: any) => {
    console.log(value)
    // console.log(value)
    // console.log(input)
    // setInputs((prev) => ({
    //   ...prev,
    //   firstName: {
    //     ...prev.firstName,
    //     value: 'testiin'
    //   }
    // }))
  }
  const test1 = (value : any) => {
    console.log(value);
    
  }

  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>(
    [
      {
        key: 'email',
        placeholder : 'Email',
        title: 'email',
        name: 'email',
        value: '',
        type: 'email',
        validations: {
          rules: {
            required: true
          }
        }
      },
      {
        key: 'password',
        placeholder : 'Password',
        name: 'password',
        value: null,
        type: 'password',
        validations: {
          rules: {
            required: true
          }
        }      
      },
  ])

  const [err, setErr] = useState<Array<string>>([]);

  const setErrors = ():void => {
    setErr(['hola este es un error'])
  }
  const remove = ():void => {
    console.log('gege')
    setErr([])
  }

  const [paisSelect, setPaisSelect]= useState<Array<any>>([]);
  const onChange = (value: any, index:any) => {
    if(Array.isArray(value)){
      setPaisSelect(value)
    }
  }

const [openModal, setOpenModal] = useState<Boolean>(false)

const openCloseModal = () => {
  setOpenModal((prev) => !prev)
}
const onSubmit = (data: any) => {
  console.log(data)
}
  return (
    <div className="c-mt-4 c-mb-2 c-mx-2">
      {
      <Form
      inputs={inputs}
      onSubmit={onSubmit}
      scopedFields={{
        test: () => (
          <div>gege</div>
        )
      }}
      >
        <a href="#" className='forgot-password'>¿Olvidaste tu contraseña?</a>
        <Button
          customClass='btn-primary'
        >
          Iniciar sesión
        </Button>
      </Form>
      }
{/* 
      <Modal
      isOpen={openModal}
      closeModal={openCloseModal}
      >
        <div className="c-flex c-flex-col">
          <div>
            header
          </div>
          <div>
            <button
            onClick={openCloseModal}
             > abrir cerrar
            </button>
          </div>
        </div>
      </Modal> */}

      {/* <button onClick={setErrors} className='bg-green-200 p-2' > set errors </button>
      <button onClick={openCloseModal} className='bg-red-200 p-2' > Abrir modal </button> */}
    </div>
  )
}
