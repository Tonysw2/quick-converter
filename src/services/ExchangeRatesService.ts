import { AxiosRequestConfig } from 'axios'

import { CurrencyType } from '@/@types/currency'
import { api } from '@/lib/axios'

type GetPairConversionParams = {
  fromCurrency: string
}

export type GetExchangeRates = {
  result: 'success' | 'error'
  documentation: string
  terms_of_use: string
  time_last_update_unix: number
  time_last_update_utc: string
  time_next_update_unix: number
  time_next_update_utc: string
  base_code: string
  conversion_rates: CurrencyType
}

class ExchangeRatesServices {
  async getExchangeRates(
    { fromCurrency }: GetPairConversionParams,
    options?: AxiosRequestConfig,
  ) {
    const response = await api.get<GetExchangeRates>(
      `/latest/${fromCurrency}`,
      options,
    )

    return response.data
  }
}

export default new ExchangeRatesServices()
