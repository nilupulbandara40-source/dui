<template>
  <section id="products" class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
    <div class="mb-10 text-center">
      <p class="text-sm font-semibold uppercase tracking-widest text-slate-500">Products</p>
      <h2 class="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Super market collection</h2>
      <p class="mx-auto mt-4 max-w-2xl text-slate-600">
        Browse featured items from the API and explore them using search and category filters.
      </p>
    </div>

    <div v-if="products.length === 0" class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h3 class="text-xl font-bold text-slate-900">No products found</h3>
      <p class="mt-3 text-sm text-slate-600">
        Try another search word or choose a different category.
      </p>
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
}>()
</script>