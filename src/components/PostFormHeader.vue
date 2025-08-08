<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['heading'])
</script>
<template>
  <button @click="router.back()"><ArrowLeft /></button>
  <h3>{{ heading }}</h3>
</template>
