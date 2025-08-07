<script setup>
const { searchQuery } = defineProps(['searchQuery'])
</script>
<template>
  <div>
    <p class="error">No Results Found For "{{ searchQuery }}". Try Something Else</p>
  </div>
</template>
