import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rootline — Farm-to-Table Traceability for Premium Grocers',
  description:
    'Rootline gives regional premium grocery retailers verified farm-to-table traceability — no hardware, no IT team, live in 14 days. FSMA 204 compliant.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hanken.variable}>
      <body className="font-hanken bg-white">{children}</body>
    </html>
  )
}
