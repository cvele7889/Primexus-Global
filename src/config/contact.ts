export const PRIMARY_EMAIL = 'info@primexusglobal.com'
export const SECONDARY_EMAIL = 'primexus.business@outlook.com'

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${PRIMARY_EMAIL}`

/** Public number shown on the site (E.164). Real number lives only in your carrier forwarding settings. */
export const PUBLIC_PHONE = (import.meta.env.VITE_PUBLIC_PHONE as string | undefined)?.trim() ?? ''

export function formatPhoneDisplay(e164: string): string {
  const digits = e164.replace(/\D/g, '')
  if (digits.startsWith('381') && digits.length === 12) {
    const local = digits.slice(3)
    return `+381 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`
  }
  return e164
}

export function phoneHref(e164: string): string {
  return `tel:${e164.replace(/[^\d+]/g, '')}`
}

export function mailtoHref(subject: string) {
  const params = new URLSearchParams({ cc: SECONDARY_EMAIL, subject })
  return `mailto:${PRIMARY_EMAIL}?${params.toString()}`
}
