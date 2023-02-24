import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import LoginApp from "@/components/LoginApp";
import RegistrationApp from "@/components/RegistrationApp";
import ChatApp from "@/components/ChatApp";
import $ from "jquery";


window.jQuery = window.$ = $;
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.min.js");



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },

        {
            path: '/login',
            component: LoginApp
        },

        {
            path: '/registration',
            component: RegistrationApp
        },

        {
            path: '/chat',
            component: ChatApp
        }
    ]
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('phoneNumber') != null

    if (!to.path.match('/chat') || isAuthenticated) next()

})

export default router

const app = createApp(App);
app.use(router);
app.mount('#app');