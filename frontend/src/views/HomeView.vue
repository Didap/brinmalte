<template>
  <div class="home">
    <!-- Promo Bar -->
    <div class="promo-bar">
      <i class="pi pi-truck"></i>
      <span>Spedizione gratuita sopra €50 • Reso entro 7 giorni • Pagamenti sicuri</span>
    </div>
    <!-- Hero Section con Carousel -->
    <div class="hero">
      <Carousel 
        :value="heroSlides" 
        :numVisible="1" 
        :numScroll="1" 
        :autoplayInterval="5000"
        :circular="true"
        class="hero-carousel"
      >
        <template #item="slotProps">
          <div class="hero-slide" :style="{ background: slotProps.data.gradient }">
            <div class="hero-content">
              <Badge v-if="slotProps.data.badge" :value="slotProps.data.badge" severity="warn" class="hero-badge" />
              <h1 class="hero-title">{{ slotProps.data.title }}</h1>
              <p class="hero-subtitle">{{ slotProps.data.subtitle }}</p>
              <div class="hero-buttons">
                <Button 
                  :label="slotProps.data.ctaText" 
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  size="large"
                  @click="router.push(slotProps.data.ctaLink)"
                />
                <Button 
                  label="Scopri di più" 
                  outlined
                  size="large"
                />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>

    <!-- Statistiche -->
    <div class="stats-section">
      <div class="container-wide">
        <div class="stats-grid">
          <div class="stat-item">
            <i class="pi pi-users stat-icon"></i>
            <div class="stat-number">1000+</div>
            <div class="stat-label">Clienti soddisfatti</div>
          </div>
          <div class="stat-item">
            <i class="pi pi-box stat-icon"></i>
            <div class="stat-number">500+</div>
            <div class="stat-label">Prodotti disponibili</div>
          </div>
          <div class="stat-item">
            <i class="pi pi-star stat-icon"></i>
            <div class="stat-number">4.8/5</div>
            <div class="stat-label">Valutazione media</div>
          </div>
          <div class="stat-item">
            <i class="pi pi-globe stat-icon"></i>
            <div class="stat-number">50+</div>
            <div class="stat-label">Città raggiunte</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Esplora per Tipologia -->
    <div class="categories-section">
      <div class="container">
        <div class="section-header">
          <h2>Esplora per tipologia</h2>
          <p>Scegli l'ambito di tuo interesse</p>
        </div>
        <div class="categories-grid">
          <div
            v-for="t in typologies"
            :key="t"
            class="category-card"
            @click="goToTypology(t)"
          >
            <div class="category-thumb">
              <img v-if="t === 'Piscine'" src="/piscina.jpg" alt="Piscine" class="category-image" />
              <img v-else-if="t === 'RINFORZI STRUTTURALI'" src="/rinforzi.jpg" alt="Rinforzi Strutturali" class="category-image" />
              <img v-else-if="t === 'ISOLAMENTI TERMICI E GUAINE'" src="/isolamenti.jpg" alt="Isolamenti Termici e Guaine" class="category-image" />
              <img v-else-if="t === 'CARTONGESSO'" src="/cartongesso.jpg" alt="Cartongesso" class="category-image" />
              <img v-else-if="t === 'CAPPOTTO TERMICO'" src="/cappotto.jpg" alt="Cappotto Termico" class="category-image" />
              <img v-else-if="t === 'COLORIFICIO'" src="/colori.jpg" alt="Colorificio" class="category-image" />
              <i v-else class="pi pi-image"></i>
            </div>
            <div class="category-info">
              <h3 class="typology-title">{{ t }}</h3>
              <i class="pi pi-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Products Section -->
    <div class="section">
      <div class="container">
        <div class="section-header">
          <h2>Prodotti in evidenza</h2>
          <p>Scopri la nostra selezione curata di prodotti eccezionali</p>
        </div>
        
        <div v-if="productsStore.loading" class="loading-state">
          <div class="skeleton-grid">
            <Skeleton v-for="i in 8" :key="i" height="320px" borderRadius="12px"/>
          </div>
          <p>Caricamento prodotti...</p>
        </div>
        
        <Message v-else-if="productsStore.error" severity="error">
          {{ productsStore.error }}
        </Message>
        
        <template v-else-if="productsStore.products.length > 0">
          <div class="products-grid">
            <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
          
          <div class="section-footer">
            <Button 
              label="Vedi tutti i prodotti"
              icon="pi pi-arrow-right"
              iconPos="right"
              size="large"
              @click="router.push('/products')"
            />
          </div>
        </template>
        
        <Message v-else severity="info" class="no-products">
          <div>
            <p><strong>Nessun prodotto disponibile al momento</strong></p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem">
              💡 Assicurati di aver avviato il backend Strapi e creato alcuni prodotti dall'admin panel.
            </p>
          </div>
        </Message>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <div class="container">
        <div class="features-grid">
          <div class="feature">
            <img src="/spedizione.svg" alt="Spedizione" class="feature-icon" />
            <h3>Spedizione veloce</h3>
            <p>Consegna in 24/48 ore in tutta Italia</p>
          </div>
          
          <div class="feature">
            <img src="/carrello.svg" alt="Pagamenti sicuri" class="feature-icon" />
            <h3>Pagamenti sicuri</h3>
            <p>Transazioni protette e garantite</p>
          </div>
          
          <div class="feature">
            <img src="/reso.svg" alt="Reso" class="feature-icon" />
            <h3>Reso facile</h3>
            <p>7 giorni per cambiare idea</p>
          </div>
          
          <div class="feature">
            <img src="/supporto.svg" alt="Supporto" class="feature-icon" />
            <h3>Supporto clienti</h3>
            <p>Assistenza sempre disponibile</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Chi Sei -->
    <div class="user-type-section">
      <div class="container">
        <div class="section-header">
          <h2>Chi sei?</h2>
          <p>Scegli il percorso più adatto alle tue esigenze</p>
        </div>
        <div class="user-types-grid">
          <div class="user-type-card" @click="goToUserType('cliente')">
            <div class="user-type-icon">
              <i class="pi pi-user"></i>
            </div>
            <h3>Cliente</h3>
            <p>Vuoi acquistare prodotti per uso personale o per piccoli progetti domestici</p>
            <div class="user-type-features">
              <span class="feature-tag">Prezzi al dettaglio</span>
              <span class="feature-tag">Spedizione veloce</span>
              <span class="feature-tag">Supporto dedicato</span>
            </div>
            <Button label="Inizia a comprare" icon="pi pi-arrow-right" iconPos="right" />
          </div>
          
          <div class="user-type-card" @click="goToUserType('professionista')">
            <div class="user-type-icon">
              <i class="pi pi-briefcase"></i>
            </div>
            <h3>Professionista</h3>
            <p>Sei un artigiano, installatore o professionista che ha bisogno di forniture per i tuoi lavori</p>
            <div class="user-type-features">
              <span class="feature-tag">Prezzi scontati</span>
              <span class="feature-tag">Ordini frequenti</span>
              <span class="feature-tag">Consulenza tecnica</span>
            </div>
            <Button label="Accedi come professionista" icon="pi pi-arrow-right" iconPos="right" />
          </div>
          
          <div class="user-type-card" @click="goToUserType('azienda')">
            <div class="user-type-icon">
              <i class="pi pi-building"></i>
            </div>
            <h3>Azienda</h3>
            <p>Rappresenti un'azienda che necessita di forniture B2B e contratti personalizzati</p>
            <div class="user-type-features">
              <span class="feature-tag">Prezzi B2B</span>
              <span class="feature-tag">Contratti personalizzati</span>
              <span class="feature-tag">Account manager dedicato</span>
            </div>
            <Button label="Richiedi preventivo B2B" icon="pi pi-arrow-right" iconPos="right" />
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonianze -->
    <div class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <h2>Cosa dicono i nostri clienti</h2>
          <p>La soddisfazione dei clienti è la nostra priorità</p>
        </div>
        <div class="testimonials-grid">
          <Card v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
            <template #content>
              <Rating :modelValue="5" :readonly="true" />
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
              <div class="testimonial-author">
                <Avatar :label="testimonial.initials" shape="circle" />
                <div class="author-info">
                  <strong>{{ testimonial.name }}</strong>
                  <span>{{ testimonial.role }}</span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="faq-section">
      <div class="container">
        <div class="section-header">
          <h2>Domande frequenti</h2>
          <p>Le risposte ai dubbi più comuni</p>
        </div>
        <Accordion :multiple="true">
          <AccordionPanel value="1">
            <AccordionHeader>Quali metodi di pagamento accettate?</AccordionHeader>
            <AccordionContent>Carte di credito/debito, PayPal e bonifico bancario.</AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
            <AccordionHeader>Quanto costa la spedizione?</AccordionHeader>
            <AccordionContent>È gratuita sopra €50, altrimenti €4,90.</AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="3">
            <AccordionHeader>Quanto tempo impiega la consegna?</AccordionHeader>
            <AccordionContent>Generalmente 24/48 ore lavorative.</AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="4">
            <AccordionHeader>Posso restituire un prodotto?</AccordionHeader>
            <AccordionContent>Sì, hai 7 giorni per restituire i prodotti non utilizzati.</AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>

    <!-- Newsletter -->
    <div class="newsletter-section">
      <div class="container">
        <div class="newsletter-card">
          <div class="newsletter-content">
            <i class="pi pi-envelope newsletter-icon"></i>
            <h2>Iscriviti alla newsletter</h2>
            <p>Ricevi le ultime novità, offerte esclusive e sconti direttamente nella tua inbox</p>
          </div>
          <div class="newsletter-form">
            <InputGroup>
              <InputText 
                v-model="email" 
                placeholder="La tua email" 
                @keyup.enter="subscribeNewsletter"
              />
              <Button 
                label="Iscriviti" 
                icon="pi pi-send"
                @click="subscribeNewsletter"
              />
            </InputGroup>
            <div class="newsletter-privacy">
              <Checkbox v-model="privacyAccepted" :binary="true" inputId="privacy" />
              <label for="privacy">Accetto la privacy policy</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Badges -->
    <div class="trust-section">
      <div class="container-wide">
        <div class="trust-grid">
          <div class="trust-item">
            <i class="pi pi-lock"></i>
            <span>Pagamenti sicuri SSL</span>
          </div>
          <div class="trust-item">
            <i class="pi pi-truck"></i>
            <span>Spedizione gratuita sopra €50</span>
          </div>
          <div class="trust-item">
            <i class="pi pi-replay"></i>
            <span>Reso gratuito entro 7 giorni</span>
          </div>
          <div class="trust-item">
            <i class="pi pi-shield"></i>
            <span>Garanzia 2 anni</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <div class="container">
        <div class="cta-card">
          <h2>Sei un azienda ed hai bisogno di forniture?</h2>
          <p>Esplora le nostre proposte B2B</p>
          <Button 
            label="Vai al catalogo"
            icon="pi pi-arrow-right"
            iconPos="right"
            size="large"
            severity="contrast"
            @click="router.push('/products')"
          />
        </div>
      </div>
    </div>
  </div>
  
  <Toast />
  <ScrollTop target="window" :threshold="400" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useToast } from 'primevue/usetoast'
