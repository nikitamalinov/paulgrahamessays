import Head from 'next/head'
import Navbar from '@/components/Navbar'

import { useEffect, useState } from 'react'
import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  title: string
  isWhite?: boolean
}
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    fetch('/lib/essays.rss').then(response => response.text()).then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');
      const items = xml.querySelectorAll('item');
      const parsedEssays = [...items].map(item => ({ link: item.querySelector('link').textContent, title: item.querySelector('title').textContent }));
      setEssays(parsedEssays);
    }).catch(console.error);
  }, []);

export default function PageLayout({ children, title, isWhite = true }: Props) {
  const message = title 
  return (
    <div>
      <Head>
        <title>{message}</title>
      </Head>
      <div>
        {essays.map((essay, idx) => (
          <div key={idx}>
            <a href={essay.link}>{essay.title}</a>
          </div>
        ))}
      </div>
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