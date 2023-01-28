import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CourseView from '../views/CourseView.vue'
import AdminView from '../views/AdminView.vue'
import TutorView from '../views/TutorView.vue'
import QuesView from '../views/QuesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/loginview',
      name: 'loginview',
      component: LoginView
    },
    {
      path: '/courseview',
      name: 'courseview',
      component: CourseView
    },
    {
      path: '/adminview',
      name: 'adminview',
      component: AdminView
    },
    {
      path: '/tutorview',
      name: 'tutorview',
      component: TutorView
    },
    {
      path: '/quesview',
      name: 'quesview',
      component: QuesView
    }
  ]
})

export default router
