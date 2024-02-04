import { useQuery } from '@tanstack/react-query'
import { format, subDays } from 'date-fns'

export function useHistoricalData() {
  const { data, isFetching } = useQuery({
    queryKey: ['historical-data'],
    queryFn: async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 50)),
      )

      return [
        {
          date: format(subDays(new Date(), 4), 'dd/MM'),
          rate: getRandomNumber(3, 5).toFixed(2),
        },
        {
          date: format(subDays(new Date(), 3), 'dd/MM'),
          rate: getRandomNumber(3, 5).toFixed(2),
        },
        {
          date: format(subDays(new Date(), 2), 'dd/MM'),
          rate: getRandomNumber(3, 5).toFixed(2),
        },
        {
          date: format(subDays(new Date(), 1), 'dd/MM'),
          rate: getRandomNumber(3, 5).toFixed(2),
        },
        {
          date: format(subDays(new Date(), 0), 'dd/MM'),
          rate: getRandomNumber(3, 5).toFixed(2),
        },
      ]
    },
  })

  function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min + 1) + min
  }

  return {
    historicalData: data,
    isFetching,
  }
}
