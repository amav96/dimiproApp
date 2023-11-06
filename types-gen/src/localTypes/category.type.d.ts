export interface ICategory {
    _id: string;
    id: string;
    name: string;
}
export type ICategorySave = Omit<ICategory, "_id" | "id">;
export interface ICategoryProps {
    category: ICategory | null;
    open: boolean;
    onCancel: Function;
    onUpdate: Function;
    onStore: Function;
}
