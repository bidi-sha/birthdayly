interface BearMascotProps {
  variant?: 'wave' | 'balloon' | 'gift' | 'party' | 'plain'
  size?: number
  className?: string
}

export default function BearMascot({ variant = 'plain', size = 160, className = '' }: BearMascotProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Balloon (behind bear) */}
      {variant === 'balloon' && (
        <g>
          <path d="M150 40 Q145 60 150 70" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
          <ellipse cx="150" cy="30" rx="22" ry="26" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2.5" />
          <path d="M146 54 L150 62 L154 54 Z" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2" />
        </g>
      )}

      {/* Gift box (beside bear) */}
      {variant === 'gift' && (
        <g>
          <rect x="140" y="140" width="40" height="34" rx="4" fill="var(--color-pink-light)" stroke="var(--color-pink)" strokeWidth="2.5" />
          <rect x="140" y="140" width="40" height="10" fill="var(--color-pink)" opacity="0.3" />
          <rect x="156" y="140" width="8" height="34" fill="var(--color-pink)" opacity="0.5" />
          <path d="M154 140 Q150 128 160 130 Q166 132 160 140 Z" fill="var(--color-pink)" opacity="0.5" />
          <path d="M166 140 Q170 128 160 130 Q154 132 160 140 Z" fill="var(--color-pink)" opacity="0.5" />
        </g>
      )}

      {/* Party hat (on head, drawn after head below) */}

      {/* Ears */}
      <circle cx="70" cy="55" r="18" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
      <circle cx="130" cy="55" r="18" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
      <circle cx="70" cy="55" r="8" fill="var(--color-pink-light)" />
      <circle cx="130" cy="55" r="8" fill="var(--color-pink-light)" />

      {/* Head */}
      <circle cx="100" cy="95" r="50" fill="white" stroke="var(--color-primary)" strokeWidth="3" />

      {/* Party hat */}
      {variant === 'party' && (
        <g>
          <path d="M85 55 L115 55 L100 15 Z" fill="var(--color-primary)" />
          <circle cx="100" cy="15" r="5" fill="var(--color-pink)" />
          <circle cx="90" cy="45" r="3" fill="var(--color-pink)" />
          <circle cx="108" cy="40" r="3" fill="white" />
        </g>
      )}

      {/* Blush */}
      <ellipse cx="72" cy="105" rx="9" ry="6" fill="var(--color-pink-light)" />
      <ellipse cx="128" cy="105" rx="9" ry="6" fill="var(--color-pink-light)" />

      {/* Eyes */}
      <circle cx="82" cy="90" r="4.5" fill="#1F2937" />
      <circle cx="118" cy="90" r="4.5" fill="#1F2937" />

      {/* Nose + mouth */}
      <ellipse cx="100" cy="105" rx="6" ry="4" fill="#1F2937" opacity="0.85" />
      <path d="M92 112 Q100 118 108 112" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="100" cy="185" rx="48" ry="34" fill="white" stroke="var(--color-primary)" strokeWidth="3" />

      {/* Waving arm */}
      {variant === 'wave' ? (
        <g>
          <ellipse cx="145" cy="165" rx="12" ry="18" fill="white" stroke="var(--color-primary)" strokeWidth="3" transform="rotate(-30 145 165)" />
        </g>
      ) : (
        <ellipse cx="140" cy="182" rx="13" ry="17" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
      )}

      {/* Other arm (holds balloon string / gift / rests) */}
      <ellipse cx="60" cy="182" rx="13" ry="17" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
    </svg>
  )
}