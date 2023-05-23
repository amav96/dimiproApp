import { BaseProps } from '../../types'

export interface PropsTextArea extends BaseProps {
    onTextarea?: Function;
    colsArea?: number
    rows?: string
}

export interface PropsTextAreaKey extends PropsTextArea {
    key: string;
}