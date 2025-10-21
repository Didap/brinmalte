<template>
  <div class="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all hover:shadow-lg">
    <RouterLink 
      :to="`/products/${product.attributes.slug}`" 
      class="relative block aspect-square overflow-hidden bg-cream-100"
    >
      <img
        v-if="productImage"
        :src="productImage"
        :alt="product.attributes.name"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div v-else class="flex h-full w-full items-center justify-center text-6xl">
        📦
      </div>
      
      <div 
        v-if="product.attributes.stock > 0 && product.attributes.stock < 10" 
        class="absolute right-2 top-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md"
      >
        Solo {{ product.attributes.stock }} disponibili
      </div>
      
      <div 
        v-else-if="product.attributes.stock <= 0" 
        class="absolute right-2 top-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white shadow-md"
      >
        Esaurito
      </div>
    </RouterLink>

    <div class="flex flex-1 flex-col p-4">
      <h3 class="mb-2 text-lg font-semibold text-secondary">
        <RouterLink 
          :to="`/products/${product.attributes.slug}`"
          class="hover:text-primary transition-colors"
        >
          {{ product.attributes.name }}
        </RouterLink>
      </h3>
      
      <p 
        v-if="product.attributes.description" 
        class="mb-4 flex-1 text-sm text-secondary/70"
      >
        {{ truncateDescription(product.attributes.description) }}
      </p>
      
      <div class="mt-auto space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-primary">
            €{{ product.attributes.price.toFixed(2) }}
          </span>
        </div>
        
        <button
          @click="addToCart"
          :disabled="product.attributes.stock <= 0"
          class="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:bg-secondary/50 disabled:opacity-50"
        >
          {{ product.attributes.stock > 0 ? 'Aggiungi al carrello' : 'Non disponibile' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { getImageUrl, type Product } from '@/services/strapi'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

const productImage = computed(() => {
  const images = props.product.attributes.images?.data
  if (images && images.length > 0) {
    return getImageUrl(images[0].attributes.url)
  }
  return null
})

const truncateDescription = (text: string, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const addToCart = () => {
  if (props.product.attributes.stock > 0) {
    cartStore.addToCart(props.product)
  }
}
</script>

