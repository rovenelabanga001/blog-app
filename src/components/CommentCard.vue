<script setup>
import { baseUrl } from '@/config'
import { Trash } from 'lucide-vue-next'

const emit = defineEmits(['delete-comment'])
const { comments, username } = defineProps(['comments', 'username'])

const deleteComment = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/comments/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error(`Failed to delete comment with id: ${id}`)
    }

    emit('delete-comment', id)
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div class="comment-container">
    <div v-for="comment in comments" :key="comment.id" class="comment-card">
      <h5 style="font-style: italic; color: gray">{{ comment.text }}</h5>
      <div class="delete-btn-container">
        <p style="font-style: italic; color: orange">
          {{ comment.author }}
        </p>
        <button
          v-if="comment.author === username"
          id="delete-comment-btn"
          @click="deleteComment(comment.id)"
        >
          <Trash color="orange" height="16" width="16" />
        </button>
      </div>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 2px 2px 2px 2px rgb(171, 169, 169);
  width: 60%;
  padding: 0 1rem;
}
.delete-btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.comment-card button#delete-comment-btn {
  background: none;
  cursor: pointer;
}
.comment-card button#delete-comment-btn:hover {
  border: none;
}
</style>
