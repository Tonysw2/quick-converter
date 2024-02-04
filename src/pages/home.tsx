import { Loader, Repeat } from 'lucide-react'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { CurrencyType } from '@/@types/currency'
import { ConversionRateChart } from '@/components/conversion-rate-chart'
import { CurrencyRow } from '@/components/currency-row'
import { ToggleTheme } from '@/components/theme/toggle-theme'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useExchangeRates } from '@/hooks/use-exchange-rates'
import { useHistoricalData } from '@/hooks/use-historical-data'
import { parseAndFormatCurrency } from '@/utils/parseAndFormatCurrency'

export function Home() {
  const [fromCurrency, setFromCurrency] = useState<keyof CurrencyType>('BRL')
  const [toCurrency, setToCurrency] = useState<keyof CurrencyType>('USD')

  const [amount, setAmount] = useState(() => {
    const { formattedValue } = parseAndFormatCurrency('0', fromCurrency)
    return formattedValue
  })

  const [isFromCurrency, setIsFromCurrency] = useState(true)

  const { historicalData } = useHistoricalData()

  const { result, isFetching } = useExchangeRates(fromCurrency)

  function handleChangeCurrency(
    dispatch: Dispatch<SetStateAction<keyof CurrencyType>>,
  ) {
    return (currency: keyof CurrencyType) => {
      dispatch(currency)
    }
  }

  function handleChangeAmount(isFromCurrency: boolean) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      const { formattedValue } = parseAndFormatCurrency(
        value,
        isFromCurrency ? fromCurrency : toCurrency,
      )

      setAmount(formattedValue)
      setIsFromCurrency(isFromCurrency)
    }
  }

  let toAmount = Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: toCurrency,
  }).format(0)

  let fromAmount = Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: fromCurrency,
  }).format(0)

  if (result) {
    if (isFromCurrency) {
      const { rawValue, formattedValue: formattedFromAmount } =
        parseAndFormatCurrency(amount, fromCurrency)

      const convertedValue = (
        rawValue * result.conversion_rates[toCurrency]
      ).toFixed(2)

      const { formattedValue: formattedToAmount } = parseAndFormatCurrency(
        convertedValue,
        toCurrency,
      )

      fromAmount = formattedFromAmount
      toAmount = formattedToAmount
    } else {
      const { rawValue, formattedValue: formattedToAmount } =
        parseAndFormatCurrency(amount, toCurrency)

      const convertedValue = (
        rawValue / result.conversion_rates[toCurrency]
      ).toFixed(2)

      const { formattedValue: formattedFromAmount } = parseAndFormatCurrency(
        convertedValue,
        fromCurrency,
      )

      fromAmount = formattedFromAmount
      toAmount = formattedToAmount
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-10">
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>QuickConverter</CardTitle>
            <CardDescription>
              The fastest way to convert your currencies.
            </CardDescription>
          </div>

          <ToggleTheme />
        </CardHeader>

        <CardContent className="flex items-center gap-2">
          <CurrencyRow
            amount={fromAmount}
            isLoading={isFetching}
            currency={fromCurrency}
            currencies={result?.conversion_rates}
            onChangeAmount={handleChangeAmount(true)}
            onChangeCurrency={handleChangeCurrency(setFromCurrency)}
          />

          {isFetching ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Repeat className="h-4 w-4" />
          )}

          <CurrencyRow
            amount={toAmount}
            isLoading={isFetching}
            currency={toCurrency}
            currencies={result?.conversion_rates}
            onChangeAmount={handleChangeAmount(false)}
            onChangeCurrency={handleChangeCurrency(setToCurrency)}
          />
        </CardContent>

        <CardContent>
          <ConversionRateChart
            data={historicalData}
            fromCurrency={fromCurrency}
          />
        </CardContent>
      </Card>
    </div>
  )
}
