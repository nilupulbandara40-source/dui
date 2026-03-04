<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { fetchProducts } from "../api/productService"
import type { Product } from "../types/product"
import ProductCard from "../components/ProductCard.vue"

const products = ref<Product[]>([])
const search = ref("")

onMounted(async () => {
  const data = await fetchProducts()
  products.value = data.products
})

const filteredProducts = computed(() =>
  products.value.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<template>
  <div class="p-6">
    <input
      v-model="search"
      placeholder="Search products..."
      class="w-full mb-6 p-2 border rounded"
    />

    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>