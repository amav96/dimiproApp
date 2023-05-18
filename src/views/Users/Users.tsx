import React, { useMemo, useState } from 'react'
import { Abm } from '../../components/Abm'
import { generatedInputs } from '../../components/Form/Form/Form.type'
import { Routes } from '../../services/utils/Routes'
import { authorization } from '../../services/utils/Autorizathion'
import { AbmModalFormExternal, AbmTableAliveProps } from '../../components/Abm/Abm.type'

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
      console.log('data after update',data)
    },
    afterStore: (data: any) => {
      console.log('data after store',data)
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

  const [propTable, setPropTable] = useState<AbmTableAliveProps>({
    columns: useMemo(() => [
      {key: 'userId', title: 'userId'},
      {key: 'id', title: 'id'},
      {key: 'title', title: 'Titulo'},
      {key: 'body', title: 'Contenido'},
      {key: 'edit', title: 'Editar'},
      {key: 'delete', title: 'Eliminar'},
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
          cols: 'c-col-span-6'
        }
      }
    }),
    searchable: true,
    addItemAfterStore: true,
    updateItemAfterUpdate: true,
    deleteItemAfterDelete: true,
    urlDelete: 'https://jsonplaceholder.typicode.com/posts',
    deleteRequestConfiguration: {
      method: 'DELETE',
      headers: {
        Authorization: authorization()
      }
    },
    afterDelete : (data: any) => {
      console.log('data after delete',data)
    },
  })
  return (
    <div className='c-m-2'>
      <div className="c-my-2">
        <h2 className='c-text-lg' >Dashboard usuarios</h2>
      </div>
      <Abm
      table={propTable}
      modalForm={propModalForm}
      />
    </div>
  )
}
