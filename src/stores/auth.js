import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    let user = null
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        user = JSON.parse(stored)
      }
    } catch (err) {
      console.error('Invalid JSON in localStorage for "user":', err)
      localStorage.removeItem('user')
    }
    return {
      user,
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    username: (state) => (state.user ? `${state.user.firstName} ${state.user.lastName}` : null),
    readPosts: (state) => state.user?.readPosts,
  },

  actions: {
    async login(credentials, toast, router, baseUrl) {
      try {
        const res = await fetch(
          `${baseUrl}/users?email=${credentials.email}&password=${credentials.password}`,
        )

        if (!res.ok) throw new Error('Error fetching user data')

        const data = await res.json()

        if (data.length === 0) {
          throw new Error('Invalid email or password')
        }

        this.user = {
          ...data[0],
          readPosts: data[0].readPosts || [],
        }
        localStorage.setItem('user', JSON.stringify(this.user))
        router.push('/home')
        console.log('Logged in')
      } catch (err) {
        toast.error(err.message || 'Something went wrong')
        console.error(err)
      }
    },

    logout(router) {
      this.user = null
      localStorage.removeItem('user')
      router.push('/signin')
      console.log('Logged Out')
    },
    async markPostAsRead(postId, baseUrl) {
      if (!this.readPosts.map(String).includes(String(postId))) {
        const updatedPosts = [...this.readPosts, postId]

        const res = await fetch(`${baseUrl}/users/${this.user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ readPosts: updatedPosts }),
        })

        if (res.ok) {
          this.readPosts.splice(0, this.readPosts.length, ...updatedPosts) // ✅ Safely replace contents
          localStorage.setItem('user', JSON.stringify(this.user))
        } else {
          console.log('Failed to mark as read')
        }
      }
    },

    init() {
      try {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
          this.user = JSON.parse(storedUser)
        }
      } catch (e) {
        console.error('Failed to initialize user from localStorage:', err)
        localStorage.removeItem('user')
        this.user = null
      }
    },
  },
})
