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

// FIX 26/12/2025: Removed unused CalendarProps interface entirely

// Add Cal.com attributes to any component
export const withCalendarBooking = <P extends { skipCalendar?: boolean; children: React.ReactNode }>(
  Component: React.ComponentType<P>
) => {
  // Use type assertion to handle the props correctly
  const WithCalendar = (props: P) => {
    // Note: Cal.com API is initialized globally in _app.tsx
    // No need to call useCalendar() here to avoid double initialization

    // Skip calendar integration if skipCalendar prop is true
    if (props.skipCalendar) {
      return <Component {...props} />;
    }

    // Add Cal.com attributes to the component
    const calProps = {
      "data-cal-namespace": "10min",
      "data-cal-link": "paras/10min",
      "data-cal-config": '{"layout":"month_view"}'
    };

    return <Component {...props} {...calProps} />;
  };
  
  // Add display name
  WithCalendar.displayName = `WithCalendarBooking(${Component.displayName || Component.name || 'Component'})`;
  
  return WithCalendar;
}; 