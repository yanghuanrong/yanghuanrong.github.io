import { useEffect, useRef } from 'react'

export default function InkCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let frame = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const tick = () => {
      x += (targetX - x) * 0.16
      y += (targetY - y) * 0.16
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="ink-cursor" aria-hidden="true" />
}
