import axios from 'axios'
import router from './router/index'
import store from './store/index'
import * as types from './store/types'

axios.default.timeout = 3000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if(localStorage.getItem('token')) {
		config.headers.Authorization = `token ${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
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
        return instance.post('/user/register', data)
    },
    // login
    UserLogin(data) {
        return instance.post('/user/login', data)
    },
    // get user
    getUser() {
        return instance.get('/user')
    },
    // delete user
    delUser(data) {
        return instance.post('/user/delUser', data)
    }
}
