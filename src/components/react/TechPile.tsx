import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

export type TechIconItem = {
  name: string
  src: string
}

type Props = {
  icons: readonly TechIconItem[]
}

const ICON_SIZE = 44
const WALL = 80

export default function TechPile({ icons }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || icons.length === 0) return

    const nodes = icons.map((icon) => {
      const el = document.createElement('button')
      el.type = 'button'
      el.className = 'tech-pile-icon'
      el.setAttribute('aria-label', icon.name)
      el.title = icon.name
      const img = document.createElement('img')
      img.src = icon.src
      img.alt = ''
      img.draggable = false
      el.appendChild(img)
      scene.appendChild(el)
      return el
    })

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      scene.classList.add('is-static')
      return () => nodes.forEach((el) => el.remove())
    }

    const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Events, Runner, Composite } = Matter

    let width = Math.max(scene.clientWidth, 320)
    let height = Math.max(scene.clientHeight, 240)

    const engine = Engine.create({
      gravity: { x: 0, y: 1.1, scale: 0.001 },
    })
    const runner = Runner.create()
    const world = engine.world

    const makeWalls = (w: number, h: number) => [
      // Floor / ceiling / sides sit on the canvas edges so throws stay visible
      Bodies.rectangle(w / 2, h + WALL / 2, w + WALL * 4, WALL, { isStatic: true }),
      Bodies.rectangle(w / 2, -WALL / 2, w + WALL * 4, WALL, {
        isStatic: true,
        restitution: 0.42,
        friction: 0.05,
      }),
      Bodies.rectangle(-WALL / 2, h / 2, WALL, h * 4, { isStatic: true }),
      Bodies.rectangle(w + WALL / 2, h / 2, WALL, h * 4, { isStatic: true }),
    ]

    let walls = makeWalls(width, height)
    World.add(world, walls)

    const bodies = icons.map((_, index) => {
      const x = ICON_SIZE + Math.random() * Math.max(width - ICON_SIZE * 2, 40)
      // Start inside the canvas (below the ceiling) so the rain-in still works
      const y = ICON_SIZE / 2 + 12 + (index % 6) * 18 + Math.random() * 36
      return Bodies.rectangle(x, y, ICON_SIZE, ICON_SIZE, {
        chamfer: { radius: 10 },
        restitution: 0.26,
        friction: 0.42,
        frictionAir: 0.018,
        density: 0.0024,
        angle: (Math.random() - 0.5) * 0.6,
      })
    })
    World.add(world, bodies)

    const mouse = Mouse.create(scene)
    // Matter binds `wheel` with preventDefault — that blocks page scroll over the pile.
    mouse.element.removeEventListener('wheel', mouse.mousewheel)

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.12,
        render: { visible: false },
      },
    })
    World.add(world, mouseConstraint)

    // Touch handlers also call preventDefault; only keep that while dragging an icon.
    let dragging = false
    const mutePreventDefault = (event: Event, allow: boolean) => {
      if (allow) return
      const original = event.preventDefault.bind(event)
      event.preventDefault = () => undefined
      return original
    }
    const restorePreventDefault = (event: Event, original?: () => void) => {
      if (original) event.preventDefault = original
    }

    mouse.element.removeEventListener('touchmove', mouse.mousemove)
    mouse.element.removeEventListener('touchstart', mouse.mousedown)
    mouse.element.removeEventListener('touchend', mouse.mouseup)

    const onTouchStart = (event: Event) => {
      const restored = mutePreventDefault(event, false)
      mouse.mousedown(event)
      const hit = Matter.Query.point(bodies, mouse.position).length > 0
      restorePreventDefault(event, restored)
      if (hit) {
        mouse.button = 0
        event.preventDefault()
      } else {
        mouse.button = -1
      }
    }
    const onTouchMove = (event: Event) => {
      const restored = mutePreventDefault(event, dragging)
      mouse.mousemove(event)
      restorePreventDefault(event, restored)
      if (dragging) event.preventDefault()
    }
    const onTouchEnd = (event: Event) => {
      const restored = mutePreventDefault(event, false)
      mouse.mouseup(event)
      restorePreventDefault(event, restored)
    }

    mouse.element.addEventListener('touchstart', onTouchStart, { passive: false })
    mouse.element.addEventListener('touchmove', onTouchMove, { passive: false })
    mouse.element.addEventListener('touchend', onTouchEnd, { passive: true })

    Events.on(mouseConstraint, 'startdrag', () => {
      dragging = true
      scene.classList.add('is-dragging')
    })
    Events.on(mouseConstraint, 'enddrag', (event) => {
      dragging = false
      scene.classList.remove('is-dragging')
      const body = (event as { body?: Matter.Body }).body
      if (!body) return
      Body.setVelocity(body, {
        x: body.velocity.x * 1.4,
        y: Math.min(body.velocity.y * 1.25, 20),
      })
      Body.setAngularVelocity(body, body.angularVelocity + body.velocity.x * 0.0025)
    })

    const keepInView = () => {
      const pad = ICON_SIZE / 2
      for (const body of bodies) {
        let { x, y } = body.position
        let { x: vx, y: vy } = body.velocity
        let moved = false
        if (y < pad) {
          y = pad
          if (vy < 0) vy = -vy * 0.45
          moved = true
        } else if (y > height - pad) {
          y = height - pad
          if (vy > 0) vy = 0
          moved = true
        }
        if (x < pad) {
          x = pad
          if (vx < 0) vx = -vx * 0.45
          moved = true
        } else if (x > width - pad) {
          x = width - pad
          if (vx > 0) vx = -vx * 0.45
          moved = true
        }
        if (!moved) continue
        Body.setPosition(body, { x, y })
        Body.setVelocity(body, { x: vx, y: vy })
      }
    }

    const sync = () => {
      keepInView()
      for (let i = 0; i < bodies.length; i += 1) {
        const body = bodies[i]
        const el = nodes[i]
        if (!body || !el) continue
        el.style.transform = `translate3d(${body.position.x - ICON_SIZE / 2}px, ${body.position.y - ICON_SIZE / 2}px, 0) rotate(${body.angle}rad)`
      }
    }

    Events.on(engine, 'afterUpdate', sync)
    Runner.run(runner, engine)
    sync()

    const onResize = () => {
      const nextW = Math.max(scene.clientWidth, 320)
      const nextH = Math.max(scene.clientHeight, 240)
      if (Math.abs(nextW - width) < 2 && Math.abs(nextH - height) < 2) return
      width = nextW
      height = nextH
      World.remove(world, walls)
      walls = makeWalls(width, height)
      World.add(world, walls)
      for (const body of bodies) {
        const x = Math.min(Math.max(body.position.x, ICON_SIZE / 2), width - ICON_SIZE / 2)
        const y = Math.min(Math.max(body.position.y, ICON_SIZE / 2), height - ICON_SIZE / 2)
        Body.setPosition(body, { x, y })
      }
    }

    const ro = new ResizeObserver(onResize)
    ro.observe(scene)

    return () => {
      ro.disconnect()
      Runner.stop(runner)
      Events.off(engine, 'afterUpdate', sync)
      mouse.element.removeEventListener('touchstart', onTouchStart)
      mouse.element.removeEventListener('touchmove', onTouchMove)
      mouse.element.removeEventListener('touchend', onTouchEnd)
      Composite.clear(world, false)
      Engine.clear(engine)
      Mouse.clearSourceEvents(mouse)
      nodes.forEach((el) => el.remove())
      scene.classList.remove('is-dragging')
    }
  }, [icons])

  return <div ref={sceneRef} className="tech-pile-scene" aria-label="技术栈" />
}
