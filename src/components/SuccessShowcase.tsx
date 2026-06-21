import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/success.css'

const SLIDES = [
  {
    key: 'slide1',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&q=80&auto=format&fit=crop',
  },
  {
    key: 'slide2',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&auto=format&fit=crop',
  },
  {
    key: 'slide3',
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1400&q=80&auto=format&fit=crop',
  },
  {
    key: 'slide4',
    image: 'https://images.unsplash.com/photo-1556745757-8d76dbece389?w=1400&q=80&auto=format&fit=crop',
  },
] as const

const REMOTE_SLIDES = [
  {
    key: 'remote1',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&auto=format&fit=crop',
  },
  {
    key: 'remote2',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5a99a36927?w=1400&q=80&auto=format&fit=crop',
  },
  {
    key: 'remote3',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=80&auto=format&fit=crop',
  },
] as const

function ImageSlider({
  slides,
  prefix,
}: {
  slides: readonly { key: string; image: string }[]
  prefix: string
}) {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, paused])

  return (
    <div
      className="slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="slider-track">
        {slides.map((slide, i) => (
          <div
            key={slide.key}
            className={`slider-slide ${i === active ? 'active' : ''}`}
            aria-hidden={i !== active}
          >
            <img src={slide.image} alt={t(`${prefix}.${slide.key}.alt`)} loading="lazy" />
            <div className="slider-caption">
              <span>{t(`${prefix}.${slide.key}.caption`)}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-btn slider-prev" onClick={prev} aria-label="Previous">
        ‹
      </button>
      <button className="slider-btn slider-next" onClick={next} aria-label="Next">
        ›
      </button>

      <div className="slider-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            className={`slider-dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function SuccessShowcase() {
  const { t } = useTranslation()

  return (
    <section className="success-showcase">
      <div className="success-block success-block-alt">
        <div className="container success-grid reverse">
          <div className="success-content">
            <span className="section-label">{t('success.label')}</span>
            <h2 className="section-title">{t('success.title2')}</h2>
            <p className="section-subtitle">{t('success.subtitle2')}</p>
            <a href="#positions" className="btn btn-primary">{t('success.cta2')}</a>
          </div>
          <ImageSlider slides={REMOTE_SLIDES} prefix="success.remote" />
        </div>
      </div>

      <div className="success-block">
        <div className="container success-grid">
          <div className="success-content">
            <h2 className="section-title">{t('success.title1')}</h2>
            <p className="section-subtitle">{t('success.subtitle1')}</p>
            <a href="#positions" className="btn btn-outline">{t('success.cta1')}</a>
          </div>
          <ImageSlider slides={SLIDES} prefix="success" />
        </div>
      </div>
    </section>
  )
}
