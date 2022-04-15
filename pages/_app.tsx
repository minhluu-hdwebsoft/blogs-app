import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "features/Auth/Context";
import { defaultAuthProvider } from "features/Auth/authProvider";
import { AppPropsWithLayout } from "models";
import { EmptyLayout } from "components/Layout";
import { ScrollToTop } from "components/Common/ScrollToTop";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <AuthContextProvider authProvider={defaultAuthProvider}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ScrollToTop />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
