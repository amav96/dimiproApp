import React, { useMemo } from 'react'
import { TableAlive } from '../../components/TableAlive/TableAlive';

export function Dashboard() {

  const columns = useMemo(() => [
    {key: 'userId', title: 'userId'},
    {key: 'id', title: 'id'},
    {key: 'title', title: 'Titulo'},
    {key: 'body', title: 'Contenido'},
  ],[])

  return (
    <div>
      <TableAlive
      columns={columns}
      urlIndex={'https://jsonplaceholder.typicode.com/posts'}
      />
    </div>
  )
}
