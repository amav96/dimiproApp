import { BaseProps } from '@packageTypes'

export interface PropsSwitch extends BaseProps {
    option?: object | number | string | boolean;
    label?: string;
    trackBy?: string;
    onSwitch?: Function;
  }
  
  export interface PropsSwitchKey extends PropsSwitch {
    key: string;
  }