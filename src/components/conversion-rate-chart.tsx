import { Loader } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

interface Props {
  fromCurrency: string
  data: { date: string; rate: string }[] | undefined
}

export function ConversionRateChart({ data, fromCurrency }: Props) {
  return (
    <>
      {data ? (
        <ResponsiveContainer height={240} width="100%">
          <LineChart data={data} style={{ fontSize: 12 }}>
            <YAxis
              width={65}
              tickCount={5}
              stroke="#888"
              axisLine={false}
              tickLine={false}
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />

            <XAxis
              dataKey="date"
              stroke="#888"
              axisLine={false}
              tickLine={false}
              dy={16}
            />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {fromCurrency}
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {Intl.NumberFormat(undefined, {
                              style: 'currency',
                              currency: fromCurrency,
                            }).format(payload[0].value as number)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }

                return null
              }}
            />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="rate"
              stroke={colors.green[500]}
              fill={colors.green[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[240px] w-full items-center justify-center">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      )}
    </>
  )
}
