<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { reactive, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { baseUrl } from '@/config'
import { minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const username = authStore.username
const userId = authStore.user?.id
console.log(userId)

const error = ref(null)

const blogData = reactive({
  title: '',
  body: '',
})

const notBlank = (value) => {
  return !!value && value.trim().length > 0
}
const rules = computed(() => ({
  title: { required, notBlank },
  body: { required, minLength: minLength(100) },
}))

const v$ = useVuelidate(rules, blogData)

const addBlog = async () => {
  v$.value.$touch()

  if (v$.value.$invalid) return

  try {
    const res = await fetch(`${baseUrl}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: blogData.title,
        body: blogData.body,
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
    <button @click="router.back()"><ArrowLeft /></button>
    <h3>Add Blog</h3>
    <form @submit.prevent="addBlog">
      <input
        placeholder="Blog Title"
        v-model="blogData.title"
        @blur="v$.title.$touch()"
        @touch="v$.title.$touch()"
      />
      <p v-if="v$.title.$error" class="error">
        <span v-if="v$.title.required.$invalid">Title is required</span>
        <span v-else-if="v$.title.notBlank.$invalid">Title can not be blank</span>
      </p>
      <textarea
        placeholder="My Blog"
        v-model="blogData.body"
        @blur="v$.body.$touch()"
        @touch="v$.body.$touch()"
      ></textarea>
      <p v-if="v$.body.$error" class="error">
        <span v-if="v$.body.required.$invalid">Body is required</span>
        <span v-else-if="v$.body.minLength.$invalid">Must be at least 100 characters</span>
      </p>
      <button type="submit">Add</button>
    </form>
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
.add-post-form-container form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  gap: 0.5rem;
}
.add-post-form-container form input,
textarea {
  border: 2px solid black;
  width: 100%;
}
.add-post-form-container form input {
  height: 3rem;
}
.add-post-form-container form textarea {
  height: 6rem;
}
.add-post-form-container form button {
  width: 30%;
  cursor: pointer;
}
</style>
