<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Loading from '@/components/Loading.vue'
import { useAuthStore } from '@/stores/auth'
import { baseUrl } from '@/config'
import ErrorComponent from '@/components/ErrorComponent.vue'
import SinglePostBody from '@/components/SinglePostBody.vue'

const route = useRoute()
const router = useRouter()
const postId = route.params.id

const authStore = useAuthStore()
const userId = authStore.user?.id
const { readPosts } = authStore

const post = ref(null)
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  error.value = null
  try {
    const res = await fetch(`${baseUrl}/posts/${postId}`)
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Post not found')
      } else {
        throw new Error('Failed to fetch post')
      }
    }
    post.value = await res.json()
  } catch (err) {
    error.value = err.message || 'Unable to load posts. Please try again later'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

// const handleUpdateStatus = (newStatus) => {
//   if (newStatus !== undefined) {
//     if (newStatus) {
//       readPosts.push(postId)
//     } else {
//       readPosts.value = readPosts.value.filter((id) => id !== postId)
//     }
//   }
// }
</script>
<template>
  <div class="body-section post-section">
    <Loading v-if="isLoading" />
    <ErrorComponent v-else-if="error" :message="error" />
    <SinglePostBody v-else-if="post && !error" :post="post" :postId="postId" />
  </div>
</template>
<style scoped>
.post-section {
  margin-top: 4rem;
}
</style>
