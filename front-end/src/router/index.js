import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import(/* webpackChunkName: "about" */ '@/views/Contact.vue')
        },
        {
            path: '/myInfo',
            name: 'my-info',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/MyInfo.vue'),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/enroll',
            name: 'enroll',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/Enroll.vue'),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/createTutorial',
            name: 'createTutorial',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/CreateTutorial.vue'),
            meta: {
                requireAuth: true
            }
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
            path: '/tutorialInfo',
            name: 'tutorialInfo',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/TutorialInfo.vue')
        },
        {
            path: '/tutorInfo',
            name: 'tutorInfo',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/TutorInfo.vue')
        },
        {
            path: '/editTutorial',
            name: 'editTutorial',
            component:   () => import(/* webpackChunkName: "about" */ '@/views/editTutorial.vue'),
            meta: {
                requireAuth: true
            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    if(to.meta.requireAuth) {
        if(token) {
            next()
        } else {
            Message({
                type: 'info',
                message: 'You need to login first!'
            });
            next({
                name:'login'
            })
        }
    } else {
        next()
    }
})

    export default router
