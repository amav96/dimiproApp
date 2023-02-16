import { Role } from './role';

export interface User   {
    firstName: string,
    lastName: string,
    fantansyName: string,
    address: string,
    postalCode: string,
    email: string,
    country: number,
    province: number,
    taxpayerNumber: string,
    prefix: number,
    phoneNumber: number,
    role: Role,
    password?: string,
}

export interface UserLogin {
    email: string,
    password: string,
}
