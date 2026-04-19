<template>
  <article
    class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <div class="flex h-56 items-center justify-center overflow-hidden bg-slate-100">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="p-5">
      <div class="mb-2 flex items-center justify-between gap-2">
        <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
          {{ product.category }}
        </span>
        <span class="text-sm font-medium text-amber-500">
          ⭐ {{ product.rating }}
        </span>
      </div>

      <h3 class="line-clamp-1 text-lg font-bold text-slate-900">
        {{ product.title }}
      </h3>

      <p class="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
        {{ product.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <div>
          <p class="text-lg font-extrabold text-slate-900">${{ product.price }}</p>
          <p class="text-xs text-slate-500">{{ product.brand }}</p>
        </div>

        <RouterLink
          :to="`/product/${product.id}`"
          class="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          View
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()
</script>