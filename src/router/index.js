import NavBar from '@/components/NavBar.vue'
import Commments from '@/components/PostComments.vue'
import About from '@/pages/About.vue'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import Posts from '@/pages/Posts.vue'
import Signin from '@/pages/Signin.vue'
import Signup from '@/pages/Signup.vue'
import SinglePost from '@/pages/SinglePost.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    components: {
      default: Home,
      navbar: NavBar,
    },
    meta: { requiresAuth: true },
    // beforeEnter: (to, from, next) => {
    //   const auth = useAuthStore()
    //   if (!auth.isAuthenticated) {
    //     next('/signin')
    //   } else {
    //     next()
    //   }
    // },
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/posts',
    alias: '/blogs',
    components: {
      default: Posts,
      navbar: NavBar,
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/:id(\\d+)',
    name: 'SinglePost',
    component: SinglePost,
    meta: { requiresAuth: true },
    children: [{ path: 'comments', name: 'PostComments', component: Commments }],
  },
  {
    path: '/about',
    components: {
      default: About,
      navbar: NavBar,
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/signin',
    component: Signin,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/:pathMatch(.*)*',
    components: {
      default: NotFound,
      navbar: NavBar,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
