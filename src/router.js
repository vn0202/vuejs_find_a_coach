import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import CoachContact from "./pages/coaches/CoachContact.vue";
import CoachList from "./pages/coaches/CoachList.vue";
import RequestList from "./pages/requests/RequestList.vue";
import store from "./store";

const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail.vue'));
const NotFound = defineAsyncComponent(() => import("./pages/NotFound.vue"));
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));
const RequestRestation = defineAsyncComponent(() => import("./pages/requests/RequestRestation.vue"));


const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            { path: "/", redirect: '/coaches' },
            {
                path: "/coaches", component: CoachList
            },
            {
                path: "/coaches/:id", 
                props: true,
                component: CoachDetail,
                children: [
                    {path: "contact", component: CoachContact}
                ]
            },
            {
                path: "/requests", component: RequestList, meta:{needAuth:true}
            },
            {
                path:'/auth', component: UserAuth
            },
            { path: "/registers", component: RequestRestation },
            {
                path: "/:notfound(.*)", component: NotFound
            },
          
        ]
    }
);
router.beforeEach((to, _, next) => {
    if(to.meta.needAuth && !store.getters.isAuthenticate)
    {
        next('/auth');
    }
    else{
        next();
    }
});
export default router;