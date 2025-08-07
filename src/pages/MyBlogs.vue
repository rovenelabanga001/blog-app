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
import { useRouter } from 'vue-router'

const userPosts = ref([])
const error = ref(null)
const searchQuery = ref('')

const authStore = useAuthStore()
const router = useRouter()
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

const onAddBlogClick = () => {
  router.push({ name: 'AddBlog' })
}
</script>

<template>
  <DefaultLayout>
    <div class="my-blogs-container">
      <div class="add-blog-btn-container">
        <button class="add-blog-btn" @click="onAddBlogClick">
          <span>Add Blog</span><Plus color="orange" />
        </button>
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
    </div>
  </DefaultLayout>
</template>
<style scoped>
.my-blogs-container {
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
}
.add-blog-btn-container {
  align-self: flex-end;
  padding: 0 2rem;
}
button.add-blog-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  color: orange;
}
.my-blogs-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
}
</style>
