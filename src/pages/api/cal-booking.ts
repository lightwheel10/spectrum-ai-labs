import type { NextApiRequest, NextApiResponse } from 'next';

type BookingData = {
  name: string;
  email: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
};

type ResponseData = {
  success: boolean;
  message: string;
  bookingId?: string;
};

/**
 * API route to handle Cal.com booking requests
 * This endpoint can be extended to integrate with Cal.com API
 * or any other calendar service you choose to use
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
    const bookingData: BookingData = req.body;
    
    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.date || !bookingData.time) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required booking information' 
      });
    }
    
    // Here you would typically:
    // 1. Validate the booking data
    // 2. Check availability in your calendar system
    // 3. Create the booking in Cal.com or your preferred calendar system
    // 4. Store booking information in your database if needed
    // 5. Send confirmation emails
    
    // For now, we'll just simulate a successful booking
    // In a real implementation, you would integrate with Cal.com's API
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Log the booking data for debugging
    console.log('Booking received:', bookingData);
    
    // Return success response with a mock booking ID
    return res.status(200).json({
      success: true,
      message: 'Booking created successfully',
      bookingId: `booking-${Date.now()}`
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create booking. Please try again later.'
    });
  }
} 