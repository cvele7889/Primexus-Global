type LogoProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'sm' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Primexus Global D.O.O."
      className={`logo-img logo-img-${size}${className ? ` ${className}` : ''}`}
    />
  )
}
