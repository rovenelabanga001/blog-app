<script setup>
import useVuelidate from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

const props = defineProps({
  loading: Boolean,
  error: String,
})

const emit = defineEmits(['submit'])

const userData = reactive({
  email: '',
  password: '',
})

const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6) },
}))

const v$ = useVuelidate(rules, userData)

const handleSubmit = async () => {
  v$.value.$touch()

  if (v$.value.$invalid) return

  emit('submit', { ...userData })
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-container">
      <label for="login-email">Email</label>
      <input
        type="email"
        v-model="userData.email"
        placeholder="Enter your email"
        id="login-email"
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
        id="login-password"
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
</template>
