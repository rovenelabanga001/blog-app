import About from '@/pages/About.vue'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import Posts from '@/pages/Posts.vue'
import SinglePost from '@/pages/SinglePost.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/posts', component: Posts },
  {
    path: '/about',
    component: About,
    children: [{ path: ':id(\\+)?', name: 'SinglePost', component: SinglePost }],
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
})

export default router
