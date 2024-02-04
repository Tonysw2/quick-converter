export function parseAndFormatCurrency(inputStr: string, currency = 'BRL') {
  // Remove non-numeric characters
  let numericStr = inputStr.replace(/\D/g, '')

  // Remove leading zeros and ensure at least one digit (0) before the decimal point
  numericStr = numericStr.replace(/^0*(\d+)/, '$1')

  // Ensure the string has at least three characters for the initial format
  numericStr = numericStr.padStart(3, '0')

  // Split the string into integer and decimal parts
  let integerPart = numericStr.slice(0, -2)
  const decimalPart = numericStr.slice(-2)

  // Add thousand separators to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  const rawValue = integerPart.replace(/\./g, '') + '.' + decimalPart
  const formattedValue = Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(parseFloat(rawValue))

  return { rawValue: parseFloat(rawValue), formattedValue }
}
