<script setup>
import BlogCard from '@/components/BlogCard.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import NoResults from '@/components/NoResults.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import { baseUrl } from '@/config'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, computed, h } from 'vue'
import { Plus } from 'lucide-vue-next'
import { Trash, Pencil } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const userPosts = ref([])
const error = ref(null)
const searchQuery = ref('')

const authStore = useAuthStore()
const toast = useToast()
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

const deleteBlog = async (postId) => {
  try {
    const res = await fetch(`${baseUrl}/posts/${postId}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Failed to delete post')

    toast.success('Blog Deleted Successfully')
  } catch (err) {
    toast.error('Failed to delete post. Try again later')
    console.error(err)
  }
}

const confirmDelete = (id) => {
  toast(
    {
      component: {
        render() {
          return h('div', {}, [
            h(
              'p',
              {
                style: 'color: white',
              },
              'Are you sure you want to delete this blog?',
            ),
            h(
              'button',
              {
                style:
                  'margin-right : 10px; background-color: red; color:white; border: none; cursor: pointer; width: 4rem',
                onClick: () => {
                  deleteBlog(id)
                  toast.clear()
                  router.back()
                },
              },
              'Yes',
            ),
            h(
              'button',
              {
                style:
                  'background-color: orange; color:white;border: none; cursor: pointer; width: 4rem',
                onClick: () => toast.clear(),
              },
              'No',
            ),
          ])
        },
      },
    },
    {
      timeout: false,
      closeOnClick: false,
      hideProgressBar: true,
    },
  )
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
      <div class="blog-cards-container" v-if="filteredPosts.length && !error">
        <BlogCard
          :filteredPosts="filteredPosts"
          :showReadStatus="false"
          v-if="filteredPosts && filteredPosts.length"
        >
          <template #actions="{ postId }">
            <button class="my-btn" @click.stop="confirmDelete(postId)">
              <Trash color="orange" :size="15" />
            </button>
            <button class="my-btn"><Pencil color="orange" :size="15" /></button>
          </template>
        </BlogCard>
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
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
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
  cursor: pointer;
}
.blog-cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin-top: 4rem;
}
.my-btn {
  background: none;
  border: none;
  cursor: pointer;
}
.my-btn svg {
  font-size: 5px;
}
</style>
