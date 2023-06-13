import { BaseProps } from '@packageTypes'

export interface PropsSelect extends BaseProps {
    placeholder?: string;
    options?: Array<any>;
    label?: string;
    trackBy?: string;
    searchable?: boolean;
    onRemove?: Function;
    onSelect?: Function;
    listenForm?: Function;
    multiple?: boolean;
    clearable?: boolean,
    repeatable?: boolean,
}

export interface PropsSelectKey extends PropsSelect {
  key: string;
}

export interface onChangeSelect {
    value: Array<any> | object
}