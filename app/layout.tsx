import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CurrencyProvider } from "@/components/currency-context"
import CurrencyModal from "@/components/currency-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DigitronCX - Premier Web Development Agency",
  description:
    "Professional web development, mobile apps, and digital solutions. Serving NZ, Australia, China & Pakistan. Startup branding from $300 NZD.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CurrencyProvider>
            <CurrencyModal />
            {children}
          </CurrencyProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
