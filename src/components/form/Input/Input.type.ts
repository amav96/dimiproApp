import { BaseProps } from "../../../types/Form";

export interface PropsInput extends BaseProps {
    listenChange?: Function;
    listenForm?: Function;
  }
  
  export type BaseInput = Omit<BaseProps, "multiple">;