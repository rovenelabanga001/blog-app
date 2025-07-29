<script setup lang="ts">
import IntroComponent from '@/components/IntroComponent.vue'
import SwitchPage from '@/components/SwitchPage.vue'
import { reactive } from 'vue'

const userData = reactive({
  email: '',
  password: '',
})
</script>

<template>
  <div class="signin-page">
    <IntroComponent />
    <div class="form-container">
      <h3>Sign In</h3>
      <form>
        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
    <SwitchPage />
  </div>
</template>
<style scoped></style>
