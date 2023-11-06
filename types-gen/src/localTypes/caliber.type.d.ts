export interface ICaliber {
    _id: string;
    id: string;
    name: string;
}
export type ICaliberSave = Omit<ICaliber, "_id" | "id">;
export interface ICaliberProps {
    caliber: ICaliber | null;
    open: boolean;
    onCancel: Function;
    onUpdate: Function;
    onStore: Function;
}
