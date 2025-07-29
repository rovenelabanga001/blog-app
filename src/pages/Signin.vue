<script setup>
import IntroComponent from '@/components/IntroComponent.vue'
import SwitchPage from '@/components/SwitchPage.vue'
import { useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue'

const auth = useAuthStore()

const userData = reactive({
  email: '',
  password: '',
})

const error = ref(null)

const handleLogin = async () => {
  error.value = null
  try {
    await auth.login({ email: userData.email, password: userData.password })
  } catch (err) {
    console.error(err)
    error.value = err.message
  }
}
</script>

<template>
  <div class="signin-page">
    <IntroComponent />
    <div class="form-container">
      <h3>Sign In</h3>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="userData.email" placeholder="Enter your email" />
        <input type="password" v-model="userData.password" placeholder="Enter your password" />
        <button type="submit">Sign in</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
    <SwitchPage />
  </div>
</template>
<style scoped></style>
