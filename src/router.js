import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachContact from "./pages/coaches/CoachContact.vue";
import CoachList from "./pages/coaches/CoachList.vue";
import RequestList from "./pages/requests/RequestList.vue";
import RequestRestation from "./pages/requests/RequestRestation.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
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
                path: "/requests", component: RequestList,
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
export default router;