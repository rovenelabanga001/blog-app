<script setup>
import BlogCard from '@/components/BlogCard.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import Loading from '@/components/Loading.vue'
import NoResults from '@/components/NoResults.vue'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const posts = inject('posts')
const error = inject('error')

const searchQuery = ref('')
const statusFilter = ref('All')

const authStore = useAuthStore()
const router = useRouter()

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const readPostsIds = authStore.readPosts || []
  return posts.value.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(query) || post.author.toLowerCase().includes(query)

    const isRead = readPostsIds.map(String).includes(String(post.id))

    const matchesStatus =
      statusFilter.value === 'All' ||
      (statusFilter.value === 'Read' && isRead) ||
      (statusFilter.value === 'Unread' && !isRead)

    return matchesSearch && matchesStatus
  })
})
</script>
<template>
  <DefaultLayout>
    <ErrorComponent v-if="error" :message="error" />
    <div class="search-container" v-else-if="!error">
      <input type="text" placeholder="Search for post by name or author" v-model="searchQuery" />
      <form>
        <label for="filter-input">Filter: </label>
        <select name="" id="filter-input" v-model="statusFilter">
          <option value="" disabled selected>Select Status</option>
          <option value="All">All</option>
          <option value="Read" default>Read</option>
          <option value="Unread">Unread</option>
        </select>
      </form>
    </div>
    <div class="body-section blog-card-container">
      <BlogCard v-if="filteredPosts && filteredPosts.length" :filteredPosts="filteredPosts" />
      <NoResults
        v-else-if="filteredPosts && !filteredPosts.length && searchQuery"
        :searchQuery="searchQuery"
      />
      <Loading v-else />
    </div>
  </DefaultLayout>
</template>
<style scoped>
.search-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.search-container input {
  width: 30%;
  height: 2rem;
  border-radius: 2rem;
  padding: 0 4px;
  outline: none;
  border: 3px solid rgb(8, 150, 182);
  transition: 0.3s;
}
.search-container button {
  background-color: orange;
  color: white;
  border: none;
  height: 2rem;
  cursor: pointer;
  transition: 0.3s;
}
.search-container button:hover {
  background-color: rgb(239, 174, 54);
}
.search-container input::placeholder {
  color: gray;
}
.search-container input:focus {
  border: 3px solid rgba(252, 164, 2, 0.475);
}

.blog-card-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 3rem;
  justify-content: center;
  box-shadow: none;
}
</style>
