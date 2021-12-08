import request from '@/helpers/request'
const URL={
    REGISTER: '/auth/register',
    LOGIN:'/auth/login',
    GET_INFO:'/auth',
    LOGOUT:'/auth/logout'
}
export default{
    register({username, password}) {
        return request(URL.REGISTER, 'POST', { username, password })
    },
    login({username,password}){
        return request(URL.LOGIN,'POST',{username,password})
    },
    getInfo(){
        return request(URL.GET_INFO)
    },
    logout(){
        return request(URL.LOGOUT)
    },
}