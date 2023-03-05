interface BaseProps {
    placeholder?: string;
    cols?: string;
    value: any;
    onChange?: Function;
    name: string;
    rules? : object;
    hidden? : boolean;
    type? : string;
    disabled?: boolean;
    slot?: boolean;
    class?: string;
    errors?: string | Array<string>;
}

export interface PropsInput extends BaseProps {

}

export interface PropsSelect extends BaseProps{
    options?: Array<any>,
    multiselect?: boolean,
    clearable?: boolean,
    label?: string,
    trackBy?: string,
    repeatable?: boolean,
}

type BasePropsPreparedSwitch = Omit<BaseProps,'placeholder'>

export interface PropsSwitch extends BasePropsPreparedSwitch {
    option?: object | number | string | boolean;
    label?: string;
    trackBy?: string;
}