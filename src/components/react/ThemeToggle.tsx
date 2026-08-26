import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(readTheme())
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  const label = theme === 'dark' ? '浅色' : '深色'

  return (
    <button
      type="button"
      className="site-dock-item theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? '切换为浅色' : '切换为深色'}
      data-tooltip={label}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 3.5v2.2M12 18.3v2.2M4.7 4.7l1.55 1.55M17.75 17.75l1.55 1.55M3.5 12h2.2M18.3 12h2.2M4.7 19.3l1.55-1.55M17.75 6.25l1.55-1.55"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M16.4 14.6A6.6 6.6 0 0 1 9.4 7.6a6.75 6.75 0 1 0 7 7Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
