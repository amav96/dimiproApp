import React, { useEffect, useRef, useState } from 'react'
import { TableAliveProps } from '../Table/Table.type'
import Table from '../Table/Table'

export function TableAlive(props: TableAliveProps<string>) {
  const { columns, scopedColumns, items, onChangePage, urlIndex, page, limit, keyPage = '_page', keyLimit = '_limit', requestConfiguration } = props;

  const [localItems, setLocalItems] = useState<Array<any>>([])
  const pagination = useRef<{
    page: number,
    limit: number
  }>({
    page: 1,
    limit: 10
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

  useEffect(() => {
    if(urlIndex){
      getItems()
    }
  }, [])

  useEffect(() => {
    if(items?.length === 0 && localItems.length > 0){
      setLocalItems([])
    } else if(items) {
      setLocalItems((prev) => ([...prev, ...items]))
    }
  }, [items])
  

  return (
    <Table
    items={localItems}
    columns={columns}
    scopedColumns={scopedColumns}
    onChangePage={changePage}
    />
  )
}
