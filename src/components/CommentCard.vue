<script setup>
const props = defineProps(['comments'])
const { comments } = props
</script>
<template>
  <div class="comment-container">
    <div v-for="comment in comments" :key="comment.id" class="comment-card">
      <h5 style="font-style: italic; color: gray">{{ comment.text }}</h5>
      <p style="font-style: italic; color: orange">
        {{ comment.author }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.comment-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
}
.comment-card {
  box-shadow: 2px 2px 2px 2px rgb(171, 169, 169);
  width: 60%;
  padding: 0 1rem;
  display: block;
}
</style>
