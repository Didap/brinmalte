<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <RouterLink to="/" class="navbar-logo">
        <img src="/logo.webp" alt="Brinmalte" class="logo-image" />
      </RouterLink>
      
      <!-- Navigation Links -->
      <div class="navbar-menu">
        <RouterLink to="/" class="nav-link">
          <i class="pi pi-home"></i>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/products" class="nav-link">
          <i class="pi pi-box"></i>
          <span>Prodotti</span>
        </RouterLink>
      </div>
      
      <!-- Cart Button -->
      <div class="navbar-actions">
        <RouterLink to="/cart" class="cart-link">
          <Button 
            :label="cartStore.totalItems > 0 ? `${cartStore.totalItems}` : ''"
            :badge="cartStore.totalItems > 0 ? String(cartStore.totalItems) : undefined"
            severity="secondary"
            text
            class="cart-button"
          >
            <template #default>
              <img src="/carrello.svg" alt="Carrello" class="cart-icon" />
              <Badge 
                v-if="cartStore.totalItems > 0" 
                :value="cartStore.totalItems" 
                severity="danger" 
                class="cart-badge"
              />
            </template>
          </Button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import Button from 'primevue/button'
import Badge from 'primevue/badge'

const cartStore = useCartStore()
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--p-surface-0);
  border-bottom: 1px solid var(--p-surface-border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 2rem;
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-text-color);
  transition: color 0.3s;
  flex-shrink: 0;
}

.navbar-logo:hover {
  color: var(--p-primary-color);
}

.logo-image {
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 6px;
}

.logo-text {
  white-space: nowrap;
}

/* Navigation Menu */
.navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--p-text-color);
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  position: relative;
}

.nav-link i {
  font-size: 1.1rem;
}

.nav-link:hover {
  color: var(--p-primary-color);
  background: var(--p-primary-50);
}

.nav-link.router-link-active {
  color: var(--p-primary-color);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: var(--p-primary-color);
  border-radius: 2px;
}

/* Cart Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.cart-link {
  text-decoration: none;
  position: relative;
}

.cart-button {
  position: relative;
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem !important;
}

.cart-label {
  font-weight: 500;
}

.cart-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
    height: 60px;
  }

  .navbar-logo {
    font-size: 1.25rem;
  }

  .logo-image {
    width: 36px;
    height: 36px;
  }

  .navbar-menu {
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .nav-link span {
    display: none;
  }

  .nav-link i {
    font-size: 1.25rem;
  }

}

@media (max-width: 480px) {
  .navbar-container {
    gap: 1rem;
  }

  .navbar-menu {
    gap: 0.25rem;
  }

  .nav-link {
    padding: 0.4rem 0.6rem;
  }
}
</style>

