<script setup>
import BlogCard from '@/components/BlogCard.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import Loading from '@/components/Loading.vue'
import NoResults from '@/components/NoResults.vue'
import SearchComponent from '@/components/SearchComponent.vue'
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
      <SearchComponent v-model="searchQuery" :showAuthor="true" />
      <form class="filter-form">
        <label for="filter-input">Filter: </label>
        <select name="" id="filter-input" v-model="statusFilter">
          <option value="All">All</option>
          <option value="Read">Read</option>
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
      <Loading v-else-if="!error" />
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

.search-container form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-container form select {
  border: 3px solid rgb(8, 150, 182);
  background: none;
  width: 80%;
  outline: none;
}
.search-container form select:focus {
  border: 3px solid rgba(252, 164, 2, 0.475);
}

.blog-card-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 3rem;
  justify-content: flex-start;
  align-items: center;
  box-shadow: none;
}
</style>
