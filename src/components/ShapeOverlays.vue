<template>
  <svg class="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#00c99b" />
        <stop offset="100%" stop-color="#ff0ea1" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2af598" />
        <stop offset="100%" stop-color="#009efd" />
      </linearGradient>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#000" />
        <stop offset="100%" stop-color="000" />
      </linearGradient>
    </defs>
    <path class="shape-overlays__path"></path>
    <path class="shape-overlays__path"></path>
    <path class="shape-overlays__path"></path>
  </svg>
</template>

<script>
const ease = {
  exponentialIn: (t) => {
    return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
  },
  exponentialOut: (t) => {
    return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
  },
  exponentialInOut: (t) => {
    return t == 0.0 || t == 1.0
      ? t
      : t < 0.5
      ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
      : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
  },
  sineOut: (t) => {
    const HALF_PI = 1.5707963267948966;
    return Math.sin(t * HALF_PI);
  },
  circularInOut: (t) => {
    return t < 0.5
      ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
      : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  },
  cubicIn: (t) => {
    return t * t * t;
  },
  cubicOut: (t) => {
    const f = t - 1.0;
    return f * f * f + 1.0;
  },
  cubicInOut: (t) => {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: (t) => {
    return -t * (t - 2.0);
  },
  quarticOut: (t) => {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  },
};

class ShapeOverlays {
  constructor(elm) {
    this.elm = elm;
    this.path = elm.querySelectorAll('path');
    this.numPoints = 10;
    this.duration = 600;
    this.delayPointsArray = [];
    this.delayPointsMax = 300;
    this.delayPerPath = 250;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
  }
  toggle() {
    this.isAnimating = true;
    for (var i = 0; i < this.numPoints; i++) {
      this.delayPointsArray[i] = Math.random() * this.delayPointsMax;
    }
    if (this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }
  open() {
    this.isOpened = true;
    this.elm.classList.add('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  close() {
    this.isOpened = false;
    this.elm.classList.remove('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }
  updatePath(time) {
    const points = [];
    for (var i = 0; i < this.numPoints; i++) {
      points[i] =
        (1 -
          ease.cubicInOut(
            Math.min(
              Math.max(time - this.delayPointsArray[i], 0) / this.duration,
              1
            )
          )) *
        100;
    }

    let str = '';
    str += this.isOpened ? `M 0 0 V ${points[0]}` : `M 0 ${points[0]}`;
    for (var i = 0; i < this.numPoints - 1; i++) {
      const p = ((i + 1) / (this.numPoints - 1)) * 100;
      const cp = p - ((1 / (this.numPoints - 1)) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${
        points[i + 1]
      } `;
    }
    str += this.isOpened ? `V 100 H 0` : `V 0 H 0`;
    return str;
  }
  render() {
    if (this.isOpened) {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute(
          'd',
          this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i))
        );
      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute(
          'd',
          this.updatePath(
            Date.now() -
              (this.timeStart + this.delayPerPath * (this.path.length - i - 1))
          )
        );
      }
    }
  }
  renderLoop() {
    this.render();
    if (
      Date.now() - this.timeStart <
      this.duration +
        this.delayPerPath * (this.path.length - 1) +
        this.delayPointsMax
    ) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    } else {
      this.isAnimating = false;
    }
  }
}

export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      overlay: null,
    };
  },
  watch: {
    value() {
      this.overlay.toggle();
      setTimeout(() => {
        this.$emit('move');
      }, 500);
    },
  },
  mounted() {
    const elmOverlay = document.querySelector('.shape-overlays');
    this.overlay = new ShapeOverlays(elmOverlay);
  },
};
</script>

<style lang="less" scope>
.shape-overlays {
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.shape-overlays.is-opened {
  pointer-events: auto;
}

.shape-overlays__path:nth-of-type(1) {
  fill: var(--path-fill-1);
}

.shape-overlays__path:nth-of-type(2) {
  fill: var(--path-fill-2);
}
.shape-overlays__path:nth-of-type(3) {
  fill: var(--path-fill-3);
}

.shape-overlays__path:nth-of-type(4) {
  fill: var(--path-fill-4);
}

@keyframes intervalHamburgerBorder {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  80% {
    -webkit-transform: scale(1.6);
    transform: scale(1.6);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.6);
    transform: scale(1.6);
  }
}
</style>
