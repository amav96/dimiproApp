import { Packaging } from "./packaging.types"
import { Role } from "./role.type"

export interface DataProvider {
    errors? : {
        message : string
    }
    dataProviders: {
        roles: Role[]
        packagings: Packaging[]
    }
}

export type ModelsDataProvider = 'roles' | 'packagings'