import ProductCard from '@/components/ProductCard.vue'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Carousel from 'primevue/carousel'
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import Checkbox from 'primevue/checkbox'
import Toast from 'primevue/toast'
import type { RouteLocationRaw } from 'vue-router'
import Skeleton from 'primevue/skeleton'
import Rating from 'primevue/rating'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import ScrollTop from 'primevue/scrolltop'

const router = useRouter()
const productsStore = useProductsStore()
const toast = useToast()

const email = ref('')
const privacyAccepted = ref(false)

const heroSlides = [
  {
    title: 'Benvenuto su Brinmalte',
    subtitle: 'Il tuo shop online per prodotti di qualità, curati con passione',
    ctaText: 'Scopri i prodotti',
    ctaLink: '/products',
    gradient: 'linear-gradient(135deg, #e67f20 0%, #423e3d 100%)',
    badge: null
  },
  {
    title: 'Nuova Collezione Primavera',
    subtitle: 'Scopri le ultime novità selezionate per te',
    ctaText: 'Esplora la collezione',
    ctaLink: '/products',
    gradient: 'linear-gradient(135deg, #f38a44 0%, #5d5958 100%)',
    badge: 'NUOVO'
  },
  {
    title: 'Spedizione Gratuita',
    subtitle: 'Su tutti gli ordini superiori a €50',
    ctaText: 'Inizia a fare shopping',
    ctaLink: '/products',
    gradient: 'linear-gradient(135deg, #d76016 0%, #4e4b4a 100%)',
    badge: 'PROMO'
  }
]

