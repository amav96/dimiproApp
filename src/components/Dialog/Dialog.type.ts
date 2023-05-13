export interface DialogProp {
    isOpen: boolean;
    resource?: any;
    textConfirm?: string;
    textCancel?: string;
    centered?: boolean;
    text?: string;
    cancel?: Function;
    confirm?: Function;
}