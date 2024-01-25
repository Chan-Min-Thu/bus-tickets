import Layout from "@/components/Layout";
import store from "@/store";
import { Session } from "next-auth";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface Props {
  children:ReactNode;
}
export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
    <Provider store={store}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </Provider>
    </SessionProvider>
  );
}
