<template>
  <div class="lastStepTitle" style="padding: 10px">
    <h3>Congratulations</h3>
    <h4>Now you’re one of us!</h4>
    <div>
      <i class="far fa-laugh-beam"></i>
    </div>
    <div class="redirected">
      <h4>Verify your Account</h4>
      <br>
      <div>Please check your email!</div>
      <span>
        We'll send a verification link to the email address you used to create the account.
      </span>
    </div>
    <el-button class="stepBtn" type="primary" @click="$router.push({name:'login'})">
      Redirected to signin page
    </el-button>
  </div>
</template>
