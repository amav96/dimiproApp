interface BaseInput {
    placeholder?: string,
    cols?: string,
    value?: any,
    onChange?: Function,
    name: string,
    rules? : object,
    hidden? : boolean,
    type? : string,
    disabled?: boolean
}

export interface PropsInput extends BaseInput {

}

export interface PropsSelect extends BaseInput{
    options?: Array<any>,
    multiselect?: boolean,
    clearable?: boolean,
    label?: string,
    trackBy?: string,
    repeatable?: boolean,
}
