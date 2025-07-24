import NavBar from '@/components/NavBar.vue'
import Commments from '@/components/PostComments.vue'
import About from '@/pages/About.vue'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import Posts from '@/pages/Posts.vue'
import SinglePost from '@/pages/SinglePost.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    components: {
      default: Home,
      navbar: NavBar,
    },
  },
  {
    path: '/posts',
    components: {
      default: Posts,
      navbar: NavBar,
    },
  },
  {
    path: '/posts/:id(\\d+)',
    name: 'SinglePost',
    component: SinglePost,
    children: [{ path: 'comments', name: 'PostComments', component: Commments }],
  },
  {
    path: '/about',
    components: {
      default: About,
      navbar: NavBar,
    },
  },
  { path: '/:pathMatch(.*)*', components: {
    default: NotFound,
    navbar: NavBar
  } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
})

export default router
