import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
        },
        {
            path: '/myInfo',
            name: 'my-info',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/MyInfo.vue')
        },
        {
            path: '/enroll',
            name: 'enroll',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/Enroll.vue')
        },
        {
            path: '/createTutorial',
            name: 'createTutorial',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/CreateTutorial.vue')
        },
        {
            path: '/sign-up',
            name: 'signup',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/SignUp.vue')
        },
        {
            path: '/log-in',
            name: 'login',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
        },
        {
            path: '/log-out',
            name: 'logout',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/Logout.vue')
        }
    ]
})