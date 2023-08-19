import { BaseProps } from '@packageTypes'

export interface PropsSwitch extends BaseProps {
    option?: object | number | string | boolean;
    label?: string;
    trackBy?: string;
    onSwitch?: Function;
    defaultValue?: any
  }
  
  export interface PropsSwitchKey extends PropsSwitch {
    key: string;
  }