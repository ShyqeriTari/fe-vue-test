import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../components/HomePage';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ClubCreation from '../components/ClubCreation';

const routes = [
    {path: '/', component: SignIn},
    {path: '/SignUp', component: SignUp},
    {path: '/Home', component: HomePage},
    {path: '/ClubCreation', component: ClubCreation},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router