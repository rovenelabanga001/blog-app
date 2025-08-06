<script setup>
import ErrorComponent from '@/components/ErrorComponent.vue'
import Loading from '@/components/Loading.vue'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { inject, ref, computed } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const posts = inject('posts')
const error = inject('error')
const searchQuery = ref('')

const authStore = useAuthStore()
const userId = authStore.user?.id
const { readPosts } = authStore
console.log(readPosts)
console.log(posts)

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(
    (post) => post.title.toLowerCase().includes(query) || post.author.toLowerCase().includes(query),
  )
})

const onPostClick = inject('onPostClick')
const formattedDate = (isoDateString) => {
  const date = new Date(isoDateString)
  const yy = String(date.getFullYear()).slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  return `${yy}-${dd}-${mm}`
}
</script>
<template>
  <DefaultLayout>
    <ErrorComponent v-if="error" :message="error" />
    <div class="search-container" v-else-if="!error">
      <input type="text" placeholder="Search for post by name or author" v-model="searchQuery" />
    </div>
    <div class="body-section blog-card-container">
      <div
        v-for="post in filteredPosts"
        class="blog-card"
        @click="onPostClick(post.id)"
        v-if="filteredPosts"
      >
        <div class="card-header">
          <h4 style="font-size: small">{{ post.title }}</h4>
        </div>
        <div class="card-footer">
          <p style="color: white; font-size: smaller; font-style: italic">
            {{ post.author }}
          </p>
          <p style="color: white; font-size: smaller; font-style: italic">
            {{ formattedDate(post.publishedAt) }} {{ post.id }}
          </p>
          <p class="read" style="font-style: italic">
            <span v-if="readPosts.map(String).includes(String(post.id))" style="color: yellow"
              >Read</span
            >
            <span v-else style="color: lightgray">Unread</span>
          </p>
        </div>
      </div>
      <Loading v-else />
    </div>
  </DefaultLayout>
</template>
<style scoped>
.blog-card-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 3rem;
  justify-content: center;
  box-shadow: none;
}
.blog-card-container .blog-card {
  border: 1px solid rgb(240, 236, 236);
  height: 20vh;
  width: 27%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.3s;
}
.blog-card .card-header {
  text-align: center;
  color: orange;
  font-size: larger;
  height: 70%;
}
.blog-card .card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(8, 150, 182);
  padding: 0 3px;
  height: 30%;
}
.blog-card .card-footer p.read {
  background: none;
}
.blog-card .card-footer p.read svg {
  color: white;
}
.blog-card .card-footer p.read svg:hover {
  color: orange;
}
.blog-card .card-footer p.read:hover {
  border: none;
}
.blog-card:hover {
  background: orange;
  box-shadow: none;
}
.blog-card:hover .card-header h4 {
  color: white;
}
.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-container input {
  width: 50%;
  height: 2rem;
  border-radius: 2rem;
  padding: 0 4px;
  outline: none;
  border: 3px solid rgb(8, 150, 182);
  transition: 0.3s;
}
.search-container input::placeholder {
  color: gray;
}
.search-container input:focus {
  border: 3px solid rgba(252, 164, 2, 0.475);
}
</style>
