import router from '@/router';
import { getUserInfo } from '@/api/firebaseAuthAPI';

router.beforeEach((to, from, next) => {
  const isLogin = !!getUserInfo();
  if (to.meta.requireAuth) {
    if (!isLogin) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

// eslint-disable-next-line
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0); // 切換畫面後置頂
});