const typologies = [
  'Piscine',
  'RINFORZI STRUTTURALI',
  'ISOLAMENTI TERMICI E GUAINE',
  'CARTONGESSO',
  'CAPPOTTO TERMICO',
  'COLORIFICIO'
]

const testimonials = [
  {
    text: 'Prodotti di qualità eccellente e spedizione velocissima. Consiglio vivamente!',
    name: 'Maria Rossi',
    role: 'Cliente verificato',
    initials: 'MR'
  },
  {
    text: 'Servizio clienti impeccabile, hanno risolto ogni mio dubbio in pochi minuti.',
    name: 'Giovanni Bianchi',
    role: 'Cliente verificato',
    initials: 'GB'
  },
  {
    text: 'I prezzi sono ottimi e la varietà di prodotti disponibili è impressionante!',
    name: 'Laura Verdi',
    role: 'Cliente verificato',
    initials: 'LV'
  }
]

const featuredProducts = computed(() => {
  return productsStore.products.slice(0, 8)
})

const goToTypology = (t: string) => {
  router.push({ path: '/products', query: { type: t } })
}

const goToUserType = (userType: string) => {
  switch (userType) {
    case 'cliente':
      router.push('/products')
      break
    case 'professionista':
      router.push('/products?userType=professionista')
      break
    case 'azienda':
      router.push('/contact?type=b2b')
      break
  }
}

