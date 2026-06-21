import "@/styles/globals.css";
import App from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastFromSSR from "@/components/ToastFromSSR";
import { fetchSsrToastData } from "@/lib/ssr-toast";
import { serializeProps } from "@/lib/serialize-props";

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer position="top-right" newestOnTop />
      <ToastFromSSR quote={pageProps.ssrQuote} news={pageProps.ssrNews} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { quote, news } = await fetchSsrToastData();

  return {
    ...appProps,
    pageProps: serializeProps({
      ...appProps.pageProps,
      ssrQuote: quote,
      ssrNews: news,
    }),
  };
};
