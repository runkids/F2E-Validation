import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  methods: {
    ...mapMutations(['initStepActive', 'updateStepActive', 'setUpdateFormData', 'updateProfileImage']),
    ...mapActions(['initUserInfo']),
  },
  computed: {
    ...mapGetters(['getStepActive', 'getUpdateForm']),
  },
}
;
