<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const { itemCount } = useCart()
const { isDark, toggleTheme } = useTheme()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Cart', to: '/cart' },
]

const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-extrabold text-white shadow-lg shadow-emerald-600/30">
          FM
        </div>

        <div>
          <h1 class="text-lg font-extrabold tracking-tight sm:text-xl">FreshMart Pro</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Professional supermarket web application</p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-full px-4 py-2 text-sm font-semibold transition"
          :class="route.path === link.to ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'"
        >
          {{ link.label }}
        </RouterLink>

        <a
          v-if="isHomePage"
          href="#catalog"
          class="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Products
        </a>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          class="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 flex items-center gap-2"
          @click="toggleTheme"
        >
          <!-- PROFESSIONAL ICON (SVG) -->
          <span v-if="isDark">
            <!-- Sun Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </span>
          <span v-else>
            <!-- Moon Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </span>

          <!-- TEXT (UNCHANGED) -->
          {{ isDark ? 'Light' : 'Dark' }}
        </button>

        <RouterLink
          to="/cart"
          class="relative rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-emerald-700"
        >
          Cart
          <span class="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-emerald-700">
            {{ itemCount }}
          </span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>