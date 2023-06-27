import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import 'reactflow/dist/style.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Omniflow',
  description: 'Omniflow, a workflow engine for the masses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-full bg-white" lang="en">
      <body className={`${inter.className} h-full`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
