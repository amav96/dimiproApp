import { BaseProps } from "../Form/Form.type";

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