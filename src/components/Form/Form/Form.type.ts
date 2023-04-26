import { PropsInput } from "../Input/Input.type";
import { PropsSelect } from "../Select/Select.type";
import { Validations } from "../../../types/Validations";
import { PropsDate } from "../DatePack/DatePack.type";
import { PropsTextArea } from "../Textarea/Textarea.type";
import { PropsSwitch } from "../Switch/Switch.type";
import { PropsFile } from "../File/File.type";

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
  validations?: Validations;
  errors?: Array<string>;
  cols?: number;
}

// -----------------Form--------------------

export interface Inputs extends
    PropsInput,
    PropsSelect,
    PropsFile,
    PropsDate,
    PropsSwitch,
    PropsDate,
    PropsTextArea
     {
}

export interface generatedInputs extends 
    PropsInput,
    PropsSelect,
    PropsFile,
    PropsDate,
    PropsSwitch,
    PropsDate,
    PropsTextArea {
  key: string;
  slot: boolean;
}

// ----------------------------------------------
