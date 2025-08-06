<script setup>
import { baseUrl } from '@/config'
import { useAuthStore } from '@/stores/auth'
import { SendHorizontal } from 'lucide-vue-next'
import { ref } from 'vue'

const authStore = useAuthStore()
const { username } = authStore

const props = defineProps(['postId'])
const { postId } = props
const emit = defineEmits(['add-comment'])

const commentText = ref('')

const handleCommentSubmit = async () => {
  const newComment = {
    postId: postId,
    text: commentText.value.trim(),
    author: username,
  }

  if (!commentText.value.trim()) {
    return
  }

  try {
    const res = await fetch(`${baseUrl}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment),
    })

    if (!res.ok) throw new Error('Failed to add comment')

    const savedComment = await res.json()
    emit('add-comment', savedComment)
    commentText.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div class="add-comment-input-container">
    <form @submit.prevent="handleCommentSubmit">
      <label for="add-comment"></label>
      <textarea id="add-comment" placeholder="Add Comment..." v-model="commentText"></textarea>
      <button type="submit"><SendHorizontal /></button>
    </form>
  </div>
</template>
<style scoped>
.add-comment-input-container {
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.add-comment-input-container form {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.add-comment-input-container form textarea {
  height: 3rem;
  width: 80%;
  border: 2px solid black;
  transition: 0.3s;
  padding: 0 0.5rem;
}
.add-comment-input-container form textarea:focus {
  border: 2px solid orange;
}
/* .add-comment-input-container form button {
  background: none;
  color: orange;
  border: none;
} */
.add-comment-input-container form button:hover {
  border: none;
}
</style>
