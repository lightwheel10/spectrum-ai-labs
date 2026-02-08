import React from "react";

const BOOKING_URL = "https://calendar.app.google/ubrp9iyg2anSU5YB7";

type CalendarAwareProps = {
  children: React.ReactNode;
  skipCalendar?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export const withCalendarBooking = <P extends CalendarAwareProps>(
  Component: React.ComponentType<P>
) => {
  const WithCalendar = (props: P) => {
    if (props.skipCalendar) {
      return <Component {...props} />;
    }

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
      props.onClick?.(event);
      if (event.defaultPrevented) return;

      event.preventDefault();
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    };

    return <Component {...props} onClick={handleClick as P["onClick"]} />;
  };

  WithCalendar.displayName = `WithCalendarBooking(${Component.displayName || Component.name || "Component"})`;

  return WithCalendar;
};
