<template>
  <div class="min-h-screen bg-slate-50">
    <NavBar />
    <HeroSection />

    <FilterBar
      :categories="categories"
      @search="handleSearch"
      @filter="handleFilter"
    />

    <LoadingSpinner v-if="isLoading" />
    <ErrorMessage v-else-if="errorMessage" :message="errorMessage" />
    <ProductGrid v-else :products="filteredProducts" />

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import FilterBar from '../components/FilterBar.vue'
import ProductGrid from '../components/ProductGrid.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import AppFooter from '../components/AppFooter.vue'
import { fetchProducts } from '../services/api'
import type { Product } from '../types/product'

const products = ref<Product[]>([])
const isLoading = ref<boolean>(true)
const errorMessage = ref<string>('')
const searchText = ref<string>('')
const selectedCategory = ref<string>('All')

const categories = computed<string[]>(() => {
  const uniqueCategories = new Set(products.value.map((product) => product.category))
  return ['All', ...Array.from(uniqueCategories)]
})

const filteredProducts = computed<Product[]>(() => {
  return products.value.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchText.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === 'All' ||
      product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

function handleSearch(value: string): void {
  searchText.value = value
}

function handleFilter(value: string): void {
  selectedCategory.value = value
}

async function loadProducts(): Promise<void> {
  try {
    isLoading.value = true
    errorMessage.value = ''
    products.value = await fetchProducts()
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

onMounted(() => {
  loadProducts()
})
</script>