import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getProducts, getProduct, type Product } from '@/services/strapi'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalProducts = ref(0)

  // Carica lista prodotti
  const fetchProducts = async (page = 1, pageSize = 12) => {
    loading.value = true
    error.value = null
    try {
      const response = await getProducts(page, pageSize)
      products.value = response.data
      currentPage.value = response.meta.pagination?.page || 1
      totalPages.value = response.meta.pagination?.pageCount || 1
      totalProducts.value = response.meta.pagination?.total || 0
    } catch (err) {
      error.value = 'Errore nel caricamento dei prodotti'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Carica singolo prodotto
  const fetchProduct = async (slug: string) => {
    loading.value = true
    error.value = null
    try {
      currentProduct.value = await getProduct(slug)
    } catch (err) {
      error.value = 'Prodotto non trovato'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Cerca prodotti
  const searchProducts = computed(() => {
    return (query: string) => {
      if (!query) return products.value
      return products.value.filter((product) =>
        product.attributes.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  })

  return {
    products,
    currentProduct,
    loading,
    error,
    currentPage,
    totalPages,
    totalProducts,
    fetchProducts,
    fetchProduct,
    searchProducts,
  }
})

