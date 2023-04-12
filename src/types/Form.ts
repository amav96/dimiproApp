import { IValidations } from "./Validations";

type InputsTypes =  "text" |
                    "number" |
                    "time" |
                    "date" |
                    "color" |
                    "slot" |
                    "check" |
                    "switch" |
                    "select" |
                    "multiple" |
                    "datetime" |
                    "file" | 
                    "textarea"

export interface BaseProps {
  placeholder?: string;
  value: any;
  name: string;
  type?: InputsTypes;
  title?: string;
  disabled?: boolean;
  state?: boolean | null;
  hidden?: boolean;
  className?: string;
  onChange?: Function;
  validations?: IValidations;
  errors?: Array<string>;
  cols?: number;
}

// -----------------Input-----------------------

export interface PropsInput extends BaseProps {
  listenChange?: Function;
  listenForm?: Function;
}

export type BaseInput = Omit<BaseProps, "multiple">;


// ----------------------------------------------


// -----------------TextArea-----------------------

export interface PropsTextArea extends BaseProps {
  rows?: number;
  maxRows?: number;
  listenChange?: Function;
  listenForm?: Function;
}

// ----------------------------------------------

// -----------------Select------------------------

export interface PropsSelect extends BaseProps {
    options?: Array<any>;
    label?: string;
    trackBy?: string;
    searchable?: boolean;
    listenRemove?: Function;
    listenSelect?: Function;
    listenForm?: Function;
    multiple?: boolean;
    clearable?: boolean,
    repeatable?: boolean,
}

export interface PropsSelectKey extends PropsSelect {
  key: string;
}

// ----------------------------------------------

// -----------------File------------------------

export type AcceptTypes =  "application/vnd.ms-excel" |
                    "application/pdf" |
                    "image/png" |
                    "image/jpeg" |
                    "image/jpg"

export interface PropsFile extends BaseProps {
  accept?: Array<AcceptTypes>;
  listenForm?: Function;
}

// ----------------------------------------------

// -----------------DatePicker-------------------

export interface PropsDatePicker extends BaseProps {
  format?: string;
  modelType?: string;
  autoApply?: boolean;
  listenChange?: Function;
  listenForm?: Function;
}

export interface PropsDatePickerClaim extends PropsDatePicker {
  key: string;
}
// ----------------------------------------------

// -----------------Switch-----------------------


export interface PropsSwitch extends BaseProps {
  option?: object | number | string | boolean;
  label?: string;
  trackBy?: string;
  listenChange?: Function;
  listenForm?: Function;
}

export interface PropsSwitchKey extends PropsSwitch {
  key: string;
}

// ----------------------------------------------

// -----------------Form--------------------

export interface Inputs extends
    PropsInput,
    PropsTextArea, 
    PropsSelect,
    PropsFile,
    PropsDatePicker,
    PropsSwitch {
}

export interface generatedInputs extends 
    PropsInput,
    PropsTextArea, 
    PropsSelect,
    PropsFile,
    PropsDatePicker,
    PropsSwitch {
  key: string;
  slot: boolean;
}

// ----------------------------------------------
