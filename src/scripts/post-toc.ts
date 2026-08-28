export type TocHeading = {
  depth: number
  slug: string
  text: string
}

type TocItem = {
  depth: number
  slug: string
  text: string
}

const GAP_ROWS = 2

function gapCount() {
  return GAP_ROWS
}

function countTextLines(probe: HTMLElement, text: string, maxWidth: number, bold = false) {
  if (!text) return 1
  if (maxWidth <= 0) return 1

  probe.style.maxWidth = `${maxWidth}px`
  probe.style.fontWeight = bold ? '600' : '400'
  probe.textContent = text

  const lineHeight = parseFloat(getComputedStyle(probe).lineHeight) || 14
  const height = probe.getBoundingClientRect().height
  return Math.max(1, Math.round(height / lineHeight))
}

function getTextColumnWidth(list: HTMLElement) {
  const styles = getComputedStyle(list)
  const columns = styles.gridTemplateColumns.split(' ')
  const tickCol = parseFloat(columns[0]) || 18
  const gap = parseFloat(styles.columnGap) || 8
  const translateReserve = 12
  return Math.max(1, list.clientWidth - tickCol - gap - translateReserve)
}

function createTick(row: number, slug: string | null, lineIndex: number | null, activeSlug: string) {
  const tick = document.createElement('li')
  tick.className = 'post-toc-tick'
  tick.style.gridRow = String(row)
  if (slug) tick.dataset.slug = slug
  if (lineIndex !== null) tick.dataset.line = String(lineIndex)

  if (slug === activeSlug) {
    tick.classList.add(lineIndex === 0 ? 'is-active-first' : 'is-active-cont')
  }

  return tick
}

function createEntry(row: number, span: number, item: TocItem, activeSlug: string) {
  const entry = document.createElement('li')
  entry.className = 'post-toc-entry'
  entry.dataset.slug = item.slug
  entry.style.gridRow = `${row} / span ${span}`
  if (item.slug === activeSlug) entry.classList.add('is-active')

  const href = item.slug === 'top' ? '#top' : `#${item.slug}`
  entry.innerHTML = `<a href="${href}"><span class="post-toc-text"></span></a>`
  entry.querySelector('.post-toc-text')!.textContent = item.text
  return entry
}

function rebuildTocLayout(nav: HTMLElement, activeSlug: string) {
  const raw = nav.dataset.tocItems
  const list = nav.querySelector<HTMLOListElement>('.post-toc-list')
  if (!raw || !list) return activeSlug

  let items: TocItem[]
  try {
    items = JSON.parse(raw)
  } catch {
    return activeSlug
  }

  if (items.length === 0) return activeSlug

  const measureRoot = document.createElement('li')
  measureRoot.className = 'post-toc-entry'
  measureRoot.style.cssText =
    'position:absolute;visibility:hidden;pointer-events:none;grid-column:2;width:100%;padding-right:12px;box-sizing:border-box;'
  measureRoot.innerHTML = '<a><span class="post-toc-text"></span></a>'
  list.appendChild(measureRoot)

  const probe = measureRoot.querySelector<HTMLElement>('.post-toc-text')!
  const textWidth = getTextColumnWidth(list)
  const nodes: HTMLElement[] = []
  let row = 1

  for (let index = 0; index < items.length; index++) {
    const item = items[index]

    if (index > 0) {
      const gaps = gapCount()
      for (let i = 0; i < gaps; i++) {
        nodes.push(createTick(row, null, null, activeSlug))
        row++
      }
    }

    const lineCount = countTextLines(probe, item.text, textWidth, true)

    for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
      nodes.push(createTick(row + lineIndex, item.slug, lineIndex, activeSlug))
    }

    nodes.push(createEntry(row, lineCount, item, activeSlug))
    row += lineCount
  }

  measureRoot.remove()
  list.replaceChildren(...nodes)
  return activeSlug
}

function applyActive(toc: HTMLElement, activeSlug: string) {
  for (const tick of toc.querySelectorAll<HTMLElement>('.post-toc-tick')) {
    const slug = tick.dataset.slug
    const lineIndex = Number(tick.dataset.line ?? 0)
    tick.classList.remove('is-active-first', 'is-active-cont')
    if (slug === activeSlug) {
      tick.classList.add(lineIndex === 0 ? 'is-active-first' : 'is-active-cont')
    }
  }

  for (const entry of toc.querySelectorAll<HTMLElement>('.post-toc-entry')) {
    entry.classList.toggle('is-active', entry.dataset.slug === activeSlug)
  }
}

