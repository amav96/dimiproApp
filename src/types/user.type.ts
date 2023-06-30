import { City, Country, State } from "./places.type";
import { Prefix } from "./prefix.type";

export interface User  {
  _id?:string,
  id?:string,
  lastName: string,
  email: string,
  companyName: string,
  postalCode: string,
  country: Country,
  state: State,
  city: City,
  vat?: string,
  roles: string[],
  phoneNumber: number,
  prefix: Prefix,
  password?: string,
  created_at: Date,
  updated_at: Date,
}