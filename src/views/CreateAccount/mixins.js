import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  methods: {
    ...mapMutations(['initStepActive', 'updateStepActive', 'setUpdateFormData', 'updateProfileImage']),
    ...mapActions(['initUserInfo']),

    changeClass(prev, next) { // 點選下一頁改變樣式
      document.querySelector(prev).classList.toggle('nextStep');
      setTimeout(() => {
        document.querySelector(prev).classList.toggle('notShow');
        document.querySelector(next).classList.toggle('notShow');
      }, 500);
    },

  },
  computed: {
    ...mapGetters(['getStepActive', 'getUpdateForm']),
  },
}
;
