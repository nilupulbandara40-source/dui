<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { useCartStore } from './stores/cartStore';
import { useDarkMode } from './composables/useDarkMode';
import { ShoppingCart, Moon, Sun, LayoutDashboard } from 'lucide-vue-next';

// Initialize Stores and Composables
const cart = useCartStore();
const { isDark, toggleDark } = useDarkMode();

onMounted(() => {
  // Bonus: Load cart from localStorage on app start [cite: 27]
  cart.loadCart();
});
</script>

<template>
  <div :class="{ 'dark': isDark }">
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      <nav class="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="max-row-container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            
            <RouterLink to="/" class="flex items-center gap-2 hover:opacity-80 transition">
              <LayoutDashboard class="text-blue-600 dark:text-blue-400" />
              <span class="text-xl font-bold tracking-tight">VueStore<span class="text-blue-600">Pro</span></span>
            </RouterLink>

            <div class="flex items-center gap-4">
              <button 
                @click="toggleDark" 
                class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Toggle Dark Mode"
              >
                <Sun v-if="isDark" class="w-5 h-5 text-yellow-400" />
                <Moon v-else class="w-5 h-5 text-gray-600" />
              </button>

              <RouterLink to="/cart" class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                <ShoppingCart class="w-6 h-6" />
                <span 
                  v-if="cart.itemCount > 0"
                  class="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-800"
                >
                  {{ cart.itemCount }}
                </span>
              </RouterLink>

              <RouterLink 
                to="/login" 
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Login
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

    </div>
  </div>
</template>

<style>
/* Smooth View Transitions for A+ UX */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>