<template>
  <div class="header" :class="{ fixed: fixed}" >
    <header class="topbar">
      <div class="logo" @click="logoTap">
        <a key="back">贝贝的HTML</a>
      </div>
      <div class="menutoggle" @click="menuTap" ref="close" id="menus1" :class="{ open: menu }">
        <span>
          <i></i>
        </span>
        <span>
          <i></i>
        </span>
      </div>
    </header>


    <div class="menu" :class="{open: menu}">
      
    <svg class="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#00c99b"/>
          <stop offset="100%" stop-color="#ff0ea1"/>
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#2af598"/>
          <stop offset="100%" stop-color="#009efd"/>
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#000"/>
          <stop offset="100%"   stop-color="000"/>
        </linearGradient>
      </defs>
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
      <path class="shape-overlays__path"></path>
    </svg>
    
      <div class="container flex flex-column">
        <div class="splitter">
          <span>Contents</span>
        </div>
        <a
          v-for="(item, i) in nav"
          @click="router(item, i)"
          :class="{active: active === i}"
          :key="item.name"
        >
          <span>{{item.name}}</span>
          <div class="arrow">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              height="48"
              width="48"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            >
              <path stroke="currentColor" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      menu: false,
      active: null,
      isDetial: false,
      nav: [
        {
          path: "/blog",
          name: "博客文章",
        },
        {
          path: "/about",
          name: "关于",
        },
      ],
    };
  },
  watch:{
    $route(to,from){
      setTimeout(() => {
        this.isDetial = to.name === 'detail'
      }, 1000)
    }
  },
  mounted() {
    window.addEventListener("scroll", this.isFixed, false);


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
        ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
        : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
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
    return t < 0.5
      ? 4.0 * t * t * t
      : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: (t) => {
    return -t * (t - 2.0);
  },
  quarticOut: (t) => {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  },
}

    class ShapeOverlays {
  constructor(elm) {
    this.elm = elm;
    this.path = elm.querySelectorAll('path');
    this.numPoints = 10;
    this.duration = 900;
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
      points[i] = (1 - ease.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 V ${points[0]}` : `M 0 ${points[0]}`;
    for (var i = 0; i < this.numPoints - 1; i++) {
      const p = (i + 1) / (this.numPoints - 1) * 100;
      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (this.isOpened) ? `V 100 H 0` : `V 0 H 0`;
    return str;
  }
  render() {
    if (this.isOpened) {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }
  renderLoop() {
    this.render();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    }
    else {
      this.isAnimating = false;
    }
  }
}

(function() {
  const elmHamburger = document.querySelector('#menus1');
  const gNavItems = document.querySelectorAll('.global-menu__item');
  const elmOverlay = document.querySelector('.shape-overlays');
  const overlay = new ShapeOverlays(elmOverlay);

  elmHamburger.addEventListener('click', () => {
    if (overlay.isAnimating) {
      return false;
    }
    overlay.toggle();
    if (overlay.isOpened === true) {
    } else {
    }
  });
  
}());


  },
  methods: {
    logoTap(){
      if (this.$route.path === '/') return;

      if (this.isDetial){
        this.$router.back(-1)
      } else {
        this.$router.push('/');
      }
    },
    router(item, i) {
      if (this.$route.path === item.path) return;

      this.active = i;
      setTimeout(() => {
        this.menuTap();
        this.$router.push(item.path);
      }, 800);
    },
    isFixed() {
      this.fixed = window.pageYOffset >= 80 ? true : false;
    },
    menuTap() {
      this.menu = !this.menu;

      if (this.menu) {
        this.active = null;
        this.$refs.close.style.top = this.fixed ? "80px" : "0";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
        this.$refs.close.style.top = 0;
      }
    },
  },
};
</script>

<style scoped lang="less">


.shape-overlays {
	width: 100vw;
	height: 100vh;
	pointer-events: none;
	position: fixed;
	top: 0;
	left: 0;
	
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

@-webkit-keyframes intervalHamburgerBorder {
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



.header{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

.topbar {
  padding: 40px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-family: 'calibre bold';
    height: 30px;
    overflow: hidden;;
    a {
      cursor: pointer;
      font-weight: bold;
      position: relative;

      &:hover {
        color: #0085ff;
      }
    }
  }

  .menutoggle {
    width: 40px;
    height: 40px;
    position: relative;
    cursor: pointer;
    z-index: 2;
    transition: all .4s ease;

    &.open {
      span {
        i{
          background: #FFF;
        }
        &:nth-of-type(1) {
          transform: rotate(45deg);
          i {
            width: 60%;
            transform: translate(-50%, 5px);
          }
        }

        &:nth-of-type(2) {
          transform: rotate(-45deg);
          i {
            transform: translate(-50%, -5px);
          }
        }
      }
    }

    span {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transition: ease all .4s;
      transform: rotate(-180deg);

      i {
        width: 60%;
        height: 3px;
        position: absolute;
        display: block;
        background: currentColor;
        transition: ease all .4s .1s;
        left: 50%;
        transform: translateX(-50%);
      }

      &:nth-of-type(1) {
        transform: rotate(-180deg);
        i {
          width: 30%;
          top: 35%;
          transform: translateX(-90%);
        }
      }

      &:nth-of-type(2) {
        i {
          bottom: 35%;
        }
      }
    }

  }
}

  .menu{
    background-color: #000;
    position: fixed;
    z-index: 1;
    height: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 100%;

    align-items: center;
    overflow: hidden;
    transform: translateZ(0);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    transition: all .45s ease-in-out;
    transition-property: border-radius,top;
    top: -100%;

    &.open{
      top: 0;
      border-radius: 0;

      a{
        &:nth-of-type(1){
          animation: nav-menu 0.6s 0.4s 1;
          animation-fill-mode: forwards;
        }
        &:nth-of-type(2){
          animation: nav-menu 0.6s 0.6s 1;
          animation-fill-mode: forwards;
        }
      }
      .splitter{
        animation: nav-split 0.6s 0.8s 1;
        animation-fill-mode: forwards;
      }
    }

    a{
      position: relative;
      width: fit-content;
      color: #fff;
      display: flex;
      font-size: 36px;
      line-height: 44px;
      cursor: pointer;
      opacity: 0;
     
      &+a{
        margin-top: 40px;
      }

      &:hover{
        span{
          left: 24px;
        }
        .arrow{
          padding-left: 32px;
          opacity: 1;
        }
      }

      &.active{
        span{
          animation: nav-menu-click 0.8s 0s 1;
          animation-fill-mode: forwards;
        }
        .arrow{
          animation: nav-menu-click 0.4s 0s 1;
          animation-fill-mode: forwards;
        }
      }

      span{
        position: relative;
        -webkit-transition: left .14s ease-in-out;
        transition: left .14s ease-in-out;
        left: 0;
      }

      .arrow{
        display: flex;
        position: relative;
        padding-left: 16px;
        -webkit-transform: scale(.8);
        transform: scale(.8);
        transition: all .14s ease-in-out;
        transition-property: transform,padding-left,opacity;
        opacity: .32;
      }
    }

    .splitter{
      margin-bottom: 48px;
      position: relative;
      opacity: 0;
      &::before{
        content: " ";
        margin-right: 12px;
        display: flex;
        width: 24px;
        height: 2px;
        background-color: fade(#FFF, 30%);
      }
      span{
        display: flex;
        font-size: 14px;
        flex-shrink: 0;
        margin-right: 16px;
        font-weight: 500;
        letter-spacing: 1.6px;
      }
    }

  }
}

</style>