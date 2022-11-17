/* eslint-disable */
const LandingRoutes = [
  {
    path: "/landing",
    name: "LandingLayout",
    component: () => import("@/layouts/LandingLayout.vue"),
    redirect: "/home",
    meta: {
      title: "Home",
      icon: "mdi-home",
      breadcrumb: {
        name: "Home",
        path: "/landing",
        goto: "LandingLayout",
      },
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/landing/katalog/KatalogIndex.vue"),
      },
      {
        path: "/katalog/kategori/:id?",
        name: "katalog-kategori",
        component: () => import("@/views/landing/katalog/KatalogKategori.vue"),
      },
      {
        path: "/katalog",
        name: "katalog-index",
        component: () => import("@/views/landing/katalog/KatalogIndex.vue"),
      },
      {
        path: "/produk/detail/:id?",
        name: "produk-detail",
        component: () => import("@/views/landing/katalog/ProdukDetail.vue"),
      },
      {
        path: "/transaksi/detail/:id?",
        name: "transaksi-detail",
        component: () =>
          import("@/views/landing/transaksi/TransaksiDetail.vue"),
      },
      // {
      //   path: "/",
      //   name: "LandingLogin",
      //   component: () => import("@/views/landing/HomeView.vue"),
      // },
      {
        path: "/",
        name: "PegawaiLogin",
        component: () => import("@/views/landing/PegawaiLogin.vue"),
      },
      {
        path: "/adminlogin",
        name: "AdminLogin",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/home",
        name: "homeIndex",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      // {
      //   path: "/about",
      //   name: "about",
      //   component: () => import("@/views/landing/AboutView.vue"),
      //   meta: {
      //     title: "About",
      //     breadcrumb: {
      //       name: "About",
      //       path: `/about`,
      //       goto: "about",
      //       icon: "account_circle",
      //     },
      //   },
      // },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/landing/HomeView.vue"),
      },
      {
        path: "/404",
        name: "NotFound",
        component: () => import("@/views/landing/HomeView.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];
export default LandingRoutes;
