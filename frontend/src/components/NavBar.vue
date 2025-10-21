<template>
  <nav class="navbar">
    <div class="container">
      <RouterLink to="/" class="logo">
        🛍️ Brinmalte
      </RouterLink>
      
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/products" class="nav-link">Prodotti</RouterLink>
        <RouterLink to="/cart" class="nav-link cart-link">
          🛒 Carrello
          <span v-if="cartStore.totalItems > 0" class="cart-badge">
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo:hover {
  color: #4CAF50;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
  position: relative;
}

.nav-link:hover {
  color: #4CAF50;
}

.nav-link.router-link-active {
  color: #4CAF50;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-badge {
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .logo {
    font-size: 1.2rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}
</style>

