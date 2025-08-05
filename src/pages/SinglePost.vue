<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Loading from '@/components/Loading.vue'
import PostComments from '@/components/PostComments.vue'
import { baseUrl } from '@/config'

const post = ref(null)
const route = useRoute()
const router = useRouter()
const postId = route.params.id
const isLoading = ref(true)
const showComments = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}/posts/${postId}`)
    if (!res.ok) {
      throw new Error('Failed to fetch post')
    }
    post.value = await res.json()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const onBackBtnClick = () => {
  router.back()
}
</script>
<template>
  <div class="body-section post-section">
    <Loading v-if="isLoading" />
    <div v-else-if="post" class="post">
      <div class="post-header">
        <h1>{{ post.title }}</h1>
        <h6>
          Author : <span>{{ post.author }}</span>
        </h6>
      </div>
      <div class="post-body">
        <p>{{ post.body }}</p>
      </div>

      <button @click="onBackBtnClick">Back</button>
      <button id="comment-btn" @click="showComments = !showComments">
        {{ showComments ? 'Hide Comments' : 'Show Comments' }}
      </button>

      <PostComments :post="post" v-if="showComments" />
    </div>
    <div v-else>
      <p>Post Not Found</p>
    </div>
  </div>
</template>
<style scoped>
.post-section {
  margin-top: 4rem;
}
.post {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
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
</style>
