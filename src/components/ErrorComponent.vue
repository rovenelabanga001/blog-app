<script setup>
import { CircleAlert } from 'lucide-vue-next'
const props = defineProps(['message'])
</script>
<template>
  <div class="error-container">
    <CircleAlert color="red" />
    <p class="error" style="font-weight: bold">{{ props.message }}</p>
  </div>
</template>
<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}
</style>
