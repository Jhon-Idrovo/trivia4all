import '../styles/global.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

import NavBar from '../components/NavBar';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Trivia4All</title>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <NavBar />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
