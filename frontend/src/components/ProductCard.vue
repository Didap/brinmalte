<template>
  <Card class="product-card">
    <template #header>
      <RouterLink :to="`/products/${product.attributes.slug}`" class="product-image-link">
        <img 
          v-if="productImage"
          :src="productImage" 
          :alt="product.attributes.name"
          class="product-image"
        />
        <div v-else class="no-image">
          <i class="pi pi-image" style="font-size: 4rem"></i>
        </div>
        
        <Tag 
          v-if="product.attributes.stock > 0 && product.attributes.stock < 10"
          severity="warn"
          class="stock-badge"
        >
          Solo {{ product.attributes.stock }} disponibili
        </Tag>
        
        <Tag 
          v-else-if="product.attributes.stock <= 0"
          severity="secondary"
          class="stock-badge"
        >
          Esaurito
        </Tag>
      </RouterLink>
    </template>
    
    <template #title>
      <RouterLink :to="`/products/${product.attributes.slug}`" class="product-title">
        {{ product.attributes.name }}
      </RouterLink>
    </template>
    
    <template #subtitle>
      <div class="product-price">€{{ product.attributes.price.toFixed(2) }}</div>
    </template>
    
    <template #content>
      <p v-if="product.attributes.description" class="product-description">
        {{ truncateDescription(product.attributes.description, 80) }}
      </p>
    </template>
    
    <template #footer>
      <Button 
        label="Aggiungi al carrello"
        icon="pi pi-shopping-cart"
        class="w-full"
        :disabled="product.attributes.stock <= 0"
        @click="addToCart"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { getImageUrl, type Product } from '@/services/strapi'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

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

const truncateDescription = (text: string, maxLength = 80) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const addToCart = () => {
  if (props.product.attributes.stock > 0) {
    cartStore.addToCart(props.product)
  }
}
</script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-image-link {
  position: relative;
  display: block;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.no-image {
  width: 100%;
  height: 100%;
  background: var(--p-surface-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--p-surface-400);
}

.stock-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.product-title {
  color: var(--p-text-color);
  text-decoration: none;
  transition: color 0.2s;
}

.product-title:hover {
  color: var(--p-primary-color);
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-primary-color);
}

.product-description {
  color: var(--p-text-muted-color);
  line-height: 1.5;
  margin: 0;
}
</style>

