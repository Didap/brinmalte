<template>
  <div class="cart-page">
    <div class="container">
      <h1>Carrello</h1>
      
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Il tuo carrello è vuoto</p>
        <RouterLink to="/products" class="btn-continue">
          Continua lo shopping
        </RouterLink>
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="cart-item"
          >
            <img
              v-if="getProductImage(item.product)"
              :src="getProductImage(item.product)"
              :alt="item.product.attributes.name"
              class="item-image"
            />
            <div v-else class="item-image no-image">📦</div>
            
            <div class="item-details">
              <h3>
                <RouterLink :to="`/products/${item.product.attributes.slug}`">
                  {{ item.product.attributes.name }}
                </RouterLink>
              </h3>
              <p class="item-price">
                €{{ item.product.attributes.price.toFixed(2) }} cad.
              </p>
            </div>
            
            <div class="item-quantity">
              <button @click="decreaseQuantity(item)">-</button>
              <input
                type="number"
                :value="item.quantity"
                @change="updateQuantity(item, $event)"
                min="1"
                :max="item.product.attributes.stock"
              />
              <button @click="increaseQuantity(item)">+</button>
            </div>
            
            <div class="item-total">
              €{{ (item.product.attributes.price * item.quantity).toFixed(2) }}
            </div>
            
            <button
              @click="cartStore.removeFromCart(item.product.id)"
              class="btn-remove"
              title="Rimuovi"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <div class="cart-summary">
          <h2>Riepilogo ordine</h2>
          
          <div class="summary-row">
            <span>Articoli:</span>
            <span>{{ cartStore.totalItems }}</span>
          </div>
          
          <div class="summary-row">
            <span>Subtotale:</span>
            <span>€{{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          
          <div class="summary-row">
            <span>Spedizione:</span>
            <span>Gratis</span>
          </div>
          
          <div class="summary-divider"></div>
          
          <div class="summary-row total">
            <span>Totale:</span>
            <span>€{{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          
          <button class="btn-checkout" @click="checkout">
            Procedi al checkout
          </button>
          
          <button class="btn-clear" @click="clearCart">
            Svuota carrello
          </button>
          
          <RouterLink to="/products" class="btn-continue-link">
            ← Continua lo shopping
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore, type CartItem } from '@/stores/cart'
import { getImageUrl } from '@/services/strapi'
import type { Product } from '@/services/strapi'

const cartStore = useCartStore()

const getProductImage = (product: Product) => {
  const images = product.attributes.images?.data
  if (images && images.length > 0) {
    return getImageUrl(images[0].attributes.url)
  }
  return null
}

const increaseQuantity = (item: CartItem) => {
  if (item.quantity < item.product.attributes.stock) {
    cartStore.updateQuantity(item.product.id, item.quantity + 1)
  }
}

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.product.id, item.quantity - 1)
  }
}

const updateQuantity = (item: CartItem, event: Event) => {
  const target = event.target as HTMLInputElement
  const newQuantity = parseInt(target.value)
  if (newQuantity > 0 && newQuantity <= item.product.attributes.stock) {
    cartStore.updateQuantity(item.product.id, newQuantity)
  }
}

const clearCart = () => {
  if (confirm('Sei sicuro di voler svuotare il carrello?')) {
    cartStore.clearCart()
  }
}

const checkout = () => {
  alert('Funzionalità checkout in arrivo! 🚀')
  // Qui implementerai la logica di checkout
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

h1 {
  font-size: 2.5rem;
  margin: 0 0 2rem 0;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart p {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
}

.btn-continue {
  display: inline-block;
  background: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-continue:hover {
  background: #45a049;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1.5rem;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.no-image {
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.item-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.item-details h3 a {
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.item-details h3 a:hover {
  color: #4CAF50;
}

.item-price {
  color: #666;
  margin: 0;
}

.item-quantity {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.item-quantity button {
  width: 32px;
  height: 32px;
  border: 2px solid #4CAF50;
  background: white;
  color: #4CAF50;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;
}

.item-quantity button:hover {
  background: #4CAF50;
  color: white;
}

.item-quantity input {
  width: 60px;
  height: 32px;
  border: 2px solid #ddd;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-size: 1.3rem;
  font-weight: 700;
  color: #4CAF50;
  min-width: 100px;
  text-align: right;
}

.btn-remove {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.btn-remove:hover {
  opacity: 1;
}

.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
}

.cart-summary h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: #333;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.summary-divider {
  height: 1px;
  background: #ddd;
  margin: 1.5rem 0;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4CAF50;
}

.btn-checkout {
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  transition: background 0.2s;
}

.btn-checkout:hover {
  background: #45a049;
}

.btn-clear {
  width: 100%;
  background: white;
  color: #f44336;
  border: 2px solid #f44336;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.2s;
}

.btn-clear:hover {
  background: #f44336;
  color: white;
}

.btn-continue-link {
  display: block;
  text-align: center;
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  transition: color 0.2s;
}

.btn-continue-link:hover {
  color: #45a049;
}

@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  .item-quantity {
    grid-column: 1 / -1;
    justify-content: center;
  }

  .item-total {
    grid-column: 1 / -1;
    text-align: center;
  }

  .btn-remove {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .cart-summary {
    position: static;
  }
}
</style>

