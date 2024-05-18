import Head from 'next/head'
import Navbar from '@/components/Navbar'
import React, { ReactNode, useEffect } from 'react'


import { useSession } from 'next-auth/react';
interface Props {
  children?: ReactNode
  title: string
  overrideTitle?: boolean
  isWhite?: boolean
  overrideScreen?: string
}

export default function BasicLayout({
  children,
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
  title,
  overrideTitle = false,
  isWhite = true,
  overrideScreen = 'min-h-screen',
}: Props) {
  let message = ''
  if (!overrideTitle) {
    message = title 
  } else {
    message = title
  }
  return (
    <div>
        {session && <p>Welcome, {session.user.email}</p>}
        {!session && <p>Please sign in to track your progress</p>}
      <Head>
        <title>{message}</title>
      </Head>
      <div className={`${overrideScreen} ${isWhite ? 'bg-white' : 'bg-light'}`}>
        <Navbar />
        {children}
      </div>
    </div>
  )
}
