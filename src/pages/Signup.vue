<script setup>
import IntroComponent from '@/components/IntroComponent.vue'
import SwitchPage from '@/components/SwitchPage.vue'
</script>
<template>
  <div class="signin-page">
    <IntroComponent />
    <div class="form-container">
      <h3>Sign Up</h3>
      <form>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <input type="password" placeholder="Confirm your password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    <SwitchPage />
  </div>
</template>
