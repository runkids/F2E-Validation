<template>
  <div id='stepTwo'>
    <div class="title" style="padding: 10px">
      <h3>General Infomation</h3>
      <h4>Tell us who you are!</h4>
    </div>
    <el-form :model="userInfoForm" :rules="userInfoRules" ref="userInfoForm" label-position="top">
      <el-form-item prop="displayName" label="DisplayName">
        <el-input type="text" placeholder="Display Name"
                  v-model.lazy="userInfoForm.displayName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phoneNumber" label="Phone Number">
        <!-- type Number 不能限制長度 所以使用 pattern
          https://stackoverflow.com/questions/18510845/maxlength-ignored-for-input-type-number-in-chrome
        -->
        <el-input type="text" placeholder="Phone Number"
                  pattern="\d*"
                  :maxlength="10"
                  v-model.lazy="userInfoForm.phoneNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-button class="stepBtn" type="primary" @click="submitForm('userInfoForm')">
        SUBMIT & NEXT
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validateDisplayName, validatePhoneNumber } from '@/config/vaildationRules';
import mixins from './mixins';

export default {
  mixins: [mixins],
  data() {
    return {
      userInfoForm: {
        displayName: '',
        phoneNumber: '',
        photoURL: '',
      },
      userInfoRules: {
        displayName: [{ validator: validateDisplayName, trigger: 'blur' }],
        phoneNumber: [{ validator: validatePhoneNumber, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(form) {
      // eslint-disable-next-line
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          this.setUpdateFormData(this.userInfoForm);
          this.updateStepActive();
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.initUserInfo();
  },
};
</script>
