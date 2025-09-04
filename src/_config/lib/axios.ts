import axios from 'axios'
import Cookies from 'js-cookie'
import { env } from './env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get('access_token')

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data } = error.response

      if (data && data.message) {
        error.message = data.message
      }
    }

    return Promise.reject(error)
  },
)

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 2000)),
    )

    return config
  })
}
