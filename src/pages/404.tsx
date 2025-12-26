import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] px-4">
      <Head>
        <title>404 - Page Not Found | Spectrum AI Labs</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Spectrum AI Labs homepage." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="text-center">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-white/80 mb-8">Page Not Found</h2>
        <p className="text-white/60 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FF8C00] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Back to Home
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
