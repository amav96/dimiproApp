export const authorization = () :string =>{
    const token = localStorage.getItem('token');
    if(token) {
        return `Bearer ${token}`
    }
    return ''
}