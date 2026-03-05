<script setup lang="ts">
import { onMounted } from "vue"
import { useCartStore } from "./stores/cartStore"
import NavBar from "./components/NavBar.vue"

const cart = useCartStore()

onMounted(() => {
  cart.loadCart()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    
    <!-- Navigation -->
    <NavBar />

    <!-- Page Content -->
    <main class="max-w-7xl mx-auto px-4 py-6">
      <router-view />
    </main>

  </div>
</template>