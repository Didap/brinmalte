<template>
  <div class="cart-page">
    <div class="container">
      <h1>Carrello</h1>
      
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <i class="pi pi-shopping-cart empty-icon"></i>
        <h2>Il tuo carrello è vuoto</h2>
        <p>Aggiungi alcuni prodotti per iniziare lo shopping!</p>
        <Button 
          label="Continua lo shopping" 
          icon="pi pi-arrow-left"
          size="large"
          @click="router.push('/products')"
        />
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <DataTable :value="cartStore.items" showGridlines>
            <Column header="Prodotto">
              <template #body="slotProps">
                <div class="product-info">
                  <img 
                    v-if="getProductImage(slotProps.data.product)"
                    :src="getProductImage(slotProps.data.product)" 
                    :alt="slotProps.data.product.attributes.name"
                    class="product-image"
                  />
                  <div class="product-details">
                    <RouterLink 
                      :to="`/products/${slotProps.data.product.attributes.slug}`"
                      class="product-name"
                    >
                      {{ slotProps.data.product.attributes.name }}
                    </RouterLink>
                    <div class="product-price">
                      €{{ slotProps.data.product.attributes.price.toFixed(2) }} cad.
                    </div>
                  </div>
                </div>
              </template>
            </Column>
            
            <Column header="Quantità">
              <template #body="slotProps">
                <InputNumber 
                  :modelValue="slotProps.data.quantity"
                  @update:modelValue="(value) => updateQuantity(slotProps.data, value)"
                  :min="1"
                  :max="slotProps.data.product.attributes.stock"
                  showButtons
                  buttonLayout="horizontal"
                />
              </template>
            </Column>
            
            <Column header="Totale">
              <template #body="slotProps">
                <div class="item-total">
                  €{{ (slotProps.data.product.attributes.price * slotProps.data.quantity).toFixed(2) }}
                </div>
              </template>
            </Column>
            
            <Column header="">
              <template #body="slotProps">
                <Button 
                  icon="pi pi-trash" 
                  severity="danger"
                  text
                  @click="confirmDelete(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
        
        <div class="cart-summary">
          <Panel header="Riepilogo ordine">
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
              <span class="free">Gratis</span>
            </div>
            
            <Divider />
            
            <div class="summary-row total">
              <span>Totale:</span>
              <span>€{{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            
            <Button 
              label="Procedi al checkout"
              icon="pi pi-check"
              size="large"
              class="checkout-btn"
              @click="checkout"
            />
            
            <Button 
              label="Svuota carrello"
              severity="danger"
              outlined
              size="large"
              class="clear-btn"
              @click="confirmClearCart"
            />
            
            <Button 
              label="Continua lo shopping"
              text
              icon="pi pi-arrow-left"
              class="continue-btn"
              @click="router.push('/products')"
            />
          </Panel>
        </div>
      </div>
    </div>
  </div>
  
  <ConfirmDialog />
  <Toast />
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { useCartStore, type CartItem } from '@/stores/cart'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { getImageUrl } from '@/services/strapi'
import type { Product } from '@/services/strapi'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

const router = useRouter()
const cartStore = useCartStore()
const confirm = useConfirm()
const toast = useToast()

const getProductImage = (product: Product) => {
  const images = product.attributes.images?.data
  if (images && images.length > 0) {
    return getImageUrl(images[0].attributes.url)
  }
  return null
}

const updateQuantity = (item: CartItem, value: number | null) => {
  if (value && value > 0) {
    cartStore.updateQuantity(item.product.id, value)
  }
}

const confirmDelete = (item: CartItem) => {
  confirm.require({
    message: `Vuoi rimuovere "${item.product.attributes.name}" dal carrello?`,
    header: 'Conferma rimozione',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sì, rimuovi',
    rejectLabel: 'Annulla',
    accept: () => {
      cartStore.removeFromCart(item.product.id)
      toast.add({
        severity: 'info',
        summary: 'Prodotto rimosso',
        detail: 'Il prodotto è stato rimosso dal carrello',
        life: 3000
      })
    }
  })
}

const confirmClearCart = () => {
  confirm.require({
    message: 'Sei sicuro di voler svuotare il carrello?',
    header: 'Conferma svuotamento',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sì, svuota',
    rejectLabel: 'Annulla',
    acceptClass: 'p-button-danger',
    accept: () => {
      cartStore.clearCart()
      toast.add({
        severity: 'info',
        summary: 'Carrello svuotato',
        detail: 'Il carrello è stato svuotato',
        life: 3000
      })
    }
  })
}

const checkout = () => {
  toast.add({
    severity: 'info',
    summary: 'Checkout',
    detail: 'Funzionalità checkout in arrivo! 🚀',
    life: 3000
  })
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  padding: 3rem 2rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin: 0 0 2rem 0;
  color: var(--p-text-color);
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 6rem;
  color: var(--p-surface-400);
  margin-bottom: 1rem;
}

.empty-cart h2 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
}

.empty-cart p {
  font-size: 1.125rem;
  color: var(--p-text-muted-color);
  margin: 0 0 2rem 0;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.product-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-name {
  font-weight: 600;
  color: var(--p-text-color);
  text-decoration: none;
  transition: color 0.2s;
}

.product-name:hover {
  color: var(--p-primary-color);
}

.product-price {
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
}

.item-total {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--p-primary-color);
}

.cart-summary {
  position: sticky;
  top: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-primary-color);
}

.summary-row .free {
  color: var(--p-green-500);
  font-weight: 600;
}

.checkout-btn,
.clear-btn,
.continue-btn {
  width: 100%;
  margin-top: 1rem;
}

@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}
</style>

