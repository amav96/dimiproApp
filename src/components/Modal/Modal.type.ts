export interface PropModal {
    size?: string,
    isOpen: Boolean,
    style?: object,
    children?: JSX.Element | JSX.Element[],
    overlay?: string,
    closeModal?: Function,
    keep?: Boolean
}