<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const text = ref('')
const btnText = ref('')

watchEffect(() => {
  if (route.path === '/signup') {
    text.value = 'Already Have an account?'
    btnText.value = 'Sign In'
  } else if (route.path === '/signin') {
    text.value = "Don't have an account?"
    btnText.value = 'Sign Up'
  }
})

const btnClick = () => {
  if (route.path === '/signup') {
    router.push('/signin')
  } else if (route.path === '/signin') {
    router.push('/signup')
  }
}
</script>

<template>
  <div class="switch-page">
    <p>
      {{ text }}
      <span
        ><button @click="btnClick">{{ btnText }}</button></span
      >
    </p>
  </div>
</template>
<style scoped>
.switch-page button {
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
