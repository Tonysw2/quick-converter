import { useQuery } from '@tanstack/react-query'

import ExchangeRatesService from '@/services/ExchangeRatesService'

export function useExchangeRates(fromCurrency: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['exchange-rates', { fromCurrency }],
    queryFn: async ({ signal }) => {
      const data = await ExchangeRatesService.getExchangeRates(
        { fromCurrency },
        { signal },
      )
      return data
    },
    staleTime: Infinity,
  })

  return {
    result: data,
    isFetching,
  }
}
