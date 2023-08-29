import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Abm, Layout } from '@package'
import { Routes } from '@services/utils/Routes'
import { authorization } from '@services/utils/Autorizathion'
import { GlobalInputs } from '@packageTypes'
import baseApiUrl from '@services/BaseApiUrl'
import { formatDateTime } from '@services/utils/Formatters'
import {  toast } from 'react-toastify';
import {setCategories} from '@store/dataProviders/dataProvidersSlice'
import { useAppSelector, useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { GenericModel } from 'src/types/genericModel.type'


export function Categories() {

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

  const dispatch = useAppDispatch()

  const categories = useAppSelector(
    (state: RootState) => state.dataProviders.categories
  );

  const afterUpdate =  useCallback((data : any) => {
    if(data.errors || data.error){
      toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
        autoClose: 5000,
        theme: 'colored'
        });
    } else {
      dispatch(setCategories(categories.map((caliber : GenericModel) => caliber._id === data._id ? { ...caliber, ...data} : caliber)))
      toast(`Successfully saved`, {
        autoClose: 2000,
        theme: 'dark'
        });
    }
  }, [categories])

  const afterStore = useCallback((data: any) => {

    {if(data.errors || data.error){
      toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
        autoClose: 5000,
        theme: 'colored'
        });
    } else {
      if(categories.length > 0){
        dispatch(setCategories([...categories, ...[data]]))
      }
      toast(`Successfully saved`, {
        autoClose: 2000,
        theme: 'dark'
        });
    }
  }

  }, [categories])

  return (
    <Layout title={'Categories'} >
      <Abm
      table={{
        columns: useMemo(() => [
          {key: 'name', title: 'Name'},
          {key: 'createdAt', title: 'created', format:(value: string) => formatDateTime(value) || '' },
          {key: 'edit', title: 'Edit'},
          {key: 'delete', title: 'Delete'},
        ],[]),
        urlIndex: Routes.CATEGORIES.INDEX,
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
        urlDelete: Routes.CATEGORIES.DELETE,
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
        urlStore: Routes.CATEGORIES.STORE,
        urlUpdate: Routes.CATEGORIES.UPDATE,
        urlShow: Routes.CATEGORIES.SHOW,
        closable: true,
        title: 'Save product type',
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
