<template>
  <div id='stepOne'  v-loading="isLoading" element-loading-text="Please Wait...">
    <div class="title" style="padding: 10px">
      <h3>Create Account</h3>
      <h4>Glad to see you here!</h4>
    </div>
    <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-position="top">
      <el-form-item prop="account" label="Account">
        <el-input type="text" placeholder="E-MAIL"
                  v-model.lazy="registerForm.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input type="password" placeholder="Password"
                  v-model.lazy="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="checkpass" label="Comfirm Password">
        <el-input type="password" placeholder="Comfirm Password"
                  v-model.lazy="registerForm.checkpass" auto-complete="off"></el-input>
      </el-form-item>
      <el-button class="stepBtn" type="primary" @click="submitForm('registerForm')">
        SUBMIT & NEXT
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validateAcc, validatePass } from '@/config/vaildationRules';
import { singUp, singIn } from '@/api/firebaseAuthAPI';
import mixins from './mixins';

export default {
  mixins: [mixins],
  data() {
    const validateCheckpass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please Enter Passwrod Again'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('Passwrod Not Match'));
      } else {
        callback();
      }
    };
    return {
      isLoading: false,
      registerForm: {
        account: '',
        password: '',
        checkpass: '',
      },
      registerRules: {
        account: [{ validator: validateAcc, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkpass: [{ validator: validateCheckpass, trigger: 'blur' }],
      },
    };
  },

  methods: {

    submitForm(form) {
      // eslint-disable-next-line
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          const { message } = await singUp(this.registerForm);
          if (message === 'success') {
            await singIn(this.registerForm); // 登入
            this.updateStepActive();
          } else {
            this.$message({
              type: 'error',
              message,
            });
            this.$refs[form].clearValidate(); // 移除表單的校驗結果
          }
          this.isLoading = false;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
