

type column<K extends string | number> = {
    [key in K]: (data : {item: any, index: number}) => string | JSX.Element | JSX.Element[] | (() => JSX.Element)
  }

  interface BaseTable<K extends string | number> {
    columns: Array<{
    key: string
    title: string
    }>;
    scopedColumns?: column<K>,
    items?: Array<any>,
    onChangePage?: Function
  }
  export interface TableProps<K extends string | number> extends BaseTable<K> {
    
  }

  export interface TableAliveProps<K extends string | number> extends BaseTable<K> {
    urlIndex: string,
    page?: number,
    limit?: number
  }
