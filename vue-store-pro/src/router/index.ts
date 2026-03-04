import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type RouteLocationNormalized
} from "vue-router"

import HomeView from "../views/HomeView.vue"
import ProductDetail from "../views/ProductDetail.vue"
import LoginView from "../views/LoginView.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: ProductDetail,
    props: (route: RouteLocationNormalized) => ({
      id: Number(route.params.id)
    })
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router