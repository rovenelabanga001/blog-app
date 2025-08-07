<script setup>
import { provide, onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { baseUrl } from './config'

const authStore = useAuthStore()
const { readPosts } = authStore
const router = useRouter()
authStore.init()

const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  error.value = null
  try {
    const res = await fetch(`${baseUrl}/posts`)
    if (!res.ok) {
      throw new Error('Unable to fetch posts try again later')
    }
    posts.value = await res.json()
  } catch (err) {
    error.value = 'Unable to get posts. Please try again later'
    console.error(err.message)
  } finally {
    loading.value = false
  }
})

const handlePostClick = async (postId) => {
  const isAlreadyRead = readPosts.map(String).includes(String(postId))

  if (!isAlreadyRead) {
    await authStore.markPostAsRead(postId, baseUrl)
  }
  router.push({ name: 'SinglePost', params: { id: postId } })
}

provide('onPostClick', handlePostClick)
provide('posts', posts)
provide('loading', loading)
provide('error', error)
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  margin-bottom: 2rem;
  padding: 0;
}
</style>
