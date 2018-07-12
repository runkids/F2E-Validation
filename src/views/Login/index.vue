<template>
  <div id="login">
    <git-hub-icon link="https://github.com/runkids/F2E-Validation"></git-hub-icon>
    <h3>Sign in with Firebase</h3>
    <h4>Glad to see you here!</h4>
    <div class="login-form">
      <el-form :model="form" status-icon :rules="loginRules" ref="loginForm" label-position="top">

          <el-form-item label="Email address" prop="account">
            <el-input type="email" v-model.lazy="form.account" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-button type="text" @click="forgetPassWord" style="float:right;">
              Forgot password?
            </el-button>
            <el-input type="password" v-model.lazy="form.password" auto-complete="off"></el-input>
          </el-form-item>

          <el-button class="signInBtn" type="success" @click="submitForm('loginForm')"
            v-loading.fullscreen.lock="isLoading"
            element-loading-text="Please Wait..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            Sign In
          </el-button>

      </el-form>
    </div>
    <div class="create-account-box">
      <span>New to Here?</span>
      <el-button type="text" @click="$router.push({name:'signUp'})" class='create-account-btn'>
        Create an account.
      </el-button>
    </div>
  </div>
</template>

<script>
import GitHubIcon from '@/components/GitHubIcon';
import validation from '@/config/validation';
import { validateAcc, validatePass } from '@/config/vaildationRules';
import { singIn, resetPassword } from '@/api/firebaseAuthAPI';

export default {
  components: {
    GitHubIcon,
  },

  data() {
    return {
      isLoading: false,
      form: {
        account: '',
        password: '',
      },
      loginRules: {
        account: [{ validator: validateAcc, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
      },
    };
  },

  methods: {

    submitForm(form) {
      // eslint-disable-next-line
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          window.scrollTo(0, 0);
          this.isLoading = true;
          const res = await singIn(this.form); // 驗證帳號密碼是否正確
          this.isLoading = false;
          if (res.message !== 'success') {
            this.$message({
              type: 'error',
              message: res.message,
            });
            this.form.password = ''; // 登入失敗，清空帳號密碼
            this.$refs[form].clearValidate(); // 移除表單的校驗結果
          } else {
            this.$router.replace({ name: 'home' }); // 登入成功轉到首頁
          }
        } else {
          return false;
        }
      });
    },

    forgetPassWord() {
      this.$prompt(
        'Enter your email address and we will send you a link to reset your password.',
        'Reset your password',
        {
          confirmButtonText: 'Send password reset email',
          cancelButtonText: 'Cancel',
          inputPattern: validation.email,
          inputErrorMessage: 'Invalid Email！',
        },
      ).then(async ({ value }) => {
        const res = await resetPassword(value);
        this.$message({
          type: 'warning',
          message: res.message,
        });
      });
    },

  },

};
</script>

<style lang="scss">
@import "../../assets/style/main.scss";

#login{
  > * {
    padding: 10px;
    font-family: 'Concert One', cursive;
  }
  @include size(420px,100%);
  color: $white_color;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
  animation: 1.5s loginLoading cubic-bezier(0.215, 0.61, 0.355, 1);

  h3{
    font-size: 30px;
    font-weight: 400;
  }

  h4{
    font-size: 20px;
    font-weight: 300;
  }

  .login-form{
    @include size(300px,100%);
    @include box(300px,#fff);

    .el-form-item__label{
      float: left;
      color: $black_color;
      font-size: 15px;
    }

    .el-button{
      font-family: 'Concert One', cursive;
    }

    .signInBtn{
      transition-duration: 1s;
      width: 300px;
      margin-top: 20px;
      >span{ //Sign In Button Text
        font-size: 18px;
        letter-spacing: 1px;
      }
      &:hover{
        transition-duration: 1s;
        background-color: #47b784;
      }
    }
  }

  .create-account-box{
    @include size(300px,100%);
    @include box(300px,#334056);
    >.create-account-btn{
      font-size: 16px;
      color:#69B3FC;
      font-family: 'Concert One', cursive;
    }
  }
}
.el-message-box__wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
