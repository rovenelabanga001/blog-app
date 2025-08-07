<script setup>
import BlogCard from '@/components/BlogCard.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import NoResults from '@/components/NoResults.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import { baseUrl } from '@/config'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, computed } from 'vue'
import { Plus } from 'lucide-vue-next'

const userPosts = ref([])
const error = ref(null)
const searchQuery = ref('')

const authStore = useAuthStore()
const userId = authStore.user?.id

const getUserPosts = async () => {
  error.value = null
  try {
    const res = await fetch(`${baseUrl}/posts?userId=${userId}`)

    if (!res.ok) throw new Error(`Failed to fetch user ${userId} posts`)

    userPosts.value = await res.json()
  } catch (err) {
    error.value = 'Unable To Get Posts. Try again later'
    console.error(err)
  }
}

onMounted(() => {
  getUserPosts()
})

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()

  return userPosts.value.filter((post) => post.title.toLowerCase().includes(query))
})
</script>

<template>
  <DefaultLayout>
    <div>
      <button>Add</button>
    </div>
    <SearchComponent v-model="searchQuery" :showAuthor="false" v-if="userPosts.length !== 0" />
    <div class="my-blogs-container" v-if="filteredPosts.length && !error">
      <BlogCard
        :filteredPosts="filteredPosts"
        :showReadStatus="false"
        v-if="filteredPosts && filteredPosts.length"
      />
    </div>
    <NoResults
      v-else-if="filteredPosts && !filteredPosts.length && searchQuery"
      :searchQuery="searchQuery"
    />
    <p v-if="userPosts.length === 0 && !error">You dont have any blogs yet</p>
    <ErrorComponent v-if="error" :message="error" />
  </DefaultLayout>
</template>

<style scoped>
.my-blogs-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
}
</style>
