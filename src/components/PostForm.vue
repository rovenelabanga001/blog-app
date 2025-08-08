<script setup>
import { reactive, computed, watch } from 'vue'
import { minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const props = defineProps({
  blog: {
    type: Object,
    default: () => ({ title: '', body: '' }),
  },
  buttonText: {
    type: String,
    default: 'Submit',
  },
})

const emit = defineEmits(['submit'])

const blogData = reactive({ ...props.blog })

watch(
  () => props.blog,
  (newVal) => {
    Object.assign(blogData, newVal)
  },
  { immediate: true },
)

const notBlank = (value) => {
  return !!value && value.trim().length > 0
}
const rules = computed(() => ({
  title: { required, notBlank },
  body: { required, minLength: minLength(100) },
}))

const v$ = useVuelidate(rules, blogData)

const handleSubmit = () => {
  v$.value.$touch()

  if (v$.value.$invalid) return

  emit('submit', { ...blogData })
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <input
      placeholder="Blog Title"
      v-model="blogData.title"
      @blur="v$.title.$touch()"
      @touch="v$.title.$touch()"
    />
    <p v-if="v$.title.$error" class="error">
      <span v-if="v$.title.required.$invalid">Title is required</span>
      <span v-else-if="v$.title.notBlank.$invalid">Title can not be blank</span>
    </p>
    <textarea
      placeholder="My Blog"
      v-model="blogData.body"
      @blur="v$.body.$touch()"
      @touch="v$.body.$touch()"
    ></textarea>
    <p v-if="v$.body.$error" class="error">
      <span v-if="v$.body.required.$invalid">Body is required</span>
      <span v-else-if="v$.body.minLength.$invalid">Must be at least 100 characters</span>
    </p>
    <p :style="{ color: blogData.body.length < 100 ? 'red' : 'green' }">
      {{ blogData.body.length }} / 100
    </p>
    <button type="submit">{{ buttonText }}</button>
  </form>
</template>
<style scoped>
.add-post-form-container form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  gap: 0.5rem;
}
.add-post-form-container form input,
textarea {
  border: 2px solid black;
  width: 100%;
}
.add-post-form-container form input {
  height: 3rem;
}
.add-post-form-container form textarea {
  height: 6rem;
}
.add-post-form-container form button {
  width: 30%;
  cursor: pointer;
}
</style>