const subscribeNewsletter = () => {
  if (!email.value) {
    toast.add({
      severity: 'warn',
      summary: 'Attenzione',
      detail: 'Inserisci un indirizzo email valido',
      life: 3000
    })
    return
  }
  
  if (!privacyAccepted.value) {
    toast.add({
      severity: 'warn',
      summary: 'Attenzione',
      detail: 'Accetta la privacy policy per continuare',
      life: 3000
    })
    return
  }

  toast.add({
    severity: 'success',
    summary: 'Iscrizione completata!',
    detail: 'Grazie per esserti iscritto alla nostra newsletter',
    life: 3000
  })
  
  email.value = ''
  privacyAccepted.value = false
}

onMounted(async () => {
  await productsStore.fetchProducts(1, 8)
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.promo-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 36px;
  font-size: 0.9rem;
  background: var(--p-surface-0);
  border-bottom: 1px solid var(--p-surface-border);
  color: var(--p-text-color);
}

/* Hero Section con Carousel */
.hero {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.hero-carousel {
  width: 100%;
}

:deep(.p-carousel) {
  width: 100%;
}

:deep(.p-carousel-content) {
  overflow: hidden;
  width: 100%;
}

:deep(.p-carousel-viewport) {
  width: 100%;
  overflow: hidden;
}

:deep(.p-carousel-items-container) {
  width: 100%;
}

:deep(.p-carousel-item) {
  width: 100%;
}

:deep(.p-carousel-indicators) {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

:deep(.p-carousel-prev-button),
:deep(.p-carousel-next-button) {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  border: none !important;
  color: white !important;
}

:deep(.p-carousel-prev-button):hover,
:deep(.p-carousel-next-button):hover {
  background: rgba(255, 255, 255, 0.3) !important;
}

.hero-slide {
  min-height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 4rem 2rem;
  position: relative;
}

.hero-slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  margin-bottom: 1rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin: 0 0 2rem 0;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Stats Section */
.stats-section {
  background: var(--p-surface-0);
  padding: 3rem 2rem;
  border-bottom: 1px solid var(--p-surface-border);
}

.container-wide {
  max-width: 1400px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-icon {
  font-size: 2.5rem;
  color: var(--p-primary-color);
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--p-primary-color);
  margin-bottom: 0.25rem;
}

.stat-label {
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
}

/* Categories Section */
.categories-section {
  padding: 4rem 2rem;
  background: var(--p-surface-50);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.category-card {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-border);
  border-radius: 0.75rem;
  padding: 0.75rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  display: grid;
  grid-template-rows: 140px auto;
}

.category-card:hover {
  transform: translateY(-2px);
  border-color: var(--p-primary-color);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.category-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--p-text-color);
}

.typology-title { margin: 0; }

.category-thumb {
  background: var(--p-surface-100);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--p-text-muted-color);
  font-size: 2rem;
  overflow: hidden;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.category-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.25rem 0.25rem;
}

/* Main Sections */
.section {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
}

.section-header p {
  font-size: 1.125rem;
  color: var(--p-text-muted-color);
  margin: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.section-footer {
  text-align: center;
  margin-top: 3rem;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-state p {
  margin-top: 1rem;
  color: var(--p-text-muted-color);
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.no-products {
  margin: 3rem 0;
}

/* Features Section */
.features-section {
  background: var(--p-surface-100);
  padding: 4rem 2rem;
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
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 0 auto 2rem;
  display: block;
}

.feature h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--p-text-color);
}

.feature p {
  color: var(--p-text-muted-color);
  margin: 0;
}

/* User Type Section */
.user-type-section {
  padding: 4rem 2rem;
  background: var(--p-surface-0);
}

.user-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.user-type-card {
  background: var(--p-surface-0);
  border: 2px solid var(--p-surface-border);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.user-type-card:hover {
  transform: translateY(-4px);
  border-color: var(--p-primary-color);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.user-type-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--p-primary-color), var(--p-primary-600));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.user-type-card:hover::before {
  transform: scaleX(1);
}

.user-type-icon {
  width: 80px;
  height: 80px;
  background: var(--p-primary-50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: var(--p-primary-color);
}

.user-type-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--p-text-color);
}

.user-type-card p {
  color: var(--p-text-muted-color);
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.user-type-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.feature-tag {
  background: var(--p-primary-100);
  color: var(--p-primary-700);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Testimonials Section */
.testimonials-section {
  padding: 4rem 2rem;
  background: var(--p-surface-50);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  height: 100%;
}



.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--p-text-color);
  margin: 0 0 1.5rem 0;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-info strong {
  color: var(--p-text-color);
}

.author-info span {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

/* Newsletter Section */
.newsletter-section {
  padding: 4rem 2rem;
  background: var(--p-surface-0);
}

.newsletter-card {
  background: linear-gradient(135deg, var(--p-primary-color) 0%, var(--p-primary-600) 100%);
  color: white;
  padding: 3rem;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.newsletter-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.newsletter-content h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.newsletter-content p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.95;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.newsletter-privacy {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.newsletter-privacy label {
  cursor: pointer;
}

/* Trust Section */
.trust-section {
  background: var(--p-surface-100);
  padding: 2rem;
  border-top: 1px solid var(--p-surface-border);
  border-bottom: 1px solid var(--p-surface-border);
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.trust-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--p-text-color);
}

.trust-item i {
  font-size: 1.5rem;
  color: var(--p-primary-color);
}

/* CTA Section */
.cta-section {
  padding: 4rem 2rem;
}

.cta-card {
  background: linear-gradient(135deg, #e67f20 0%, #423e3d 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.cta-card h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.cta-card p {
  font-size: 1.125rem;
  margin: 0 0 2rem 0;
  opacity: 0.95;
}

/* FAQ */
.faq-section {
  padding: 4rem 2rem;
  background: var(--p-surface-0);
}

/* Responsive */
@media (max-width: 968px) {
  .newsletter-card {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .user-types-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-slide {
    min-height: 400px;
    padding: 3rem 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .categories-grid { grid-template-columns: repeat(2, 1fr); }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .trust-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid { grid-template-columns: 1fr; }
  
  .hero-slide {
    min-height: 350px;
    padding: 2rem 1rem;
  }
  
  .section {
    padding: 3rem 1rem;
  }
}
</style>
