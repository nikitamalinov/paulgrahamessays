import Head from 'next/head'
import Navbar from '@/components/Navbar'

import React, { ReactNode } from 'react'

interface Props {
import { useSession } from 'next-auth/react';
  children?: ReactNode
  title: string
  isWhite?: boolean
}

export default function PageLayout({ children, title, isWhite = true }: Props) {
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      // Fetch user progress from Redis
      const response = await fetch('/api/progress');
      if (response.ok) {
        const data = await response.json();
        // Update the UI accordingly
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);
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
        {session && <p>Welcome, {session.user.email}</p>}
        {!session && <p>Please sign in to track your progress</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
