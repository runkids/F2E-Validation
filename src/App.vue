<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang='scss'>
@import './assets/style/main.scss';
  html,body{
    @include size(100%,100%);
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1px;
    background-color: $bg_color;
  }
  .el-form-item.is-error {
    .el-input__validateIcon,.el-input__inner{
      border-color: $error_color;
      color:  $error_color;
    }
  }
  .el-form-item__error{
    color:  $error_color;
  }
</style>
