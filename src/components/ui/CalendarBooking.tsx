import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

// Initialize Cal.com API once
export const useCalendar = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "10min" });
      cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, []);
};

// Define props interface to replace any
export interface CalendarProps {
  children: React.ReactNode; // Make children required
  skipCalendar?: boolean;
  [key: string]: unknown; // For other props, use unknown instead of any
}

// Add Cal.com attributes to any component
export const withCalendarBooking = <P extends { skipCalendar?: boolean; children: React.ReactNode }>(
  Component: React.ComponentType<P>
) => {
  // Use type assertion to handle the props correctly
  const WithCalendar = (props: P) => {
    useCalendar();
    
    // Skip calendar integration if skipCalendar prop is true
    if (props.skipCalendar) {
      return <Component {...props} />;
    }
    
    // Add Cal.com attributes to the component
    const calProps = {
      "data-cal-namespace": "10min",
      "data-cal-link": "borus/10min",
      "data-cal-config": '{"layout":"month_view"}'
    };
    
    return <Component {...props} {...calProps} />;
  };
  
  // Add display name
  WithCalendar.displayName = `WithCalendarBooking(${Component.displayName || Component.name || 'Component'})`;
  
  return WithCalendar;
}; 