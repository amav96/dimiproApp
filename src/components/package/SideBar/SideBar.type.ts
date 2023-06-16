export interface Item {
    title: string,
    colorTextItem?: string,
    image: string,
    name?: any,
    path?: any,
    redirect?: string,
    visible?: boolean,
    onNavigate?: Function
}


export interface ItemSideBarProps extends Item{
    deployed?: boolean,
    subSection?: Array<Item>
}

export interface Menu {
    top: Array<ItemSideBarProps>;
    above: Array<ItemSideBarProps>
}

export interface SideBarProps {
    background?: string,
    colorScrollBar?: string,
    colorTextItem?: string,
    menu: Menu
}
