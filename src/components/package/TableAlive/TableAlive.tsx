import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TableAliveProps } from '@packageTypes'
import {Table, Form, Button} from '@package'

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
    keyPage = '_page',
    keyLimit = '_limit',
    requestConfiguration,
    searchIcon,
    searchable,
    modelKey = 'data',
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
                  if(queryParams[k as keyof object] === null || queryParams[k as keyof object] === ''){
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
                    setLocalItems(result)
                  }else {
                    setLocalItems((prev) => ([...prev,... data]))
                  }

                  if(result?.pagination){
                      const pagination : any = result?.pagination
                      pagination.current.page = 1
                      pagination.current.limit = pagination.limit
                      pagination.current.count = pagination.count
                  }
                  // emit("getItems", localItems.value)
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

  const resetLookFor = async () => {
    await refForm?.current?.resetValues()
    pagination.current.page = 1
    await applyLookFor()
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
        <div className="c-flex c-flex-col ">
          <Form
          inputs={inputs}
          onSubmit={onSubmit}
          ref={refForm}
          >
            <div className="c-flex c-my-4">
              <Button
              >
                { searchIcon ? (<img src={searchIcon} alt="buscar"/>) : (<span>Buscar</span>)}
              </Button>
              <Button
              type={'button'}
              onClick={resetLookFor}

              customClass={'c-mx-2'}
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
      <Table
      items={localItems}
      headerSticky={headerSticky}
      columns={columns}
      scopedColumns={scopedColumns}
      onChangePage={() => changePage()}
      />
    </div>
  )
})
