let hasClientNavigated = false

function isDockLinkCurrent(href: string, pathname: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href)
}

function updateDockNav() {
  const pathname = window.location.pathname

  document.querySelectorAll<HTMLAnchorElement>('.site-dock-item[href]').forEach((link) => {
    const href = link.getAttribute('href')
    if (!href) return

    const current = isDockLinkCurrent(href, pathname)
    link.classList.toggle('is-current', current)
    if (current) {
      link.setAttribute('aria-current', 'page')
    } else {
      link.removeAttribute('aria-current')
    }
  })
}

function replaySlideEnter() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  document.querySelectorAll<HTMLElement>('.slide-enter-content > *').forEach((el) => {
    el.style.animation = 'none'
    void el.offsetHeight
    el.style.animation = ''
  })
}

function updateSliding() {
  const root = document.documentElement
  if (window.scrollY > 0) {
    root.classList.add('no-sliding')
  } else {
    root.classList.remove('no-sliding')
  }
}

export function initPageTransitions() {
  document.addEventListener('astro:before-preparation', () => {
    hasClientNavigated = true
    updateSliding()
  })

  document.addEventListener('astro:page-load', () => {
    updateDockNav()
    requestAnimationFrame(() => {
      updateSliding()
      if (!document.documentElement.classList.contains('no-sliding')) {
        replaySlideEnter()
      }
    })
  })
}

initPageTransitions()
