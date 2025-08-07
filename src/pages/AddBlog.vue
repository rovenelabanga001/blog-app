<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="body-section add-post-form-container">
    <h3>Add Blog</h3>
    <form>
      <input placeholder="Blog Title" />
      <textarea placeholder="My Blog"></textarea>
      <button type="submit">Add</button>
    </form>

    <button @click="router.back()">Back</button>
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
  gap: 1rem;
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
  justify-self: center;
}
</style>
