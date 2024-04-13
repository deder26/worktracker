import DashBoard from '@/views/DashBoard.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import WorkHistory from '@/views/WorkHistory.vue'
import WorkReport from '@/views/WorkReport.vue'
import Admin from '@/views/AdminView.vue'
import Profile from '@/views/ProFile.vue'
import EmployeeView from '@/views/EmployeeView.vue'
import ReportsView from '@/views/ReportsView.vue'
import UserReport from '@/views/UserReport.vue'

import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import useLocalStorage from '@/composables/useLocalStorage'

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
    component: Admin,
    redirect: { name: 'employee' },
    children: [
      {
        path: 'employee',
        name: 'employee',
        component: EmployeeView
      },
      {
        path: 'reports',
        name: 'report',
        component: ReportsView,
        children: [{ path: 'user/:id', name: 'user-report', component: UserReport }]
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
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
  let user = useLocalStorage.read('user')
  let isAuthenticated = false
  let isToPathAdmin = to.path.split('/')[1]
  if (user && user.isLogin) isAuthenticated = true

  if (!isAuthenticated && to.name !== 'sign_in' && to.name !== 'sign_up') {
    console.log('sign_in')
    return { name: 'sign_in' }
  }

  if (isAuthenticated && (to.name === 'sign_in' || to.name === 'sign_up')) {
    console.log('dashboard')
    return { name: 'dashboard' }
  }

  if (isToPathAdmin === 'admin' && !user.isAdmin) {
    console.log('dashboard2')
    return { name: 'dashboard' }
  }
})

export default router
