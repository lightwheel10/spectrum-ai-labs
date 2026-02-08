import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{ backgroundColor: '#0A0A0A' }}>
      <Head>
      </Head>
      <body className="antialiased" style={{ backgroundColor: '#0A0A0A' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
