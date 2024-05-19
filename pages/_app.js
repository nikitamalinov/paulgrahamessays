import "@/styles/globals.css";
import MainLayout from "../components/Layouts/main";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";
import theme from "@/theme/styles";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <MainLayout>
              <Component {...pageProps} />
              <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-NDLJW640DH"
              />
              <Script id="google-analytics">
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NDLJW640DH');
            `}
              </Script>
            </MainLayout>
          </ChakraProvider>
        </SessionProvider>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NDLJW640DH"
        ></Script>
        <Script id="google-analytics">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NDLJW640DH');`}
        </Script>
      </MainLayout>
    </ChakraProvider>
  );
}
