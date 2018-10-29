import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/views/login/login'
import Layout from '@/views/layout/Layout'
// import Layout2 from '@/views/layout/Layout2'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [

  {
    path: '/',
    redirect: '/',
    component: () =>
            import('@/views/platform/index'),
    children: [
      { // 首页
        path: '/',
        // component: () =>
        //             import('@/views/platform/home')
        component: resolve => require(['@/views/platform/home'], resolve)
      },
      // 民宿
      {
        path: '/index/homestay',
        // component: () =>
        //             import('@/views/platform/homestay'),
        component: resolve => require(['@/views/platform/homestay'], resolve),
        hidden: true
      },
      {
        path: '/index/homestay/search',
        // component: () =>
        //             import('@/views/platform/homestay-search'),
        component: resolve => require(['@/views/platform/homestay-search'], resolve),
        hidden: true
      },
      {
        path: '/index/homestay/detail',
        // component: () =>
        //             import('@/views/platform/homestay-detail'),
        component: resolve => require(['@/views/platform/homestay-detail'], resolve),
        hidden: true
      },
      {
        path: '/index/homestay/order',
        // component: () =>
        //             import('@/views/platform/homestay-order'),
        component: resolve => require(['@/views/platform/homestay-order'], resolve),
        hidden: true
      },
      {
        path: '/index/homestay/payment',
        // component: () =>
        //             import('@/views/platform/payment'),
        component: resolve => require(['@/views/platform/payment'], resolve),
        hidden: true
      },
      { // 电商
        path: '/index/shop',
        // component: () =>
        //             import('@/views/platform/onlineRetailers')
        component: resolve => require(['@/views/platform/onlineRetailers'], resolve)
      },
      { // 资讯
        path: '/index/information',
        // component: () =>
        //             import('@/views/platform/information')
        component: resolve => require(['@/views/platform/information'], resolve)
      },
      { // 资讯详情
        path: '/index/information/detail',
        // component: () =>
        //             import('@/views/platform/informationDetail')
        component: resolve => require(['@/views/platform/informationDetail'], resolve)
      },
      { // 招商引资
        path: '/index/cooperation',
        // component: () =>
        //             import('@/views/platform/cooperation')
        component: resolve => require(['@/views/platform/cooperation'], resolve)
      },
      { // 关于
        path: '/index/us',
        // component: () =>
        //             import('@/views/platform/us')
        component: resolve => require(['@/views/platform/us'], resolve)
      },
      // 电商
      { // 首页
        path: '/buy',
        // component: () =>
        //         import('@/views/buy/index'),
        component: resolve => require(['@/views/buy/index'], resolve),
        hidden: true
      },
      { // 搜索
        path: '/buy/search',
        // component: () =>
        //         import('@/views/buy/search/index'),
        component: resolve => require(['@/views/buy/search/index'], resolve),
        hidden: true
      },
      { // 详情
        path: '/buy/detail',
        // component: () =>
        //         import('@/views/buy/buyDetail/index'),
        component: resolve => require(['@/views/buy/buyDetail/index'], resolve),
        hidden: true
      },
      { // 购物车
        path: '/buy/shoppingCart',
        // component: () =>
        //         import('@/views/buy/shoppingCart/index'),
        component: resolve => require(['@/views/buy/shoppingCart/index'], resolve),
        hidden: true
      },
      { // 订单
        path: '/buy/order',
        // component: () =>
        //         import('@/views/buy/myOrder/index'),
        component: resolve => require(['@/views/buy/myOrder/index'], resolve),
        hidden: true
      },
      { // 订单评价
        path: '/buy/comment',
        // component: () =>
        //         import('@/views/buy/myOrder/components/comment'),
        component: resolve => require(['@/views/buy/myOrder/components/comment'], resolve),
        hidden: true
      },
      { // 选商品付款
        path: '/buy/pay',
        // component: () =>
        //         import('@/views/buy/pay/index'),
        component: resolve => require(['@/views/buy/pay/index'], resolve),
        hidden: true
      },
      { // 付款确认
        path: '/buy/pay/pay_confirm',
        // component: () =>
        //         import('@/views/buy/pay/payConfirm/index'),
        component: resolve => require(['@/views/buy/pay/payConfirm/index'], resolve),
        hidden: true
      },
      { // 支付
        path: '/buy/pay/payment',
        // component: () =>
        //         import('@/views/buy/pay/payment/index'),
        component: resolve => require(['@/views/buy/pay/payment/index'], resolve),
        hidden: true
      },
      { // 管理收货地址
        path: '/buy/address',
        // component: () =>
        //         import('@/views/buy/address/index'),
        component: resolve => require(['@/views/buy/address/index'], resolve),
        hidden: true
      },
      { // 消息提醒
        path: '/buy/my_news',
        // component: () =>
        //         import('@/views/buy/news/index'),
        component: resolve => require(['@/views/buy/news/index'], resolve),
        hidden: true
      },
      { // 我的店铺
        path: '/buy/my_shop',
        // component: () =>
        //         import('@/views/buy/myShop/index'),
        component: resolve => require(['@/views/buy/myShop/index'], resolve),
        hidden: true
      }
    ],
    hidden: true
  },

  // 登录
  {
    path: '/login',
    component: () =>
            import('@/views/login/login'),
    // component: resolve => require(['@/views/login/login'], resolve),
    hidden: true
  },
  // 注册
  {
    path: '/regist',
    component: () =>
            import('@/views/regist/regist'),
    // component: resolve => require(['@/views/regist/regist'], resolve),
    hidden: true
  },
  // 忘记密码
  {
    path: '/forget',
    component: () =>
            import('@/views/forget/forget'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () =>
            import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
            import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () =>
            import('@/views/errorPage/401'),
    hidden: true
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'login'
  // },

  // 后台管理
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'home', noCache: true }
    }]
  }
  // {
  //   path: '/businessWork',
  //   component: Layout,
  //   children: [{
  //     path: 'business',
  //     component: import('@/views/dashboard/businessWork/business'),
  //     name: 'business',
  //     meta: { title: 'business', icon: 'icon', noCache: true }
  //   }]
  // }
  // {
  //   path: '/l2',
  //   component: Layout2,
  //   children: [{
  //     path: 'index',
  //     component: () =>
  //               import('@/views/svg-icons/index'),
  //     name: 'icons',
  //     meta: { title: 'icons', icon: 'icon', noCache: true }
  //   }],
  //   meta: {
  //     title: 'icon',
  //     icon: 'lock'
  //     // roles: ['admin'] // you can set roles in root nav
  //   }
  // }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'permission',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [{
    path: 'page',
    component: () =>
                import('@/views/permission/page'),
    name: 'pagePermission',
    meta: {
      title: 'pagePermission',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  }, {
    path: 'directive',
    component: () =>
                import('@/views/permission/directive'),
    name: 'directivePermission',
    meta: {
      title: 'directivePermission'
      // if do not set roles, means: this page does not require permission
    }
  }]
},

