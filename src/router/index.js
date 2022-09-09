import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path:'/',
    redirect:'login'
  },
  {
    path:'/login',
    name:'login',
    component: () => import( '@/views/common/login')
  },
  {
    path:'/signup',
    name:'signup',
    component: () => import( '@/views/common/signup')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/components/Home.vue'),
    // redirect:'initial',
    children:[
            //通用
            {
              path: '/initial',
              name: 'initial',
              component: () => import( '@/views/common/initial.vue')
            },
            {
              path: '/changePassword',
              name: 'changePassword',
              component: () => import( '@/views/common/changePassword.vue')
            },

            //用户
            {
              path: '/nonstop_train',
              name: 'nonstop_train',
              component: () => import( '@/views/customer/nonstop_train.vue')
            },
            {
              path: '/order_form_nopay',
              name: 'order_form_nopay',
              component: () => import( '@/views/customer/order_form_nopay.vue')
            },
            {
              path: '/order_form_nouse',
              name: 'order_form_nouse',
              component: () => import( '@/views/customer/order_form_nouse.vue')
            },
            {
              path: '/order_form_canceled',
              name: 'order_form_canceled',
              component: () => import( '@/views/customer/order_form_canceled.vue')
            },
            {
              path: '/order_form_completed',
              name: 'order_form_completed',
              component: () => import( '@/views/customer/order_form_completed.vue')
            },
            {
              path: '/personal_information',
              name: 'personal_information',
              component: () => import( '@/views/customer/personal_information.vue')
            },
            {
              path: '/transfer_train',
              name: 'transfer_train',
              component: () => import( '@/views/customer/transfer_train.vue')
            },
            {
              path: '/passenger',
              name: 'passenger',
              component: () => import( '@/views/customer/passenger.vue')
            },
            // {
            //   path: '/selectdown',
            //   name: 'selectdown',
            //   component: () => import( '@/views/student/selectdown.vue')
            // }, 

            // {
            //   path: '/schedule',
            //   name: 'schedule',
            //   component: () => import( '@/views/student/schedule.vue')
            // }, 

            // {
            //   path: '/markpage',
            //   name: 'markpage',
            //   component: () => import( '@/views/student/markpage.vue')
            // },
            //团队测试
            // {
            //   path: '/backbook',
            //   name: 'backbook',
            //   component: () => import( '@/views/backbook.vue')
            // },
            // {
            //   path: '/borrow',
            //   name: 'borrow',
            //   component: () => import( '@/views/borrow.vue')
            // },
            // {
            //   path: '/checkbook',
            //   name: 'checkbook',
            //   component: () => import( '@/views/checkbook.vue')
            // },
            // {
            //   path: '/insertbook',
            //   name: 'insertbook',
            //   component: () => import( '@/views/insertbook.vue')
            // },
            ]
  },

  {
    path: '/Homeadmin',
    name: 'Homeadmin',
    component: () => import('@/components/Homeadmin.vue'),
    // redirect:'initialadmin',
    children:[
            //通用
            {
              path: '/initialadmin',
              name: 'initialadmin',
              component: () => import( '@/views/common/initialadmin.vue')
            },
            {
              path: '/changePasswordadmin',
              name: 'changePasswordadmin',
              component: () => import( '@/views/common/changePasswordadmin.vue')
            },

            //管理员
            {
              path: '/train_management',
              name: 'train_management',
              component: () => import( '@/views/admin/train_management.vue')
            },
            {
              path: '/order_management',
              name: 'order_management',
              component: () => import( '@/views/admin/order_management.vue')
            },
            {
              path: '/user_management',
              name: 'user_management',
              component: () => import( '@/views/admin/user_management.vue')
            },
            // {
            //   path: '/user_management',
            //   name: 'user_management',
            //   component: () => import( '@/views/admin/user_management.vue')
            // },
            // {
            //   path: '/CourseEdit',
            //   name: 'CourseEdit',
            //   component: () => import('@/views/teacher/CourseEdit.vue')
            // }  
            ]
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
