import { motion } from 'framer-motion';
import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, UserIcon, PaperAirplaneIcon, CheckIcon, BuildingOfficeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// FIX 26/12/2025: Added validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return phone.length >= 7 && phoneRegex.test(phone);
};

const Contact = () => {
  const [formStep, setFormStep] = useState<1 | 2 | 'success'>(1);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  // FIX 26/12/2025: Added validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  // FIX 26/12/2025: Removed styleRef - styles moved to globals.css to prevent flicker

  // First step form data
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  // Second step form data
  const [projectInfo, setProjectInfo] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({
      ...prev,
      [name]: value
    }));
    // FIX 26/12/2025: Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleProjectInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FIX 26/12/2025: Added validation for first step
  const validateBasicInfo = (): boolean => {
    const errors: Record<string, string> = {};

    if (!basicInfo.name.trim()) {
      errors.name = 'Name is required';
    } else if (basicInfo.name.length > 100) {
      errors.name = 'Name must be less than 100 characters';
    }

    if (!basicInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(basicInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!basicInfo.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!isValidPhone(basicInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!basicInfo.company.trim()) {
      errors.company = 'Company name is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFirstStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // FIX 26/12/2025: Validate before proceeding
    if (validateBasicInfo()) {
      setFormStep(2);
    }
  };

  // FIX 26/12/2025: Now actually submits to the API endpoint
  const handleSecondStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setFormStatus('loading');
      setFormMessage('');

      // FIX 26/12/2025: Actually send data to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...basicInfo, ...projectInfo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      // Success
      setFormStep('success');
      setFormStatus('idle');
      // Reset form data
      setBasicInfo({ name: '', email: '', phone: '', company: '' });
      setProjectInfo({ projectType: '', budget: '', timeline: '', description: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setFormMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
    }
  };

  // FIX 26/12/2025: Removed dynamic style injection - styles now in globals.css to prevent flicker

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <span className="text-[#E5855E] text-sm">Contact</span>
          <h2 className="text-6xl font-normal text-white mt-4">Get in Touch</h2>
        </div>

        <div className="p-8 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm">
          {formStep === 'success' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-[#E5855E]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckIcon className="h-10 w-10 text-[#E5855E]" />
              </div>
              <h3 className="text-4xl font-normal text-white mb-4">Thank You!</h3>
              <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                We&apos;ve received your information and will be in touch shortly to discuss your project.
              </p>
              <p className="text-white/60">
                Our team typically responds within 24 hours during business days.
              </p>
            </motion.div>
          ) : formStep === 1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-normal text-white">Basic Information</h3>
              </div>
              
              <form onSubmit={handleFirstStepSubmit} className="space-y-6">
                {/* FIX 26/12/2025: Added validation error display to all form fields */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Full Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={basicInfo.name}
                      onChange={handleBasicInfoChange}
                      className={`w-full pl-10 bg-black/30 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E5855E]/50 focus:ring-1 focus:ring-[#E5855E]/50 transition-colors ${validationErrors.name ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="John Doe"
                      maxLength={100}
                    />
                  </div>
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={basicInfo.email}
                      onChange={handleBasicInfoChange}
                      className={`w-full pl-10 bg-black/30 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E5855E]/50 focus:ring-1 focus:ring-[#E5855E]/50 transition-colors ${validationErrors.email ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={basicInfo.phone}
                      onChange={handleBasicInfoChange}
                      className={`w-full pl-10 bg-black/30 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E5855E]/50 focus:ring-1 focus:ring-[#E5855E]/50 transition-colors ${validationErrors.phone ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                    Company Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={basicInfo.company}
                      onChange={handleBasicInfoChange}
                      className={`w-full pl-10 bg-black/30 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E5855E]/50 focus:ring-1 focus:ring-[#E5855E]/50 transition-colors ${validationErrors.company ? 'border-red-500' : 'border-white/10'}`}
                      placeholder="Acme Inc."
                    />
                  </div>
                  {validationErrors.company && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.company}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-3 rounded-full bg-gradient-to-r from-[#E5855E] to-[#EA580C] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                  data-skip-calendar="true"
                >
                  Continue
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-normal text-white">Project Details</h3>
              </div>
              
              {/* Form Status Message */}
              {formStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 rounded-lg bg-red-900/30 text-red-200"
                >
                  {formMessage}
                </motion.div>
              )}
              
              <form onSubmit={handleSecondStepSubmit} className="space-y-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-white/80 mb-2">
                    Project Type*
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={projectInfo.projectType}
                    onChange={handleProjectInfoChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E5855E]/50 focus:ring-1 focus:ring-[#E5855E]/50 transition-colors appearance-none"
                    required
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23E5855E' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
                  >
                    <option value="" disabled>Select a project type</option>
                    <option value="chatbot">Chatbot Development</option>
                    <option value="voice">Voice Agent</option>
                    <option value="automation">Workflow Automation</option>
                    <option value="consulting">AI Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-white/80 mb-2">
                    Budget Range*
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={projectInfo.budget}
                    onChange={handleProjectInfoChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E5855E]/50 focus:ring-1 focus:ring-[#E5855E]/50 transition-colors appearance-none"
                    required
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23E5855E' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
                  >
                    <option value="" disabled>Select your budget range</option>
                    <option value="under5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="over50k">Over $50,000</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-white/80 mb-2">
                    Timeline*
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={projectInfo.timeline}
                    onChange={handleProjectInfoChange}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E5855E]/50 focus:ring-1 focus:ring-[#E5855E]/50 transition-colors appearance-none"
                    required
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23E5855E' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
                  >
                    <option value="" disabled>Select your timeline</option>
                    <option value="immediate">Immediate (ASAP)</option>
                    <option value="1month">Within 1 month</option>
                    <option value="3months">1-3 months</option>
                    <option value="6months">3-6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
                    Project Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={projectInfo.description}
                    onChange={handleProjectInfoChange}
                    rows={4}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E5855E]/50 focus:ring-1 focus:ring-[#E5855E]/50 transition-colors"
                    placeholder="Tell us about your project goals and requirements..."
                    required
                  ></textarea>
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="w-1/3 px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                    data-skip-calendar="true"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-2/3 px-8 py-3 rounded-full bg-gradient-to-r from-[#E5855E] to-[#EA580C] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                    data-skip-calendar="true"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact; 