{
  path: '/icon',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
                import('@/views/svg-icons/index'),
    name: 'icons',
    meta: { title: 'icons', icon: 'icon', noCache: true }
  }],
  meta: {
    title: 'icon',
    icon: 'lock',
    roles: ['editor'] // you can set roles in root nav
  }
},

  //   {
  //     path: '/components',
  //     component: Layout,
  //     redirect: 'noredirect',
  //     name: 'component-demo',
  //     meta: {
  //       title: 'components',
  //       icon: 'component'
  //     },
  //     children: [
  //       { path: 'tinymce', component: () => import('@/views/components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
  //       { path: 'markdown', component: () => import('@/views/components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
  //       { path: 'json-editor', component: () => import('@/views/components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
  //       { path: 'splitpane', component: () => import('@/views/components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
  //       { path: 'avatar-upload', component: () => import('@/views/components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
  //       { path: 'dropzone', component: () => import('@/views/components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
  //       { path: 'sticky', component: () => import('@/views/components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
  //       { path: 'count-to', component: () => import('@/views/components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
  //       { path: 'mixin', component: () => import('@/views/components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
  //       { path: 'back-to-top', component: () => import('@/views/components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }},
  //       { path: 'drag-dialog', component: () => import('@/views/components-demo/dragDialog'), name: 'dragDialog-demo', meta: { title: 'dragDialog' }},
  //       { path: 'dnd-list', component: () => import('@/views/components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
  //       { path: 'drag-kanban', component: () => import('@/views/components-demo/dragKanban'), name: 'dragKanban-demo', meta: { title: 'dragKanban' }}
  //     ]
  //   },

  //   {
  //     path: '/charts',
  //     component: Layout,
  //     redirect: 'noredirect',
  //     name: 'charts',
  //     meta: {
  //       title: 'charts',
  //       icon: 'chart'
  //     },
  //     children: [
  //       { path: 'keyboard', component: () => import('@/views/charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
  //       { path: 'line', component: () => import('@/views/charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
  //       { path: 'mixchart', component: () => import('@/views/charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
  //     ]
  //   },

  //   {
  //     path: '/tab',
  //     component: Layout,
  //     children: [{
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }]
  //   },

  //   {
  //     path: '/table',
  //     component: Layout,
  //     redirect: '/table/complex-table',
  //     name: 'table',
  //     meta: {
  //       title: 'Table',
  //       icon: 'table'
  //     },
  //     children: [
  //       { path: 'dynamic-table', component: () => import('@/views/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
  //       { path: 'drag-table', component: () => import('@/views/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
  //       { path: 'inline-edit-table', component: () => import('@/views/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
  //       { path: 'tree-table', component: () => import('@/views/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
  //       { path: 'custom-tree-table', component: () => import('@/views/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
  //       { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
  //     ]
  //   },

  //   {
  //     path: '/example',
  //     component: Layout,
  //     redirect: '/example/list',
  //     name: 'example',
  //     meta: {
  //       title: 'example',
  //       icon: 'example'
  //     },
  //     children: [
  //       { path: 'create', component: () => import('@/views/example/create'), name: 'createArticle', meta: { title: 'createArticle', icon: 'edit' }},
  //       { path: 'edit/:id(\\d+)', component: () => import('@/views/example/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
  //       { path: 'list', component: () => import('@/views/example/list'), name: 'articleList', meta: { title: 'articleList', icon: 'list' }}
  //     ]
  //   },

