import React, { useEffect, useMemo, useState } from 'react'
import { Abm, Layout } from '@package'
import { Routes } from '@services/utils/Routes'
import { authorization } from '@services/utils/Autorizathion'
import { GlobalInputs } from '@packageTypes'
import baseApiUrl from '@services/BaseApiUrl'
import { formatDateTime } from '@services/utils/Formatters'
import {  toast } from 'react-toastify';

export function Packagings() {


  const [formCrud, setFormCrud] = useState<GlobalInputs[]>([
      {
        key: 'name',
        placeholder: 'Name',
        name: 'name',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
        validations: {
          rules: {
            required: true,
          },
        },
      },
      {
        key: 'kg',
        placeholder: 'Kg',
        name: 'kg',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
        validations: {
          rules: {
            required: true,
          },
        },
      }
    ]
  );

  const [formFilter, setFormFilter] = useState<GlobalInputs[]>([
    {
      key: 'name',
      placeholder : 'Name',
      name: 'name',
      value: '',
      type: 'text',
      cols: 'c-col-span-4'
    },
    {
      key: 'kg',
      placeholder : 'Kg',
      name: 'kg',
      value: '',
      type: 'text',
      cols: 'c-col-span-4'
    }
  ])

  return (
    <Layout title={'Packagings'} >
      <Abm
      table={{
        columns: useMemo(() => [
          {key: 'name', title: 'Name'},
          {key: 'kg', title: 'Kg' },
          {key: 'createdAt', title: 'created', format:(value: string) => formatDateTime(value) || '' },
          {key: 'edit', title: 'Edit'},
          {key: 'delete', title: 'Delete'},
        ],[]),
        urlIndex: Routes.PACKAGINGS.INDEX,
        requestConfiguration : {
          method: 'GET',
          headers: {
            Authorization: authorization()
          }
        },
        inputs: formFilter,
        searchable: true,
        addItemAfterStore: true,
        updateItemAfterUpdate: true,
        urlDelete: Routes.PACKAGINGS.DELETE,
        deleteItemAfterDelete: true,
        deleteRequestConfiguration : {
            method: 'DELETE',
            headers: {
              Authorization: authorization(),
              'Content-Type': 'application/json'
            }
        },
        afterDelete : (data: any) => {
            if(!data || data.errors || data.error ){
                toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
                  autoClose: 5000,
                  theme: 'colored'
                  });
              } else {
                toast(`Eliminado correctamente correctamente`, {
                  autoClose: 2000,
                  theme: 'dark'
                  });
              }
        },
        deleteIcon: baseApiUrl + '/icons/basura.svg',
        updateIcon: baseApiUrl + '/icons/editar.svg',
        headerSticky: true
      }}
      modalForm={{
        inputs: formCrud,
        urlStore: Routes.PACKAGINGS.STORE,
        urlUpdate: Routes.PACKAGINGS.UPDATE,
        urlShow: Routes.PACKAGINGS.SHOW,
        closable: true,
        title: 'Guardar usuario',
        afterUpdate: (data: any) => {
          if(data.errors || data.error){
            toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
              autoClose: 5000,
              theme: 'colored'
              });
          } else {
            toast(`Guardado correctamente`, {
              autoClose: 2000,
              theme: 'dark'
              });
          }
        },
        afterStore: (data: any) => {
          console.log(data)
          if(data.errors || data.error){
            toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
              autoClose: 5000,
              theme: 'colored'
              });
          } else {
            toast(`Guardado correctamente`, {
              autoClose: 2000,
              theme: 'dark'
              });
          }
        },
        showRequestConfiguration : {
          method: 'GET',
          headers: {
            Authorization: authorization(),
            'Content-Type': 'application/json'
          }
        },
        updateRequestConfiguration : {
          method: 'PATCH',
          headers: {
            Authorization: authorization(),
            'Content-Type': 'application/json'
          }
        },
        storeRequestConfiguration : {
          method: 'POST',
          headers: {
            Authorization: authorization(),
            'Content-Type': 'application/json'
          }
        }
      }}
      />
    </Layout>
  )
}