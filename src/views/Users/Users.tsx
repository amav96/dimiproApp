import React, { useMemo, useState } from 'react'
import { Abm } from '../../components/Abm'
import { generatedInputs } from '../../components/Form/Form/Form.type'
import { Routes } from '../../services/utils/Routes'
import { authorization } from '../../services/utils/Autorizathion'
import { TableAliveProps } from '../../components/Table/Table.type'
import { PropsModalForm,  } from '../../components/ModalForm/ModalForm.type'
import { AbmModalFormExternal } from '../../components/Abm/Abm.type'

export function Users() {

  const formInputs: generatedInputs[] = ([
    {
      key: 'title',
      placeholder : 'Titulo',
      title: 'prueba',
      name: 'title',
      value: '',
      type: 'text',
      validations: {
        rules: {
          required: true
        }
      },
    },
    {
      key: 'body',
      placeholder : 'Cuerpo',
      title: 'Cuerpo',
      name: 'body',
      value: '',
      type: 'text',
      validations: {
        rules: {
          required: true
        }
      },
    }
  ])

  const [propModalForm, setPropModalForm] = useState<AbmModalFormExternal>({
    inputs: formInputs,
    urlStore: Routes.POSTS.STORE,
    urlUpdate: Routes.POSTS.UPDATE,
    urlShow: Routes.POSTS.SHOW,
    afterUpdate: (data: any) => {
      console.log(data)
    },
    afterStore: (data: any) => {
      console.log(data)
    },
    afterDelete : (data: any) => {
      console.log(data)
    },
    showRequestConfiguration : {
      method: 'GET',
      headers: {
        Authorization: authorization(),
        'Content-Type': 'application/json; charset=UTF-8'
      }
    },
    updateRequestConfiguration : {
      method: 'PATCH',
      headers: {
        Authorization: authorization(),
        'Content-Type': 'application/json; charset=UTF-8'
      }
    },
    storeRequestConfiguration : {
      method: 'POST',
      headers: {
        Authorization: authorization(),
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }
  })
  
  const [propTable, setPropTable] = useState<TableAliveProps<string>>({
    columns: useMemo(() => [
      {key: 'userId', title: 'userId'},
      {key: 'id', title: 'id'},
      {key: 'title', title: 'Titulo'},
      {key: 'body', title: 'Contenido'},
    ],[]),
    urlIndex: 'https://jsonplaceholder.typicode.com/posts',
    requestConfiguration : {
      method: 'GET',
      headers: {
        Authorization: authorization()
      }
    },
    inputs: formInputs.map((input) => {
      delete input.validations
      return {
        ...input,
        ...{
          cols: 'col-span-6'
        }
      }
    }),
    searchable: true
  })
  return (
    <div className='m-2'>
      <div className="my-2">
        <h2 className='text-lg' >Dashboard usuarios</h2>
      </div>
      <Abm
      table={propTable}
      modalForm={propModalForm}
      />
    </div>
  )
}
