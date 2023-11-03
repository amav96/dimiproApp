import baseApiUrl from "./BaseApiUrl";
const apiPlaceHolder = 'https://jsonplaceholder.typicode.com'
export const Routes = {
    POSTS : {
        INDEX: apiPlaceHolder + '/posts',
        STORE: apiPlaceHolder + '/posts',
        UPDATE: apiPlaceHolder + '/posts',
        SHOW: apiPlaceHolder + '/posts',
        DELETE: apiPlaceHolder + '/posts',
    },
    AUTH: {
        LOGIN: baseApiUrl + '/api/v1/auth/login', 
        PERMISSIONS: baseApiUrl + '/api/v1/auth/permissions', 
    },
    USERS: {
        INDEX: baseApiUrl + '/api/v1/users',
        STORE: baseApiUrl + '/api/v1/users',
        UPDATE: baseApiUrl + '/api/v1/users',
        SHOW: baseApiUrl + '/api/v1/users',
        DELETE: baseApiUrl + '/api/v1/users',
    },
    
    CALIBERS: {
        INDEX: baseApiUrl + '/api/v1/calibers',
        STORE: baseApiUrl + '/api/v1/calibers',
        UPDATE: baseApiUrl + '/api/v1/calibers',
        SHOW: baseApiUrl + '/api/v1/calibers',
        DELETE: baseApiUrl + '/api/v1/calibers',
    },
    CATEGORIES: {
        INDEX: baseApiUrl + '/api/v1/categories',
        STORE: baseApiUrl + '/api/v1/categories',
        UPDATE: baseApiUrl + '/api/v1/categories',
        SHOW: baseApiUrl + '/api/v1/categories',
        DELETE: baseApiUrl + '/api/v1/categories',
    },
    COMPANIES: {
        INDEX: baseApiUrl + '/api/v1/companies',
        STORE: baseApiUrl + '/api/v1/companies',
        UPDATE: baseApiUrl + '/api/v1/companies',
        SHOW: baseApiUrl + '/api/v1/companies',
        DELETE: baseApiUrl + '/api/v1/companies',
    },
    CONTRACTS: {
        INDEX: baseApiUrl + '/api/v1/contracts',
        STORE: baseApiUrl + '/api/v1/contracts',
        UPDATE: baseApiUrl + '/api/v1/contracts',
        SHOW: baseApiUrl + '/api/v1/contracts',
        DELETE: baseApiUrl + '/api/v1/contracts',
        ADD_DOCUMENT:  baseApiUrl + '/api/v1/contracts/add-documents',
        REMOVE_DOC: baseApiUrl + '/api/v1/contracts/remove-document',
    },
    CURRENCIES: {
        INDEX: baseApiUrl + '/api/v1/currencies',
        STORE: baseApiUrl + '/api/v1/currencies',
        UPDATE: baseApiUrl + '/api/v1/currencies',
        SHOW: baseApiUrl + '/api/v1/currencies',
        DELETE: baseApiUrl + '/api/v1/currencies',
    },
    PACKAGINGS: {
        INDEX: baseApiUrl + '/api/v1/packagings',
        STORE: baseApiUrl + '/api/v1/packagings',
        UPDATE: baseApiUrl + '/api/v1/packagings',
        SHOW: baseApiUrl + '/api/v1/packagings',
        DELETE: baseApiUrl + '/api/v1/packagings',
    },
    PAYMENTMETHODS: {
        INDEX: baseApiUrl + '/api/v1/payment-methods',
        STORE: baseApiUrl + '/api/v1/payment-methods',
        UPDATE: baseApiUrl + '/api/v1/payment-methods',
        SHOW: baseApiUrl + '/api/v1/payment-methods',
        DELETE: baseApiUrl + '/api/v1/payment-methods',
    },
    PRODUCTS: {
        INDEX: baseApiUrl + '/api/v1/products',
        STORE: baseApiUrl + '/api/v1/products',
        UPDATE: baseApiUrl + '/api/v1/products',
        SHOW: baseApiUrl + '/api/v1/products',
        DELETE: baseApiUrl + '/api/v1/products',
    },
    SURVEYORS: {
        INDEX: baseApiUrl + '/api/v1/surveyors',
        STORE: baseApiUrl + '/api/v1/surveyors',
        UPDATE: baseApiUrl + '/api/v1/surveyors',
        SHOW: baseApiUrl + '/api/v1/surveyors',
        DELETE: baseApiUrl + '/api/v1/surveyors',
    },
    DATA_PROVIDER: {
        INDEX: baseApiUrl + '/api/v1/dataProviders',
    },
    baseApiUrl: baseApiUrl + '/api/v1/',
}