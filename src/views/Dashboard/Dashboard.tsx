import React, { useMemo } from 'react'
import { TableAlive } from '../../components/TableAlive/TableAlive';
import { authorization } from '../../services/utils/Autorizathion';

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
      requestConfiguration={{
        method: 'GET',
        headers: {
          Authorization: authorization()
        }
      }}
      />
    </div>
  )
}
