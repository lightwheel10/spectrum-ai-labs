// FIX 26/12/2025: Removed team avatars and updated copy for solo founder agency

const Star = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="relative top-[-2px]"
  >
    <rect width="32" height="32" rx="8" fill="black"/>
    <rect width="32" height="32" rx="8" fill="url(#paint0_radial)" fillOpacity="0.4"/>
    <path
      d="M16 10L17.5 14.5L22 16L17.5 17.5L16 22L14.5 17.5L10 16L14.5 14.5L16 10Z"
      fill="#FFA573"
    />
    <defs>
      <radialGradient
        id="paint0_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(16 16) rotate(90) scale(16)"
      >
        <stop stopColor="#FFA573" stopOpacity="0.6"/>
        <stop offset="1" stopColor="#FFA573" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
);

const About = () => {
  return (
    <section className="relative py-12 overflow-x-hidden" id="about">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <span className="text-[#E5855E] text-sm">About</span>
        </div>

        <div className="space-y-3">
          <p className="text-3xl font-medium text-white leading-tight flex items-center gap-2">Hi, I&apos;m Paras <Star /></p>
          <div className="text-3xl sm:text-3xl text-xl font-medium text-white leading-tight">
            <p>We craft cutting-edge AI solutions to make organizations more competitive. We work directly with you, no middlemen, no handoffs. Just focused expertise delivering world-class results.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 