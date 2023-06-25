import "@/styles/globals.css";
import MainLayout from "../components/Layouts/main";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "@/theme/styles";
export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}
