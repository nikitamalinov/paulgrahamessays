import Head from 'next/head'
import Navbar from '@/components/Navbar'

import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  title: string
  isWhite?: boolean
}

export default function PageLayout({ children, title, isWhite = true }: Props) {
  const message = title 
  return (
    <div>
      <Head>
        <title>{message}</title>
      </Head>
      <div className={` min-h-screen ${isWhite ? 'bg-white' : 'bg-light'}`}>
        <Navbar />

        <div className="flex items-center justify-center">
          <div className="w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}