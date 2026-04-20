<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()

const formatPrice = (price: number): string => `$${price.toFixed(2)}`

const getStockStatus = (stock: number): string => {
  if (stock > 50) return 'In Stock'
  if (stock > 15) return 'Limited Stock'
  return 'Low Stock'
}
</script>

<template>
  <article class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div class="relative overflow-hidden bg-slate-50">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div class="absolute left-4 top-4 flex flex-wrap gap-2">
        <span class="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow">
          -{{ Math.round(product.discountPercentage) }}%
        </span>

        <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow">
          ⭐ {{ product.rating }}
        </span>
      </div>
    </div>

    <div class="p-5">
      <div class="mb-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          {{ product.category }}
        </p>
        <h3 class="mt-1 line-clamp-1 text-lg font-extrabold text-slate-900">
          {{ product.title }}
        </h3>
      </div>

      <p class="line-clamp-2 text-sm leading-6 text-slate-600">
        {{ product.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <div>
          <p class="text-2xl font-extrabold text-slate-900">
            {{ formatPrice(product.price) }}
          </p>
          <p class="text-xs font-medium text-slate-500">
            {{ getStockStatus(product.stock) }}
          </p>
        </div>

        <div class="rounded-2xl bg-emerald-50 px-3 py-2 text-right">
          <p class="text-xs font-bold text-emerald-700">Brand</p>
          <p class="text-xs text-slate-600">{{ product.brand }}</p>
        </div>
      </div>

      <div class="mt-5 flex gap-2">
        <button class="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
          Add to Cart
        </button>
        <button class="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
          View
        </button>
      </div>
    </div>
  </article>
</template>