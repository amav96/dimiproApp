import React, { useMemo, useState } from 'react'
import { Abm } from '@package'

import { Routes } from '@services/utils/Routes'
import { authorization } from '@services/utils/Autorizathion'
import { AbmModalFormExternal, AbmTableAliveProps, GlobalInputs } from '@packageTypes'
import baseApiUrl from '@services/BaseApiUrl'
import { Role } from 'src/types/role.type'
import { formatDateTime } from '@services/utils/Formatters'

export function Users() {
  const formInputs: GlobalInputs[] = ([
    {
      key: 'firstName',
      placeholder : 'Nombre',
      title: 'Nombre',
      name: 'firstName',
      value: '',
      type: 'text',
      cols: 'c-col-span-4',
      validations: {
        rules: {
          required: true
        }
      }
    },
    {
      key: 'lastName',
      placeholder : 'Apellido',
      title: 'Apellido',
      name: 'lastName',
      value: '',
      type: 'text',
      cols: 'c-col-span-4',
      validations: {
        rules: {
          required: true
        }
      }
    },
    {
      key: 'email',
      placeholder : 'Email',
      title: 'Email',
      name: 'email',
      value: '',
      type: 'text',
      cols: 'c-col-span-4',
      validations: {
        rules: {
          required: true
        }
      }
    },
  ])

  const filterForms : GlobalInputs[] = ([
    {
      key: 'firstName',
      placeholder : 'Nombre',
      title: 'Nombre',
      name: 'firstName',
      value: '',
      type: 'text',
      cols: 'c-col-span-4'
    },
    {
      key: 'lastName',
      placeholder : 'Apellido',
      title: 'Apellido',
      name: 'lastName',
      value: '',
      type: 'text',
      cols: 'c-col-span-4'
    },
    {
      key: 'email',
      placeholder : 'Email',
      title: 'Email',
      name: 'email',
      value: '',
      type: 'text',
      cols: 'c-col-span-4'
    },
  ])

  const [propModalForm, setPropModalForm] = useState<AbmModalFormExternal>({
    inputs: formInputs,
    urlStore: Routes.USERS.STORE,
    urlUpdate: Routes.USERS.UPDATE,
    urlShow: Routes.USERS.SHOW,
    modelShowKey: 'user',
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
      {key: 'firstName', title: 'Nombre'},
      {key: 'lastName', title: 'Apellido' },
      {key: 'email', title: 'Email' },
      {key: 'roles', title: 'Roles', format: (value: Role[]) => {
        return value.map((rol) => {
          return rol.name
        }).toString()
      }},
      {key: 'createdAt', title: 'creado', format:(value: string) => formatDateTime(value) },
      {key: 'edit', title: 'Editar'},
    ],[]),
    urlIndex: Routes.USERS.INDEX,
    requestConfiguration : {
      method: 'GET',
      headers: {
        Authorization: authorization()
      }
    },
    inputs: filterForms,
    searchable: true,
    addItemAfterStore: true,
    updateItemAfterUpdate: true,
    // deleteItemAfterDelete: true,
    // urlDelete: 'https://jsonplaceholder.typicode.com/posts',
    // deleteRequestConfiguration: {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: authorization()
    //   }
    // },
    afterDelete : (data: any) => {
      console.log('data after delete',data)
    },
    updateIcon: baseApiUrl + '/icons/editar.svg',
    deleteIcon: baseApiUrl + '/icons/basura.svg',
    headerSticky: true
  })
  return (
    <div className='c-m-4'>
      <div className="c-my-2">
        <h2 className='c-text-xl'>Usuarios</h2>
      </div>
      <Abm
      table={propTable}
      modalForm={propModalForm}
      />
    </div>
  )
}
