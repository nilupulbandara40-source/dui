import { defineStore } from "pinia"
import { ref, computed, watch } from "vue"
import type { Product, CartItem } from "../types/product"

export const useCartStore = defineStore("cart", () => {
  // State: Initialize from localStorage immediately 
  const items = ref<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  )

  // Getters: Precise return types for 100% Type Safety 
  const itemCount = computed((): number => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed((): number => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  // Actions
  const addToCart = (product: Product): void => {
    const existingItem = items.value.find((item) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      // Use spread operator to add the quantity property [cite: 9]
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (id: number): void => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  const updateQuantity = (id: number, delta: number): void => {
    const item = items.value.find((i) => i.id === id)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) removeFromCart(id)
    }
  }

  const clearCart = (): void => {
    items.value = []
  }

  // Watcher: Automatically persists state whenever it changes 
  watch(
    items,
    (newItems) => {
      localStorage.setItem("cart", JSON.stringify(newItems))
    },
    { deep: true }
  )

  return {
    items,
    itemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})