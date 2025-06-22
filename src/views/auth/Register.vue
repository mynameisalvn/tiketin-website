<script setup>
// TODO: Import necessary dependencies
// Hint: You'll need to import from vue, pinia, and your auth store
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

// TODO: Initialize auth store and get necessary refs
// Hint: Use useAuthStore() and storeToRefs()
const authStore = useAuthStore();
const { loading, error } = storeToRefs(authStore);
const { register } = authStore;

// TODO: Create form ref with registration fields
// Hint: You'll need name, email, password
const form = ref({
  // Your form fields here
  name: null,
  email: null,
  password: null,
});

// TODO: Implement handleSubmit function
// Hint: This should call the register function from auth store
// and handle any errors
const handleSubmit = async () => {
  // Your code here
  await register(form.value);
};

// TODO: Implement togglePassword function
// Hint: This should toggle password visibility
const togglePassword = () => {
  // Your code here
};

// TODO: Implement toggleConfirmPassword function
// Hint: This should toggle confirm password visibility
const toggleConfirmPassword = () => {
  // Your code here
};
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center overflow-hidden"
  >
    <div
      class="flex flex-col lg:flex-row max-w-6xl w-full rounded-xl shadow bg-white overflow-hidden"
    >
      <!-- LEFT: Image & Quote -->
      <div
        class="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-gray-500 to-teal-400 text-white p-10"
      >
        <div class="max-w-xs text-center space-y-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            class="w-24 h-24 mx-auto"
            alt="register image"
          />
          <h3 class="text-2xl font-semibold">
            "Every expert was once a beginner"
          </h3>
        </div>
      </div>

      <!-- Right: Register Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-10">
        <div class="w-full max-w-md space-y-6">
          <h2 class="text-3xl font-bold text-blue-600 text-center">TIKETin</h2>

          <div>
            <h3 class="text-xl font-bold text-gray-800">Sign Up</h3>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Nama Lengkap</label
              >
              <input
                v-model="form.name"
                type="text"
                id="name"
                name="name"
                class="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500 ring-red-500': error?.name }"
                placeholder="John Doe"
                required
              />
              <p class="mt-1 text-xs text-red-500" v-if="error?.name">
                {{ error.name.join(", ") }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                id="email"
                name="email"
                class="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500 ring-red-500': error?.email }"
                placeholder="nama@perusahaan.com"
                required
              />
              <p class="mt-1 text-xs text-red-500" v-if="error?.email">
                {{ error.email.join(", ") }}
              </p>
            </div>

            <!-- Password -->
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >Password</label
              >
              <div class="relative">
                <input
                  :type="passwordVisible ? 'text' : 'password'"
                  v-model="form.password"
                  id="password"
                  name="password"
                  class="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{ 'border-red-500 ring-red-500': error?.password }"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <i
                    :data-feather="passwordVisible ? 'eye-off' : 'eye'"
                    class="w-4 h-4"
                  ></i>
                </button>
              </div>
              <p class="mt-1 text-xs text-red-500" v-if="error?.password">
                {{ error.password.join(", ") }}
              </p>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              <span v-if="!loading">Sign up</span>
              <span v-else>Loading...</span>
            </button>

            <!-- Divider -->
            <div class="flex items-center">
              <div class="flex-grow h-px bg-gray-300"></div>
              <span class="mx-4 text-sm text-gray-500">Atau</span>
              <div class="flex-grow h-px bg-gray-300"></div>
            </div>

            <!-- Login Link -->
            <div class="text-center text-sm text-gray-600">
              Sudah punya akun?
              <RouterLink
                :to="{ name: 'login' }"
                class="text-blue-600 hover:underline"
              >
                Sign in
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
