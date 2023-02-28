export interface PropsInput {
    placeholder?: string,
    cols?: string,
    value?: string | number,
    onChange?: Function,
    name: string,
    rules? : object,
    hidden? : boolean,
    type? : string,
    disabled?: boolean
}

export interface PropsSelect{
    placeholder?: string,
    cols?: string,
    value?: string | number | Array<any> | object,
    onChange?: Function,
    name: string,
    rules? : object,
    hidden? : boolean,
    type? : string,
    disabled?: boolean
    options: Array<any>,
    multiselect?: boolean,
    clearable?: boolean,
    label?: string,
    trackBy?: string,
    repeatable?: boolean
   
}