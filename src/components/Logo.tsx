type LogoProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'full' | 'wordmark'
}

const logoSrc = {
  full: '/logo.png',
  wordmark: '/logo-wordmark.png',
} as const

export default function Logo({
  className = '',
  size = 'sm',
  variant = 'full',
}: LogoProps) {
  const isWordmark = variant === 'wordmark'

  return (
    <img
      src={logoSrc[variant]}
      alt="Primexus Global D.O.O."
      className={[
        'logo-img',
        isWordmark ? 'logo-img-wordmark' : `logo-img-${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
