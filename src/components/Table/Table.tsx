import React, { useCallback, useEffect, useState } from 'react'
import { TableProps } from './Table.type';
import './Table.scss'
import debounce from '../../services/utils/Debounce';
import {getProperty} from '../../services/utils/Property';

export default function Table(props: TableProps<string>) {
  const { columns, scopedColumns, items, onChangePage } = props;

  const [localItems, setLocalItems] = useState<Array<any>>([])

  useEffect(() => {
    if(items?.length === 0 && localItems.length > 0){
      setLocalItems([])
    } else if(items){
      setLocalItems(items)
    }
  }, [items])

  const scrollTable = useCallback(() => {
    if (onChangePage) {
      const tableWrapper = document.querySelector('.table-wrapper');
      if (tableWrapper instanceof HTMLElement) {
        // desplazamiento superior
        const scrollTopTableWrapper = tableWrapper.scrollTop;
        // altura de compensación para la envoltura de tabla

        const offsetHeightTableWrapper = tableWrapper?.offsetHeight;
        const tableMain = document.querySelector('.table-main');
        // altura de compensación para la tabla
        let offsetHeightTableMain = 0;
        if (tableMain instanceof HTMLElement) {
          offsetHeightTableMain = tableMain.offsetHeight;
        }
        // si el desplazamiento superior de la envoltura mas la altura de compensacion de envoltura es igual a la altura de compensacion de la tabla
        if ((scrollTopTableWrapper + offsetHeightTableWrapper) >= offsetHeightTableMain) {
          onChangePage()
        }
      }
    }
  }, [onChangePage]);

  const showText = (row : any, column: any) => {
    let value = getProperty(row, column.key)
    if(column.format){
      return column.format(value)
    }
    return value
  }
  
  return (
    <div 
    className='table-wrapper'
    onScroll={debounce(scrollTable, 300)}
    >
      <table className='table-main'>
        <thead>
          <tr>
          {
            columns && columns.map((column, i) => (
              <th
              key={`th-${i}`}
              >
                {column.title}
              </th>
            ))
          }
          </tr>
        </thead>
        <tbody>
          {
            localItems && localItems.map((row : any, index) => (
              <tr key={`tr-${index}`}>
                {

                  columns && columns.map((column, iCol) => {
                    if(scopedColumns?.[column.key]){
                      return  <React.Fragment key={`slot-${iCol}`}>
                                <td
                                className="border-table-app"
                                >
                                  {scopedColumns[column.key]({item: row, index}) as keyof object}
                                </td>
                              </React.Fragment>
                    }
                    return (
                      <td 
                      key={`td-${iCol}`}
                      className="border-table-app" >
                        {
                          showText(row, column)
                        }
                      </td>
                    )
                  }
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
