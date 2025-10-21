<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col bg-cream">
    <NavBar />
    <RouterView />
  </div>
</template>
