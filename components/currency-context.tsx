"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

const rates = {
  NZD: 1,
  USD: 0.6,
  GBP: 0.5,
}
const symbols = {
  NZD: "NZ$",
  USD: "$",
  GBP: "£",
}

const CurrencyContext = createContext({
  currency: "NZD",
  setCurrency: (c: string) => {},
  convert: (amount: number) => amount,
  symbol: "NZ$",
})

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState("NZD")

  useEffect(() => {
    // Remove currency from both storages on every mount (refresh or new tab)
    localStorage.removeItem("currency")
    sessionStorage.removeItem("currency")
    const stored = sessionStorage.getItem("currency")
    if (stored) setCurrencyState(stored)
  }, [])

  const setCurrency = (c: string) => {
    setCurrencyState(c)
    sessionStorage.setItem("currency", c)
  }

  const convert = (amount: number) => Math.round(amount * rates[currency as keyof typeof rates])
  const symbol = symbols[currency as keyof typeof symbols]

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, symbol }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
} 