import { Permission } from './permission.type';

export interface Role  {
    _id?:string,
    id?:string,
    name: string,
    permissions: Permission[];
}