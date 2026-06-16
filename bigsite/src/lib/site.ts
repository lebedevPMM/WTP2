// Single source of truth for WTP contact details (real, from existing site + CEO vCard).
export const site = {
  name: "WTP",
  full: "WTP — Welcome To Paradise",
  domain: "wtp.ae",
  email: "hello@wtpbrokers.com",
  phone: "+971 600 575-294",
  phoneHref: "tel:+971600575294",
  telegram: "https://t.me/wtpbrokers",
  whatsapp: "https://wa.me/971600575294",
  office: "Media City, Dubai, UAE",
  linkedin: "https://www.linkedin.com/company/wtpbrokers",
} as const;

// cal.com booking link, e.g. "wtp/pre-screen". Empty = embed hidden, lead form is primary.
// TODO(Konstantin): set once the cal.com event is created.
export const CALCOM_LINK = (import.meta.env.VITE_CALCOM_LINK as string) || "";
