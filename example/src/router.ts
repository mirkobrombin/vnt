import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("./views/Home.vue"),
    },
    {
        path: "/calculator",
        name: "calculator",
        component: () => import("./views/samples/Calculator.vue"),
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});