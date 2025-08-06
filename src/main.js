import { createApp, provide, ref } from 'vue'
import App from './App.vue'
import './assets/style.css'
import router from './router'
import { createPinia } from 'pinia'
import Toast, { useToast } from 'vue-toastification'
import { baseUrl } from './config'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Toast)
app.mount('#app')
