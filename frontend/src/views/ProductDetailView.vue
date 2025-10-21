<template>
  <div class="product-detail">
    <div class="container">
      <div v-if="productsStore.loading" class="loading">
        Caricamento prodotto...
      </div>
      
      <div v-else-if="productsStore.error" class="error">
        {{ productsStore.error }}
        <RouterLink to="/products" class="btn-back">← Torna ai prodotti</RouterLink>
      </div>
      
      <div v-else-if="product" class="product-content">
        <div class="product-images">
          <img
            v-if="mainImage"
            :src="mainImage"
            :alt="product.attributes.name"
            class="main-image"
          />
          <div v-else class="no-image">
            <span>📦</span>
          </div>
        </div>
        
        <div class="product-details">
          <h1>{{ product.attributes.name }}</h1>
          
          <div class="price">€{{ product.attributes.price.toFixed(2) }}</div>
          
          <div class="stock-info" :class="stockClass">
            {{ stockMessage }}
          </div>
          
          <p v-if="product.attributes.description" class="description">
            {{ product.attributes.description }}
          </p>
          
          <div class="quantity-selector">
            <label for="quantity">Quantità:</label>
            <div class="quantity-controls">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input
                type="number"
                id="quantity"
                v-model.number="quantity"
                min="1"
                :max="product.attributes.stock"
              />
              <button
                @click="increaseQuantity"
                :disabled="quantity >= product.attributes.stock"
              >
                +
              </button>
            </div>
          </div>
          
          <button
            @click="addToCart"
            class="btn-add-cart"
            :disabled="product.attributes.stock <= 0"
          >
            {{ product.attributes.stock > 0 ? 'Aggiungi al carrello' : 'Non disponibile' }}
          </button>
          
          <RouterLink to="/products" class="btn-back-link">
            ← Torna ai prodotti
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { getImageUrl } from '@/services/strapi'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const quantity = ref(1)

const product = computed(() => productsStore.currentProduct)

const mainImage = computed(() => {
  if (!product.value) return null
  const images = product.value.attributes.images?.data
  if (images && images.length > 0) {
    return getImageUrl(images[0].attributes.url)
  }
  return null
})

const stockClass = computed(() => {
  if (!product.value) return ''
  const stock = product.value.attributes.stock
  if (stock <= 0) return 'out-of-stock'
  if (stock < 10) return 'low-stock'
  return 'in-stock'
})

const stockMessage = computed(() => {
  if (!product.value) return ''
  const stock = product.value.attributes.stock
  if (stock <= 0) return 'Non disponibile'
  if (stock < 10) return `Solo ${stock} disponibili`
  return 'Disponibile'
})

const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.attributes.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value && product.value.attributes.stock > 0) {
    cartStore.addToCart(product.value, quantity.value)
    alert(`${quantity.value} x ${product.value.attributes.name} aggiunto al carrello!`)
  }
}

onMounted(async () => {
  const slug = route.params.slug as string
  await productsStore.fetchProduct(slug)
})
</script>

<style scoped>
.product-detail {
  min-height: 100vh;
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #f44336;
}

.btn-back {
  display: inline-block;
  margin-top: 1rem;
  color: #4CAF50;
  text-decoration: none;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.product-images {
  position: sticky;
  top: 2rem;
}

.main-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.no-image {
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 128px;
}

.product-details h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: #333;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 1rem;
}

.stock-info {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.in-stock {
  background: #e8f5e9;
  color: #2e7d32;
}

.low-stock {
  background: #fff3e0;
  color: #f57c00;
}

.out-of-stock {
  background: #ffebee;
  color: #c62828;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
  white-space: pre-wrap;
}

.quantity-selector {
  margin-bottom: 2rem;
}

.quantity-selector label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.quantity-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  border: 2px solid #4CAF50;
  background: white;
  color: #4CAF50;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.2s;
}

.quantity-controls button:hover:not(:disabled) {
  background: #4CAF50;
  color: white;
}

.quantity-controls button:disabled {
  border-color: #ccc;
  color: #ccc;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 80px;
  height: 40px;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
}

.btn-add-cart {
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background 0.2s;
  margin-bottom: 1rem;
}

.btn-add-cart:hover:not(:disabled) {
  background: #45a049;
}

.btn-add-cart:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-back-link {
  display: inline-block;
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.btn-back-link:hover {
  color: #45a049;
}

@media (max-width: 968px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-images {
    position: static;
  }

  .product-details h1 {
    font-size: 2rem;
  }
}
</style>

