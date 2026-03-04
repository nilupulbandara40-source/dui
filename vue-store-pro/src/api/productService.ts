import axios from "axios"
import type { Product, ProductResponse } from "../types/product"

const API_URL = "https://dummyjson.com"

export const fetchProducts = async (): Promise<ProductResponse> => {
  const response = await axios.get<ProductResponse>(
    `${API_URL}/products`
  )
  return response.data
}

export const fetchProductById = async (
  id: number
): Promise<Product> => {
  const response = await axios.get<Product>(
    `${API_URL}/products/${id}`
  )
  return response.data
}