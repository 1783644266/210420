import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'



const Msite = () => import('../pages/Msite/Msite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Search = () => import('../pages/Search/Search.vue')


import Login from '../pages/Login/Login.vue'
import Shops from '../pages/Shops/shops.vue'
import ShopGoods from '../pages/Shops/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shops/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shops/ShopRating/ShopRating.vue'

Vue.use(VueRouter);





export default new VueRouter({
    routes:[
        {
            path:'/msite',
            component:Msite,
            meta:{
                show:true
            }
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/shops',
            component:Shops,
            children:[
                {
                    path:'/shops/goods',
                    component:ShopGoods
                },
                {
                    path:'/shops/info',
                    component:ShopInfo
                },
                {
                    path:'/shops/rating',
                    component:ShopRating
                },
                {
                    path:'',
                    redirect:'/shops/goods'
                },
            ]
        },
        {
            path:'/order',
            component:Order,
            meta:{
                show:true
            }
        },
        {
            path:'/profile',
            component:Profile,
            meta:{
                show:true
            }
        },
        {
            path:'/search',
            component:Search,
            meta:{
                show:true
            }
        },
        {
            path:'/',
            redirect:'/msite'
        }
    ]
})