import globalAxios from "../global/globalAxios";


export const loginCall = (values) => {
    return globalAxios.get('/sanctum/csrf-cookie').then(() => {
        return globalAxios.post('/api/login', values).then(res => res.data);
    })
}

export const registerCall = (values) => {
    return axios.post('/api/register', values).then(res => res.data);
}

export const logout = (token) => {
    globalAxios.post('/api/logout', {}, {headers: {Authorization: 'Bearer ' + token}})
}