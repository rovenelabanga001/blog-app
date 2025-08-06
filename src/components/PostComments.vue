<script setup>
import { baseUrl } from '@/config'
import { onMounted, ref } from 'vue'
import CommentCard from './CommentCard.vue'
import AddCommmentInput from './AddCommmentInput.vue'
import { Plus, XCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import ErrorComponent from './ErrorComponent.vue'

const props = defineProps(['post', 'postId'])
const { post, postId } = props
const authStore = useAuthStore()
const { username } = authStore

const comments = ref([])
const showAddComments = ref(false)
const error = ref(null)

const getComments = async () => {
  error.value = null
  try {
    const res = await fetch(`${baseUrl}/comments?postId=${postId}`)

    if (!res.ok) throw new Error('Failed to fetch comments')

    comments.value = await res.json()
  } catch (err) {
    error.value = 'Unable to load comments. Please try again later'
    console.error(err)
  }
}
onMounted(() => {
  getComments()
})

const handleAddComment = (newComment) => {
  comments.value.splice(0, 0, newComment)
}
const handleDeleteComment = (commentId) => {
  comments.value = comments.value.filter((comment) => comment.id !== commentId)
}
</script>
<template>
  <div class="comments-section">
    <h2>Comments</h2>
    <button id="show-add-comment-btn" @click="showAddComments = !showAddComments">
      <XCircle v-if="showAddComments" />
      <Plus v-else-if="!showAddComments" />
    </button>
    <AddCommmentInput
      v-if="showAddComments && !error"
      :postId="postId"
      @add-comment="handleAddComment"
    />
    <ErrorComponent v-if="error" :message="error" />
    <CommentCard
      v-else-if="comments && comments.length"
      :comments="comments"
      :username="username"
      @delete-comment="handleDeleteComment"
    />
    <p v-else>No comments yet</p>
  </div>
</template>
<style scoped>
.comments-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  position: relative;
}
.comments-section #show-add-comment-btn {
  align-self: flex-end;
  background: none;
  color: orange;
  border: none;
}
.comments-section #show-add-comment-btn:hover {
  border: none;
}
</style>
