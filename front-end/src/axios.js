/* eslint-disable */
import axios from 'axios'
import router from './router/index'
import store from './store/index'
import * as types from './store/types'

axios.default.timeout = 3000
const backendAddr = "http://localhost:3000";

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if(localStorage.getItem('token')) {
		config.headers.Authorization = `${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
	}else{
        config.headers.Authorization = '';
    }
	return config
}, err => {
	return Promise.reject(err)
})
// axios intercept response
instance.interceptors.response.use(response => {
	return response
}, err => {
	return Promise.reject(err)
})

export default {
    // sign up
    userRegister(data) {
        console.log(data);
        return instance.post(backendAddr+'/user/register', data)
    },
    // login
    UserLogin(data) {
        return instance.post(backendAddr+'/user/login', data)
    },
    // get user
    GetUser () {
        return instance.get(backendAddr+'/user')
    },
    // delete user
    delUser(data) {
        return instance.post(backendAddr+'/user/delUser', data)
    },
    getAllTutorial(){
        return instance.get(backendAddr + '/tutorial')
    }
}
