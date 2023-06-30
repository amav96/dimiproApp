import React, { useEffect, useMemo, useState } from 'react'
import { Abm, Layout } from '@package'
import { Routes } from '@services/utils/Routes'
import { authorization } from '@services/utils/Autorizathion'
import { AbmTableAliveProps, GlobalInputs } from '@packageTypes'
import baseApiUrl from '@services/BaseApiUrl'
import { Role } from '../../../types/role.type'
import { formatDateTime } from '@services/utils/Formatters'
import useDataProvider from '@hooks/useDataProvider'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { Company } from '../../../types/company.type';

export function Users() {

  const{ getDataProviders } = useDataProvider()
  const roles = useAppSelector((state: RootState) => state.dataProviders.roles);
  const companies = useAppSelector((state: RootState) => state.dataProviders.companies);
  const prefixs = useAppSelector((state: RootState) => state.dataProviders.prefixs);
  useEffect(() => {
    getDataProviders(['roles', 'companies', 'prefixs'])
  }, [])

  useEffect(() => {
    // Actualizar formInputs cuando cambie roles
    setFormInputs((prevInputs) =>
      prevInputs.map((input) => {
        if (input.key === 'roles') {
          return {
            ...input,
            options: roles,
          };
        }
        if (input.key === 'company') {
          return {
            ...input,
            options: companies,
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
  }, [roles]);

  const dataInputs: GlobalInputs[] = useMemo(
    () => [
      {
        key: 'firstName',
        placeholder: 'Nombre',
        name: 'firstName',
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
        key: 'lastName',
        placeholder: 'Apellido',
        name: 'lastName',
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
        key: 'email',
        placeholder: 'Email',
        name: 'email',
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
        key: 'company',
        placeholder: 'Compañia',
        name: 'company',
        trackBy: '_id',
        value: [],
        type: 'select',
        cols: 'c-col-span-4',
        options: companies,
        formatValue : (value: Company) => value.id
      },
      {
        key: 'roles',
        placeholder: 'Roles',
        name: 'roles',
        trackBy: '_id',
        value: [],
        type: 'select',
        multiple: true,
        cols: 'c-col-span-4',
        options: roles,
        formatValue : (value: Role[]) => value.map((v:Role) => v.id),
        validations: {
          rules: {
            required: true,
          },
        },
      },
      {
        key: 'prefix',
        placeholder: 'Prefijo/Codigo País',
        name: 'prefix',
        label: 'fullName',
        value: [],
        options: prefixs,
        type: 'select',
        cols: 'c-col-span-4',
      },
      {
        key: 'phoneNumber',
        placeholder: 'telefono',
        name: 'phoneNumber',
        value: '',
        type: 'text',
        cols: 'c-col-span-4',
      },
      {
        key: 'password',
        placeholder: 'Clave',
        name: 'password',
        value: '',
        type: 'password',
        cols: 'c-col-span-4',
      },
      {
        key: 'confirmPassword',
        placeholder: 'Confirmar Clave',
        name: 'confirmPassword',
        value: '',
        type: 'password',
        cols: 'c-col-span-4',
      },
    ],
    [roles,companies,prefixs]
  );
  
  const [formInputs, setFormInputs] = useState<GlobalInputs[]>(dataInputs);

  const filterForms : GlobalInputs[] = ([
    {
      key: 'firstName',
      placeholder : 'Nombre',
      name: 'firstName',
      value: '',
      type: 'text',
      cols: 'c-col-span-4'
    },
    {
      key: 'lastName',
      placeholder : 'Apellido',
      name: 'lastName',
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
  ])

  const [propTable, setPropTable] = useState<AbmTableAliveProps>({
    columns: useMemo(() => [
      {key: 'firstName', title: 'Nombre'},
      {key: 'lastName', title: 'Apellido' },
      {key: 'email', title: 'Email' },
      {key: 'roles', title: 'Roles', format: (value: Role[]) => {
        if(value){
          return value.map((rol) => {
            return rol.name
          }).toString()
        } else {
          return ''
        }
        
      }},
      {key: 'company', title: 'Compañia', format: (value: Company) => {
        if(value){
          return value.name
        } else {
          return 's/e'
        }
        
      }},
      {key: 'createdAt', title: 'creado', format:(value: string) => formatDateTime(value) || '' },
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
    afterDelete : (data: any) => {
      console.log('data after delete',data)
    },
    updateIcon: baseApiUrl + '/icons/editar.svg',
    deleteIcon: baseApiUrl + '/icons/basura.svg',
    headerSticky: true
  })
  return (
    <Layout title={'Users'} >
      <Abm
      table={propTable}
      modalForm={{
        inputs: formInputs,
        urlStore: Routes.USERS.STORE,
        urlUpdate: Routes.USERS.UPDATE,
        urlShow: Routes.USERS.SHOW,
        closable: true,
        title: 'Guardar usuario',
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
