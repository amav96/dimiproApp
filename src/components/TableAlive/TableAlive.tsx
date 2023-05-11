import React, { useEffect, useRef, useState } from 'react'
import { TableAliveProps } from '../Table/Table.type'
import Table from '../Table/Table'
import { Form } from '../Form';
import { Button } from '../Button/Button';

export function TableAlive(props: TableAliveProps<string>) {
  const {
    inputs,
    columns,
    scopedColumns,
    items,
    onChangePage,
    urlIndex,
    page,
    limit,
    keyPage = '_page',
    keyLimit = '_limit',
    requestConfiguration,
    searchIcon,
    searchable,
    modelKey = 'data'
  } = props;

  const [localItems, setLocalItems] = useState<Array<any>>([])

  const pagination = useRef<{
    page: number,
    limit: number,
    count: 0
  }>({
    page: 1,
    limit: 10,
    count: 0
  })
  const loading = useRef<boolean>(false)
  const changePage = () => {
    if(!loading.current){
      pagination.current.page++
      getItems()
    }
  }

  const getItems = async () => {
    if(!loading.current){
      const pageFilter = `${keyPage}=${pagination.current.page || 1}`;
      const limitFilter = `${keyLimit}=${pagination.current.limit || 10}`;
      const url = `${urlIndex}?${pageFilter}&${limitFilter}`;

      loading.current = true
      try {

        let params = {
          ...{ method: "GET" },
          ...requestConfiguration
        }

        const response = await fetch(url, params);
        const result = await response.json();
        loading.current = false
        if(result && result.length > 0) {
          setLocalItems(result)
        }
      } catch (error) {
        loading.current = false
      }
    }

  }

  const applySearch = async (search : any , formValues: any) :Promise<void> => {
      if(urlIndex && !loading.current){
          loading.current = true
          let queryParams : object = {}
          if(searchable){
              const { items } = formValues
              queryParams = {...queryParams, ...items}
          }
          queryParams = {...queryParams, ...{ page: search.page ?? pagination.current.page}}
          console.log(formValues, queryParams)
          try {

              let params = {
                  ...{ method: "GET" },
                  ...requestConfiguration
              }

              Object.keys(queryParams).forEach((k) => {
                  if(queryParams[k as keyof object] === null || queryParams[k as keyof object] === ''){
                      delete queryParams[k as keyof object]
                  }
              })
              let urlParams: any = urlIndex+'?'+ new URLSearchParams(queryParams as URLSearchParams)

              const response = await fetch(urlParams, params);
              const result = await response.json();
              loading.current = false
              if(result.error){
                  // $toast.error('Ha ocurrido un error con el servidor');
              }else{
                console.log({result})
                console.log({localItems})
                  if(result && Array.isArray(result)){
                    setLocalItems(result)
                    console.log(0)
                  }else if (result && result[modelKey as keyof object] && Array.isArray(result[modelKey as keyof object])){
                    console.log(1)
                    setLocalItems(result[modelKey as keyof object])
                  }
                  if(result?.pagination){
                    console.log(2)
                      const pagination : any = result?.pagination
                      pagination.current.page = 1
                      pagination.current.limit = pagination.limit
                      pagination.current.count = pagination.count
                  }
                  // emit("getItems", localItems.value)
              }
              console.log(3)
          } catch (error) {
              console.log(error);
              loading.current = false
              // emit('loading', false)
              // $toast.error('Ha ocurrido un error con el servidor B2');
          }

      } else if(!urlIndex) {
          console.error('Url undefined')
      }
  }

  const onSubmit = (data: any) => {
    applySearch({},data)
  }

  useEffect(() => {
    if(urlIndex){
      getItems()
    }
  }, [])

  // useEffect(() => {
  //   if(items?.length === 0 && localItems.length > 0){
  //     setLocalItems([])
  //   } else if(items) {
  //     setLocalItems((prev) => ([...prev, ...items]))
  //   }
  // }, [items])


  return (
    <div >
      {
        inputs &&
          <div className="d-flex flex-col ">
            <Form
            inputs={inputs}
            onSubmit={onSubmit}
            >
              <div className="d-flex my-4">
                <Button
                type={'submit'}
                >
                  { searchIcon ? (<img src={searchIcon} alt="buscar"/>) : (<span>Buscar</span>)}
                </Button>
                <Button
                >
                  <span className="text-black" >Limpiar filtros</span>
                </Button>
              </div>
            </Form>
          </div>
      }
      <Table
      items={localItems}
      columns={columns}
      scopedColumns={scopedColumns}
      onChangePage={changePage}
      />
    </div>
  )
}
