/// <reference types="react" />
import './Layout.scss';
interface LayoutProps {
    title?: string;
    textColor?: string;
    customClass?: string;
    children?: JSX.Element | JSX.Element[];
}
export declare function Layout(props: LayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
