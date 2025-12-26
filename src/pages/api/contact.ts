// FIX 26/12/2025: Created proper contact form API endpoint
import type { NextApiRequest, NextApiResponse } from 'next';

// FIX 26/12/2025: Define proper types for contact form data
type ContactFormData = {
  // Basic info
  name: string;
  email: string;
  phone: string;
  company: string;
  // Project info
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
};

type ResponseData = {
  success: boolean;
  message: string;
  submissionId?: string;
};

// FIX 26/12/2025: Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// FIX 26/12/2025: Simple phone validation (allows various formats)
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return phone.length >= 7 && phoneRegex.test(phone);
};

// FIX 26/12/2025: Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

/**
 * API route to handle contact form submissions
 * FIX 26/12/2025: This endpoint now properly validates and processes form data
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = req.body;

    // FIX 26/12/2025: Validate required fields
    const requiredFields: (keyof ContactFormData)[] = [
      'name', 'email', 'phone', 'company',
      'projectType', 'budget', 'timeline', 'description'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`
        });
      }
    }

    // FIX 26/12/2025: Validate email format
    if (!isValidEmail(formData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // FIX 26/12/2025: Validate phone format
    if (!isValidPhone(formData.phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }

    // FIX 26/12/2025: Validate field lengths
    if (formData.name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be less than 100 characters'
      });
    }

    if (formData.description.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Description must be less than 2000 characters'
      });
    }

    // FIX 26/12/2025: Sanitize all inputs
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      company: sanitizeInput(formData.company),
      projectType: sanitizeInput(formData.projectType),
      budget: sanitizeInput(formData.budget),
      timeline: sanitizeInput(formData.timeline),
      description: sanitizeInput(formData.description),
    };

    // FIX 26/12/2025: Generate submission ID
    const submissionId = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // FIX 26/12/2025: Send data to n8n webhook
    const webhookUrl = 'https://n8n.fastdb.in/webhook/38b7256e-7a6d-4e43-b063-25e55a030b58';

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId,
          timestamp: new Date().toISOString(),
          ...sanitizedData
        }),
      });

      if (!webhookResponse.ok) {
        console.error('Webhook failed:', webhookResponse.status);
      }
    } catch (webhookError) {
      // Log webhook error but don't fail the request
      console.error('Webhook error:', webhookError);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Your message has been received. We will be in touch shortly!',
      submissionId
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
}
