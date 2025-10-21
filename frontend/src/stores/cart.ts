import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/services/strapi'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  // Carica carrello da localStorage
  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart)
      } catch (e) {
        console.error('Errore nel caricamento del carrello', e)
      }
    }
  }

  // Salva carrello in localStorage
  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  // Aggiungi prodotto al carrello
  const addToCart = (product: Product, quantity = 1) => {
    const existingItem = items.value.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }

    saveCart()
  }

  // Rimuovi prodotto dal carrello
  const removeFromCart = (productId: number) => {
    items.value = items.value.filter((item) => item.product.id !== productId)
    saveCart()
  }

  // Aggiorna quantità
  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find((item) => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  // Svuota carrello
  const clearCart = () => {
    items.value = []
    saveCart()
  }

  // Totale articoli
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  // Totale prezzo
  const totalPrice = computed(() => {
    return items.value.reduce(
      (total, item) => total + item.product.attributes.price * item.quantity,
      0
    )
  })

  // Inizializza carrello
  loadCart()

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }
})

