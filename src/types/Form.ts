export interface PropsBaseInput {
    placeholder?: string,
    cols?: string,
    value: string | number,
    onChange?: Function,
    name: string,
    rules? : object,
    hidden? : boolean,
    type? : string,
}