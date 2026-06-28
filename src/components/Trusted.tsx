import { useTranslation } from 'react-i18next'
import '../styles/trusted.css'

const partnerKeys = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const

export default function Trusted() {
  const { t } = useTranslation()

  return (
    <section className="trusted">
      <div className="container">
        <div className="trusted-partners">
          {partnerKeys.map((key) => (
            <span key={key} className="trusted-partner">
              {t(`trusted.partners.${key}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
