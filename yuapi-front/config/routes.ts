export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
//   { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
    //   { path: '/admin', redirect: '/admin/sub-page' },
        // { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
        { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './InterfaceInfo' },
      
    ],
  },
  
//   { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
