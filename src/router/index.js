import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/organisms/LoginForm.vue'
import Top from '../components/organisms/TopForm.vue'
import Register from '../components/organisms/RegisterForm.vue'
import Management from '../components/organisms/ManagementForm.vue'
import { authorizeToken } from './guards'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/top',
    name: 'Top',
    component: Top,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/management',
    name: 'Management',
    component: Management,
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach(authorizeToken)

export default router
