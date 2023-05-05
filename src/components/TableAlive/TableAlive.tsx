import React, { useEffect, useRef, useState } from 'react'
import { TableAliveProps } from '../Table/Table.type'
import Table from '../Table/Table'

export function TableAlive(props: TableAliveProps<string>) {
  const { columns, scopedColumns, items, onChangePage, urlIndex, page, limit } = props;

  const [localItems, setLocalItems] = useState([])

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
      const pageFilter = `_page=${pagination.current.page || 1}`;
      const limitFilter = `_limit=${pagination.current.limit || 10}`;
      const url = `${urlIndex}?${pageFilter}&${limitFilter}`;

      loading.current = true
      try {
        const response = await fetch(url);
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
  

  return (
    <Table
    items={localItems}
    columns={columns}
    scopedColumns={scopedColumns}
    onChangePage={changePage}
    />
  )
}
