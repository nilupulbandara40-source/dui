<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import DepartmentChips from '../components/DepartmentChips.vue'
import FilterPanel from '../components/FilterPanel.vue'
import HeroBanner from '../components/HeroBanner.vue'
import NavBar from '../components/NavBar.vue'
import ProductCard from '../components/ProductCard.vue'
import PromoStrip from '../components/PromoStrip.vue'
import { getDepartmentProducts, supermarketDepartments } from '../services/api'
import type { Product } from '../types/product'

const allProducts = ref<Product[]>([])
const loading = ref<boolean>(true)
const error = ref<string>('')

const selectedDepartment = ref<string>('all')
const searchTerm = ref<string>('')
const sortBy = ref<string>('featured')

const normalizeText = (value: string): string => {
  return value.toLowerCase().trim()
}

const filteredProducts = computed(() => {
  const keyword = normalizeText(searchTerm.value)

  let result = [...allProducts.value].filter((product) => {
    if (!keyword) return true

    const title = normalizeText(product.title)
    const description = normalizeText(product.description)
    const category = normalizeText(product.category)
    const brand = normalizeText(product.brand)

    return (
      title.includes(keyword) ||
      description.includes(keyword) ||
      category.includes(keyword) ||
      brand.includes(keyword)
    )
  })

  switch (sortBy.value) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'discount':
      result.sort((a, b) => b.discountPercentage - a.discountPercentage)
      break
    default:
      result.sort((a, b) => b.discountPercentage - a.discountPercentage)
      break
  }

  return result
})

const featuredDeals = computed(() => {
  return [...filteredProducts.value]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 6)
})

const selectedDepartmentLabel = computed(() => {
  return (
    supermarketDepartments.find((item) => item.id === selectedDepartment.value)?.label ||
    'All Departments'
  )
})

const loadProducts = async (departmentId: string): Promise<void> => {
  try {
    loading.value = true
    error.value = ''
    allProducts.value = await getDepartmentProducts(departmentId)
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load department products.'
  } finally {
    loading.value = false
  }
}

const changeDepartment = async (departmentId: string): Promise<void> => {
  selectedDepartment.value = departmentId
  searchTerm.value = ''
  await loadProducts(departmentId)
}

onMounted(async () => {
  await loadProducts(selectedDepartment.value)
})
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <NavBar />
    <HeroBanner />
    <PromoStrip />

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section class="mb-8">
        <DepartmentChips
          :departments="supermarketDepartments"
          :selected-department="selectedDepartment"
          @select="changeDepartment"
        />
      </section>

      <section class="mb-8">
        <FilterPanel
          :search-term="searchTerm"
          :sort-by="sortBy"
          @update:search-term="searchTerm = $event"
          @update:sort-by="sortBy = $event"
        />
      </section>

      <div v-if="loading" class="py-16 text-center">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
        <p class="mt-4 text-sm font-medium text-slate-600">Loading products...</p>
      </div>

      <div
        v-else-if="error"
        class="rounded-3xl border border-red-200 bg-red-50 p-6 text-center"
      >
        <p class="font-semibold text-red-600">{{ error }}</p>
      </div>

      <template v-else>
        <section id="deals" class="mb-10">
          <div class="mb-5 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">Featured Deals</h2>
              <p class="text-sm text-slate-600">
                Best discounts in {{ selectedDepartmentLabel }}
              </p>
            </div>

            <span class="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
              Weekly Offers
            </span>
          </div>

          <div
            v-if="featuredDeals.length > 0"
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            <ProductCard
              v-for="product in featuredDeals"
              :key="`featured-${product.id}`"
              :product="product"
            />
          </div>

          <div
            v-else
            class="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
          >
            <h3 class="text-lg font-bold text-slate-900">No featured deals found</h3>
            <p class="mt-2 text-sm text-slate-600">
              Try another keyword.
            </p>
          </div>
        </section>

        <section id="catalog">
          <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">Supermarket Products</h2>
              <p class="text-sm text-slate-600">
                Showing {{ filteredProducts.length }} items in
                <span class="font-bold text-emerald-700">
                  {{ selectedDepartmentLabel }}
                </span>
              </p>
            </div>

            <div class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              Professional supermarket interface
            </div>
          </div>

          <div
            v-if="filteredProducts.length === 0"
            class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm"
          >
            <h3 class="text-lg font-bold text-slate-900">No matching products found</h3>
            <p class="mt-2 text-sm text-slate-600">
              Try a different search term.
            </p>
          </div>

          <div
            v-else
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
        </section>
      </template>
    </main>
  </div>
</template>