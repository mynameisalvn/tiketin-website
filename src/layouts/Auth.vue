<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div
    class="w-screen h-screen overflow-hidden bg-gray-50 flex items-center justify-center"
    style="
      background-image: url('https://images.unsplash.com/photo-1738005787757-26cbc96a3267?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    "
  >
    <div class="w-full max-w-7xl px-4">
      <router-view></router-view>
    </div>
  </div>
</template>
