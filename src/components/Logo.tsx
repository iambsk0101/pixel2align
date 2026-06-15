import darkLogo from "@/assets/pixel2align-logo.png";
import lightLogo from "@/assets/pixel2align-light.png";

type LogoProps = {
  className?: string;
  alt?: string;
};

/**
 * Theme-aware Pixel2Align wordmark.
 * - Dark-text logo shows on light backgrounds
 * - White-text logo shows in dark mode
 */
export function Logo({ className = "h-7 w-auto", alt = "Pixel2Align — Premium Web & UI Design Studio" }: LogoProps) {
  return (
    <>
      <img src={darkLogo} alt={alt} className={`${className} block dark:hidden`} loading="eager" decoding="async" />
      <img src={lightLogo} alt={alt} className={`${className} hidden dark:block`} loading="eager" decoding="async" />
    </>
  );
}
