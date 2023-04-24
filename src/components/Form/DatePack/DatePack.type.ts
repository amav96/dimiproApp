import { BaseProps } from "../Form/Form.type";

export interface PropsDate extends BaseProps {
    onCalendarClose?: Function,
    onCalendarOpen?: Function,
    isClearable?: boolean,
    placeholderText?: string,
    dateFormat?: string
}

export interface PropsDateKey extends PropsDate {
    key: string;
  }