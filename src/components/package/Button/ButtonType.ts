export interface PropsButton {
    text?: string;
    textColor?: string,
    backgroundColor?: string,
    borderColor?: string,
    customClass?: string
    padding?: string
    type?: "button" | "submit",
    onClick?: Function,
    children: JSX.Element | JSX.Element[] | string,
}