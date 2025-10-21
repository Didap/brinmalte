<template>
  <div class="home">
    <header class="hero">
      <div class="hero-content">
        <h1>Benvenuto su Brinmalte</h1>
        <p>Il tuo shop online per prodotti di qualità</p>
        <RouterLink to="/products" class="btn-primary">
          Scopri i prodotti
        </RouterLink>
      </div>
    </header>

    <section class="featured-products">
      <div class="container">
        <h2>Prodotti in evidenza</h2>
        
        <div v-if="productsStore.loading" class="loading">
          Caricamento prodotti...
        </div>
        
        <div v-else-if="productsStore.error" class="error">
          {{ productsStore.error }}
        </div>
        
        <div v-else-if="productsStore.products.length > 0" class="products-grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        
        <div v-else class="no-products">
          <p>Nessun prodotto disponibile al momento.</p>
          <p class="hint">
            💡 Assicurati di aver avviato il backend Strapi e creato alcuni prodotti dall'admin panel.
          </p>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">🚚</div>
            <h3>Spedizione veloce</h3>
            <p>Consegna in 24/48 ore</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💳</div>
            <h3>Pagamenti sicuri</h3>
            <p>Transazioni protette</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🔄</div>
            <h3>Reso facile</h3>
            <p>30 giorni per cambiare idea</p>
          </div>
          <div class="feature">
            <div class="feature-icon">💬</div>
            <h3>Supporto clienti</h3>
            <p>Assistenza sempre disponibile</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const productsStore = useProductsStore()

const featuredProducts = computed(() => {
  return productsStore.products.slice(0, 4)
})

onMounted(async () => {
  await productsStore.fetchProducts(1, 8)
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.5rem;
  margin: 0 0 2rem 0;
  opacity: 0.95;
}

.btn-primary {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.featured-products {
  padding: 4rem 0;
}

.featured-products h2 {
  text-align: center;
  font-size: 2.5rem;
  margin: 0 0 3rem 0;
  color: #333;
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

.no-products .hint {
  margin-top: 1rem;
  font-size: 1rem;
  color: #999;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  display: inline-block;
}

.features {
  background: #f9f9f9;
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.feature p {
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1.2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
</style>
