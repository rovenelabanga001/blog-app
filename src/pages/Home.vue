<script setup>
import Loading from '@/components/Loading.vue'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = inject('posts')
const loading = inject('loading')

const goToPosts = () => {
  router.push({ path: '/posts' })
}

const handlePostClick = (postId) => {
  router.push({ name: 'SinglePost', params: { id: postId } })
}
</script>
<template>
  <div class="body-section home-container">
    <h1>Welcome to my vue blog</h1>
    <p>
      Explore tutorials, tips, and articles about Vue and web development. Learn how to build
      dynamic user interfaces, master Vue Router for seamless navigation, and improve your front-end
      skills with hands-on examples. Whether you're a beginner or looking to sharpen your expertise,
      you'll find valuable resources to guide your development journey.
    </p>

    <button @click="goToPosts">View all posts</button>
  </div>

  <div class="body-section home-container">
    <h1>Latest blogs</h1>
    <p>
      Stay up to date with our latest vlogs featuring hands-on coding sessions, project
      walkthroughs, and insightful discussions on web development trends.
    </p>
    <div class="blogs-container">
      <Loading v-if="loading" />
      <div
        v-for="post in posts"
        :key="post.id"
        class="blog"
        @click="handlePostClick(post.id)"
        v-else
      >
        <h6>{{ post.title }}</h6>
        <p>{{ post.author }}</p>
      </div>
    </div>
    <div>
      <RouterLink to="/posts">View all</RouterLink>
    </div>
  </div>
</template>
<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
}
.home-container h1 {
  color: orange;
  font-weight: 800;
  gap: 2rem;
}

.blogs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
}
.blogs-container .blog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 3px 4px 5px 4px rgb(204, 202, 202);
  height: 20vh;
  min-height: 20vh;
  max-height: 20vh;
  width: 27%;
  padding: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: pointer;
  transition: 0.4s;
}
.blogs-container .blog h6 {
  color: rgb(194, 188, 188);
  font-size: large;
}
.blogs-container .blog p {
  color: orange;
}
.blogs-container .blog:hover {
  background: orange;
  box-shadow: none;
}
.blogs-container .blog:hover h6,
.blogs-container .blog:hover p {
  color: white;
}
</style>
