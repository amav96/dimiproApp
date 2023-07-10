
import { 
  Validations,
  PropsInput,
  PropsSelect,
  PropsDate,
  PropsTextArea,
  PropsSwitch,
  PropsFile } from "@packageTypes";


export interface BaseProps {
  icon?: string;
  placeholder?: string;
  value: any;
  name: string;
  type?: "text" |
  "textarea" |
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
  "email" |
  "password" 
  title?: string;
  disabled?: boolean;
  state?: boolean | null;
  hidden?: boolean;
  className?: string;
  onChange?: Function;
  validations?: Validations;
  errors?: Array<string>;
  cols?: string;
  formatValue?: Function,
  customClass?: string
}

// -----------------Form--------------------

export interface Slot {
  slot: boolean,
  key: string
}

export interface GlobalInputs extends 
    PropsInput,
    PropsSelect,
    PropsFile,
    PropsDate,
    PropsSwitch,
    PropsDate,
    PropsTextArea {
  key: string;
  slot?: boolean;
}

export type field<K extends string | number> = {
  [key in K]: ((data : { input: GlobalInputs, formValues: any} ) => React.ReactNode) | undefined;
}

// ----------------------------------------------
