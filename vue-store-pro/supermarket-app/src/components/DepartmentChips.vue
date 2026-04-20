<script setup lang="ts">
import type { Department } from '../types/product'

defineProps<{
  departments: Department[]
  selectedDepartment: string
}>()

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()
</script>

<template>
  <section id="departments">
    <div class="flex flex-wrap gap-3">
      <button
        v-for="department in departments"
        :key="department.id"
        class="rounded-full px-4 py-2 text-sm font-semibold transition"
        :class="
          selectedDepartment === department.id
            ? 'bg-emerald-600 text-white shadow'
            : 'border border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600'
        "
        @click="emit('select', department.id)"
      >
        {{ department.label }}
      </button>
    </div>
  </section>
</template>