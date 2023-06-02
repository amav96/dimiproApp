
import { 
  Validations,
  PropsInput,
  PropsSelect,
  PropsDate,
  PropsTextArea,
  PropsSwitch,
  PropsFile } from "@packageTypes";


export interface BaseProps {
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
  formatValue?: Function
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

// ----------------------------------------------
