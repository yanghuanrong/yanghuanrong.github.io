<template>
  <div id="app">
    <div style="position: relative; z-index: 2">
      <Header />
      <transition name="fade" mode="out-in">
        <keep-alive include="blog">
          <router-view class="body"></router-view>
        </keep-alive>
      </transition>
      <Footer />
    </div>
    <canvas class="bg"></canvas>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    const colours = [
      '#2185C5',
      '#7ECEFD',
      '#FFF6E5',
      '#FF7F66',
      '#ff0ea1',
      '#2af598',
      '#00c99b',
    ]

    const limit = 100

    // Utility functions
    function setCanvasDimensions() {
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
    }

    function randomIntFromRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function randomColour() {
      return colours[randomIntFromRange(0, colours.length)]
    }

    function Particle({ x, y, velocity, radius, colour } = {}) {
      this.x = x
      this.y = y
      this.velocity = velocity || 0.0025
      this.radius = radius
      this.colour = randomColour()
      this.radians = Math.random() * Math.PI * 2
      this.distanceFromCenter = randomIntFromRange(10, 5000)
      this.lastMouse = { x: x, y: y }

      this.update = () => {
        const lastPoint = {
          x: this.x,
          y: this.y,
        }

        // Move points over time
        this.radians += this.velocity

        // Circular motion
        this.x =
          this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter
        this.y =
          this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter
        this.draw(lastPoint)
      }

      this.draw = (lastPoint) => {
        c.beginPath()
        c.strokeStyle = this.colour
        c.lineWidth = this.radius
        c.moveTo(lastPoint.x, lastPoint.y)
        c.lineTo(this.x, this.y)
        c.stroke()
        c.closePath()
      }
    }

    // Animation loop
    let particles = []

    function animate() {
      requestAnimationFrame(animate)
      c.fillStyle = 'rgba(0, 0, 0, 0.08)'
      c.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
      })
    }

    // Implementation
    function init() {
      setCanvasDimensions()

      particles = []

      for (let i = 0; i < limit; i++) {
        const particle = new Particle({
          x: canvas.width,
          y: 0,
          radius: Math.random() * 2 + 1,
        })

        particles.push(particle)
      }
      animate()
      c.clearRect(0, 0, canvas.width, canvas.height)
    }
    init()
  },
}
</script>

<style scoped>
.bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>
