<template>
  <div class="products-page">
    <div class="container">
      <h1>I nostri prodotti</h1>
      
      <div v-if="productsStore.loading" class="loading">
        Caricamento prodotti...
      </div>
      
      <div v-else-if="productsStore.error" class="error">
        {{ productsStore.error }}
      </div>
      
      <div v-else>
        <div v-if="productsStore.products.length > 0" class="products-grid">
          <ProductCard
            v-for="product in productsStore.products"
            :key="product.id"
            :product="product"
          />
        </div>
        
        <div v-else class="no-products">
          <p>Nessun prodotto disponibile al momento.</p>
        </div>
        
        <!-- Paginazione -->
        <div v-if="productsStore.totalPages > 1" class="pagination">
          <button
            @click="goToPage(productsStore.currentPage - 1)"
            :disabled="productsStore.currentPage <= 1"
            class="btn-page"
          >
            ← Precedente
          </button>
          
          <span class="page-info">
            Pagina {{ productsStore.currentPage }} di {{ productsStore.totalPages }}
          </span>
          
          <button
            @click="goToPage(productsStore.currentPage + 1)"
            :disabled="productsStore.currentPage >= productsStore.totalPages"
            class="btn-page"
          >
            Successiva →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const productsStore = useProductsStore()

const goToPage = async (page: number) => {
  await productsStore.fetchProducts(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await productsStore.fetchProducts()
})
</script>

<style scoped>
.products-page {
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
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.loading,
.error,
.no-products {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #f44336;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0;
}

.btn-page {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-page:hover:not(:disabled) {
  background: #45a049;
}

.btn-page:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
  color: #333;
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

