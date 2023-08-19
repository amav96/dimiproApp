import React, { useCallback, useEffect, useState } from "react";
import { TableProps } from "@packageTypes";
import "./Table.scss";
import debounce from "@services/utils/Debounce";
import { getProperty } from "@services/utils/Property";


export function Table(props: TableProps<string>) {
  const {
    columns,
    scopedColumns,
    items,
    onChangePage,
    headerSticky,
    scrollbar = { height: "8", width: "8" },
    loading = false
  } = props;

  const [localItems, setLocalItems] = useState<Array<any>>([]);

  useEffect(() => {
    if(items?.length === 0 && localItems.length > 0){
      setLocalItems([])
    } else if(items){
      setLocalItems(items)
    }
  }, [items]);

  const scrollTable = useCallback(() => {
    if (onChangePage) {
      const tableWrapper = document.querySelector(".table-wrapper");
      if (tableWrapper instanceof HTMLElement) {
        // desplazamiento superior
        const scrollTopTableWrapper = tableWrapper.scrollTop;
        // altura de compensación para la envoltura de tabla

        const offsetHeightTableWrapper = tableWrapper?.offsetHeight;
        const tableMain = document.querySelector(".table-main");
        // altura de compensación para la tabla
        let offsetHeightTableMain = 0;
        if (tableMain instanceof HTMLElement) {
          offsetHeightTableMain = tableMain.offsetHeight;
        }
        // Number(scrollbar.height) son los pixeles que se le suman o restan al table-wrapper
        // let calculateOffsetHeightTableMain = offsetHeightTableMain + Number(scrollbar.height);
        let calculateOffsetHeightTableMain = offsetHeightTableMain;
        // si el desplazamiento superior de la envoltura mas la altura de compensacion de envoltura es igual a la altura de compensacion de la tabla
        if (
          scrollTopTableWrapper + offsetHeightTableWrapper >=
          calculateOffsetHeightTableMain
        ) {
          onChangePage();
        }
      }
    }
  }, [onChangePage]);

  const showText = (row: any, column: any) => {
    let value = getProperty(row, column.key);
    if (column.format) {
      return column.format(value);
    }
    return value;
  };

  const classThead = (): React.CSSProperties => {
    if (headerSticky) {
      return { position: "sticky", top: 0 };
    }
    return { position: "sticky", top: 0 };
  };

  return (
    <div className="table-wrapper" onScroll={debounce(scrollTable, 300)}>
      <style>
        {`.table-wrapper::-webkit-scrollbar {
          height: ${scrollbar.height}px;
          width: ${scrollbar.width}px;
        }`}
      </style>
      <table className="table-main">
        <thead style={classThead()}>
          <tr>
            {columns &&
              columns.map((column, i) => (
                <th key={`th-${i}`}>{column.title}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {localItems &&
            localItems.map((row: any, index) => (
              <tr key={`tr-${index}`}>
                {columns &&
                  columns.map((column, iCol) => {
                    if (scopedColumns?.[column.key]) {
                      return (
                        <React.Fragment key={`slot-${iCol}`}>
                          <td className="border-table-app">
                            {
                              scopedColumns[column.key]({
                                item: row,
                                index,
                              }) as keyof object
                            }
                          </td>
                        </React.Fragment>
                      );
                    }
                    return (
                      <td key={`td-${iCol}`} className="border-table-app">
                        {showText(row, column)}
                      </td>
                    );
                  })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
