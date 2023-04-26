import { BaseProps } from "../Form/Form.type";

export interface PropsTextArea extends BaseProps {
    listenChange?: Function;
    listenForm?: Function;
    colsArea?: number
    rows?: string
}