<template>
  <div class="product-card">
    <RouterLink :to="`/products/${product.attributes.slug}`" class="product-image">
      <img
        v-if="productImage"
        :src="productImage"
        :alt="product.attributes.name"
      />
      <div v-else class="no-image">
        <span>📦</span>
      </div>
    </RouterLink>

    <div class="product-info">
      <h3 class="product-name">
        <RouterLink :to="`/products/${product.attributes.slug}`">
          {{ product.attributes.name }}
        </RouterLink>
      </h3>
      
      <p class="product-description" v-if="product.attributes.description">
        {{ truncateDescription(product.attributes.description) }}
      </p>
      
      <div class="product-footer">
        <span class="product-price">€{{ product.attributes.price.toFixed(2) }}</span>
        
        <button
          @click="addToCart"
          class="btn-add-cart"
          :disabled="product.attributes.stock <= 0"
        >
          {{ product.attributes.stock > 0 ? 'Aggiungi al carrello' : 'Non disponibile' }}
        </button>
      </div>
      
      <div v-if="product.attributes.stock > 0 && product.attributes.stock < 10" class="stock-warning">
        Solo {{ product.attributes.stock }} disponibili
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

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  display: block;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.no-image {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.product-name a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.product-name a:hover {
  color: #4CAF50;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4CAF50;
}

.btn-add-cart {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-add-cart:hover:not(:disabled) {
  background: #45a049;
}

.btn-add-cart:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.stock-warning {
  color: #ff9800;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
}
</style>

