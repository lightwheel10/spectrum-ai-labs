import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{ backgroundColor: '#0A0A0A' }}>
      <Head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CB92GT7DPD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CB92GT7DPD');
            `,
          }}
        />
        {/* Cal.com embed CSS */}
        <link rel="stylesheet" href="https://cal.com/embed.css" />
      </Head>
      <body className="antialiased" style={{ backgroundColor: '#0A0A0A' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
