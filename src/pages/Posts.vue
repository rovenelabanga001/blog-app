<script setup>
import BlogCard from '@/components/BlogCard.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import Loading from '@/components/Loading.vue'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const posts = inject('posts')
const error = inject('error')

const searchQuery = ref('')

const authStore = useAuthStore()
const { readPosts } = authStore
const router = useRouter()

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(
    (post) => post.title.toLowerCase().includes(query) || post.author.toLowerCase().includes(query),
  )
})

const onAddBlogClick = () => {
  router.push({ name: 'AddBlog' })
}
</script>
<template>
  <DefaultLayout>
    <ErrorComponent v-if="error" :message="error" />
    <div class="search-container" v-else-if="!error">
      <input type="text" placeholder="Search for post by name or author" v-model="searchQuery" />
      <button @click="onAddBlogClick">Add Blog</button>
    </div>
    <div class="body-section blog-card-container">
      <BlogCard v-if="filteredPosts" :filteredPosts="filteredPosts" />
      <Loading v-else />
    </div>
  </DefaultLayout>
</template>
<style scoped>
.search-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.search-container input {
  width: 30%;
  height: 2rem;
  border-radius: 2rem;
  padding: 0 4px;
  outline: none;
  border: 3px solid rgb(8, 150, 182);
  transition: 0.3s;
}
.search-container button {
  background-color: orange;
  color: white;
  border: none;
  height: 2rem;
  cursor: pointer;
  transition: 0.3s;
}
.search-container button:hover {
  background-color: rgb(239, 174, 54);
}
.search-container input::placeholder {
  color: gray;
}
.search-container input:focus {
  border: 3px solid rgba(252, 164, 2, 0.475);
}

.blog-card-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 3rem;
  justify-content: center;
  box-shadow: none;
}
</style>
