<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed, inject } from 'vue'

const authStore = useAuthStore()
const readPosts = computed(() => authStore.readPosts || [])

const onPostClick = inject('onPostClick')

const { filteredPosts, showReadStatus = true } = defineProps(['filteredPosts', 'showReadStatus'])

const formattedDate = (isoDateString) => {
  const date = new Date(isoDateString)
  const options = { year: 'numeric', month: 'long', day: '2-digit' }
  return date.toLocaleDateString('en-US', options)
}
</script>
<template>
  <div v-for="post in filteredPosts" class="blog-card" @click="(e) => onPostClick(post.id, e)">
    <div class="card-header">
      <h4 style="font-size: small">{{ post.title }}</h4>
    </div>
    <div class="card-footer">
      <p style="color: white; font-size: smaller; font-style: italic">
        {{ post.author }}
      </p>
      <p style="color: white; font-size: smaller; font-style: italic">
        {{ formattedDate(post.publishedAt) }}
      </p>
      <p class="read" style="font-style: italic" v-if="showReadStatus">
        <span v-if="readPosts.map(String).includes(String(post.id))" style="color: yellow"
          >Read</span
        >
        <span v-else style="color: lightgray">Unread</span>
      </p>
      <div>
        <slot name="actions" :postId="post.id"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.blog-card {
  border: 1px solid rgb(240, 236, 236);
  height: 20vh;
  width: 27%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.3s;
}
.blog-card .card-header {
  text-align: center;
  color: orange;
  font-size: larger;
  height: 70%;
}
.blog-card .card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(8, 150, 182);
  padding: 0 3px;
  height: 30%;
}
.blog-card .card-footer p.read {
  background: none;
}
.blog-card .card-footer p.read svg {
  color: white;
}
.blog-card .card-footer p.read svg:hover {
  color: orange;
}
.blog-card .card-footer p.read:hover {
  border: none;
}
.blog-card:hover {
  background: orange;
  box-shadow: none;
}
.blog-card:hover .card-header h4 {
  color: white;
}
</style>
