import { Permission } from './permission';

export interface Role  {
    name: string,
}

export interface RolePermission  {
    role: Role,
    permission: Permission,
}