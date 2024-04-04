import DashBoard from '@/views/DashBoard.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import WorkHistory from '@/views/WorkHistory.vue'
import WorkReport from '@/views/WorkReport.vue'
import Admin from '@/views/WorkReport.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'
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
    path: '/admin',
    name: 'admin',
    component: Admin
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

router.beforeEach(async (to, from) => {
  let user = inject('globalUser')
  let isAuthenticated = false
  let isToPathAdmin = to.path.split('/')[1]
  if (user && user.value?.isLogin) isAuthenticated = true

  if (!isAuthenticated && to.name !== 'sign_in' && to.name !== 'sign_up') {
    return { name: 'sign_in' }
  }

  if (isAuthenticated && (to.name === 'sign_in' || to.name === 'sign_up')) {
    return { name: 'dashboard' }
  }

  if (isToPathAdmin === 'admin' && !user.value.isAdmin) {
    return { name: 'dashboard' }
  }
})

export default router