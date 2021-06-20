import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getToken } from "../utils/auth";
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false });
import 'nprogress/nprogress.css'
import * as icons from "@vicons/ionicons5";
function getIcon(key: keyof typeof icons) {
    return icons[key]
}
const add='Add'
getIcon(add)
// 路由信息
const routes:RouteRecordRaw[] = [
    {
        path: "/",
        name: "Index",
        component: () => import('../views/index/index.vue'),
        children: [
            {
                path: "/test",
                name: "test",
                meta: {
                    title: '测试',
                    icon: icons.Home
                },
                component:  () => import('../views/index/test.vue'),
            }
        ]
    },
    {
        path: "/login",
        name: 'Login',
        meta: {
            noAuth: true,
            icon:icons.Add
        },
        component:() => import('../views/login/login.vue')
    }
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, form, next) => {
    NProgress.start()
    if (to.meta.noAuth) {
        next()
    } else {
        if (getToken()) {
            next()
        } else {
            next({name:'Login'})
        }
    }

})

router.afterEach(() => {
    NProgress.done()
})

export default router;
