import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { setupGuards } from './guards';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { layout: 'main' },
    },
    {
        path: '/explore',
        name: 'catalog',
        component: () => import('../views/Catalog.vue'),
        meta: { layout: 'main' },
    },
    {
        path: '/project/:slug',
        name: 'project-detail',
        component: () => import('../views/ProjectDetail.vue'),
        meta: { layout: 'main' },
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: () => import('../views/Pricing.vue'),
        meta: { layout: 'main' },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta: { layout: 'main' },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {
            layout: 'main',
            requiresAuth: true,
        },
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/payment/Checkout.vue'),
        meta: {
            layout: 'main',
            requiresAuth: true,
        },
    },
    {
        path: '/checkout/success',
        name: 'payment-success',
        component: () => import('../views/payment/Success.vue'),
        meta: {
            layout: 'main',
            requiresAuth: true,
        },
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue'),
        meta: {
            layout: 'auth',
            guestOnly: true,
        },
    },
    {
        path: '/auth/register',
        name: 'register',
        component: () => import('../views/auth/Register.vue'),
        meta: {
            layout: 'auth',
            guestOnly: true,
        },
    },
    {
        path: '/404',
        name: 'not-found',
        component: () => import('../views/NotFound.vue'),
        meta: { layout: 'main' },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

// Setup navigation guards
const guards = setupGuards();
router.beforeEach(guards.beforeEach);

export default router;
