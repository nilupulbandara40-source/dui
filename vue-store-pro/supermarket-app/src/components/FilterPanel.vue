<script setup lang="ts">
defineProps<{
  searchTerm: string
  sortBy: string
}>()

const emit = defineEmits<{
  (e: 'update:search-term', value: string): void
  (e: 'update:sort-by', value: string): void
}>()
</script>

<template>
  <section class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
    <div class="grid gap-4 md:grid-cols-[1fr_220px]">
      <div>
        <label class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          Search products
        </label>
        <input
          :value="searchTerm"
          type="text"
          placeholder="Search rice, oil, soap, kitchen..."
          class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-500/20"
          @input="emit('update:search-term', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          Sort by
        </label>
        <select
          :value="sortBy"
          class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-emerald-500/20"
          @change="emit('update:sort-by', ($event.target as HTMLSelectElement).value)"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Discount</option>
        </select>
      </div>
    </div>
  </section>
</template>