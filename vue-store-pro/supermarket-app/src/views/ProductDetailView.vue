<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <RouterLink
        to="/"
        class="mb-8 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
      >
        ← Back to Store
      </RouterLink>

      <div v-if="isLoading" class="py-20 text-center">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-emerald-700 dark:border-slate-700 dark:border-t-emerald-500"></div>
        <p class="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">Loading product details...</p>
      </div>

      <div v-else-if="errorMessage" class="rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
        <h2 class="text-2xl font-bold text-red-700 dark:text-red-300">Failed to load product</h2>
        <p class="mt-3 text-sm text-red-600 dark:text-red-300">{{ errorMessage }}</p>
      </div>

      <div
        v-else-if="product"
        class="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2 md:p-10"
      >
        <div>
          <div class="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800">
            <img
              :src="activeImage"
              :alt="product.title"
              class="h-[420px] w-full object-cover"
            />
          </div>

          <div class="mt-4 grid grid-cols-4 gap-3" v-if="product.images.length">
            <button
              v-for="image in product.images"
              :key="image"
              type="button"
              class="overflow-hidden rounded-2xl border-2 transition"
              :class="activeImage === image ? 'border-emerald-600' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'"
              @click="activeImage = image"
            >
              <img :src="image" :alt="product.title" class="h-20 w-full object-cover" />
            </button>
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <div class="mb-3 flex flex-wrap items-center gap-3">
            <span class="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium capitalize text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              {{ product.category }}
            </span>
            <span class="rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              ⭐ {{ product.rating }}
            </span>
          </div>

          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-4xl">
            {{ product.title }}
          </h1>

          <p class="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            {{ product.description }}
          </p>

          <div class="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
            <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p class="font-semibold text-slate-900 dark:text-slate-100">Brand</p>
              <p class="mt-1">{{ product.brand }}</p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p class="font-semibold text-slate-900 dark:text-slate-100">Stock</p>
              <p class="mt-1">{{ product.stock }}</p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p class="font-semibold text-slate-900 dark:text-slate-100">Discount</p>
              <p class="mt-1">{{ product.discountPercentage }}%</p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p class="font-semibold text-slate-900 dark:text-slate-100">Category</p>
              <p class="mt-1 capitalize">{{ product.category }}</p>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">Price</p>
              <p class="text-3xl font-extrabold text-slate-900 dark:text-slate-100">${{ product.price.toFixed(2) }}</p>
            </div>

            <div class="flex gap-3">
              <button
                type="button"
                class="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                @click="goToCart"
              >
                View Cart
              </button>

              <button
                type="button"
                class="rounded-full bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
                @click="addToCart(product)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-slate-600 dark:text-slate-300">
        Product not found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { fetchProductById } from '../services/api'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

const product = ref<Product | null>(null)
const activeImage = ref<string>('')
const isLoading = ref<boolean>(true)
const errorMessage = ref<string>('')

async function loadProduct(): Promise<void> {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const productId = Number(route.params.id)

    if (Number.isNaN(productId)) {
      throw new Error('Invalid product id')
    }

    product.value = await fetchProductById(productId)
    activeImage.value = product.value.images[0] || product.value.thumbnail
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'An unexpected error occurred.'
    }
  } finally {
    isLoading.value = false
  }
}

const goToCart = (): void => {
  router.push('/cart')
}

onMounted(() => {
  loadProduct()
})

watch(
  () => route.params.id,
  () => {
    loadProduct()
  },
)
</script>