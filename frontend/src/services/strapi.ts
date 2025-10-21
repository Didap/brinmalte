import api from './api'
import type { AxiosResponse } from 'axios'

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface Product {
  id: number
  attributes: {
    name: string
    description: string
    price: number
    slug: string
    stock: number
    images?: {
      data: Array<{
        id: number
        attributes: {
          url: string
          alternativeText: string
          formats?: any
        }
      }>
    }
    category?: {
      data: {
        id: number
        attributes: {
          name: string
          slug: string
        }
      }
    }
  }
}

export interface Category {
  id: number
  attributes: {
    name: string
    slug: string
    description?: string
  }
}

export interface User {
  id: number
  username: string
  email: string
}

export interface AuthResponse {
  jwt: string
  user: User
}

// Prodotti
export const getProducts = async (
  page = 1,
  pageSize = 12
): Promise<StrapiResponse<Product[]>> => {
  const response: AxiosResponse<StrapiResponse<Product[]>> = await api.get('/products', {
    params: {
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'populate': '*',
    },
  })
  return response.data
}

export const getProduct = async (slug: string): Promise<Product> => {
  const response: AxiosResponse<StrapiResponse<Product[]>> = await api.get('/products', {
    params: {
      'filters[slug][$eq]': slug,
      'populate': '*',
    },
  })
  return response.data.data[0]
}

// Categorie
export const getCategories = async (): Promise<StrapiResponse<Category[]>> => {
  const response: AxiosResponse<StrapiResponse<Category[]>> = await api.get('/categories')
  return response.data
}

// Autenticazione
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await api.post('/auth/local', {
    identifier: email,
    password,
  })
  return response.data
}

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await api.post('/auth/local/register', {
    username,
    email,
    password,
  })
  return response.data
}

export const getMe = async (): Promise<User> => {
  const response: AxiosResponse<User> = await api.get('/users/me')
  return response.data
}

// Helper per ottenere URL immagini complete
export const getImageUrl = (url: string): string => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:1337'
  return `${baseUrl}${url}`
}

