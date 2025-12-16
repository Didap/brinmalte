<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Brand + breve descrizione -->
      <div class="footer-col brand">
        <RouterLink to="/" class="brand-link">
          <img src="/logo.webp" alt="Brinmalte" class="brand-logo" />
          <span class="brand-name">Brinmalte</span>
        </RouterLink>
        <p class="brand-text">
          Qualità, selezione e assistenza: il tuo e‑commerce di fiducia.
        </p>
        <div class="socials">
          <a href="#" aria-label="Instagram"><i class="pi pi-instagram"></i></a>
          <a href="#" aria-label="Facebook"><i class="pi pi-facebook"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="pi pi-linkedin"></i></a>
        </div>
      </div>

      <!-- Contatti -->
      <div class="footer-col">
        <h4>Contatti</h4>
        <ul class="list">
          <li>
            <i class="pi pi-building"></i>
            <span>
              Sede<br />
              Viale Fermi Enrico, 12/A - 72100 Brindisi (BR)
            </span>
          </li>
          <li>
            <i class="pi pi-id-card"></i>
            <span>P.I. 01675330748</span>
          </li>
          <li>
            <i class="pi pi-phone"></i>
            <a href="tel:+390831367066">+39 0831 367066</a>
          </li>
          <li>
            <i class="pi pi-envelope"></i>
            <a href="mailto:brinmalte@gmail.com">brinmalte@gmail.com</a>
          </li>
        </ul>
      </div>

      <!-- Orari -->
      <div class="footer-col">
        <h4>Orari di apertura</h4>
        <ul class="hours">
          <li>
            <strong>Lun - Ven</strong>
            <span>6:00 - 14:00 · 16:00 - 18:30</span>
          </li>
          <li>
            <strong>Sabato</strong>
            <span>6:00 - 14:00</span>
          </li>
          <li>
            <strong>Domenica</strong>
            <span>Chiuso</span>
          </li>
        </ul>
      </div>

      <!-- Sitemap -->
      <div class="footer-col">
        <h4>Sitemap</h4>
        <ul class="sitemap">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/products">Prodotti</RouterLink></li>
          <li><RouterLink to="/cart">Carrello</RouterLink></li>
          <li><a href="#">Contatti</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Termini e Condizioni</a></li>
        </ul>
      </div>
    </div>

    <Divider />

    <div class="footer-bottom">
      <span>© {{ currentYear }} Brinmalte • P.IVA 01675330748</span>
      <span class="madeby">didap was here <i class="pi pi-heart-fill"></i> </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Divider from 'primevue/divider'

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--p-surface-0);
  border-top: 1px solid var(--p-surface-border);
  color: var(--p-text-color);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
  gap: 2rem;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: inherit;
}

.brand-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
}

.brand-name {
  font-weight: 800;
  font-size: 1.25rem;
}

.brand-text {
  margin: 0.75rem 0 1rem 0;
  color: var(--p-text-muted-color);
}

.socials {
  display: flex;
  gap: 0.75rem;
}

.socials a {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--p-surface-border);
  border-radius: 8px;
  color: var(--p-text-color);
  transition: all 0.2s;
}

.socials a:hover {
  color: var(--p-primary-color);
  border-color: var(--p-primary-color);
}

.footer-col h4 {
  margin: 0 0 1rem 0;
  font-weight: 700;
  font-size: 1.1rem;
}

.list, .hours, .sitemap {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.list li, .hours li {
  display: flex;
  gap: 0.75rem;
  color: var(--p-text-color);
}

.list i {
  color: var(--p-primary-color);
  margin-top: 2px;
}

.list a {
  color: inherit;
}

.sitemap a {
  color: var(--p-text-color);
  transition: color 0.2s;
}

.sitemap a:hover {
  color: var(--p-primary-color);
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
}

.madeby i {
  color: var(--p-primary-color);
  margin: 0 0.25rem;
}

/* Responsive */
@media (max-width: 968px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1.5rem;
  }
}

@media (max-width: 600px) {
  .footer-container {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>


