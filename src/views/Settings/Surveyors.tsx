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
import { setSurveyors } from '@store/dataProviders/dataProvidersSlice'

export function Surveyors() {


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

  const surveyors = useAppSelector(
    (state: RootState) => state.dataProviders.surveyors
  );

  const afterUpdate = useAfterUpdate(dispatch, setSurveyors, surveyors);

  const afterStore = useAfterStore(dispatch, setSurveyors, surveyors);

  return (
    <Layout title={'Surveyors'} >
      <Abm
      table={{
        columns: useMemo(() => [
          {key: 'name', title: 'Name'},
          {key: 'createdAt', title: 'created', format:(value: string) => formatDateTime(value) || '' },
          {key: 'edit', title: 'Edit'},
          {key: 'delete', title: 'Delete'},
        ],[]),
        urlIndex: Routes.SURVEYORS.INDEX,
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
        urlDelete: Routes.SURVEYORS.DELETE,
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
                toast(`Successfully eliminated`, {
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
        urlStore: Routes.SURVEYORS.STORE,
        urlUpdate: Routes.SURVEYORS.UPDATE,
        urlShow: Routes.SURVEYORS.SHOW,
        closable: true,
        title: 'Save surveyor',
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
