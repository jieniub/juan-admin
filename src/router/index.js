import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '后台管理', icon: 'dashboard' }
    }]
  },

  {
    path: '/edu/teacher',
    component: Layout,
    redirect: '/edu/teacher/list',
    name: 'Teacher',
    meta: { title: '教师管理', icon: 'el-icon-s-help' },//icon people
    children: [
      {
        path: 'list',
        name: 'EduTeacherList',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '教师列表' }
      },
      {
        path: 'form',
        name: 'EduTeacherCreate',
        component: () => import('@/views/edu/teacher/form'),
        meta: { title: '添加讲师'}
      },
      {
        path: 'edit/:id',
        name: 'EduTeacherEdit',
        component: () => import('@/views/edu/teacher/form'),
        meta:{title:'编辑教师', noCache: true},
        hidden: true
      }
    ]
  },
  {
    path: '/edu/notice',
    component: Layout,
    redirect: '/notice/list',
    name: '通知管理',
    meta: {title: '通知管理',icon: 'example'},
    children: [{
      path: 'list',
      name: '通知列表',
      component: () => import('@/views/edu/notice/list'),
      meta: { title: '通知列表', icon: 'table' }
    },
    {
      path: 'add',
      name: '添加通知',
      component: () => import('@/views/edu/notice/add'),
      meta: { title: '添加通知', icon: 'tree' }
    }
    ]
  },
  {
    path: '/edu/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: {title: '课程分类管理',icon: 'example'},
    children: [{
      path: 'list',
      name: '课程分类列表',
      component: () => import('@/views/edu/subject/list'),
      meta: { title: '课程分类列表', icon: 'table' }
    },
    {
      path: 'save',
      name: '添加课程分类',
      component: () => import('@/views/edu/subject/save'),
      meta: { title: '添加课程分类', icon: 'tree' }
    }
  ]
  },


  {
    path: '/edu/banner',
    component: Layout,
    redirect: '/edu/banner/list',
    name: 'banner',
    meta: { title: 'banner管理', icon: 'el-icon-s-help' },//icon people
    children: [
      {
        path: 'list',
        name: 'bannerlist',
        component: () => import('@/views/edu/banner/list'),
        meta: { title: 'banner管理' }
      },
    ]
  },
  {
    path: '/edu/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: {title: '课程管理',icon: 'example'},
    children: [{
      path: 'list',
      name: '课程列表',
      component: () => import('@/views/edu/course/list'),
      meta: { title: '课程列表', icon: 'table' }
    },
    {
      path: 'check',
      name: '课程审核',
      component: () => import('@/views/edu/course/check'),
      meta: { title: '审核列表', icon: 'search' }
    },
    {
      path: 'info',
      name: '添加课程',
      component: () => import('@/views/edu/course/info'),
      meta: { title: '添加课程', icon: 'tree' }
    },

    {
      path: 'info/:id',
      name: '添加课程',
      component: () => import('@/views/edu/course/info'),
      meta:{title:'添加课程大纲', noCache: true},
      hidden: true
    },
    {
      path: 'chapter/:id',
      name: 'EduCourseChapterEdit',
      component: () => import('@/views/edu/course/chapter'),
      meta:{title:'添加课程大纲', noCache: true},
      hidden: true
    },
    {
      path: 'publish/:id',
      name: 'EduCoursePublishEdit',
      component: () => import('@/views/edu/course/publish'),
      meta:{title:'课程发布', noCache: true},
      hidden: true
    }
  ]
},


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
