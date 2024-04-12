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
    },
    {
        path: "/task-manager",
        name: "task-manager",
        component: () => import("./views/samples/TaskManager.vue"),
    },
    {
        path: "/notepad",
        name: "notepad",
        component: () => import("./views/samples/Notepad.vue"),
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});