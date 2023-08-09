import { BaseProps } from '@packageTypes'

export interface PropsFile extends BaseProps {
    listenChange?: Function;
    listenForm?: Function;
    onRemove?: Function;
    accept?: Array<string>;
    displayImages? : boolean,
    resetOnOpen?: boolean
}

export interface PropsFileKey extends PropsFile {
    key: string;
  }

export type AcceptTypes =  "application/vnd.ms-excel" |
                    "application/pdf" |
                    "image/png" |
                    "image/jpeg" |
                    "image/jpg"