{
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'nested',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [{
    path: 'menu1',
    component: () =>
                    import('@/views/nested/menu1/index'), // Parent router-view
    name: 'menu1',
    meta: { title: 'menu1' },
    redirect: '/nested/menu1/menu1-1',
    children: [{
      path: 'menu1-1',
      component: () =>
                            import('@/views/nested/menu1/menu1-1'),
      name: 'menu1-1',
      meta: { title: 'menu1-1' }
    },
    {
      path: 'menu1-2',
      component: () =>
                            import('@/views/nested/menu1/menu1-2'),
      name: 'menu1-2',
      redirect: '/nested/menu1/menu1-2/menu1-2-1',
      meta: { title: 'menu1-2' },
      children: [{
        path: 'menu1-2-1',
        component: () =>
                                    import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        name: 'menu1-2-1',
        meta: { title: 'menu1-2-1' }
      },
      {
        path: 'menu1-2-2',
        component: () =>
                                    import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        name: 'menu1-2-2',
        meta: { title: 'menu1-2-2' }
      }
      ]
    },
    {
      path: 'menu1-3',
      component: () =>
                            import('@/views/nested/menu1/menu1-3'),
      name: 'menu1-3',
      meta: { title: 'menu1-3' }
    }
    ]
  },
  {
    path: 'menu2',
    name: 'menu2',
    component: () =>
                    import('@/views/nested/menu2/index'),
    meta: { title: 'menu2' }
  }
  ]
},

  //   {
  //     path: '/error',
  //     component: Layout,
  //     redirect: 'noredirect',
  //     name: 'errorPages',
  //     meta: {
  //       title: 'errorPages',
  //       icon: '404'
  //     },
  //     children: [
  //       { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
  //       { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
  //     ]
  //   },

  //   {
  //     path: '/error-log',
  //     component: Layout,
  //     redirect: 'noredirect',
  //     children: [{ path: 'log', component: () => import('@/views/errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  //   },

  //   {
  //     path: '/excel',
  //     component: Layout,
  //     redirect: '/excel/export-excel',
  //     name: 'excel',
  //     meta: {
  //       title: 'excel',
  //       icon: 'excel'
  //     },
  //     children: [
  //       { path: 'export-excel', component: () => import('@/views/excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
  //       { path: 'export-selected-excel', component: () => import('@/views/excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
  //       { path: 'upload-excel', component: () => import('@/views/excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
  //     ]
  //   },

  //   {
  //     path: '/zip',
  //     component: Layout,
  //     redirect: '/zip/download',
  //     alwaysShow: true,
  //     meta: { title: 'zip', icon: 'zip' },
  //     children: [{ path: 'download', component: () => import('@/views/zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  //   },

  //   {
  //     path: '/theme',
  //     component: Layout,
  //     redirect: 'noredirect',
  //     children: [{ path: 'index', component: () => import('@/views/theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  //   },

  //   {
  //     path: '/clipboard',
  //     component: Layout,
  //     redirect: 'noredirect',
  //     children: [{ path: 'index', component: () => import('@/views/clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  //   },

  //   {
  //     path: '/i18n',
  //     component: Layout,
  //     children: [{ path: 'index', component: () => import('@/views/i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  //   },

{ path: '*', redirect: '/404', hidden: true }
]
