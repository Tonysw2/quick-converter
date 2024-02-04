import { ThemeProvider } from '@/components/theme/theme-provider'
import { QueryProvider } from '@/contexts/query-provider'
import { Home } from '@/pages/home'

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="dark">
        <Home />
      </ThemeProvider>
    </QueryProvider>
  )
}
