import { Packaging } from "./packaging.types"
import { Country } from "./places.type"
import { Role } from "./role.type"

export interface DataProvider {
    errors? : {
        message : string
    }
    dataProviders: {
        roles: Role[]
        packagings: Packaging[],
        countries: Country[]
    }
}

export type ModelsDataProvider = 'roles' | 'packagings' | 'countries'