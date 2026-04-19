<template>
  <section id="categories" class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="w-full lg:max-w-md">
          <input
            v-model="search"
            type="text"
            placeholder="Search supermarket products..."
            class="w-full rounded-full border border-slate-300 px-5 py-3 text-sm outline-none transition focus:border-emerald-600"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectCategory(cat)"
            :class="[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              selectedCategory === cat
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps<{
  categories: string[]
}>()

const emit = defineEmits<{
  (e: 'search', value: string): void
  (e: 'filter', value: string): void
}>()

const search = ref('')
const selectedCategory = ref('All')

function selectCategory(category: string): void {
  selectedCategory.value = category
  emit('filter', category)
}

watch(search, (value) => {
  emit('search', value)
})
</script>