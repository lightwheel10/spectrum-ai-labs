import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/layout/Footer';

const RefundPolicy: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Head>
        <title>Refund Policy | Spectrum AI Labs</title>
        <meta name="description" content="Refund Policy for Spectrum AI Labs" />
      </Head>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-8 text-white">Return & Refund Policy</h1>
          
          <div className="prose prose-invert max-w-none text-zinc-300">
            <p className="mb-6">Our Return and Refund Policy was last updated on <strong>09/04/2025</strong>.</p>

            <p className="mb-6">Thank you for shopping at <strong>Spectrum AI Labs</strong>.</p>

            <p className="mb-6">The following terms are applicable for any products that you have purchased from us.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Eligibility for Refunds</h2>
            <p className="mb-4">We offer refunds under the following circumstances:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>If the service is not delivered as promised due to an error on our end.</li>
              <li>If a technical issue caused by our platform prevents you from accessing the features you paid for, and the issue cannot be resolved within a reasonable timeframe.</li>
              <li>If you cancel your subscription within the refund period outlined below.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Refund Period</h2>
            <p className="mb-6">Refund requests must be made within <strong>30</strong> days of the payment date. Requests made after this period will not be eligible for a refund.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Non-Refundable Cases</h2>
            <p className="mb-4">Refunds will not be granted under the following conditions:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>If you change your mind after purchasing a subscription or service.</li>
              <li>If you fail to use the service during the subscription period.</li>
              <li>If the issue is caused by third-party software or tools not affiliated with our platform.</li>
              <li>Setup fees are non-refundable under any circumstances.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Refund Process</h2>
            <p className="mb-4">To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Contact our support team at <a href="mailto:paras@spectrumailabs.com" className="text-amber-400 hover:text-amber-300">paras@spectrumailabs.com</a></li>
              <li>Provide your payment receipt, order ID, and a detailed explanation of the issue.</li>
              <li>Our team will review your request and respond within 3-5 business days.</li>
              <li>If your request is approved, the refund will be processed to your original payment method within 7-10 business days.</li>
            </ol>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions about this Refund Policy or require assistance, please reach out to us:</p>
            <p className="mb-6">Email: <a href="mailto:paras@spectrumailabs.com" className="text-amber-400 hover:text-amber-300">paras@spectrumailabs.com</a></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy; 