

export interface Prefix {
  _id: string,
  name: string
}

export interface User  {
  firstName: string,
  lastName: string,
  email: string,
  companyName: string,
  postalCode: string,
  countryId: number,
  cityId: number,
  vat?: string,
  roles: string[],
  phoneNumber: number,
  prefix: Prefix,
  password?: string,
  created_at: Date,
  updated_at: Date,
}

