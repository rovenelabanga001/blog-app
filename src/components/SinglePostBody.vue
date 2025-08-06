<script setup>
import PostComments from './PostComments.vue'
import { ref } from 'vue'

const { post, onBackBtnClick, postId } = defineProps(['post', 'onBackBtnClick', 'postId'])

const showComments = ref(false)
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
      <button>Mark as read</button>
    </div>
    <button id="comment-btn" @click="showComments = !showComments">
      {{ showComments ? 'Hide Comments' : 'Show Comments' }}
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
.post button#comment-btn {
  align-self: flex-end;
  background: none;
  color: orange;
  text-decoration: underline;
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
