import { ICity, ICountry, IState } from "./places.type";
import { Prefix } from "./prefix.type";
import { IRole } from './role.type';
import { ICompany } from './company.type';

export interface IUser  {
  _id:string,
  id:string,
  firstName: string,
  lastName: string,
  email: string,
  company: ICompany,
  postalCode: string,
  country: ICountry,
  state: IState,
  city: ICity,
  vat?: string,
  role: IRole,
  phoneNumber: number,
  prefix: Prefix,
  password?: string,
  created_at: Date,
  updated_at: Date,
}

export interface ISaveUser {
  firstName: string,
  lastName: string,
  email: string,
  company: string,
  postalCode: string,
  country: ICountry,
  state: IState,
  city: ICity,
  vat?: string,
  role: string,
  phoneNumber: number,
  prefix: Prefix,
  password?: string,
}

export interface IPropsUser {
  user : IUser | null
  open: boolean
  onCancel: Function
  onUpdate: Function
  onStore: Function
}

export interface IFilterUser {
  name?: string,
  email?: string,
  country?: string[],
}