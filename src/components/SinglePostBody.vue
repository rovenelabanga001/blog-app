<script setup>
import PostComments from './PostComments.vue'
import { ref } from 'vue'
import { MessageSquareQuote, MessageSquareX } from 'lucide-vue-next'
import { baseUrl } from '@/config'

const { post, onBackBtnClick, postId, readPosts, userId } = defineProps([
  'post',
  'onBackBtnClick',
  'postId',
  'readPosts',
  'userId',
])
const emit = defineEmits(['update-status'])
const showComments = ref(false)

const toggleReadStatus = async (userId, postId) => {
  try {
    const isRead = readPosts.includes(postId.toString())
    const updatedPosts = isRead
      ? readPosts.filter((id) => id !== postId.toString())
      : [readPosts, postId.toString()]

    await fetch(`${baseUrl}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readPosts: updatedPosts }),
    })

    return !isRead
  } catch (err) {
    console.error(err)
  }
}

const handleToggle = async (postId) => {
  const newStatus = await toggleReadStatus(userId, postId)

  emit('update-status', newStatus)
}
</script>
<template>
  <div class="post">
    <div class="post-header">
      <h1>{{ post.title }}</h1>
      <h6>
        Author : <span>{{ post.author }}</span>
      </h6>
    </div>
    <div class="post-body">
      <p>{{ post.body }}</p>
    </div>
    <div class="post-btns">
      <button @click="onBackBtnClick">Back</button>
      <button @click="handleToggle(post.id)">
        <span v-if="readPosts.map(String).includes(String(post.id))">Mark as Unread</span>
        <span v-else>Mark as Read</span>
      </button>
    </div>
    <button id="comment-btn" @click="showComments = !showComments">
      <MessageSquareQuote v-if="!showComments" color="orange" />
      <MessageSquareX v-else-if="showComments" color="orange" />
    </button>

    <PostComments :post="post" v-if="showComments" :postId="postId" />
  </div>
</template>
<style scoped>
.post {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
}
.post-btns button {
  width: 7rem;
}
.post button#comment-btn {
  background: none;
  color: orange;
}
.post-section button#comment-btn:hover {
  border: none;
}
.post .post-header h6 {
  color: gray;
  font-size: larger;
}
.post .post-header span {
  color: orange;
}
.post .post-body {
  font-size: large;
}
.post .post-btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
