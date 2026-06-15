import darkLogo from "@/assets/pixel2align-logo.png";
import lightLogo from "@/assets/pixel2align-light.png";

type LogoProps = {
  className?: string;
  alt?: string;
};

/**
 * Theme-aware Pixel2Align wordmark.
 * The root <html> gets a `.light` class only for the pixel-light theme
 * (see IdeContext). Everything else is a dark theme.
 *  - .light  → dark navy wordmark (pixel2align-logo.png)
 *  - default → white wordmark    (pixel2align-light.png)
 */
export function Logo({
  className = "h-7 w-auto",
  alt = "Pixel2Align — Premium Web & UI Design Studio",
}: LogoProps) {
  return (
    <>
      <img
        src={darkLogo}
        alt={alt}
        className={`${className} hidden [.light_&]:block`}
        loading="eager"
        decoding="async"
      />
      <img
        src={lightLogo}
        alt={alt}
        className={`${className} block [.light_&]:hidden`}
        loading="eager"
        decoding="async"
      />
    </>
  );
}
