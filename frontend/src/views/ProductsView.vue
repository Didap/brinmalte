<template>
  <div class="products-page">
    <div class="container">
      <h1>I nostri prodotti</h1>
      
      <div v-if="productsStore.loading" class="loading-state">
        <ProgressSpinner />
        <p>Caricamento prodotti...</p>
      </div>
      
      <Message v-else-if="productsStore.error" severity="error">
        {{ productsStore.error }}
      </Message>
      
      <template v-else>
        <div v-if="productsStore.products.length > 0" class="products-grid">
          <ProductCard
            v-for="product in productsStore.products"
            :key="product.id"
            :product="product"
          />
        </div>
        
        <Message v-else severity="info">
          Nessun prodotto disponibile al momento.
        </Message>
        
        <!-- Paginazione -->
        <div v-if="productsStore.totalPages > 1" class="pagination-wrapper">
          <Paginator
            :rows="12"
            :totalRecords="productsStore.totalProducts"
            :rowsPerPageOptions="[12, 24, 48]"
            @page="onPageChange"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Paginator from 'primevue/paginator'

const productsStore = useProductsStore()

const onPageChange = async (event: any) => {
  const page = event.page + 1 // PrimeVue usa zero-based index
  await productsStore.fetchProducts(page, event.rows)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await productsStore.fetchProducts()
})
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  padding: 3rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin: 0 0 2rem 0;
  text-align: center;
  color: var(--p-text-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-state p {
  margin-top: 1rem;
  color: var(--p-text-muted-color);
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
</style>

