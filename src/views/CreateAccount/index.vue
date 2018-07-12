<template>
  <div class="signUp">
    <el-steps :active="getStepActive" simple class='steps' finish-status="success">
      <el-step title="Step1"></el-step>
      <el-step title="Step2"></el-step>
      <el-step title="Step3"></el-step>
    </el-steps>
    <div class="formArea">

      <div class="step-one">
        <step-one></step-one>
      </div>

      <div class="step-two notShow" >
        <step-two></step-two>
      </div>

      <div class="step-three notShow" >
        <step-three></step-three>
      </div>

      <div class="lastStep notShow">
        <last-step></last-step>
      </div>

    </div>
  </div>
</template>

<script>
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import LastStep from './lastStep';
import mixins from './mixins';

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    LastStep,
  },

  mixins: [mixins],

  mounted() {
    this.initStepActive();
  },
};
</script>

<style lang="scss">

@import "../../assets/style/main.scss";

.signUp{
  font-family: 'Concert One', cursive;
  .steps{
    width:300px;
    margin:0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .stepBtn{
    font-family: 'Concert One', cursive;
    width: 300px;
    margin-top: 20px;
  }
  .formArea{
    > * {
      @include size(300px,100%);
      @include box(300px,$white_color);
      min-height: 200px;
    }
  }
  h3{
    font-size: 30px;
    color: #0275D8 ;
    text-align: center;
  }

  h4{
    font-size: 20px;
    color: $black_color;
    text-align: center;
  }
  .lastStepTitle{
    text-align: center;
    .far{
      margin: 20px;
      color: $hover_color;
      font-size: 50px;
    }
    .redirected{
      color:#0275D8;
    }
  }
  .notShow{
    display: none;
  }
  .nextStep{
    transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    animation: 2s nextStep;
  }
}
</style>

