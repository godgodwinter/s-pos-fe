/* eslint-disable */
const prefix = "/pages/admin";
const prefixName = "admin-";

const AdminRoutes = [
  {
    path: `${prefix}/homeLayout`,
    name: "AdminLayout",
    component: () => import("@/layouts/AdminLayout.vue"),
    redirect: `${prefix}/home`,
    meta: {
      requireAuth: true,
      title: "Admin",
      icon: "mdi-home",
      breadcrumb: {
        name: "Home",
        path: "/pages/admin/home",
        goto: "AdminLayout",
      },
    },
    children: [
      {
        path: `${prefix}/home`,
        name: `${prefixName}dashboard`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Beranda",
            path: `${prefix}/home`,
            goto: `${prefixName}dashboard`,
          },
        },
        // component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
        component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
      },
      {
        path: `${prefix}/profile`,
        name: `${prefixName}profile`,
        meta: {
          title: "profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "profile",
            path: `${prefix}/profile`,
            goto: `${prefixName}profile`,
          },
        },
        redirect: `${prefix}/profile/edit`,
        component: () => import("@/views/admin/profile/ProfileLayout.vue"),
        children: [
          {
            path: `${prefix}/profile/edit`,
            name: `${prefixName}profile`,
            meta: {
              title: "profile",
              icon: "mdi-home",
              breadcrumb: {
                name: "Edit",
                path: `${prefix}/profile/edit`,
                goto: `${prefixName}profile-edit`,
                // params: {
                //   id: "id",
                // },
              },
            },
            component: () => import("@/views/admin/profile/ProfileEdit.vue"),
          },
        ],
      },
      {
        path: `${prefix}/produk`,
        name: `${prefixName}produk`,
        meta: {
          title: "Produk",
          icon: "mdi-home",
          breadcrumb: {
            name: "Produk",
            path: `${prefix}/produk`,
            goto: `${prefixName}produk`,
          },
        },
        redirect: `${prefix}/produk/index`,
        component: () => import("@/views/admin/produk/ProdukLayout.vue"),
        children: [
          {
            path: `${prefix}/produk/index`,
            name: `${prefixName}produk-index`,
            meta: {
              title: "Produk",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/produk/index`,
                goto: `${prefixName}produk-index`,
              },
            },
            component: () => import("@/views/admin/produk/ProdukIndex.vue"),
          },

          {
            path: `${prefix}/produk/edit`,
            name: `${prefixName}produk-edit`,
            meta: {
              title: "Produk",
              icon: "mdi-home",
              breadcrumb: {
                name: "Edit",
                path: `${prefix}/produk/edit`,
                goto: `${prefixName}produk-edit`,
              },
            },
            component: () => import("@/views/admin/produk/ProdukEdit.vue"),
          },
        ],
      },
      {
        path: `${prefix}/label`,
        name: `${prefixName}label`,
        meta: {
          title: "Label",
          icon: "mdi-home",
          breadcrumb: {
            name: "Label",
            path: `${prefix}/label`,
            goto: `${prefixName}label`,
          },
        },
        redirect: `${prefix}/label/index`,
        component: () => import("@/views/admin/label/LabelLayout.vue"),
        children: [
          {
            path: `${prefix}/label/index`,
            name: `${prefixName}label-index`,
            meta: {
              title: "Label",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/label/index`,
                goto: `${prefixName}label-index`,
              },
            },
            component: () => import("@/views/admin/label/LabelIndex.vue"),
          },

          {
            path: `${prefix}/label/tambah`,
            name: `${prefixName}label-tambah`,
            meta: {
              title: "label",
              icon: "mdi-home",
              breadcrumb: {
                name: "tambah",
                path: `${prefix}/label/tambah`,
                goto: `${prefixName}label-tambah`,
              },
            },
            component: () => import("@/views/admin/label/LabelTambah.vue"),
          },
          {
            path: `${prefix}/label/edit/:id`,
            name: `${prefixName}label-edit`,
            meta: {
              title: "label",
              icon: "mdi-home",
              breadcrumb: {
                name: "Edit",
                path: `${prefix}/label/edit`,
                goto: `${prefixName}label-edit`,
                params: {
                  id: "id",
                },
              },
            },
            component: () => import("@/views/admin/label/LabelEdit.vue"),
          },
        ],
      },
    ],
  },
];
export default AdminRoutes;
