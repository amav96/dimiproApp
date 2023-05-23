import { PropsInput } from "../Input/InputType";
import { PropsSelect } from "../Select/SelectType";
import { Validations } from "../../types/Validations";
import { PropsDate } from "../DatePack/DatePackType";
import { PropsTextArea } from "../Textarea/TextareaType";
import { PropsSwitch } from "../Switch/SwitchType";
import { PropsFile } from "../File/FileType";

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
  "file"
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
