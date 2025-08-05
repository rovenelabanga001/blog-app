import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    username: (state) => (state.user ? `${state.user.firstName}  ${state.user.lastName}` : null),
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

        this.user = data[0]
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
    init() {
      const storedUser = localStorage.getItem('user')
      if (!storedUser) {
        this.user = JSON.parse(storedUser)
      }
    },
  },
})
