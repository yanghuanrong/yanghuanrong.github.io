<template>
  <footer class="footer">
    <div class="status">
      中国JavaScript高端玩家
    </div>
    <div class="socialicons">
      <!-- <a @click="setToggle">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 36 36" height="20"
          width="20"> <path d="M18,0C8.1,0,0,8.1,0,18c0,9.9,8.1,18,18,18c9.9,0,18-8.1,18-18C36,8.1,27.9,0,18,0z M18,32V4 c7.7,0,14,6.3,14,14C32,25.7,25.7,32,18,32z"></path> </svg>
      </a> -->
      <a href="weixin://">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="20"
          width="20"
          stroke="currentColor"
          stroke-width="0"
          stroke-linejoin="round"
          stroke-linecap="round"
        >
          <path
            d="M693.12 347.264c11.776 0 23.36 0.896 35.008 2.176-31.36-146.048-187.456-254.528-365.696-254.528C163.2 94.912 0 230.656 0 403.136c0 99.52 54.272 181.248 145.024 244.736L108.8 756.864l126.72-63.488c45.312 8.896 81.664 18.112 126.912 18.112 11.392 0 22.656-0.512 33.792-1.344-7.04-24.256-11.2-49.6-11.2-76.032C385.088 475.776 521.024 347.264 693.12 347.264zM498.304 249.024c27.392 0 45.376 17.984 45.376 45.248 0 27.136-17.984 45.312-45.376 45.312-27.072 0-54.336-18.176-54.336-45.312C443.968 266.944 471.168 249.024 498.304 249.024zM244.672 339.584c-27.2 0-54.592-18.176-54.592-45.312 0-27.264 27.392-45.248 54.592-45.248S289.92 266.944 289.92 294.272C289.92 321.408 271.872 339.584 244.672 339.584zM1024 629.76c0-144.896-145.024-262.976-307.904-262.976-172.48 0-308.224 118.144-308.224 262.976 0 145.28 135.808 262.976 308.224 262.976 36.096 0 72.512-9.024 108.736-18.112l99.392 54.528-27.264-90.624C969.728 783.872 1024 711.488 1024 629.76zM616.128 584.384c-17.984 0-36.224-17.92-36.224-36.224 0-18.048 18.24-36.224 36.224-36.224 27.52 0 45.376 18.176 45.376 36.224C661.504 566.464 643.648 584.384 616.128 584.384zM815.488 584.384c-17.856 0-36.032-17.92-36.032-36.224 0-18.048 18.112-36.224 36.032-36.224 27.264 0 45.376 18.176 45.376 36.224C860.864 566.464 842.752 584.384 815.488 584.384z"
          />
        </svg>
      </a>

      <a href="https://github.com/yanghuanrong" target="_blank">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          height="20"
          width="20"
          stroke="currentColor"
          stroke-width="0"
          stroke-linejoin="round"
          stroke-linecap="round"
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      </a>
    </div>
  </footer>
</template>

<script>
const DARK = 'dark'
const LIGHT = 'light'

export default {
  data(){
    const theme = localStorage.getItem('color-mode')
    return {
      toggle: theme === DARK
    }
  },
  mounted(){
    localStorage.setItem('color-mode', DARK)
    document.documentElement.setAttribute('data-color-mode', DARK)
  },
  methods: {
    setToggle(){
      if (this.toggle) {
        localStorage.setItem('color-mode', DARK)
        document.documentElement.setAttribute('data-color-mode', DARK)
      } else {
        localStorage.setItem('color-mode', LIGHT)
        document.documentElement.setAttribute('data-color-mode', LIGHT)
      }
      this.toggle = !this.toggle
    }
  }
}
</script>
