"use client";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modal-provider'
import {ToasterProvider} from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crisp-provider';
const inter = Inter({ subsets: ['latin'] })

 const metadata: Metadata = {
  title: 'WebSync',
  description: 'AI plateform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      {/* <CrispProvider /> */}
      <body>
        {/* <ToasterProvider /> */}
        <ModalProvider />
        <ToasterProvider/>
        {children}
        <CrispProvider/>
      </body>
    </html>
  </ClerkProvider>
  )
}
