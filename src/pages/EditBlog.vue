<script setup lang="ts">
import ErrorComponent from '@/components/ErrorComponent.vue'
import PostForm from '@/components/PostForm.vue'
import PostFormHeader from '@/components/PostFormHeader.vue'
import { baseUrl } from '@/config'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MyBlogs from './MyBlogs.vue'

const heading = ref('Edit Blog')
const route = useRoute()
const router = useRouter()
const postId = route.params.id
const error = ref(null)
const blog = ref()

const getBlog = async () => {
  error.value = null
  try {
    const res = await fetch(`${baseUrl}/posts/${postId}`)
    if (!res.ok) throw new Error('Failed to fetch blog')

    blog.value = await res.json()
  } catch (err) {
    error.value = 'Error getting blog data. Try again later'
    console.error(err)
  }
}

onMounted(() => {
  getBlog()
})

const updateBlog = async (updatedData) => {
  await fetch(`${baseUrl}/posts/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application.json' },
    body: JSON.stringify(updatedData),
  })

  router.push({ name: 'MyBlogs' })
}
</script>

<template>
  <div class="body-section add-post-form-container">
    <PostFormHeader :heading="heading" />
    <PostForm :blog="blog" @submit="updateBlog" :buttonText="heading" v-if="blog" />
    <ErrorComponent :message="error" v-else-if="error" />
  </div>
</template>

<style scoped>
.add-post-form-container {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}
</style>
