"use client"
import { useCurrency } from "./currency-context"
import { useEffect, useState } from "react"
import Image from "next/image"

const countries = [
  { code: "NZD", name: "New Zealand", flag: "/FlagNZ.png" },
  { code: "USD", name: "USA", flag: "/Flag_US.png" },
  { code: "GBP", name: "UK", flag: "/Flag_UK.png" },
]

export default function CurrencyModal() {
  const { setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Only show if not already selected in this session
    const stored = sessionStorage.getItem("currency")
    setOpen(!stored)
    if (!stored) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [])

  function handleSelect(code: string) {
    setCurrency(code)
    setOpen(false)
    document.body.style.overflow = ""
    // window.location.href = "/"
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
      <div className="bg-black rounded-2xl px-30 py-12 max-w-sm w-full text-center border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Select Your Country</h2>
        <div className="flex justify-center gap-8">
          {countries.map(c => (
            <button
              key={c.code}
              className="flex flex-col items-center bg-white/5 hover:bg-white/20 border border-white/10 rounded-xl p-4 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onClick={() => handleSelect(c.code)}
            >
              <div className="w-12 h-8 mb-2 rounded overflow-hidden flex items-center justify-center bg-white">
                <Image src={c.flag} alt={c.name} width={48} height={32} style={{objectFit: 'cover'}} />
              </div>
              <span className="mt-1 font-semibold text-white text-base">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 