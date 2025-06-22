// TODO: Import necessary dependencies
// Hint: You'll need pinia, axios, router, and cookies
import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";
import router from "@/router";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // TODO: Define your state properties
    // Hint: You'll need user, loading, error, and success states
    user: null,
    loading: false,
    error: null,
    success: null,
  }),

  getters: {
    // TODO: Implement token getter
    // Hint: Get token from cookies
    // TODO: Implement isAuthenticated getter
    // Hint: Check if user exists
    token: () => Cookies.get("token"),
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(credentials) {
      // TODO: Implement login action
      // Steps:
      // 1. Set loading state
      // 2. Make API call to login endpoint
      // 3. Store token in cookies
      // 4. Handle success/error
      // 5. Redirect user
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.post("/login", credentials);

        const token = response.data.data.token;

        Cookies.set("token", token);

        this.success = response.data.message;

        if (response.data.data.user.role === "admin") {
          router.push({ name: "admin.dashboard" });
        } else {
          router.push({ name: "app.dashboard" });
        }
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async register(credentials) {
      // TODO: Implement register action
      // Steps:
      // 1. Set loading state
      // 2. Make API call to register endpoint
      // 3. Store token in cookies
      // 4. Handle success/error
      // 5. Redirect user
      this.loading = true;

      try {
        const response = await axiosInstance.post("/register", credentials);
        this.success = response.data.message;

        const token = response.data.data.token;

        Cookies.set("token", token);

        router.push({ name: "app.dashboard" });
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      // TODO: Implement logout action
      // Steps:
      // 1. Set loading state
      // 2. Make API call to logout endpoint
      // 3. Remove token from cookies
      // 4. Clear user state
      // 5. Redirect to login
      try {
        const response = await axiosInstance.post("/logout");

        Cookies.remove("token");

        this.user = null;
        this.error = null;

        this.success = response.data.message;

        router.push({ name: "login" });
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async checkAuth() {
      // TODO: Implement checkAuth action
      // Steps:
      // 1. Set loading state
      // 2. Make API call to get user data
      // 3. Update user state
      // 4. Handle unauthorized error
    },
  },
});
