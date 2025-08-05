<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const { logout } = auth

const onLogOutClick = () => {
  logout(router)
}
</script>
<template>
  <nav>
    <h3>
      <router-link to="/" exact-active-class="active-link" class="nav-link">Blog App</router-link>
    </h3>
    <div class="link-container">
      <ul>
        <li>
          <router-link to="/" exact-active-class="active-link" class="nav-link">Home</router-link>
        </li>
        <li>
          <router-link to="/about" exact-active-class="active-link" class="nav-link"
            >About</router-link
          >
        </li>
        <li>
          <router-link to="/posts" exact-active-class="active-link" class="nav-link"
            >Posts</router-link
          >
        </li>

        <button @click="onLogOutClick">Log Out</button>
      </ul>
    </div>
  </nav>
</template>
<style scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6rem;
  padding: 3rem;
  background: rgb(8, 150, 182);
}
nav h3 {
  color: white;
  padding: 0 3rem;
}
nav div.link-container ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  padding: 3rem;
}
nav div.link-container ul li {
  list-style-type: none;
  font-size: large;
  font-weight: 800;
  cursor: pointer;
}
nav div.link-container ul button {
  background: orange;
  border: none;
  outline: none;
  color: white;
  width: 6rem;
  height: 3rem;
  text-align: center;
  cursor: pointer;
  transition: 0.3s all;
}
nav div.link-container ul button:hover {
  background-color: rgb(239, 174, 54);
}
.nav-link {
  text-decoration: none;
  color: white;
}
.active-link {
  color: orange;
}
</style>
