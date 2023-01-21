import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLogin from '../components/UserLogin.vue'
import CourseView from '../views/CourseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/userlogin',
      name: 'userlogin',
      component: UserLogin
    },
    {
      path: '/courseview',
      name: 'courseview',
      component: CourseView
    }
  ]
})

export default router
