import { BaseProps } from "../Form/Form.type";

export interface PropsFile extends BaseProps {
    listenChange?: Function;
    listenForm?: Function;
    accept?: Array<string>
}

export interface PropsFileKey extends PropsFile {
    key: string;
  }

export type AcceptTypes =  "application/vnd.ms-excel" |
                    "application/pdf" |
                    "image/png" |
                    "image/jpeg" |
                    "image/jpg"