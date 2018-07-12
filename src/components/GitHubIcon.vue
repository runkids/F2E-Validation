<template>
  <div class='github'>
    <a :href="link" target="_blank"><i class="fab fa-github"></i></a>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
$main-color: #fff;
$animation-color: black;
.github{
  font-size: 45px;
  a{
    color: $main-color;
    &:visited{
      color: $main-color;
    }
  }
  i{
    cursor: pointer;
    &:hover{
      animation: .8s github alternate infinite;
    }
  }
  @keyframes github{
    0%{
      transform: translateX(-1px);
      color: $animation-color;
    }
    25%{
      transform: translateX(0px);
    }
    50%{
      transform: translateX(1px);
    }
    100%{
      transform: translateX(0px);
      color: $main-color;
    }
  }
}
</style>
