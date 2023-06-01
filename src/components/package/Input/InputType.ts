import { BaseProps } from '@packageTypes'

export interface PropsInput extends BaseProps {
    onInput?: Function;
}

export interface PropsInputKey extends PropsInput {
  key: string;
}
  
  export type BaseInput = Omit<BaseProps, "multiple">;