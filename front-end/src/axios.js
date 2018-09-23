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
    // get all user
    GetUser () {
        return instance.get(backendAddr+'/user')
    },
    // delete user
    delUser(data) {
        return instance.post(backendAddr+'/user/delUser', data)
    },
    // get all tutorials
    getAllTutorial(){
        return instance.get(backendAddr + '/tutorial')
    },
    // create tutorial
    createTutorial(data){
        return instance.post(backendAddr+'/tutorial', data)
    },
    // enroll tutorial
    enrollTutorial(data){
        return instance.post(backendAddr+'/enroll', data)
    },
    // get enrolled tutorials
    getEnrolledTutorial(){
        return instance.get(backendAddr + '/myinfo/enrolled')
    },
    // get finished tutorials
    getFinishedTutorial(){
        return instance.get(backendAddr + '/myinfo/finished')
    },
    // get created tutorials
    getCreatedTutorial(){
        return instance.get(backendAddr + '/myinfo/created')
    },
    // view a specific tutorial
    viewTutorial(data) {
        return instance.post(backendAddr+'/tutorial', data)
    },
    // finish a specific tutorial
    finishTutorial(data) {
        return instance.post(backendAddr+'/tutorial/finish', data)
    },
    // withdraw a specific enrollment
    withdraw(data) {
        return instance.delete(backendAddr+'/enroll', data)
    },
    // delete a specific tutorial
    delTutorial(data) {
        return instance.delete(backendAddr+'/tutorial', data)
    },
}
