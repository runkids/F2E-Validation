// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import { auth } from '@/api/firebaseAuthAPI';
import locale from 'element-ui/lib/locale/lang/zh-TW';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import router from './router';
import './router/permission';
import App from './App';

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

let app;

// 等待firebase初始化完成才渲染畫面
// 避免就算使用者已經登入了firebase.auth().currentUser還是回傳null，導致ruoter那裡檔下來
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
    });
  }
});
