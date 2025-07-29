<script setup>
import { provide, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const posts = ref([])
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/posts')
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
    <router-view name="navbar" />
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
}
</style>
