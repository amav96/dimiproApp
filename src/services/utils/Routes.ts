import baseApiUrl from "../BaseApiUrl";
const apiPlaceHolder = 'https://jsonplaceholder.typicode.com'
export const Routes = {
    POSTS : {
        INDEX: apiPlaceHolder + '/posts',
        STORE: apiPlaceHolder + '/posts',
        UPDATE: apiPlaceHolder + '/posts',
        SHOW: apiPlaceHolder + '/posts',
        DELETE: apiPlaceHolder + '/posts',
    }
}