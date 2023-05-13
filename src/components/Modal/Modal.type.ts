export interface PropModal {
    size?: string,
    isOpen: Boolean,
    style?: object,
    children?: JSX.Element | JSX.Element[],
    overlay?: string,
    closeModal?: Function,
    keep?: Boolean
}

export interface ModalPortalProps {
    children?: JSX.Element | JSX.Element[],
    size?: string,
    closeModal?: Function,
    keep?: Boolean
}