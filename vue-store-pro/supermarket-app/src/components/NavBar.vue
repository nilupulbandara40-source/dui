<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-emerald-700 text-white shadow-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-emerald-700">
          🛒
        </div>
        <div>
          <h1 class="text-lg font-bold leading-none">Super Market</h1>
          <p class="text-xs text-emerald-100">Fresh deals every day</p>
        </div>
      </RouterLink>

      <nav class="hidden gap-6 md:flex">
        <a href="#products" class="text-sm font-medium text-white/90 hover:text-white">Products</a>
        <a href="#categories" class="text-sm font-medium text-white/90 hover:text-white">Categories</a>
        <a href="#about" class="text-sm font-medium text-white/90 hover:text-white">About</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>