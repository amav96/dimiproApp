import { City, Country, State } from "./places.type";


export interface Prefix {
  _id: string,
  name: string
}

export interface User  {
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