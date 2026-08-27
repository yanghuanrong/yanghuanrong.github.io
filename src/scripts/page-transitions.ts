let hasClientNavigated = false

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
    if (!hasClientNavigated) return
    requestAnimationFrame(updateSliding)
  })
}

initPageTransitions()
