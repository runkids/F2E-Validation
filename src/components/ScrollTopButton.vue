<template>
  <div>
    <button class='toTop' v-if="!isTop" @click="scrollToTop(1000);"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointer: null,
    };
  },
  methods: {
    scrollToTop(scrollDuration) {
      const cosParameter = window.scrollY / 2;
      let scrollCount = 0;
      let oldTimestamp = performance.now();
      function step(newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + (cosParameter * Math.cos(scrollCount))));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    },
    checkPoint() {
      this.pointer = window.scrollY;
    },
  },
  computed: {
    isTop() {
      return this.pointer < 250;
    },
  },

  created() {
    window.addEventListener('scroll', this.checkPoint);
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkPoint);
  },
};
</script>

<style lang="scss">
  .toTop{
    z-index: 99;
    height: 55px;
    width: 55px;
    position: fixed;
    border: rgba(0, 0, 0, 0.658);
    background-color: rgba(0, 0, 0, 0.658);
    color: white;
    border-radius: 100px;
    right: 10px;
    bottom: 100px;
    cursor: pointer;
    outline: 0;
    &::after{
      content: '';
      display: block;
      width: 10px;
      height: 25px;
      border: 2px solid white;
      border-radius: 10px;
      margin: 0 auto;
    }
    &::before{
      content: '';
      display: block;
      width: 0px;
      height: 10px;
      border: 1px solid white;
      border-radius: 10px;
      left: 49%;
      position: absolute;
      animation: 2s top infinite;
    }
    @keyframes top {
      0%{
        opacity: 0;
        transform: translateY(10px);
      }
      100%{
         opacity: 1;
        transform: translateY(0px);
      }
    }
  }
  @media screen and (max-width: 450px){
    .toTop{
      bottom: 10px;
      transform: translateX(5px) scale(0.7);
    }
  }
</style>
