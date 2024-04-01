import DashBoard from '@/views/DashBoard.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import WorkHistory from '@/views/WorkHistory.vue'
import WorkReport from '@/views/WorkReport.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

let routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashBoard
  },
  {
    path: '/work-report',
    name: 'work_report',
    component: WorkReport
  },
  {
    path: '/work-history',
    name: 'work_history',
    component: WorkHistory
  },
  {
    path: '/sign-in',
    name: 'sign_in',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'sign_up',
    component: SignUp
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: NotFound
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
