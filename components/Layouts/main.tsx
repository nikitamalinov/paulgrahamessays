import Head from "next/head";
import React, { ReactNode, useEffect } from "react";

interface Props {
  children?: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col relative">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="application-name" content="Paul Graham Essays" />
        <meta
          name="description"
          content="Read Paul Graham's essays while saving your progress and view ratings."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <meta property="og:title" content="Paul Graham's Essays" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Read Paul Graham's essays while saving your progress and view ratings."
        />
      </Head>
      {children}
    </div>
  );
}
