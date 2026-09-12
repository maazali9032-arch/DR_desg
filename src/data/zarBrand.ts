/**
 * ZAR brand config — used by the FloatingBrandBar on every invitation page.
 * Fill in `phone` and `whatsapp` with the real shop contact once known.
 * Leave them empty to hide the contact button.
 */
export const zarBrand = {
  name: "ZAR Invitations",
  tagline: "Crafted with love",
  /** E.164 format, e.g. "+919000000000". Leave empty to hide Call button. */
  phone: "",
  /** Full wa.me URL or digits-only number. Leave empty to hide WhatsApp button. */
  whatsapp: "",
} as const;
