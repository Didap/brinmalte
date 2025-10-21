<template>
  <div class="flex-1">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 md:py-32">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div class="container relative mx-auto max-w-7xl px-4 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
          <h1 class="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Benvenuto su <span class="text-cream">Brinmalte</span>
          </h1>
          <p class="mb-8 text-lg text-white/90 sm:text-xl md:text-2xl">
            Il tuo shop online per prodotti di qualità, curati con passione
          </p>
          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RouterLink 
              to="/products" 
              class="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Scopri i prodotti
              <span class="ml-2">→</span>
            </RouterLink>
            <button 
              class="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              Scopri di più
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto max-w-7xl px-4 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-secondary sm:text-4xl md:text-5xl">
            Prodotti in evidenza
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-secondary/70">
            Scopri la nostra selezione curata di prodotti eccezionali
          </p>
        </div>
        
        <div v-if="productsStore.loading" class="flex min-h-[400px] items-center justify-center">
          <div class="text-center">
            <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p class="text-lg text-secondary/70">Caricamento prodotti...</p>
          </div>
        </div>
        
        <div v-else-if="productsStore.error" class="flex min-h-[400px] items-center justify-center">
          <div class="rounded-lg border-2 border-destructive/20 bg-destructive/10 p-8 text-center">
            <p class="text-lg font-semibold text-destructive">{{ productsStore.error }}</p>
          </div>
        </div>
        
        <div v-else-if="productsStore.products.length > 0">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
          
          <div class="mt-12 text-center">
            <RouterLink 
              to="/products" 
              class="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              Vedi tutti i prodotti
              <span class="ml-2">→</span>
            </RouterLink>
          </div>
        </div>
        
        <div v-else class="flex min-h-[400px] items-center justify-center">
          <div class="max-w-md rounded-lg border-2 border-muted bg-card p-8 text-center shadow-sm">
            <p class="mb-4 text-xl font-semibold text-secondary">
              Nessun prodotto disponibile al momento
            </p>
            <p class="rounded-md bg-muted/50 p-4 text-sm text-secondary/70">
              💡 Assicurati di aver avviato il backend Strapi e creato alcuni prodotti dall'admin panel.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="border-t border-border bg-cream-100 py-16 md:py-24">
      <div class="container mx-auto max-w-7xl px-4 lg:px-8">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
              🚚
            </div>
            <h3 class="mb-2 text-xl font-semibold text-secondary">Spedizione veloce</h3>
            <p class="text-secondary/70">Consegna in 24/48 ore in tutta Italia</p>
          </div>
          
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
              💳
            </div>
            <h3 class="mb-2 text-xl font-semibold text-secondary">Pagamenti sicuri</h3>
            <p class="text-secondary/70">Transazioni protette e garantite</p>
          </div>
          
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
              🔄
            </div>
            <h3 class="mb-2 text-xl font-semibold text-secondary">Reso facile</h3>
            <p class="text-secondary/70">30 giorni per cambiare idea</p>
          </div>
          
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
              💬
            </div>
            <h3 class="mb-2 text-xl font-semibold text-secondary">Supporto clienti</h3>
            <p class="text-secondary/70">Assistenza sempre disponibile</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto max-w-7xl px-4 lg:px-8">
        <div class="overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-12 text-center shadow-2xl md:p-16">
          <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Pronto a iniziare?
          </h2>
          <p class="mb-8 text-lg text-white/90 sm:text-xl">
            Esplora la nostra collezione e trova i prodotti perfetti per te
          </p>
          <RouterLink 
            to="/products" 
            class="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all hover:scale-105"
          >
            Vai al catalogo
            <span class="ml-2">→</span>
          </RouterLink>
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
  return productsStore.products.slice(0, 8)
})

onMounted(async () => {
  await productsStore.fetchProducts(1, 8)
})
</script>
