import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useCalendar } from '@/components/ui/CalendarBooking';

export default function App({ Component, pageProps }: AppProps) {
  // Initialize Cal.com API
  useCalendar();
  
  return <Component {...pageProps} />;
}
