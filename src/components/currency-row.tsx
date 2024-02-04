import { ChangeEvent } from 'react'
import Flag from 'react-world-flags'

import { CurrencyType } from '@/@types/currency'

import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Skeleton } from './ui/skeleton'

interface Props {
  isLoading: boolean
  amount: string | undefined
  currency: keyof CurrencyType
  currencies: CurrencyType | undefined
  onChangeCurrency: (currency: keyof CurrencyType) => void
  onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void
}

export function CurrencyRow({
  amount,
  currency,
  isLoading,
  currencies,
  onChangeAmount,
  onChangeCurrency,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Input
        type="text"
        value={amount}
        disabled={isLoading}
        onChange={onChangeAmount}
      />

      <Select
        value={currency}
        disabled={isLoading}
        onValueChange={onChangeCurrency}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {currencies ? (
            Object.keys(currencies).map((currency) => (
              <SelectItem key={currency} value={currency}>
                <div className="flex items-center gap-1">
                  <Flag code={currency.slice(0, 2)} className="size-4" />
                  {currency}
                </div>
              </SelectItem>
            ))
          ) : (
            <SelectItem value={currency}>
              <Skeleton className="h-5 w-32" />
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
