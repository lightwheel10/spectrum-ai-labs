import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/layout/Footer';

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Head>
        <title>Privacy Policy | Spectrum AI Labs</title>
        <meta name="description" content="Privacy Policy for Spectrum AI Labs" />
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

          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none text-zinc-300">
            <p className="mb-6">Our Privacy Policy was last updated on <strong>09/04/2024</strong>.</p>

            <p className="mb-6">
              At <strong>Spectrum AI Labs</strong>, one of our main priorities is the privacy of our visitors. 
              This Privacy Policy document contains types of information that is collected and recorded by 
              <strong> Spectrum AI Labs</strong> and how we use it.
            </p>

            <p className="mb-6">
              If you have additional questions or require more information about our Privacy Policy, 
              do not hesitate to contact us at <a href="mailto:paras@spectrumailabs.com" className="text-amber-400 hover:text-amber-300">paras@spectrumailabs.com</a>.
            </p>

            <p className="mb-6">
              This Privacy Policy applies only to our online activities and is valid for visitors to our website 
              with regards to the information that they shared and/or collected on www.spectrumailabs.com. 
              This policy is not applicable to any information collected offline or via channels other than this website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Consent</h2>
            <p className="mb-6">
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, 
              will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p className="mb-4">
              If you contact us directly, we may receive additional information about you such as your name, email address, 
              phone number, the contents of the message and/or attachments you may send us, and any other information 
              you may choose to provide.
            </p>
            <p className="mb-6">
              When you register for an account, we may ask for your contact information, including items such as name, 
              company name, address, email address, and telephone number.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, 
                  to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Log Files</h2>
            <p className="mb-4">
              <strong>Spectrum AI Labs</strong> follows a standard procedure of using log files. These files log visitors 
              when they visit websites. All hosting companies do this as part of hosting services&apos; analytics.
            </p>
            <p className="mb-6">
              The information collected by log files includes internet protocol (IP) addresses, browser type, 
              Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. 
              These are not linked to any information that is personally identifiable. The purpose of the information is for 
              analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Web Beacons</h2>
            <p className="mb-4">
              Like any other website, <strong>Spectrum AI Labs</strong> uses &apos;cookies&apos;. These cookies are used to store 
              information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited.
            </p>
            <p className="mb-6">
              The information is used to optimize the users&apos; experience by customizing our web page content based on 
              visitors&apos; browser type and/or other information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Advertising Partners Privacy Policies</h2>
            <p className="mb-6">
              Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used 
              in their respective advertisements and links that appear on <strong>Spectrum AI Labs</strong>, which are sent 
              directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies 
              are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising 
              content that you see on websites that you visit.
            </p>
            <p className="mb-6">
              Note that <strong>Spectrum AI Labs</strong> has no access to or control over these cookies that are used by 
              third-party advertisers.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Third Party Privacy Policies</h2>
            <p className="mb-4">
              <strong>Spectrum AI Labs</strong>&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, 
              we are advising you to consult the respective Privacy Policies of these third-party ad servers for more 
              detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p className="mb-6">
              You can choose to disable cookies through your individual browser options. To know more detailed information 
              about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p className="mb-4">Under the CCPA, among other rights, California consumers have the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Request that a business that collects a consumer&apos;s personal data disclose the categories and specific 
                  pieces of personal data that a business has collected about consumers</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected</li>
              <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data</li>
            </ul>
            <p className="mb-6">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, 
              please contact us.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">GDPR Data Protection Rights</h2>
            <p className="mb-4">We want to ensure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data. We may charge you a small fee for this service</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions</li>
              <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data, under certain conditions</li>
              <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions</li>
            </ul>
            <p className="mb-6">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, 
              please contact us.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Children&apos;s Information</h2>
            <p className="mb-4">
              Another part of our priority is adding protection for children while using the internet. We encourage parents 
              and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p className="mb-6">
              <strong>Spectrum AI Labs</strong> does not knowingly collect any Personal Identifiable Information from children 
              under the age of 13. If you think that your child provided this kind of information on our website, we strongly 
              encourage you to contact us immediately and we will do our best efforts to promptly remove such information from 
              our records.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 