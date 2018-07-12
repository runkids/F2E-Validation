<template>
  <div v-loading="isLoading" element-loading-text="Please Wait...">
    <div class="title" style="padding: 10px">
      <h3>Profile Picture</h3>
      <h4>You're Almost Done!</h4>
    </div>
    <label for="file-upload" class='uploadBox'>
      <div class='icon'><i class="fas fa-image"></i></div>
      <div class="showUserImg"  v-show="getUpdateForm.photoURL">
        <img :src="getUpdateForm.photoURL"/>
      </div>
      <div class='info' v-show="!getUpdateForm.photoURL">
        <div>UPLOAD UP 1 PHOTO</div>
        <div>MAX SIZE: 150*150px</div>
      </div>
    </label>
    <input id="file-upload" type="file" @change="fileSelected"/>
    <el-button class="stepBtn" type="primary" @click="submitForm"
               :disabled="!getUpdateForm.photoURL">
      DONE
    </el-button>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/firebaseAuthAPI';
import mixins from './mixins';

export default {
  mixins: [mixins],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      window.scrollTo(0, 0);
      this.isLoading = true;

      await updateUserInfo(this.getUpdateForm);
      this.updateStepActive();

      this.isLoading = false;
      this.changeClass('.step-three', '.lastStep');
    },
    fileSelected(event) {
      const file = event.target.files.item(0); // 取得File物件
      const reader = new FileReader(); // 建立FileReader 監聽 Load 事件
      reader.addEventListener('load', this.imageLoader);
      reader.readAsDataURL(file);
    },
    imageLoader(event) {
      const img = new Image();
      let imgwidth = 0;
      let imgheight = 0;
      const maxwidth = 150; // 圖片寬度上限
      const maxheight = 150;// 圖片高度上限
      img.src = event.target.result;
      img.addEventListener('load', (e) => {
        imgwidth = e.path[0].width;
        imgheight = e.path[0].height;
        if (imgwidth <= maxwidth && imgheight <= maxheight) {
          this.updateProfileImage(event.target.result);
        } else {
          this.updateProfileImage('');
          this.$message({
            type: 'error',
            message: 'Max Size: 150*150px',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/style/main.scss";

.showUserImg{
  position: absolute;
  @include size(300px,150px);
  margin: 20px 0;
  display: flex;
  justify-content: center;
  bottom: -20px;
  > img{
    @include size(150px,100%);
  }
}

#file-upload{
  display: none;
}
.uploadBox{
  display: flex;
  justify-content: space-around;
  align-items: center;
  @include size(300px,150px);
  border: 1px dashed black;
  color: $black_color;
  position: relative;
  cursor: pointer;
  .icon{
    font-size: 50px;
  }
  .info{
    line-height: 24px;
    :first-child{
      font-size: 15px;
    }
    :last-child{
      font-size: 11px;
    }
  }
}
</style>
