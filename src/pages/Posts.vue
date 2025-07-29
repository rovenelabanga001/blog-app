<script setup>
import Loading from '@/components/Loading.vue'
import { inject, ref, computed } from 'vue'

const posts = inject('posts')
const searchQuery = ref('')

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(
    (post) => post.title.toLowerCase().includes(query) || post.author.toLowerCase().includes(query),
  )
})

const onPostClick = inject('onPostClick')
const formattedDate = (isoDateString) => {
  const date = new Date(isoDateString)
  const yy = String(date.getFullYear()).slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  return `${yy}-${dd}-${mm}`
}
</script>
<template>
  <div class="search-container">
    <input type="text" placeholder="Search for post by name or author" v-model="searchQuery" />
  </div>
  <div class="body-section blog-card-container">
    <div v-for="post in filteredPosts" class="blog-card" @click="onPostClick(post.id)" v-if="filteredPosts">
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
      </div>
    </div>
    <Loading v-else />
  </div>
</template>
<style scoped>
.blog-card-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 3rem;
  justify-content: center;
  box-shadow: none;
}
.blog-card-container .blog-card {
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
  background-color: rgb(8, 150, 182);
  padding: 0 3px;
  height: 30%;
}
.blog-card:hover {
  background: orange;
  box-shadow: none;
}
.blog-card:hover .card-header h4 {
  color: white;
}
.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-container input {
  width: 50%;
  height: 2rem;
  border-radius: 2rem;
  padding: 0 4px;
  outline: none;
  border: 3px solid rgb(8, 150, 182);
  transition: 0.3s;
}
.search-container input::placeholder {
  color: gray;
}
.search-container input:focus {
  border: 3px solid rgba(252, 164, 2, 0.475);
}
</style>
