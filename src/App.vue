<script setup>
import { provide, onMounted, ref } from 'vue'
import NavBar from './components/NavBar.vue'

const posts = ref([])
const loading = ref(true)

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
  gap: 8rem;
  margin-bottom: 2rem;
}
</style>
