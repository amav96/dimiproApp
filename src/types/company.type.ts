import { ICity, ICountry, IState } from './places.type';
import { Prefix } from './prefix.type';

export interface ICompany  {
  _id:string,
  id:string,
  name: string,
  email: string,
  postalCode?: string,
  country: ICountry,
  state: IState,
  city?: ICity | null,
  vat?: string,
  prefix?: Prefix,
  phoneNumber?: number,
  exporter: number,
  importer: number,
  broker: number,
  website?: string,
}

export type ISaveCompany = Omit<ICompany, "_id" | "id">

export interface IPropsCompany {
  company : ICompany | null
  open: boolean
  onCancel: Function
  onUpdate: Function
  onStore: Function
}

export interface IFilterCompany {
  name?: string,
  email?: string,
  country?: string[],
  exporter?: number
  importer?: number
  broker?: number
}