export const PRIMARY_EMAIL = 'info@primexusglobal.com'
export const SECONDARY_EMAIL = 'primexus.business@outlook.com'

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${PRIMARY_EMAIL}`

export function mailtoHref(subject: string) {
  const params = new URLSearchParams({ cc: SECONDARY_EMAIL, subject })
  return `mailto:${PRIMARY_EMAIL}?${params.toString()}`
}
