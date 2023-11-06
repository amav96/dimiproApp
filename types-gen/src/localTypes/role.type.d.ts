import { Permission } from './permission.type';
export interface IRole {
    _id: string;
    id: string;
    name: string;
    permissions: Permission[];
}
