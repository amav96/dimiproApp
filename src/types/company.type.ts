import { City, Country, State } from './places.type';
import { Prefix } from './prefix.type';

export interface Media {
  logo?: string,
  color?: string
}

export interface Company  {
  _id?:string,
  id?:string,
  name: string,
  email: string,
  postalCode?: string,
  country: Country,
  state: State,
  city: City,
  vat?: string,
  prefix?: Prefix,
  phoneNumber?: number,
  exporter: number,
  importer: number,
  broker: number,
  media?: Media
}