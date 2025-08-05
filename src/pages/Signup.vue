<script setup>
import IntroComponent from '@/components/IntroComponent.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import SwitchPage from '@/components/SwitchPage.vue'
</script>
<template>
  <div class="signin-page">
    <IntroComponent />
    <div class="form-container">
      <h3>Sign Up</h3>
      <SignUpForm />
    </div>
    <SwitchPage />
  </div>
</template>
