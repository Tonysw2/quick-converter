import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${env.VITE_API_KEY}`,
})

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.round(Math.random() * 2000)),
  )

  return config
})
