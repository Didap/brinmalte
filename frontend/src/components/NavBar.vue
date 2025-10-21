<template>
  <nav class="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
    <div class="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
      <RouterLink 
        to="/" 
        class="flex items-center space-x-2 text-2xl font-bold text-secondary hover:text-primary transition-colors"
      >
        <span class="text-3xl">🛍️</span>
        <span>Brinmalte</span>
      </RouterLink>
      
      <div class="flex items-center space-x-6 md:space-x-8">
        <RouterLink 
          to="/" 
          class="text-sm font-medium text-secondary/70 hover:text-primary transition-colors"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/products" 
          class="text-sm font-medium text-secondary/70 hover:text-primary transition-colors"
        >
          Prodotti
        </RouterLink>
        <RouterLink 
          to="/cart" 
          class="relative flex items-center space-x-2 text-sm font-medium text-secondary/70 hover:text-primary transition-colors"
        >
          <span class="text-xl">🛒</span>
          <span class="hidden sm:inline">Carrello</span>
          <span 
            v-if="cartStore.totalItems > 0" 
            class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
          >
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

