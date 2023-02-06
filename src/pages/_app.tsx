import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
  return (<>
    <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} id="google-analytics"/>
    <Script strategy="lazyOnload" id="google-analytics-2">
      {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
  page_path: window.location.pathname,
  });
`}
    </Script>
    <Head>
      <title>SEE RANK</title>
    </Head>
    <Component {...pageProps} />
  </>)
}
