// import Layout from '@/views/layout/index';
// eslint-disable-next-line
const _import = require(`./_import_${process.env.NODE_ENV}`);

const routes = [
  { path: '/login', name: 'login', component: _import('Login/index'), meta: { requireAuth: false } },
  { path: '/signUp', name: 'signUp', component: _import('CreateAccount/index'), meta: { requireAuth: false } },
  { path: '/home', name: 'home', component: _import('Home/index'), meta: { requireAuth: true } },
  { path: '*', redirect: { name: 'home' }, hidden: true },
];

export default routes;
