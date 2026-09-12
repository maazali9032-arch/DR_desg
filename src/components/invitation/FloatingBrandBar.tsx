/**
 * FloatingBrandBar — ZAR brand showcase fixed at the bottom of the viewport.
 *
 * - Always visible regardless of scroll position (position: fixed, bottom: 0)
 * - Adapts to any screen width
 * - Styled in the ZAR gold / henna palette
 * - Optionally shows a fallback shop's contact links (passed via `shop` prop)
 * - If `shop` is omitted, falls back to the static zarBrand config
 */

import { zarBrand } from "@/data/zarBrand";
import type { ShopFallback } from "@/lib/invitation-content";

interface FloatingBrandBarProps {
  /** Pass the fallback shop data to override static brand config (e.g. in `state: "fallback"`). */
  shop?: Partial<ShopFallback>;
}

export function FloatingBrandBar({ shop }: FloatingBrandBarProps = {}) {
  const name = shop?.name || zarBrand.name;
  const tagline = zarBrand.tagline;

  // Resolve contact: prefer shop data, fall back to static brand config
  const rawPhone = shop?.phone || zarBrand.phone;
  const rawWhatsapp = shop?.whatsapp || zarBrand.whatsapp;

  const phoneDigits = rawPhone.replace(/\D/g, "");
  const whatsappUrl = rawWhatsapp
    ? rawWhatsapp.startsWith("http")
      ? rawWhatsapp
      : `https://wa.me/${rawWhatsapp.replace(/\D/g, "")}`
    : phoneDigits
    ? `https://wa.me/${phoneDigits}`
    : "";

  return (
    <div
      style={{ zIndex: 100 }}
      className="fixed bottom-0 left-0 right-0 w-full"
      aria-label="ZAR brand bar"
    >
      {/* Gradient fade above the bar so content below it doesn't hard-clip */}
      <div className="pointer-events-none h-8 w-full bg-gradient-to-t from-black/60 to-transparent" />

      <div className="flex w-full flex-col items-center gap-2 border-t border-accent/40 bg-background/95 px-4 py-3 backdrop-blur-sm sm:flex-row sm:justify-between sm:gap-0 sm:px-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          {/* Logo mark — architectural diamond ornament in gold */}
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="shrink-0 text-primary"
            aria-hidden="true"
          >
            <path d="M12 2 L20 12 L12 22 L4 12 Z" />
            <path d="M12 6 L16 12 L12 18 L8 12 Z" opacity="0.55" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          </svg>

          <div className="leading-tight">
            <p className="font-sans text-[0.62rem] font-medium tracking-[0.38em] text-primary uppercase">
              {name}
            </p>
            <p className="font-display text-[0.78rem] tracking-wide text-muted-foreground">
              {tagline}
            </p>
          </div>
        </div>

        {/* Contact buttons — hidden when no contact info is configured */}
        {(rawPhone || whatsappUrl) && (
          <div className="flex items-center gap-2">
            {rawPhone && (
              <a
                href={`tel:${rawPhone}`}
                className="border border-accent/60 px-4 py-1.5 font-sans text-[0.55rem] tracking-[0.28em] text-primary uppercase transition-colors hover:border-accent hover:bg-accent/10"
              >
                Call
              </a>
            )}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="border border-accent/60 px-4 py-1.5 font-sans text-[0.55rem] tracking-[0.28em] text-primary uppercase transition-colors hover:border-accent hover:bg-accent/10"
              >
                WhatsApp
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
