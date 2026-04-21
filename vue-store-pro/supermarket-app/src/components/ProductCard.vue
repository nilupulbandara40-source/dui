<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCart } from '../composables/useCart'
import type { Product } from '../types/product'

const props = defineProps<{
  product: Product
}>()

const { addToCart, isInCart } = useCart()

const formatPrice = (price: number): string => `$${price.toFixed(2)}`

const getStockStatus = (stock: number): string => {
  if (stock > 50) return 'In Stock'
  if (stock > 15) return 'Limited Stock'
  return 'Low Stock'
}
</script>

<template>
  <article class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
    <RouterLink :to="`/product/${props.product.id}`" class="block">
      <div class="relative overflow-hidden bg-slate-50 dark:bg-slate-800">
        <img
          :src="props.product.thumbnail"
          :alt="props.product.title"
          class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div class="absolute left-4 top-4 flex flex-wrap gap-2">
          <span class="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow">
            -{{ Math.round(props.product.discountPercentage) }}%
          </span>

          <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow dark:bg-slate-900/90 dark:text-slate-100">
            ⭐ {{ props.product.rating }}
          </span>
        </div>
      </div>
    </RouterLink>

    <div class="p-5">
      <div class="mb-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          {{ props.product.category }}
        </p>
        <RouterLink :to="`/product/${props.product.id}`" class="mt-1 block line-clamp-1 text-lg font-extrabold text-slate-900 dark:text-slate-100 hover:text-emerald-600">
          {{ props.product.title }}
        </RouterLink>
      </div>

      <p class="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {{ props.product.description }}
      </p>

      <div class="mt-4 flex items-center justify-between gap-3">
        <div>
          <p class="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {{ formatPrice(props.product.price) }}
          </p>
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
            {{ getStockStatus(props.product.stock) }}
          </p>
        </div>

        <div class="rounded-2xl bg-emerald-50 px-3 py-2 text-right dark:bg-emerald-500/10">
          <p class="text-xs font-bold text-emerald-700 dark:text-emerald-300">Brand</p>
          <p class="text-xs text-slate-600 dark:text-slate-300">{{ props.product.brand }}</p>
        </div>
      </div>

      <div class="mt-5 flex gap-2">
        <button
          type="button"
          class="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
          @click="addToCart(props.product)"
        >
          {{ isInCart(props.product.id) ? 'Add More' : 'Add to Cart' }}
        </button>

        <RouterLink
          :to="`/product/${props.product.id}`"
          class="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          View
        </RouterLink>
      </div>
    </div>
  </article>
</template>