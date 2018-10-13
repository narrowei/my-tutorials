import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/About.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('@/views/Contact.vue')
        },
        {
            path: '/myInfo',
            name: 'my-info',
            component:   () => import('@/views/MyInfo.vue'),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/enroll',
            name: 'enroll',
            component:   () => import('@/views/Enroll.vue'),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/createTutorial',
            name: 'createTutorial',
            component:   () => import('@/views/CreateTutorial.vue'),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/sign-up',
            name: 'signup',
            component:   () => import('@/views/SignUp.vue')
        },
        {
            path: '/log-in',
            name: 'login',
            component:   () => import('@/views/Login.vue')
        },
        {
            path: '/tutorialInfo',
            name: 'tutorialInfo',
            component:   () => import('@/views/TutorialInfo.vue')
        },
        {
            path: '/tutorInfo',
            name: 'tutorInfo',
            component:   () => import('@/views/TutorInfo.vue')
        },
        {
            path: '/editTutorial',
            name: 'editTutorial',
            component:   () => import('@/views/EditTutorial.vue'),
            meta: {
                requireAuth: true
            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    if(to.meta.requireAuth) {
        // if the path require authentication, check token
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
