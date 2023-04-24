import { BaseProps } from "../Form/Form.type";

export interface PropsInput extends BaseProps {
    listenChange?: Function;
    listenForm?: Function;
  }
  
  export type BaseInput = Omit<BaseProps, "multiple">;