import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/layout/Footer';

const TermsAndConditions: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Head>
        <title>Terms & Conditions | Spectrum AI Labs</title>
        <meta name="description" content="Terms and Conditions for Spectrum AI Labs - AI automation agency helping businesses go AI-first." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.spectrumailabs.com/terms" />
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

          <h1 className="text-4xl font-bold mb-8 text-white">Terms & Conditions</h1>
          
          <div className="prose prose-invert max-w-none text-zinc-300">
            <p className="mb-6">Our Terms and Conditions were last updated on <strong>09/04/2025</strong>.</p>

            <p className="mb-6">Please read these terms and conditions carefully before using Our Service.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Acknowledgment</h2>
            <p className="mb-4">These are the Terms and Conditions governing the use of this Service and the agreement that operates between you and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
            <p className="mb-4">Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.</p>
            <p className="mb-6">By accessing or using the Service you agree to be bound by these Terms and Conditions. If you disagree with any part of these Terms and Conditions, then you may not access the Service.</p>
            <p className="mb-6">Your access to and use of the Service is also conditioned on your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of your personal information when you use the Application or the Website and tells you about your privacy rights and how the law protects you. Please read Our Privacy Policy carefully before using Our Service.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">User Accounts</h2>
            <p className="mb-4">When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in the immediate termination of your account.</p>
            <p className="mb-4">You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with Our Service or a Third-Party Social Media Service.</p>
            <p className="mb-4">You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
            <p className="mb-6">You may not use as a username the name of another person or entity that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar, or obscene.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Copyright Policy</h2>
            <h3 className="text-xl font-bold mt-6 mb-3">Intellectual Property Infringement</h3>
            <p className="mb-6">All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of <strong>Spectrum AI Labs</strong> and are protected by international copyright, trademark, and other intellectual property laws.</p>

            <h3 className="text-xl font-bold mt-6 mb-3">DMCA Notice and DMCA Procedure for Copyright Infringement Claims</h3>
            <p className="mb-4">You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright&apos;s interest.</li>
              <li>A description of the copyrighted work that You claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.</li>
              <li>Identification of the URL or other specific location on the Service where the material that You claim is infringing is located.</li>
              <li>Your address, telephone number, and email address.</li>
              <li>A statement by You that You have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner&apos;s behalf.</li>
            </ul>
            <p className="mb-6">You can contact our copyright agent via email at <a href="mailto:support@spectrumailabs.com" className="text-amber-400 hover:text-amber-300">support@spectrumailabs.com</a>. Upon receipt of a notification, the Company will take whatever action, in its sole discretion, it deems appropriate, including removing the challenged content from the Service.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">The Service and its original content (excluding Content provided by you or other users), features, and functionality are and will remain the exclusive property of the Company and its licensors.</p>
            <p className="mb-4">The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</p>
            <p className="mb-6">Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Your Feedback to Us</h2>
            <p className="mb-6">You assign all rights, title, and interest in any Feedback You provide to the Company. If for any reason such assignment is ineffective, You agree to grant the Company a non-exclusive, perpetual, irrevocable, royalty-free, worldwide right, and license to use, reproduce, disclose, sublicense, distribute, modify, and exploit such Feedback without restriction.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Links to Other Websites</h2>
            <p className="mb-4">Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.</p>
            <p className="mb-4">The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>
            <p className="mb-6">We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Termination</h2>
            <p className="mb-4">We may terminate or suspend your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.</p>
            <p className="mb-6">Upon termination, your right to use the Service will cease immediately. If you wish to terminate your Account, you may simply discontinue using the Service.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-6">Notwithstanding any damages that you might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by you through the Service or 100 USD if you haven&apos;t purchased anything through the Service.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h2>
            <p className="mb-4">The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice.</p>
            <p className="mb-4">Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
            <p className="mb-6">Without limiting the foregoing, neither the Company nor any of the company&apos;s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
            <p className="mb-6">Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law</h2>
            <p className="mb-6">The laws of <strong>India</strong>, excluding its conflicts of law rules, shall govern these Terms and your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Disputes Resolution</h2>
            <p className="mb-6">If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to These Terms and Conditions</h2>
            <p className="mb-6">We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days&apos; notice before any new terms take effect. What constitutes a material change will be determined at our sole discretion.</p>
            <p className="mb-6">By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions about these Terms and Conditions, You can contact us:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>By visiting our website: <a href="https://www.spectrumailabs.com" className="text-amber-400 hover:text-amber-300">www.spectrumailabs.com</a></li>
              <li>By sending us an email: <a href="mailto:paras@spectrumailabs.com" className="text-amber-400 hover:text-amber-300">paras@spectrumailabs.com</a></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions; 