import React, { useCallback, useMemo, useState } from 'react'
import { Abm, Layout } from '@package'
import { Routes } from '@services/utils/Routes'
import { authorization } from '@services/utils/Autorizathion'
import { GlobalInputs } from '@packageTypes'
import baseApiUrl from '@services/BaseApiUrl'
import { formatDateTime } from '@services/utils/Formatters'
import {  toast } from 'react-toastify';
import { setCurrencies } from '@store/dataProviders/dataProvidersSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { Currency } from 'src/types/currency.type'
import { useAfterUpdate } from '@hooks/useAfterUpdate'
import { useAfterStore } from '@hooks/useAfterStore'
import { useAfterDelete } from '@hooks/useAfterDelete'

export function Currencies() {


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
        key: 'symbol',
        placeholder: 'symbol',
        name: 'symbol',
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
        key: 'nameShort',
        placeholder: 'nameShort',
        name: 'nameShort',
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
      key: 'symbol',
      placeholder: 'symbol',
      name: 'symbol',
      value: '',
      type: 'text',
      cols: 'c-col-span-4',
    },
    {
      key: 'nameShort',
      placeholder: 'nameShort',
      name: 'nameShort',
      value: '',
      type: 'text',
      cols: 'c-col-span-4',

    }

  ])

  const dispatch = useAppDispatch()

  const currencies = useAppSelector(
    (state: RootState) => state.dataProviders.currencies
  );

  const afterUpdate = useAfterUpdate(dispatch, setCurrencies, currencies);
  const afterStore = useAfterStore(dispatch, setCurrencies, currencies);
  const afterDelete = useAfterDelete(dispatch, setCurrencies, currencies);

  return (
    <Layout title={'Currencies'} >
      <Abm
      table={{
        columns: useMemo(() => [
          {key: 'name', title: 'Name'},
          {key: 'symbol', title: 'Symbol'},
          {key: 'nameShort', title: 'NameShort'},
          {key: 'createdAt', title: 'created', format:(value: string) => formatDateTime(value) || '' },
          {key: 'edit', title: 'Edit'},
          {key: 'delete', title: 'Delete'},
        ],[]),
        urlIndex: Routes.CURRENCIES.INDEX,
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
        urlDelete: Routes.CURRENCIES.DELETE,
        deleteItemAfterDelete: true,
        deleteRequestConfiguration : {
            method: 'DELETE',
            headers: {
              Authorization: authorization(),
              'Content-Type': 'application/json'
            }
        },
        afterDelete : (data: any) => afterDelete(data),
        deleteIcon: baseApiUrl + '/icons/basura.svg',
        updateIcon: baseApiUrl + '/icons/editar.svg',
        headerSticky: true
      }}
      modalForm={{
        inputs: formCrud,
        urlStore: Routes.CURRENCIES.STORE,
        urlUpdate: Routes.CURRENCIES.UPDATE,
        urlShow: Routes.CURRENCIES.SHOW,
        closable: true,
        title: 'Save user',
        afterUpdate: (data: any) => afterUpdate(data),
        afterStore: (data: any) => afterStore(data),
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