export function initPostToc() {
  const toc = document.querySelector<HTMLElement>('.post-toc')
  if (!toc) return

  const nav = toc.querySelector<HTMLElement>('.post-toc-nav')
  if (!nav) return

  const topButton = toc.querySelector<HTMLElement>('.post-toc-top')
  const backButton = toc.querySelector<HTMLElement>('.post-toc-back')

  const onBackClick = () => {
    const before = location.href
    history.back()
    window.setTimeout(() => {
      if (location.href === before) location.assign('/')
    }, 300)
  }

  backButton?.addEventListener('click', onBackClick)

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const updateTopButtonVisibility = () => {
    if (!topButton) return

    const shouldShow = window.scrollY >= window.innerHeight

    if (prefersReducedMotion()) {
      topButton.classList.remove('is-leaving')
      topButton.classList.toggle('is-visible', shouldShow)
      return
    }

    if (shouldShow) {
      topButton.classList.remove('is-leaving')
      topButton.classList.add('is-visible')
      return
    }

    if (!topButton.classList.contains('is-visible') || topButton.classList.contains('is-leaving')) {
      return
    }

    topButton.classList.remove('is-visible')
    topButton.classList.add('is-leaving')
  }

  const onTopAnimationEnd = (event: AnimationEvent) => {
    if (event.target !== topButton || event.animationName !== 'slide-exit') return
    topButton.classList.remove('is-leaving')
  }

  const onTopClick = () => {
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  topButton?.addEventListener('click', onTopClick)
  topButton?.addEventListener('animationend', onTopAnimationEnd)

  let activeSlug = 'top'
  try {
    activeSlug = JSON.parse(nav.dataset.tocItems || '[]')[0]?.slug ?? 'top'
  } catch {
    /* keep default */
  }

  activeSlug = rebuildTocLayout(nav, activeSlug)

  const slugToElement = new Map<string, HTMLElement>()
  for (const entry of toc.querySelectorAll<HTMLElement>('.post-toc-entry')) {
    const slug = entry.dataset.slug
    if (!slug) continue
    const el = slug === 'top' ? document.getElementById('top') : document.getElementById(slug)
    if (el) slugToElement.set(slug, el)
  }

  if (slugToElement.size === 0) {
    window.addEventListener('scroll', updateTopButtonVisibility, { passive: true })
    updateTopButtonVisibility()

    return () => {
      backButton?.removeEventListener('click', onBackClick)
      topButton?.removeEventListener('click', onTopClick)
      topButton?.removeEventListener('animationend', onTopAnimationEnd)
      window.removeEventListener('scroll', updateTopButtonVisibility)
    }
  }

  const sections = [...slugToElement.entries()]
    .map(([slug, el]) => ({ slug, el }))
    .sort((a, b) => a.el.offsetTop - b.el.offsetTop)

  const setActive = (slug: string) => {
    if (slug === activeSlug) return
    activeSlug = slug
    applyActive(toc, slug)
  }

  const updateActiveOnScroll = () => {
    const offset = 96
    let current = sections[0]?.slug ?? 'top'

    for (const section of sections) {
      if (section.el.getBoundingClientRect().top <= offset) {
        current = section.slug
      }
    }

    setActive(current)
    updateTopButtonVisibility()
  }

  const onNavClick = (event: Event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
    if (!link) return

    event.preventDefault()
    const hash = link.getAttribute('href')?.slice(1)
    if (!hash) return

    if (hash === 'top') {
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive('top')
      return
    }

    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(hash)
  }

  nav.addEventListener('click', onNavClick)
  window.addEventListener('scroll', updateActiveOnScroll, { passive: true })
  updateActiveOnScroll()

  let resizeTimer = 0
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      rebuildTocLayout(nav, activeSlug)
      applyActive(toc, activeSlug)
      updateTopButtonVisibility()
    }, 120)
  }

  const resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(nav)

  return () => {
    resizeObserver.disconnect()
    nav.removeEventListener('click', onNavClick)
    backButton?.removeEventListener('click', onBackClick)
    topButton?.removeEventListener('click', onTopClick)
    topButton?.removeEventListener('animationend', onTopAnimationEnd)
    window.removeEventListener('scroll', updateActiveOnScroll)
    window.clearTimeout(resizeTimer)
  }
}

let cleanup: (() => void) | undefined

function mountPostToc() {
  cleanup?.()
  cleanup = initPostToc()
}

document.addEventListener('astro:page-load', mountPostToc)
mountPostToc()
