<template>
  <div class="home">
    <div class="user-form">
      <div class="photo">
        <img :src="userInfo.photoURL" v-if="userInfo.photoURL">
        <img src="@/assets/images/27984211.png" v-else>
        <el-popover
          placement="bottom-end"
          width="200">
          <p>Are yor sure to delete？</p><br>
          <div style="text-align: right; margin: 0">
            <el-button type="danger" icon="el-icon-delete"
                       @click="deleteAccount" size='mini'>Delete</el-button>
          </div>
          <el-button type="text" slot="reference" style="float:right;color:#fd6769">
            Delete Account
          </el-button>
        </el-popover>
      </div>
      <div>
        <h4>Display Name:</h4>
        <el-input suffix-icon="el-icon-service" v-model="userInfo.displayName" readonly></el-input>
        <h4>Email Verified:</h4>
        <el-input suffix-icon="el-icon-sort" v-model="userInfo.emailVerified" readonly></el-input>
        <h4>Created Time:</h4>
        <el-input suffix-icon="el-icon-date" v-model="userInfo.creationTime" readonly></el-input>
        <h4>Last SignIn Time:</h4>
        <el-input suffix-icon="el-icon-date" v-model="userInfo.lastSignInTime" readonly></el-input>
      </div>
      <el-button type="primary" class="sign-out" @click="logout" plain>Sign Out</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { signOut, deleteUser } from '@/api/firebaseAuthAPI';

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    ...mapActions(['initUserInfo']),

    formateDate(time) {
      const date = new Date(time);
      return `${date.getFullYear()}/${this.formatNum(date.getMonth() + 1)}/${this.formatNum(date.getDate())} ${this.formatNum(date.getHours())}:${this.formatNum(date.getMinutes())}`;
    },
    formatNum(num) {
      if (num >= 10) {
        return num;
      }
      return `0${num}`;
    },

    deleteAccount() {
      deleteUser();
      this.$message({
        type: 'success',
        message: 'Account has been deleted',
      });
      this.$router.push({ name: 'login' });
    },

    logout() {
      signOut();
      window.location.reload();
    },
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  mounted() {
    this.$nextTick(async () => {
      await this.initUserInfo();
      const {
        displayName,
        photoURL,
        uid,
        emailVerified,
        metadata: { creationTime, lastSignInTime } } = this.getUserInfo;

      this.userInfo = {
        displayName,
        photoURL,
        emailVerified: emailVerified ? 'Verified' : 'Not Verifiy',
        uid,
        creationTime: this.formateDate(creationTime),
        lastSignInTime: this.formateDate(lastSignInTime),
      };
    });
  },
};
</script>

<style lang="scss">
@import "../../assets/style/main.scss";
.home{
  position: relative;
}
.user-form{
  @include center(-50%,10%);
  @include size(300px,100%);
  @include box(300px,#fff);
  min-height: 550px;
  .photo{
    img{
      @include size(150px,150px);
    }
  }
  h4{
    font-size: 15px;
    color: $black_color;
    padding: 10px;
  }
  .sign-out{
    width: 300px;
    margin-top: 20px;
  }
}
</style>
