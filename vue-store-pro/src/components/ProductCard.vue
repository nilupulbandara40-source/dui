<script setup lang="ts">
import type { Product } from "../types/product"
import { useCartStore } from "../stores/cartStore"
import { useRouter } from "vue-router"

const props = defineProps<{
  product: Product
}>()

const cart = useCartStore()
const router = useRouter()

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 hover:shadow-xl transition">
    <img :src="product.thumbnail" class="h-40 w-full object-cover rounded" />

    <h2 class="mt-2 font-bold">{{ product.title }}</h2>
    <p class="text-sm text-gray-500">${{ product.price }}</p>

    <div class="flex justify-between mt-3">
      <button
        @click="goToDetail"
        class="text-blue-500 hover:underline"
      >
        View
      </button>

      <button
        @click="cart.addToCart(product)"
        class="bg-green-500 text-white px-2 py-1 rounded"
      >
        Add
      </button>
    </div>
  </div>
</template>