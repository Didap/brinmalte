import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, register, getMe, type User } from '@/services/strapi'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Carica utente da localStorage
  const loadUser = () => {
    const savedToken = localStorage.getItem('jwt')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('Errore nel caricamento utente', e)
      }
    }
  }

  // Login
  const loginUser = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await login(email, password)
      token.value = response.jwt
      user.value = response.user
      localStorage.setItem('jwt', response.jwt)
      localStorage.setItem('user', JSON.stringify(response.user))
      return true
    } catch (err: any) {
      error.value = err.response?.data?.error?.message || 'Errore durante il login'
      return false
    } finally {
      loading.value = false
    }
  }

  // Registrazione
  const registerUser = async (username: string, email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await register(username, email, password)
      token.value = response.jwt
      user.value = response.user
      localStorage.setItem('jwt', response.jwt)
      localStorage.setItem('user', JSON.stringify(response.user))
      return true
    } catch (err: any) {
      error.value = err.response?.data?.error?.message || 'Errore durante la registrazione'
      return false
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
  }

  // Verifica se è autenticato
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Inizializza
  loadUser()

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    loginUser,
    registerUser,
    logout,
  }
})

