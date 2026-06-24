import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { mailtoHref } from '../config/contact'
import '../styles/jobs.css'

const jobIds = ['job1', 'job2', 'job3', 'job4', 'job5', 'job6', 'job7', 'job8'] as const

const jobMeta: Record<string, { country: string; category: string; language: string }> = {
  job1: { country: 'serbia', category: 'support', language: 'german' },
  job2: { country: 'serbia', category: 'support', language: 'english' },
  job3: { country: 'serbia', category: 'management', language: 'serbian' },
  job4: { country: 'serbia', category: 'it', language: 'english' },
  job5: { country: 'serbia', category: 'sales', language: 'german' },
  job6: { country: 'serbia', category: 'admin', language: 'serbian' },
  job7: { country: 'serbia', category: 'quality', language: 'english' },
  job8: { country: 'europe', category: 'general', language: 'any' },
}

export default function JobListings() {
  const { t } = useTranslation()
  const [country, setCountry] = useState('all')
  const [category, setCategory] = useState('all')
  const [language, setLanguage] = useState('all')

  const filtered = useMemo(() => {
    return jobIds.filter((id) => {
      const m = jobMeta[id]
      if (country !== 'all' && m.country !== country) return false
      if (category !== 'all' && m.category !== category) return false
      if (language !== 'all' && m.language !== language) return false
      return true
    })
  }, [country, category, language])

  const resetFilters = () => {
    setCountry('all')
    setCategory('all')
    setLanguage('all')
  }

  return (
    <div id="positions" className="job-listings">
      <div className="jobs-header">
        <h3>{t('jobs.title')}</h3>
        <p>{t('jobs.subtitle')}</p>
      </div>

      <div className="jobs-filters">
        <div className="filter-group">
          <label>{t('jobs.filters.country')}</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="all">{t('jobs.filters.all')}</option>
            <option value="serbia">{t('jobs.filters.serbia')}</option>
            <option value="europe">{t('jobs.filters.europe')}</option>
          </select>
        </div>
        <div className="filter-group">
          <label>{t('jobs.filters.category')}</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">{t('jobs.filters.all')}</option>
            <option value="support">{t('jobs.filters.support')}</option>
            <option value="management">{t('jobs.filters.management')}</option>
            <option value="it">{t('jobs.filters.it')}</option>
            <option value="sales">{t('jobs.filters.sales')}</option>
            <option value="admin">{t('jobs.filters.admin')}</option>
            <option value="quality">{t('jobs.filters.quality')}</option>
            <option value="general">{t('jobs.filters.general')}</option>
          </select>
        </div>
        <div className="filter-group">
          <label>{t('jobs.filters.language')}</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="all">{t('jobs.filters.all')}</option>
            <option value="serbian">{t('jobs.filters.serbian')}</option>
            <option value="english">{t('jobs.filters.english')}</option>
            <option value="german">{t('jobs.filters.german')}</option>
            <option value="any">{t('jobs.filters.anyLang')}</option>
          </select>
        </div>
        <button className="btn btn-outline filter-reset" onClick={resetFilters}>
          {t('jobs.filters.reset')}
        </button>
      </div>

      <div className="jobs-count">
        {t('jobs.showing', { count: filtered.length, total: jobIds.length })}
      </div>

      <div className="jobs-list">
        {filtered.map((id) => (
          <article key={id} className="job-card">
            <div className="job-card-content">
              <h4>{t(`jobs.items.${id}.title`)}</h4>
              <p className="job-desc">{t(`jobs.items.${id}.desc`)}</p>
              <div className="job-tags">
                <span className="job-tag">{t(`jobs.items.${id}.location`)}</span>
                <span className="job-tag job-tag-accent">{t(`jobs.items.${id}.type`)}</span>
                <span className="job-tag">{t(`jobs.items.${id}.lang`)}</span>
              </div>
            </div>
            <a
              href={mailtoHref(t(`jobs.items.${id}.title`))}
              className="btn btn-primary job-apply"
            >
              {t('jobs.apply')}
            </a>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="jobs-empty">
          <p>{t('jobs.noResults')}</p>
          <button className="btn btn-outline" onClick={resetFilters}>{t('jobs.filters.reset')}</button>
        </div>
      )}
    </div>
  )
}
