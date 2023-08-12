import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TableAliveProps } from '@packageTypes'
import {Table, Form, Button} from '@package'
import './_table_alive.scss'
import { Loader } from "@package";

export const TableAlive = forwardRef(function TableAlive(props: TableAliveProps<string>, ref: React.Ref<HTMLFormElement>) {
  const {
    inputs,
    columns,
    scopedColumns,
    items,
    onChangePage,
    urlIndex,
    page,
    limit,
    keyPage = 'page',
    keyLimit = 'limit',
    requestConfiguration,
    searchIcon,
    searchable,
    modelKey = 'items',
    header,
    headerSticky
  } = props;

  const [localItems, setLocalItems] = useState<Array<any>>([])

  useEffect(() => {
    if(items){
      setLocalItems(items)
    }
  },[items])

  const pagination = useRef<{
    page: number,
    limit: number,
    count: 0,
    has_next_page: boolean
  }>({
    page: 1,
    limit: 10,
    count: 0,
    has_next_page: false
  })
  const loading = useRef<boolean>(false)
  const changePage = () => {
    if(!loading.current && pagination.current.has_next_page){
      pagination.current.page++
      applyLookFor(currentFilters.current)
    }
  }

  const currentFilters = useRef<object>({})

  const applyLookFor = async (params: any = null, firstLook: boolean = false) :Promise<void> => {
      if(urlIndex && !loading.current){
          loading.current = true
          let queryParams : object = {}
          if(searchable && params){
              queryParams = {...queryParams, ...params}
          }
         
          queryParams = {...queryParams, ...{ [keyPage]: pagination.current.page, [keyLimit] : pagination.current.limit}}
          try {

              let params = {
                  ...{ method: "GET" },
                  ...requestConfiguration
              }

              Object.keys(queryParams).forEach((k) => {
                let param = queryParams[k as keyof object] as any;
                  if(param === null || param === '' || (Array.isArray(param) && param.length === 0)){
                      delete queryParams[k as keyof object]
                  }
              })
              currentFilters.current = queryParams
              let urlParams: any = urlIndex+'?'+ new URLSearchParams(currentFilters.current as URLSearchParams)

              const response = await fetch(urlParams, params);
              const result = await response.json();
              loading.current = false
              if(result.error){
                  alert(result.error)
              }else{
                  let data = result && Array.isArray(result)
                  ? result
                  : result && result[modelKey as keyof object] && Array.isArray(result[modelKey as keyof object])
                  ? result[modelKey as keyof object] : result
                  if(firstLook){
                    setLocalItems(data)
                  }else {
                    // lo hace asi, para mantener los registros anteriores mientras estoy escroleando, y mergeo todo
                    setLocalItems((prev) => ([...prev,... data]))
                  }
                  if(result?.pagination){
                      pagination.current.page = result.pagination.page
                      pagination.current.limit = result.pagination.limit
                      pagination.current.count = result.pagination.count
                      pagination.current.has_next_page = result.pagination.has_next_page
                  }
              }
          } catch (error) {
              alert(error)
              loading.current = false
          }

      } else if(!urlIndex) {
          console.error('Url undefined')
      }
  }

  const onSubmit = (data: any) => {
    pagination.current.page = 1
    applyLookFor(data.items, true)
  }

  const [reseting, setReseting] = useState<boolean>(false)
  const resetLookFor = async () => {
    setReseting(true)
    setLocalItems([])
    await refForm?.current?.resetValues()
    pagination.current.page = 1
    await applyLookFor()
    setReseting(false)
  }

  const refForm = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if(urlIndex){
      applyLookFor({[keyPage] :1})
    }
  }, [])
  
  //@ts-ignore
  useImperativeHandle(ref, () => ({
    localItems: localItems,
  }));


  return (
    <div >
      {
        inputs &&
        <div className="c-flex c-flex-col edit-form">
          <Form
          inputs={inputs}
          onSubmit={onSubmit}
          ref={refForm}
          >
            <div className="c-flex c-my-4">
              <Button
              customClass={'btn-primary'}
              >
                { searchIcon ? (<img src={searchIcon} alt="buscar"/>) : (<span>Buscar</span>)}
              </Button>
              <Button
              type={'button'}
              onClick={resetLookFor}
              customClass={'c-mx-2 btn-secondary'}
              >
                Limpiar filtros
              </Button>
            </div>
          </Form>
        </div>
      }
      {
        header && header
      }
      {!reseting && localItems.length === 0 && <div className="no-results"><p>No se encontraron resultados</p></div>}
      {loading && <Loader />}
      <Table
      items={localItems}
      headerSticky={headerSticky}
      columns={columns}
      scopedColumns={scopedColumns}
      onChangePage={() => changePage()}
      loading={loading.current}
      />
    </div>
  )
})
