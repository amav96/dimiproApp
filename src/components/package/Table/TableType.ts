import { requestConfiguration, GlobalInputs } from '@packageTypes'

type column<K extends string | number> = {
    [key in K]: (data : {item: any, index: number}) => string | JSX.Element | JSX.Element[] | (() => JSX.Element)
  }

  interface BaseTable<K extends string | number> {
    columns: Array<{
    key: string
    title: string,
    format?: Function
    }>;
    scopedColumns?: column<K>,
    items?: Array<any>,
    onChangePage?: Function,
    headerSticky?: boolean
  }
  export interface TableProps<K extends string | number> extends BaseTable<K> {
  }

  export interface TableAliveProps<K extends string | number> extends BaseTable<K> {
    urlIndex: string,
    page?: number,
    limit?: number
    keyPage? : string,
    keyLimit? : string,
    requestConfiguration: requestConfiguration,
    inputs?: Array<GlobalInputs>;
    searchIcon?: string
    searchable?: boolean,
    modelKey? : string,
    header?: JSX.Element | JSX.Element[],
  }
