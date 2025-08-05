<script setup>
import useVuelidate from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
const newUser = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const oneWord = helpers.withMessage('Must be a single word with no spaces', helpers.regex(/^\S+$/))

const confirmPasswordMatch = helpers.withMessage(
  'Passwords do not match',
  (value, vm) => value === vm.password,
)

const rules = computed(() => ({
  firstName: { required, oneWord },
  lastName: { required, oneWord },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, confirmPasswordMatch },
}))

const v$ = useVuelidate(rules, newUser)
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <!-- First Name -->
    <div class="input-container">
      <label for="firstName">First Name</label>
      <input
        type="text"
        placeholder="eg John"
        id="firstName"
        v-model="newUser.firstName"
        @blur="v$.firstName.$touch()"
        @touch="v$.firstName.$touch()"
      />
      <p v-if="v$.firstName.$error" class="error">
        <span v-if="v$.firstName.required.$invalid">First Name is required</span>
        <span v-else-if="v$.firstName.oneWord?.$invalid">Must be one word with no space</span>
      </p>
    </div>

    <!-- Last Name -->
    <div class="input-container">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        placeholder="eg Doe"
        id="lastName"
        v-model="newUser.lastName"
        @blur="v$.lastName.$touch()"
        @touch="v$.lastName.$touch()"
      />
      <p v-if="v$.lastName.$error" class="error">
        <span v-if="v$.lastName.required.$invalid">Last Name is required</span>
        <span v-else-if="v$.lastName.oneWord?.$invalid">Must be one word with no space</span>
      </p>
    </div>

    <!-- Email -->
    <div class="input-container">
      <label for="email">Email</label>
      <input
        type="email"
        placeholder="eg johndoe@example.com"
        id="email"
        v-model="newUser.email"
        @blur="v$.email.$touch()"
        @touch="v$.email.$touch()"
      />
      <p v-if="v$.email.$error" class="error">
        <span v-if="v$.email.required.$invalid">Email is required</span>
        <span v-else-if="v$.email.email.$invalid">Invalid email format</span>
      </p>
    </div>

    <!-- Password -->
    <div class="input-container">
      <label for="password">Password</label>
      <input
        type="password"
        placeholder="eg MyP@ssword"
        id="password"
        v-model="newUser.password"
        @blur="v$.password.$touch()"
        @touch="v$.password.$touch()"
      />
      <p v-if="v$.password.$error" class="error">
        <span v-if="v$.password.required.$invalid">Password is required</span>
        <span v-else-if="v$.password.minLength.$invalid"
          >Password must be at least 6 characters</span
        >
      </p>
    </div>

    <!-- Confirm Password -->
    <div class="input-container">
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        placeholder="eg MyP@ssword"
        id="confirmPassword"
        v-model="newUser.confirmPassword"
        @blur="v$.confirmPassword.$touch()"
        @touch="v$.confirmPassword.$touch()"
      />
      <p v-if="v$.confirmPassword.$error" class="error">
        <span v-if="v$.confirmPassword.required.$invalid">Confirm Password is required</span>
        <span v-else-if="v$.confirmPassword.confirmPasswordMatch.$invalid"
          >Passwords do not match</span
        >
      </p>
    </div>

    <button type="submit">Sign Up</button>
  </form>
</template>
