import baseApiUrl from "../BaseApiUrl";
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
    DATA_PROVIDER: {
        INDEX: baseApiUrl + '/api/v1/dataProviders',
    }
}