import { BaseProps } from "../Form/Form.type";

export interface PropsTextArea extends BaseProps {
    onTextarea?: Function;
    colsArea?: number
    rows?: string
}

export interface PropsTextAreaKey extends PropsTextArea {
    key: string;
}