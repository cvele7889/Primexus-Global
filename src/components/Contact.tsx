import { useState, FormEvent } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useTranslation } from 'react-i18next'
import { FORM_ENDPOINT, PRIMARY_EMAIL, SECONDARY_EMAIL } from '../config/contact'
import '../styles/contact.css'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ''

type ContactFormContentProps = {
  executeRecaptcha?: (action?: string) => Promise<string | undefined>
}

function ContactFormContent({ executeRecaptcha }: ContactFormContentProps) {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (RECAPTCHA_SITE_KEY) {
      if (!executeRecaptcha) {
        setError(t('contact.form.captchaFailed'))
        return
      }
    }

    const form = e.currentTarget
    const data = new FormData(form)

    setSending(true)
    try {
      if (RECAPTCHA_SITE_KEY && executeRecaptcha) {
        const token = await executeRecaptcha('contact_submit')
        if (!token) {
          throw new Error('Missing reCAPTCHA token')
        }
      }

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company') || '—',
          message: data.get('message'),
          _subject: 'Nova poruka sa Primexus Global sajta',
          _template: 'table',
          _captcha: 'false',
          _cc: SECONDARY_EMAIL,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submit failed')
      }

      form.reset()
      setSent(true)
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError(t('contact.form.error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-header">
          <span className="section-label">{t('contact.label')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-item-icon">✉️</span>
              <div>
                <strong>{t('contact.email')}</strong>
                <a href={`mailto:${PRIMARY_EMAIL}`}>{PRIMARY_EMAIL}</a>
                <a href={`mailto:${SECONDARY_EMAIL}`} className="contact-email-secondary">{SECONDARY_EMAIL}</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item-icon">📞</span>
              <div>
                <strong>{t('contact.phone')}</strong>
                <a href="tel:+381646427802">+381 64 642 7802</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item-icon">📍</span>
              <div>
                <strong>{t('contact.address')}</strong>
                <span>{t('about.addressValue')}</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input type="text" id="name" name="name" required disabled={sending} />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input type="email" id="email" name="email" required disabled={sending} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company">{t('contact.form.company')}</label>
              <input type="text" id="company" name="company" disabled={sending} />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea id="message" name="message" rows={5} required disabled={sending} />
            </div>

            {error ? <p className="form-error" role="alert">{error}</p> : null}

            <button type="submit" className="btn btn-primary" disabled={sending || sent}>
              {sent ? t('contact.form.success') : sending ? t('contact.form.sending') : t('contact.form.send')}
            </button>

            {RECAPTCHA_SITE_KEY ? (
              <p className="recaptcha-notice">{t('contact.form.captchaNotice')}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}

function ContactFormWithRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  return <ContactFormContent executeRecaptcha={executeRecaptcha} />
}

export default function Contact() {
  if (!RECAPTCHA_SITE_KEY) {
    return <ContactFormContent />
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <ContactFormWithRecaptcha />
    </GoogleReCaptchaProvider>
  )
}
