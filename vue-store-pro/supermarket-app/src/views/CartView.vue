<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCart } from '../composables/useCart'

const { items, subtotal, shipping, total, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart()

const isCartEmpty = computed(() => items.value.length === 0)
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Shopping Cart</h1>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Review your supermarket items before checkout.</p>
        </div>

        <RouterLink
          to="/"
          class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Continue Shopping
        </RouterLink>
      </div>

      <div v-if="isCartEmpty" class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Your cart is empty</h2>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">Add some products to enjoy the professional cart experience.</p>
        <RouterLink
          to="/"
          class="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          Browse Products
        </RouterLink>
      </div>

      <div v-else class="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div class="space-y-4">
            <article
              v-for="item in items"
              :key="item.id"
              class="flex flex-col gap-4 rounded-3xl border border-slate-200 p-4 dark:border-slate-800 sm:flex-row"
            >
              <img
                :src="item.thumbnail"
                :alt="item.title"
                class="h-28 w-full rounded-2xl object-cover sm:w-32"
              />

              <div class="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <RouterLink :to="`/product/${item.id}`" class="text-lg font-bold text-slate-900 hover:text-emerald-600 dark:text-slate-100">
                    {{ item.title }}
                  </RouterLink>
                  <p class="mt-1 text-sm capitalize text-slate-500 dark:text-slate-400">{{ item.category }} • {{ item.brand }}</p>
                  <p class="mt-2 text-lg font-extrabold text-emerald-700 dark:text-emerald-300">${{ item.price.toFixed(2) }}</p>
                </div>

                <div class="flex items-center gap-3">
                  <div class="flex items-center rounded-full border border-slate-300 dark:border-slate-700">
                    <button
                      type="button"
                      class="px-4 py-2 text-lg font-bold text-slate-700 dark:text-slate-200"
                      @click="decreaseQuantity(item.id)"
                    >
                      −
                    </button>
                    <span class="min-w-10 text-center text-sm font-bold text-slate-900 dark:text-slate-100">{{ item.quantity }}</span>
                    <button
                      type="button"
                      class="px-4 py-2 text-lg font-bold text-slate-700 dark:text-slate-200"
                      @click="increaseQuantity(item.id)"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    class="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/30"
                    @click="removeFromCart(item.id)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <aside class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 h-fit">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-extrabold text-slate-900 dark:text-slate-100">Order Summary</h2>
            <button
              type="button"
              class="text-sm font-semibold text-red-600 hover:underline dark:text-red-300"
              @click="clearCart"
            >
              Clear Cart
            </button>
          </div>

          <div class="mt-6 space-y-4 text-sm">
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Subtotal</span>
              <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Shipping</span>
              <span class="font-semibold">${{ shipping.toFixed(2) }}</span>
            </div>
            <div class="flex items-center justify-between border-t border-slate-200 pt-4 text-base font-extrabold text-slate-900 dark:border-slate-800 dark:text-slate-100">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>

          <button
            type="button"
            class="mt-6 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            Proceed to Checkout
          </button>

          <p class="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
            This is a UI simulation for your SPA mini project. It demonstrates cart persistence and a professional checkout-style layout.
          </p>
        </aside>
      </div>
    </div>
  </div>
</template>