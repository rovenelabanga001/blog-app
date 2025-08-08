import NavBar from '@/components/NavBar.vue'
import Commments from '@/components/PostComments.vue'
import About from '@/pages/About.vue'
import AddBlog from '@/pages/AddBlog.vue'
import EditBlog from '@/pages/EditBlog.vue'
import Home from '@/pages/Home.vue'
import MyBlogs from '@/pages/MyBlogs.vue'
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
    path: '/posts/:id',
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
    path: '/add-blog',
    component: AddBlog,
    meta: { requiresAuth: true },
    name: 'AddBlog',
  },
  {
    path: '/edit-blog/:id',
    component: EditBlog,
    meta: { requiresAuth: true },
    name: 'EditBlog',
  },
  {
    path: '/my-blogs',
    component: MyBlogs,
    meta: { requiresAuth: true },
    name: 'MyBlogs',
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
