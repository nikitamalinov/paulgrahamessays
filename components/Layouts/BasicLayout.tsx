import Head from "next/head";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title: string;
  overrideTitle?: boolean;
  isWhite?: boolean;
  overrideScreen?: string;
}

export default function BasicLayout({
  children,
  title,
  overrideTitle = false,
  isWhite = true,
  overrideScreen = "min-h-screen",
}: Props) {
  let message = "";
  if (!overrideTitle) {
    message = title;
  } else {
    message = title;
  }
  return (
    <div>
      <Head>
        <title>{message}</title>
      </Head>
      <div className={`${overrideScreen} ${isWhite ? "bg-white" : "bg-light"}`}>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
