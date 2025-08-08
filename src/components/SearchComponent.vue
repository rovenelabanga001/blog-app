<script setup>
const model = defineModel()
const { showAuthor } = defineProps(['showAuthor'])
</script>
<template>
  <input
    type="text"
    :placeholder="showAuthor ? 'Search for blog by name or author' : 'Search for blog by name'"
    v-model="model"
  />
</template>

<style scoped>
input {
  width: 30%;
  height: 2rem;
  border-radius: 2rem;
  padding: 0 4px;
  outline: none;
  border: 3px solid rgb(8, 150, 182);
  transition: 0.3s;
}
input::placeholder {
  color: gray;
}
input:focus {
  border: 3px solid rgba(252, 164, 2, 0.475);
}
</style>
