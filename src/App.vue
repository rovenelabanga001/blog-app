<script setup>
import { provide, onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { baseUrl } from './config'

const auth = useAuthStore()
const router = useRouter()
auth.init()

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}/posts`)
    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }
    posts.value = await res.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const handlePostClick = (postId) => {
  router.push({ name: 'SinglePost', params: { id: postId } })
}

provide('onPostClick', handlePostClick)
provide('posts', posts)
provide('loading', loading)
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
