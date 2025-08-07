<script setup>
import PostComments from './PostComments.vue'
import { ref } from 'vue'
import { MessageSquareQuote, MessageSquareX } from 'lucide-vue-next'
import { baseUrl } from '@/config'
import { useRouter } from 'vue-router'

const router = useRouter()
const { post, postId} = defineProps(['post', 'postId'])
const emit = defineEmits(['update-status'])
const showComments = ref(false)
const onBackBtnClick = () => {
  router.back()
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
      <button id="comment-btn" @click="showComments = !showComments">
        <MessageSquareQuote v-if="!showComments" color="orange" />
        <MessageSquareX v-else-if="showComments" color="orange" />
      </button>
    </div>

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
  position: relative;
}
.post-btns button {
  width: 7rem;
}
.post .post-btns button#comment-btn {
  background: none;
  color: orange;
}
.post .post-btns button#comment-btn:hover {
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
