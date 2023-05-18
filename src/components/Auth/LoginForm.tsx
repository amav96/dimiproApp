// import Form from '../../components/Form/Form'
import React, { useState } from 'react';
import { Form} from '../Form';
import { PropsSelect } from '../Form/Select/Select.type';
import { Modal } from '../Modal/Modal';
import { PropsInput } from '../Form/Input/Input.type';
import { Slot, generatedInputs } from '../Form/Form/Form.type';
import { formatTypeDate, getValuesInArrayObjects } from '../../services/utils/Formatters';
import { Button } from '../Button/Button';

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

  const [inputs, setInputs] = useState<Array<generatedInputs | Slot>>(
    [
      {
        key: 'firstName',
        placeholder : 'Nombre',
        title: 'prueba',
        name: 'firstName',
        value: '',
        type: 'text',
        validations: {
          rules: {
            required: true
          }
        }
      },
      {
        key: 'dateStart',
        placeholder : 'Fecha',
        name: 'dateStart',
        value: null,
        type: 'datetime',
        validations: {
          rules: {
            required: true
          }
        },
        // showTimeSelect: true,
        // dateFormat:'dd/MM/yyyy hh:mm',
        formatValue: (value : Date) => formatTypeDate(value)
        
      },
      {
        key: 'country',
        placeholder: 'Pais',
        name: 'country',
        value: [],
        options: paises,
        type: 'select',
        multiple: true,
        validations: {
          rules: {
            required: true
          }
        },
        clearable: true,
        formatValue: (value: Array<object>) => getValuesInArrayObjects(value),
        onSelect: test,
        onRemove: test1
      },
      {
        key: 'countrystatic',
        placeholder: 'Pais estatico',
        name: 'countrystatic',
        value: [],
        options: paises,
        type: 'select',
        clearable: true
      },
      {
        key: 'imagenes',
        placeholder: 'Imagen Avatar',
        name: 'imagenes',
        value: [],
        type: 'file',
        validations: {
          rules: {
            required: true
          }
        }
      },
      {
        key: 'comentario',
        placeholder: 'Comentarios',
        name: 'comentario',
        value: '',
        type: 'textarea',
        validations: {
          rules: {
            required: true
          }
        }
      },
      {
        key: 'lavadero',
        label: 'lavadero',
        name: 'lavadero',
        type: 'switch',
        value: false
      },
      {
        key: 'test',
        slot: true
      }
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
        <Button
        type={'submit'}
        text={'Enviar formulario'}
        />
      </Form>
      }

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
      </Modal>

      <button onClick={setErrors} className='bg-green-200 p-2' > set errors </button>
      <button onClick={openCloseModal} className='bg-red-200 p-2' > Abrir modal </button>
    </div>
  )
}
