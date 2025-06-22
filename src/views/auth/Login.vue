<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const authStore = useAuthStore();
const { loading, error } = storeToRefs(authStore);
const { login } = authStore;

const form = ref({
  email: "",
  password: "",
});

const passwordVisible = ref(false);

const handleSubmit = async () => {
  await login(form.value);
  if (error.value === "Unauthorized") {
    form.value.password = "";
    alert("Email atau password salah, silahkan coba lagi");
  }
};

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center overflow-hidden"
  >
    <div
      class="flex flex-col lg:flex-row max-w-6xl w-full rounded-xl bg-white overflow-hidden"
    >
      <!-- LEFT: Login Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-10">
        <div class="w-full max-w-md space-y-6">
          <h2 class="text-3xl font-bold text-blue-600 text-center">TIKETin</h2>

          <div>
            <h3 class="text-xl font-bold text-gray-800">Sign In</h3>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                id="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="nama@company.com"
                required
              />
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
                  class="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>

            <!-- Remember + Forgot -->
            <div class="flex justify-between items-center text-sm">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="mr-2 rounded border-gray-300 text-blue-600"
                />
                Remember me
              </label>
              <!-- <a href="#" class="text-blue-600 hover:underline"
                >Lupa password?</a
              > -->
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              <span v-if="!loading">Sign in</span>
              <span v-else>Loading...</span>
            </button>

            <!-- Divider -->
            <div class="flex items-center">
              <div class="flex-grow h-px bg-gray-300"></div>
              <span class="mx-4 text-sm text-gray-500">Atau</span>
              <div class="flex-grow h-px bg-gray-300"></div>
            </div>

            <!-- Register -->
            <div class="text-center text-sm text-gray-600">
              Belum punya akun?
              <RouterLink
                :to="{ name: 'register' }"
                class="text-blue-600 hover:underline"
              >
                Sign up
              </RouterLink>
            </div>
          </form>
        </div>
      </div>

      <!-- RIGHT: Image & Text -->
      <div
        class="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400 text-white p-10"
      >
        <div class="max-w-xs text-center space-y-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            class="w-24 h-24 mx-auto"
            alt="login image"
          />
          <h3 class="text-2xl font-semibold">
            "Attention is the new currency"
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
