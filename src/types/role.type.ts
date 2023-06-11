import { Permission } from './permission.type';

export interface Role  {
    name: string,
    permissions: Permission[];
}