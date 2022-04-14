import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "features/Auth/Context";
import { defaultAuthProvider } from "features/Auth/authProvider";
import { AppPropsWithLayout } from "models";
import { EmptyLayout } from "components/Layout";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <AuthContextProvider authProvider={defaultAuthProvider}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
