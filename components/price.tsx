"use client"
import { useCurrency } from "./currency-context"

export default function Price({ amount }: { amount: number }) {
  const { convert, symbol } = useCurrency()
  return <span>{symbol}{convert(amount)}</span>
} 