
import { computed, ref } from 'vue'
import type { CartItem, Product } from '../types/product'

const CART_STORAGE_KEY = 'freshmart-cart'

const items = ref<CartItem[]>([])
const isLoaded = ref(false)

const loadCart = (): void => {
  if (isLoaded.value) return

  const savedCart = localStorage.getItem(CART_STORAGE_KEY)

  if (savedCart) {
    try {
      items.value = JSON.parse(savedCart) as CartItem[]
    } catch {
      items.value = []
    }
  }

  isLoaded.value = true
}

const saveCart = (): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
}

export const useCart = () => {
  loadCart()

  const itemCount = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((total, item) => total + item.price * item.quantity, 0))
  const shipping = computed(() => (subtotal.value > 0 ? 9.99 : 0))
  const total = computed(() => subtotal.value + shipping.value)

  const addToCart = (product: Product): void => {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ ...product, quantity: 1 })
    }

    saveCart()
  }

  const decreaseQuantity = (productId: number): void => {
    const existingItem = items.value.find((item) => item.id === productId)

    if (!existingItem) return

    if (existingItem.quantity === 1) {
      removeFromCart(productId)
      return
    }

    existingItem.quantity -= 1
    saveCart()
  }

  const increaseQuantity = (productId: number): void => {
    const existingItem = items.value.find((item) => item.id === productId)

    if (!existingItem) return

    existingItem.quantity += 1
    saveCart()
  }

  const removeFromCart = (productId: number): void => {
    items.value = items.value.filter((item) => item.id !== productId)
    saveCart()
  }

  const clearCart = (): void => {
    items.value = []
    saveCart()
  }

  const isInCart = (productId: number): boolean => items.value.some((item) => item.id === productId)

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart,
    isInCart,
  }
}