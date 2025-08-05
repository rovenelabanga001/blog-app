<script setup>
import IntroComponent from '@/components/IntroComponent.vue'
import SwitchPage from '@/components/SwitchPage.vue'
import { useAuthStore } from '@/stores/auth'
import { reactive, ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { baseUrl } from '@/config'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const toast = useToast()
const router = useRouter()

const loading = ref(false)

const userData = reactive({
  email: '',
  password: '',
})

const error = ref(null)

const handleLogin = async () => {
  error.value = null
  v$.value.$touch()

  if (v$.value.$invalid) return

  loading.value = true

  try {
    await auth.login({ email: userData.email, password: userData.password }, toast, router, baseUrl)
  } catch (err) {
    console.error(err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6) },
}))

const v$ = useVuelidate(rules, userData)
</script>

<template>
  <div class="signin-page">
    <IntroComponent />
    <div class="form-container">
      <h3>Sign In</h3>
      <form @submit.prevent="handleLogin">
        <div class="input-container">
          <label for="login-email">Email</label>
          <input
            type="email"
            v-model="userData.email"
            placeholder="Enter your email"
            name="login-email"
            @blur="v$.email.$touch()"
            @touch="v$.email.$touch()"
          />
          <p v-if="v$.email.$error" class="error">
            <span v-if="v$.email.required.$invalid">Email is required</span>
            <span v-else-if="v$.email.email.$invalid">Enter a valid email</span>
          </p>
        </div>
        <div class="input-container">
          <label for="login-password">Password</label>
          <input
            type="password"
            name="login-password"
            v-model="userData.password"
            placeholder="Enter your password"
            @blur="v$.password.$touch()"
            @touch="v$.password.$touch()"
          />
          <p v-if="v$.password.$error" class="error">
            <span v-if="v$.password.required.$invalid">Password is required</span>
            <span v-else-if="v$.password.minLength.$invalid">Must be at least 6 characters</span>
          </p>
        </div>
        <button type="submit" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Sign In</span>
        </button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
    <SwitchPage />
  </div>
</template>
<style scoped></style>
