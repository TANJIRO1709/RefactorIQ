import axios from 'axios'
import { getSession } from 'next-auth/react'

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// GitHub access token from the next-auth session; the server verifies it with GitHub
/** @returns {Promise<Record<string, string>>} */
export async function authHeader() {
  const session = await getSession()
  return session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}
}

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  // AI reviews + Render free-tier cold starts can take well over 30s
  timeout: 120000,
})

// Attach auth token to every request automatically
api.interceptors.request.use(async (config) => {
  Object.assign(config.headers, await authHeader())
  return config
})

// Global error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || err.message || 'Something went wrong'
    console.error('[API Error]', msg)
    return Promise.reject(new Error(msg))
  }
)

export default api
