/* eslint-disable */
import { getUserInfo } from '@/api/firebaseAuthAPI';

const state = {
  stepActive: 0,
  updateForm: {
    displayName: '',
    phoneNumber: '',
    photoURL: '',
  },
  userInfo: null,
};

const getters = {
  getStepActive: state => state.stepActive,
  getUserInfo: state => state.userInfo,
  getUpdateForm: state => state.updateForm,
};

const actions = {
  async initUserInfo({ commit }) {
    const res = await getUserInfo();
    commit('setUserInfo', res);
    return res;
  },
};

const mutations = {
  initStepActive: (state) => {
    state.stepActive = 0;
  },
  updateStepActive: (state) => {
    state.stepActive += 1;
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  setUpdateFormData:( state, formData)=>{
    state.updateForm = formData;
  },
  updateProfileImage:(state, image)=>{
    state.updateForm.photoURL = image;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
