import { $host, $authHost } from "./index";
import jwt_decode from 'jwt-decode'

export const signup = async (email, password) => {
    const { data } = await $host.post('api/user/signup', { email, password, role: 'USER' })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}

export const signin = async (email, password) => {
    const { data } = await $host.post('api/user/signin', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}