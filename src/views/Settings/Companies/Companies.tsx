import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Abm, Layout } from '@package'
import { Routes } from '@services/utils/Routes'
import { authorization } from '@services/utils/Autorizathion'
import { GlobalInputs } from '@packageTypes'
import baseApiUrl from '@services/BaseApiUrl'
import { formatDateTime } from '@services/utils/Formatters'
import {  toast } from 'react-toastify';
import './Companies.scss'
import useDataProvider from '@hooks/useDataProvider'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import PlaceRepository from '@repositories/places.repository'
import { Country } from 'src/types/places.type'

const placeController = new PlaceRepository()

export function Companies() {

  const{ getDataProviders } = useDataProvider()
  const countries = useAppSelector((state: RootState) => state.dataProviders.countries);
  const prefixs = useAppSelector((state: RootState) => state.dataProviders.prefixs);
  useEffect(() => {
    getDataProviders(['countries', 'prefixs'])
  }, [])

  useEffect(() => {
    // Actualizar formCrud cuando cambie roles
    setFormCrud((prevInputs) =>
      prevInputs.map((input) => {
        if (input.key === 'country') {
          return {
            ...input,
            options: countries,
          };
        }
        if (input.key === 'prefix') {
          return {
            ...input,
            options: prefixs,
          };
        }
        return input;
      })
    );

    setFormFilter((prevInputs) =>
      prevInputs.map((input) => {
        if (input.key === 'countries') {
          return {
            ...input,
            options: countries,
          };
        }
        if (input.key === 'prefix') {
          return {
            ...input,
            options: prefixs,
          };
        }
        return input;
      })
    );
  }, [countries,prefixs]);

  const currentCountry = useRef<number>(0);
  const onCountry = async (data: any) => {
    try {
      if(currentCountry.current === data.value.id) return
      currentCountry.current = data.value.id
      let result = await placeController.getStatesByCountry(data.value.id)
      const {states} = result
      if(states){
        setFormCrud((prevInputs) =>
        prevInputs.map((input) => {
          if(input.key === 'state'){
            return {
              ...input,
              options: states,
            };
          }
          return input
        })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const currentState = useRef<string>('');
  const onState = async (data: any) => {
    if(currentState.current === data.value.iso2) return
    try {
      let result = await placeController.getCitiesByCountryAndState(currentCountry.current, data.value.iso2)
      currentState.current = data.value.iso2
      const {cities} = result
      if(cities){
        setFormCrud((prevInputs) =>
        prevInputs.map((input) => {
          if(input.key === 'city'){
            return {
              ...input,
              options: cities,
            };
          }
          return input
        })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [formCrud, setFormCrud] = useState<GlobalInputs[]>([
      {
        key: 'name',
        placeholder : 'Name',
        name: 'name',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
        title: 'Name:',
        validations: {
          rules: {
            required: true,
          },
        },
      },
      {
        key: 'email',
        placeholder : 'E-mail',
        name: 'email',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
        title: 'E-mail:',
        validations: {
          rules: {
            required: true,
          },
        },
      },
      {
        key: 'website',
        placeholder : 'Website',
        name: 'website',
        title: 'Website:',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
      },
      {
        key: 'postalCode',
        placeholder : 'Postal Code',
        name: 'postalCode',
        title: 'Postal Code:',
        value: '',
        type: 'text',
        cols: 'c-col-span-4'
      },
      {
        key: 'country',
        placeholder: 'Country',
        name: 'country',
        value: [],
        options: countries,
        type: 'select',
        cols: 'c-col-span-4',
        title: 'Country:',
        clearable: true,
        onSelect : onCountry,
        validations: {
          rules: {
            required: true,
          },
        },
      },
      {
        key: 'state',
        placeholder: 'State',
        name: 'state',
        value: [],
        options: [],
        type: 'select',
        title: 'State:',
        cols: 'c-col-span-4',
        clearable: true,
        onSelect : onState,
        validations: {
          rules: {
            required: true,
          },
        },
      },
      {
        key: 'city',
        placeholder: 'City',
        name: 'city',
        title: 'City:',
        value: [],
        options: [],
        type: 'select',
        cols: 'c-col-span-4',
        clearable: true,
        validations: {
          rules: {
            required: true,
          },
        },
      },
      {
        key: 'address',
        placeholder: 'Address',
        name: 'address',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
        title: 'Address:',
        validations: {
          rules: {
            required: true,
          }
        }
      },
      {
        key: 'prefix',
        placeholder: 'Prefix|Code',
        name: 'prefix',
        label: 'fullName',
        title: 'Prefix|Code:',
        value: [],
        options: prefixs,
        type: 'select',
        cols: 'c-col-span-4',
      },
      {
        key: 'phoneNumber',
        placeholder: 'Phone Number',
        name: 'phoneNumber',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
        title: 'Phone Number:',
        validations: {
          rules: {
            required: true,
          },
        },
      },
      {
        key: 'vat',
        placeholder: 'Vat',
        name: 'vat',
        value: '',
        type: 'text',
        title: 'Vat:',
        cols: 'c-col-span-4',
      },
      {
        key: 'logo',
        placeholder: 'Logo',
        name: 'logo',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
        title: 'Logo:',
      },
      {
        key: 'exporter',
        label : 'Exporter',
        name: 'exporter',
        option: 1,
        defaultValue: 0,
        value: null,
        type: 'switch',
        cols: 'c-col-span-2',
      },
      {
        key: 'importer',
        label : 'Importer',
        name: 'importer',
        option: 1,
        defaultValue: 0,
        value: null,
        type: 'switch',
        cols: 'c-col-span-2',
      },
      {
        key: 'broker',
        label : 'Broker',
        name: 'broker',
        option: 1,
        defaultValue: 0,
        value: null,
        type: 'switch',
        cols: 'c-col-span-2',
      },
      // {
      //   key: 'color',
      //   placeholder: 'Color',
      //   name: 'color',
      //   value: '',
      //   type: 'color',
      //   cols: 'c-col-span-6',
      //   title: 'Color:',
      // },
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
      key: 'email',
      placeholder : 'Email',
      name: 'email',
      value: '',
      type: 'text',
      cols: 'c-col-span-4'
    },
    {
      key: 'postalCode',
      placeholder : 'postal Code',
      name: 'postalCode',
      value: '',
      type: 'text',
      cols: 'c-col-span-4'
    },
    {
      key: 'countries',
      placeholder: 'Countries',
      name: 'countries',
      value: [],
      options: countries,
      multiple: true,
      type: 'select',
      cols: 'c-col-span-4',
      formatValue : (value: Country[]) => value.map((v:Country) => v.id) || [],
    },
    {
      key: 'exporter',
      label : 'Exporter',
      name: 'exporter',
      option: 1,
      defaultValue: 0,
      value: null,
      type: 'switch',
      cols: 'c-col-span-2'
    },
    {
      key: 'importer',
      label : 'Importer',
      name: 'importer',
      option: 1,
      defaultValue: 0,
      value: null,
      type: 'switch',
      cols: 'c-col-span-2'
    },
    {
      key: 'broker',
      label : 'Broker',
      name: 'broker',
      option: 1,
      defaultValue: 0,
      value: null,
      type: 'switch',
      cols: 'c-col-span-2'
    }
  ])

  return (
    <Layout title={'Companies'} >
      <Abm
      table={{
        columns: useMemo(() => [
          {key: 'name', title: 'Name'},
          {key: 'email', title: 'Email'},
          {key: 'postalCode', title: 'CP'},
          {key: 'exporter', title: 'Exporter', format:(value: number) => value === 1 ? <div className="circle green"></div> : <div className="circle gray"></div>},
          {key: 'importer', title: 'Importer', format:(value: number) => value === 1 ? <div className="circle green"></div> : <div className="circle gray"></div>},
          {key: 'broker', title: 'Broker', format:(value: number) => value === 1 ? <div className="circle green"></div> : <div className="circle gray"></div>},
          {key: 'createdAt', title: 'created', format:(value: string) => formatDateTime(value) || '' },
          {key: 'edit', title: 'Edit'},
          {key: 'delete', title: 'Delete'},
        ],[]),
        urlIndex: Routes.COMPANIES.INDEX,
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
        urlDelete: Routes.COMPANIES.DELETE,
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
        urlStore: Routes.COMPANIES.STORE,
        urlUpdate: Routes.COMPANIES.UPDATE,
        urlShow: Routes.COMPANIES.SHOW,
        closable: true,
        title: 'Save Company',
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
