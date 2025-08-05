<script setup>
import IntroComponent from '@/components/IntroComponent.vue'
import SwitchPage from '@/components/SwitchPage.vue'
import { useAuthStore } from '@/stores/auth'
import { reactive, ref, computed } from 'vue'
import { baseUrl } from '@/config'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import SignInForm from '@/components/SignInForm.vue'

const auth = useAuthStore()
const toast = useToast()
const router = useRouter()

const loading = ref(false)

const error = ref(null)

const handleSubmit = async ({ email, password }) => {
  error.value = null

  loading.value = true

  try {
    await auth.login({ email, password }, toast, router, baseUrl)
  } catch (err) {
    console.error(err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="signin-page">
    <IntroComponent />
    <div class="form-container">
      <h3>Sign In</h3>
      <SignInForm :loading="loading" :error="error" @submit="handleSubmit" />
    </div>
    <SwitchPage />
  </div>
</template>
