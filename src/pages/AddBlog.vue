<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { reactive, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { baseUrl } from '@/config'
import { useToast } from 'vue-toastification'
import PostForm from '@/components/PostForm.vue'
import PostFormHeader from '@/components/PostFormHeader.vue'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const username = authStore.username
const userId = authStore.user?.id
const heading = ref('Add Blog')

const error = ref(null)

const addBlog = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        author: username,
        publishedAt: new Date().toISOString(),
        userId: userId,
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to add blog')
    }

    toast.success('Blog created succesfully')
    router.push('/my-blogs')
  } catch (err) {
    error.value = "Can't Add Blog Right Now. Try again later"
    toast.error('Can not create blog')
    console.error(err)
  }
}
</script>

<template>
  <div class="body-section add-post-form-container">
    <PostFormHeader :heading="heading" />
    <PostForm @submit="addBlog" :buttonText="heading" />
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
