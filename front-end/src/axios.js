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
    // view a specific tutor
    viewTutor(data) {
        return instance.get(backendAddr+'/user/'+data)
    },
    // get all review for a specific user
    getReviewById(data) {
        return instance.get(backendAddr+'/user/review/'+data)
    },
    // get created tutorials for a specific tutor
    getCreatedTutorialForTutor(data){
        return instance.get(backendAddr + '/user/created/'+data)
    },
    // delete user
    delUser(data) {
        return instance.post(backendAddr+'/user/delUser', data)
    },
    // get all tutorials
    getAllTutorial(){
        return instance.get(backendAddr + '/tutorial')
    },
    getTutorialAmount(){
        return instance.get(backendAddr + '/tutorial/size')
    },
    getTutorialsByPageId(data){
        return instance.get(backendAddr + '/tutorial/page/'+data)
    },
    // create tutorial
    createTutorial(data){
        return instance.post(backendAddr+'/tutorial', data)
    },
    // view a specific tutorial
    viewTutorial(data) {
        return instance.get(backendAddr+'/tutorial/info/'+data)
    },
    // get all reviews of a specific tutorial
    getReview(data) {
        return instance.get(backendAddr+'/tutorial/review/'+data)
    },
    // finish a specific tutorial
    finishTutorial(data) {
        return instance.get(backendAddr+'/tutorial/finish/'+data)
    },
    // delete a specific tutorial
    delTutorial(data) {
        return instance.get(backendAddr+'/tutorial/delete/'+data)
    },
    sendFeedback(data){
        return instance.post(backendAddr+'/tutorial/feedback',data)
    },
    // enroll tutorial
    enrollTutorial(data){
        return instance.post(backendAddr+'/enroll', data)
    },
    // withdraw a specific enrollment
    withdraw(data) {
        return instance.delete(backendAddr+'/enroll/'+data.id)
    },
    updateTutorial(data){
        return instance.put(backendAddr+'/tutorial/info/'+data.classId,data)
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
    // get my reviews
    getMyReview() {
        return instance.get(backendAddr+'/myinfo/myReview')
    },
    // get my received reviews
    getMyReceivedReview() {
        return instance.get(backendAddr+'/myinfo/receivedReview')
    },
}
