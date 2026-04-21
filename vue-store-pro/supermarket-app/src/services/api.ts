import axios from 'axios'
import type { Department, Product, ProductResponse } from '../types/product'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

export const supermarketDepartments: Department[] = [
  {
    id: 'all',
    label: 'All Departments',
    categories: [
      'groceries',
      'beauty',
      'fragrances',
      'skin-care',
      'kitchen-accessories',
      'home-decoration',
    ],
  },
  { id: 'groceries', label: 'Groceries', categories: ['groceries'] },
  { id: 'personal-care', label: 'Personal Care', categories: ['beauty', 'fragrances', 'skin-care'] },
  { id: 'kitchen', label: 'Kitchen', categories: ['kitchen-accessories'] },
  { id: 'home', label: 'Home', categories: ['home-decoration'] },
]

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get<ProductResponse>(`/products/category/${category}?limit=50`)
  return response.data.products
}

export const getDepartmentProducts = async (departmentId: string): Promise<Product[]> => {
  const department = supermarketDepartments.find((item) => item.id === departmentId)

  if (!department) {
    return []
  }

  const responses = await Promise.all(department.categories.map((category) => getProductsByCategory(category)))
  const merged = responses.flat()

  return merged.filter(
    (product, index, array) => array.findIndex((item) => item.id === product.id) === index,
  )
}

export const fetchProductById = async (productId: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${productId}`)
  return response.data
}

export const getFeaturedDeals = async (): Promise<Product[]> => {
  const allProducts = await getDepartmentProducts('all')

  return [...allProducts].sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 6)
}