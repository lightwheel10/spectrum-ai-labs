import { CSSProperties } from 'react';
import styles from './GlowingButton.module.css';
import { withCalendarBooking } from './CalendarBooking';

interface GlowingButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: 'small' | 'default';
  skipCalendar?: boolean;
  fullWidth?: boolean;
}

export const GlowingButton = ({ 
  children, 
  className = '', 
  onClick, 
  size = 'default', 
  fullWidth = false,
  ...rest 
}: GlowingButtonProps) => {
  // Split the className into an array and map CSS module classes
  const cssModuleClasses = className.split(' ').map(cls => styles[cls] || cls).join(' ');
  const isStatic = className.includes('static');
  
  // Add fullWidth class if needed
  const fullWidthClass = fullWidth ? styles.fullWidth : '';
  
  return (
    <button
      onClick={onClick}
      className={`${styles['glowing-button']} ${styles[size]} ${fullWidthClass} ${cssModuleClasses}`}
      style={{
        '--border-angle-1': '0deg',
      } as CSSProperties}
      {...rest}
    >
      {isStatic && <div className={styles.glow} />}
      <div className={styles.content}>
        {children}
      </div>
    </button>
  );
};

// Create a calendar-enabled version of the button
export const CalendarGlowingButton = withCalendarBooking(GlowingButton); 