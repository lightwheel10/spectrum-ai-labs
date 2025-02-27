import { useEffect, useRef, CSSProperties } from 'react';
import { withCalendarBooking } from './CalendarBooking';

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  showArrow?: boolean;
}

export const GradientButton = ({ children, href, className = '', showArrow = false, ...rest }: GradientButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buttonElement = buttonRef.current;
    if (!buttonElement) return;

    const updateAnimation = () => {
      const angle = (parseFloat(buttonElement.style.getPropertyValue("--angle") || "0") + 1) % 360;
      buttonElement.style.setProperty("--angle", `${angle}deg`);
      requestAnimationFrame(updateAnimation);
    };

    requestAnimationFrame(updateAnimation);
  }, []);

  const content = (
    <div
      ref={buttonRef}
      style={{
        "--angle": "0deg",
        "--border-color": "linear-gradient(var(--angle), #0A0A0A, #EF4444, #EA580C, #EF4444, #0A0A0A)",
        "--bg-color": "linear-gradient(to right, #1a1a1a, #1a1a1a)",
      } as CSSProperties}
      className={`relative group ${className}`}
      {...rest}
    >
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#EF4444] via-[#EA580C] to-[#EF4444] rounded-full blur-[2px] opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt" />
      <div className="relative flex items-center justify-center rounded-full border-[1px] border-transparent [background:padding-box_var(--bg-color),border-box_var(--border-color)] hover:scale-[1.02] transition-all duration-300">
        <div className="relative bg-[#0A0A0A] rounded-full">
          <span className="text-white px-8 py-3 text-sm font-medium flex items-center justify-center gap-3 w-[160px]">
            <span className="flex-1 text-center whitespace-nowrap">{children}</span>
            {showArrow && <span className="text-lg flex-shrink-0 translate-y-[1px]">→</span>}
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block" {...rest}>
        {content}
      </a>
    );
  }

  return content;
};

// Create a calendar-enabled version of the button
export const CalendarGradientButton = withCalendarBooking(GradientButton); 