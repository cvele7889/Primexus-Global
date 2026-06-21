import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/contact.css'

export default function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
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
                <a href="mailto:primexus.business@outlook.com">primexus.business@outlook.com</a>
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
                <span>Kralja Petra bb, 14240 Ljig, Republika Srbija</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input type="text" id="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input type="email" id="email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company">{t('contact.form.company')}</label>
              <input type="text" id="company" />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea id="message" rows={5} required />
            </div>
            <button type="submit" className="btn btn-primary">
              {sent ? t('contact.form.success') : t('contact.form.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
