import React, { useEffect, useMemo, useState } from 'react'
import { Abm, Layout } from '@package'
import { Routes } from '@services/utils/Routes'
import { authorization } from '@services/utils/Autorizathion'
import { GlobalInputs } from '@packageTypes'
import baseApiUrl from '@services/BaseApiUrl'
import { formatDateTime } from '@services/utils/Formatters'
import {  toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { useAfterUpdate } from '@hooks/useAfterUpdate'
import { useAfterStore } from '@hooks/useAfterStore'
import { setPaymentMethods } from '@store/dataProviders/dataProvidersSlice'
import { useAfterDelete } from '@hooks/useAfterDelete'

export function PaymentMethods() {

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
    }
  ])

  const dispatch = useAppDispatch();

  const paymentMethods = useAppSelector(
    (state: RootState) => state.dataProviders.paymentMethods
  );

  const afterUpdate = useAfterUpdate(dispatch, setPaymentMethods, paymentMethods);
  const afterStore = useAfterStore(dispatch, setPaymentMethods, paymentMethods)
  const afterDelete = useAfterDelete(dispatch, setPaymentMethods, paymentMethods)

  return (
    <Layout title={'Payment Methods'} >
      <Abm
      table={{
        columns: useMemo(() => [
          {key: 'name', title: 'Name'},
          {key: 'createdAt', title: 'created', format:(value: string) => formatDateTime(value) || '' },
          {key: 'edit', title: 'Edit'},
          {key: 'delete', title: 'Delete'},
        ],[]),
        urlIndex: Routes.PAYMENTMETHODS.INDEX,
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
        urlDelete: Routes.PAYMENTMETHODS.DELETE,
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
        urlStore: Routes.PAYMENTMETHODS.STORE,
        urlUpdate: Routes.PAYMENTMETHODS.UPDATE,
        urlShow: Routes.PAYMENTMETHODS.SHOW,
        closable: true,
        title: 'Save Payment Method',
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
