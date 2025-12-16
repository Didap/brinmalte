<template>
  <div class="product-detail">
    <div class="container">
      <Button 
        label="Torna ai prodotti" 
        icon="pi pi-arrow-left" 
        text
        @click="router.push('/products')"
        class="back-button"
      />
      
      <div v-if="productsStore.loading" class="loading-state">
        <ProgressSpinner />
        <p>Caricamento prodotto...</p>
      </div>
      
      <Message v-else-if="productsStore.error" severity="error">
        {{ productsStore.error }}
      </Message>
      
      <div v-else-if="product" class="product-content">
        <div class="product-image-section">
          <Image 
            v-if="mainImage"
            :src="mainImage" 
            :alt="product.attributes.name"
            preview
          />
          <div v-else class="no-image">
            <i class="pi pi-image"></i>
          </div>
        </div>
        
        <div class="product-info-section">
          <h1>{{ product.attributes.name }}</h1>
          
          <div class="price">€{{ product.attributes.price.toFixed(2) }}</div>
          
          <Tag 
            :value="stockMessage"
            :severity="stockSeverity"
            class="stock-tag"
          />
          
          <Divider />
          
          <div v-if="product.attributes.description" class="description">
            {{ product.attributes.description }}
          </div>
          
          <Divider />
          
          <div class="quantity-section">
            <label>Quantità:</label>
            <InputNumber 
              v-model="quantity"
              :min="1"
              :max="product.attributes.stock"
              showButtons
              buttonLayout="horizontal"
              :disabled="product.attributes.stock <= 0"
            />
          </div>
          
          <Button 
            label="Aggiungi al carrello"
            icon="pi pi-shopping-cart"
            size="large"
            class="add-to-cart-btn"
            :disabled="product.attributes.stock <= 0"
            @click="addToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'primevue/usetoast'
import { getImageUrl } from '@/services/strapi'
import Button from 'primevue/button'
import Image from 'primevue/image'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'
import InputNumber from 'primevue/inputnumber'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const toast = useToast()

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

const stockMessage = computed(() => {
  if (!product.value) return ''
  const stock = product.value.attributes.stock
  if (stock <= 0) return 'Non disponibile'
  if (stock < 10) return `Solo ${stock} disponibili`
  return 'Disponibile'
})

const stockSeverity = computed(() => {
  if (!product.value) return 'secondary'
  const stock = product.value.attributes.stock
  if (stock <= 0) return 'danger'
  if (stock < 10) return 'warn'
  return 'success'
})

const addToCart = () => {
  if (product.value && product.value.attributes.stock > 0) {
    cartStore.addToCart(product.value, quantity.value)
    toast.add({
      severity: 'success',
      summary: 'Prodotto aggiunto',
      detail: `${quantity.value} x ${product.value.attributes.name} aggiunto al carrello`,
      life: 3000
    })
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
  padding: 3rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 2rem;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-state p {
  margin-top: 1rem;
  color: var(--p-text-muted-color);
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.product-image-section {
  position: sticky;
  top: 2rem;
}

.no-image {
  width: 100%;
  aspect-ratio: 1;
  background: var(--p-surface-100);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  color: var(--p-surface-400);
}

.product-info-section h1 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--p-primary-color);
  margin-bottom: 1rem;
}

.stock-tag {
  font-size: 1rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--p-text-muted-color);
  white-space: pre-wrap;
}

.quantity-section {
  margin-bottom: 1.5rem;
}

.quantity-section label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--p-text-color);
}

.add-to-cart-btn {
  width: 100%;
}

@media (max-width: 968px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-image-section {
    position: static;
  }
}
</style>

