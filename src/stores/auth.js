import { defineStore } from 'pinia'
import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const baseUrl = inject('baseUrl')
  const router = useRouter()

  const user = ref(null)

  const isAuthenticated = computed(() => !!user.value) //use double negation to turn object to boolean

  const login = async (credentials) => {
    try {
      const res = await fetch(
        `${baseUrl.value}/users?email=${credentials.email}&password=${credentials.password}`,
      )
      const data = await res.json()

      if (data.length === 0) throw new Error('Invalid email or password')

      user.value = data[0]
      localStorage.setItem('user', JSON.stringify(user.value))

      router.push('/home')
      console.log('Logged in')
    } catch (err) {
      console.error(err)
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    router.push('/signin')
    console.log('logged out')
  }

  const init = () => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) user.value = JSON.parse(storedUser)
  }

  return { user, isAuthenticated, login, logout, init }
})
