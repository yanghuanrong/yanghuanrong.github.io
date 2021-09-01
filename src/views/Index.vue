<template>
  <div class="home-view">
    <div class="banner">
      <div class="slogan">
        <div class="sectionheader flex flex-column">
          <h3>
            记忆中的声音
          </h3>
          <p>
            剑气如虹向天而挥，金钩舞动向死而生
          </p>
        </div>
      </div>
      <div id="siri-container"></div>
      <router-link to="blog">
        <button class="btn" v-hover>进入</button>
      </router-link>
      <div class="tips">
        无意间闯入时光的深处，潮湿的青春岁月，站在你我来时的路上，遥望前尘往事，几多悲喜彷徨，十年前，十年后。<br />
        如若这一生都在漂泊中度过，时光是否记得我来过。<br />
      </div>
    </div>
  </div>
</template>

<script>
import SiriWave from 'siriwave';
let siri;
export default {
  name: 'Home',
  mounted() {
    siri = new SiriWave({
      container: document.getElementById('siri-container'),
      height: 200,
      color: '#C1CFC0',
      speed: 0.05,
      style: 'ios9',
      lerpSpeed: 0.4,
      curveDefinition: [
        { color: '0,0,0', supportLine: true },
        { color: '15, 82, 169' }, // 蓝色
        { color: '173, 57, 76' }, // 红色
        { color: '48, 220 , 155' }, // 绿色
      ],
    });

    // let i = 0;
    // setInterval(() => {
    //   i++;
    //   sirw.setAmplitude(i);
    // }, 1000);
  },
  destroyed() {
    siri.dispose();
    siri = null;
  },
  methods: {
    to() {
      this.$router.push('about');
    },
  },
};
</script>
