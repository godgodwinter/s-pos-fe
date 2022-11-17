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
            path: `${prefix}/produk/tambah`,
            name: `${prefixName}produk-tambah`,
            meta: {
              title: "produk",
              icon: "mdi-home",
              breadcrumb: {
                name: "tambah",
                path: `${prefix}/produk/tambah`,
                goto: `${prefixName}produk-tambah`,
              },
            },
            component: () => import("@/views/admin/produk/ProdukTambah.vue"),
          },
          {
            path: `${prefix}/produk/edit/:id`,
            name: `${prefixName}produk-edit`,
            meta: {
              title: "produk",
              icon: "mdi-home",
              breadcrumb: {
                name: "Edit",
                path: `${prefix}/produk/edit`,
                goto: `${prefixName}produk-edit`,
                params: {
                  id: "id",
                },
              },
            },
            component: () => import("@/views/admin/produk/ProdukEdit.vue"),
          },
          {
            path: `${prefix}/produk/detail/:slug`,
            name: `${prefixName}produk-detail`,
            meta: {
              title: "produk",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail",
                path: `${prefix}/produk/detail`,
                goto: `${prefixName}produk-detail`,
                params: {
                  slug: "slug",
                },
              },
            },
            component: () => import("@/views/admin/produk/ProdukDetail.vue"),
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

      {
        path: `${prefix}/administrator`,
        name: `${prefixName}administrator`,
        meta: {
          title: "administrator",
          icon: "mdi-home",
          breadcrumb: {
            name: "administrator",
            path: `${prefix}/administrator`,
            goto: `${prefixName}administrator`,
          },
        },
        redirect: `${prefix}/administrator/index`,
        component: () =>
          import("@/views/admin/administrator/AdministratorLayout.vue"),
        children: [
          {
            path: `${prefix}/administrator/index`,
            name: `${prefixName}administrator-index`,
            meta: {
              title: "administrator",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/administrator/index`,
                goto: `${prefixName}administrator-index`,
              },
            },
            component: () =>
              import("@/views/admin/administrator/AdministratorIndex.vue"),
          },

          {
            path: `${prefix}/administrator/tambah`,
            name: `${prefixName}administrator-tambah`,
            meta: {
              title: "administrator",
              icon: "mdi-home",
              breadcrumb: {
                name: "tambah",
                path: `${prefix}/administrator/tambah`,
                goto: `${prefixName}administrator-tambah`,
              },
            },
            component: () =>
              import("@/views/admin/administrator/AdministratorTambah.vue"),
          },
          {
            path: `${prefix}/administrator/edit/:id`,
            name: `${prefixName}administrator-edit`,
            meta: {
              title: "administrator",
              icon: "mdi-home",
              breadcrumb: {
                name: "Edit",
                path: `${prefix}/administrator/edit`,
                goto: `${prefixName}administrator-edit`,
                params: {
                  id: "id",
                },
              },
            },
            component: () =>
              import("@/views/admin/administrator/AdministratorEdit.vue"),
          },
        ],
      },

      {
        path: `${prefix}/pegawai`,
        name: `${prefixName}pegawai`,
        meta: {
          title: "pegawai",
          icon: "mdi-home",
          breadcrumb: {
            name: "pegawai",
            path: `${prefix}/pegawai`,
            goto: `${prefixName}pegawai`,
          },
        },
        redirect: `${prefix}/pegawai/index`,
        component: () => import("@/views/admin/pegawai/PegawaiLayout.vue"),
        children: [
          {
            path: `${prefix}/pegawai/index`,
            name: `${prefixName}pegawai-index`,
            meta: {
              title: "pegawai",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/pegawai/index`,
                goto: `${prefixName}pegawai-index`,
              },
            },
            component: () => import("@/views/admin/pegawai/PegawaiIndex.vue"),
          },

          {
            path: `${prefix}/pegawai/tambah`,
            name: `${prefixName}pegawai-tambah`,
            meta: {
              title: "pegawai",
              icon: "mdi-home",
              breadcrumb: {
                name: "tambah",
                path: `${prefix}/pegawai/tambah`,
                goto: `${prefixName}pegawai-tambah`,
              },
            },
            component: () => import("@/views/admin/pegawai/PegawaiTambah.vue"),
          },
          {
            path: `${prefix}/pegawai/edit/:id`,
            name: `${prefixName}pegawai-edit`,
            meta: {
              title: "pegawai",
              icon: "mdi-home",
              breadcrumb: {
                name: "Edit",
                path: `${prefix}/pegawai/edit`,
                goto: `${prefixName}pegawai-edit`,
                params: {
                  id: "id",
                },
              },
            },
            component: () => import("@/views/admin/pegawai/PegawaiEdit.vue"),
          },
        ],
      },

      {
        path: `${prefix}/restok`,
        name: `${prefixName}restok`,
        meta: {
          title: "restok",
          icon: "mdi-home",
          breadcrumb: {
            name: "restok",
            path: `${prefix}/restok`,
            goto: `${prefixName}restok`,
          },
        },
        redirect: `${prefix}/restok/index`,
        component: () => import("@/views/admin/restok/RestokLayout.vue"),
        children: [
          {
            path: `${prefix}/restok/index`,
            name: `${prefixName}restok-index`,
            meta: {
              title: "restok",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/restok/index`,
                goto: `${prefixName}restok-index`,
              },
            },
            component: () => import("@/views/admin/restok/RestokIndex.vue"),
          },
          {
            path: `${prefix}/restok/tambah`,
            name: `${prefixName}restok-tambah`,
            meta: {
              title: "restok",
              icon: "mdi-home",
              breadcrumb: {
                name: "tambah",
                path: `${prefix}/restok/tambah`,
                goto: `${prefixName}restok-tambah`,
              },
            },
            component: () => import("@/views/admin/restok/RestokTambah.vue"),
          },
          {
            path: `${prefix}/restok/edit/:id`,
            name: `${prefixName}restok-edit`,
            meta: {
              title: "restok",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail",
                path: `${prefix}/restok/edit`,
                goto: `${prefixName}restok-edit`,
                params: {
                  id: "id",
                },
              },
            },
            component: () => import("@/views/admin/restok/RestokEdit.vue"),
          },
        ],
      },
      {
        path: `${prefix}/transaksi`,
        name: `${prefixName}transaksi`,
        meta: {
          title: "transaksi",
          icon: "mdi-home",
          breadcrumb: {
            name: "transaksi",
            path: `${prefix}/transaksi`,
            goto: `${prefixName}transaksi`,
          },
        },
        redirect: `${prefix}/transaksi/index`,
        component: () => import("@/views/admin/transaksi/TransaksiLayout.vue"),
        children: [
          {
            path: `${prefix}/transaksi/index`,
            name: `${prefixName}transaksi-index`,
            meta: {
              title: "transaksi",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/transaksi/index`,
                goto: `${prefixName}transaksi-index`,
              },
            },
            component: () =>
              import("@/views/admin/transaksi/TransaksiIndex.vue"),
          },
          {
            path: `${prefix}/transaksi/tambah`,
            name: `${prefixName}transaksi-tambah`,
            meta: {
              title: "transaksi",
              icon: "mdi-home",
              breadcrumb: {
                name: "tambah",
                path: `${prefix}/transaksi/tambah`,
                goto: `${prefixName}transaksi-tambah`,
              },
            },
            component: () =>
              import("@/views/admin/transaksi/TransaksiTambah.vue"),
          },
          {
            path: `${prefix}/transaksi/edit/:id`,
            name: `${prefixName}transaksi-edit`,
            meta: {
              title: "transaksi",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail",
                path: `${prefix}/transaksi/edit`,
                goto: `${prefixName}transaksi-edit`,
                params: {
                  id: "id",
                },
              },
            },
            component: () =>
              import("@/views/admin/transaksi/TransaksiEdit.vue"),
          },
          {
            path: `${prefix}/transaksi/detail/:kodetrans`,
            name: `${prefixName}transaksi-detail`,
            meta: {
              title: "transaksi",
              icon: "mdi-home",
              breadcrumb: {
                name: "Detail",
                path: `${prefix}/transaksi/detail`,
                goto: `${prefixName}transaksi-detail`,
                params: {
                  kodetrans: "kodetrans",
                },
              },
            },
            component: () =>
              import("@/views/admin/transaksi/TransaksiDetail.vue"),
          },
        ],
      },
      {
        path: `${prefix}/laporan`,
        name: `${prefixName}laporan`,
        meta: {
          title: "laporan",
          icon: "mdi-home",
          breadcrumb: {
            name: "laporan",
            path: `${prefix}/laporan`,
            goto: `${prefixName}laporan`,
          },
        },
        redirect: `${prefix}/laporan/index`,
        component: () => import("@/views/admin/laporan/LaporanLayout.vue"),
        children: [
          {
            path: `${prefix}/laporan/index/:blnthn?`,
            name: `${prefixName}laporan-index`,
            meta: {
              title: "laporan",
              icon: "mdi-home",
              breadcrumb: {
                name: "Index",
                path: `${prefix}/laporan/index/:blnthn?`,
                goto: `${prefixName}laporan-index`,
              },
            },
            component: () => import("@/views/admin/laporan/LaporanIndex.vue"), //laporan penjualan
          },
          {
            path: `${prefix}/laporan/restok/:blnthn?`,
            name: `${prefixName}laporan-restok`,
            meta: {
              title: "laporan",
              icon: "mdi-home",
              breadcrumb: {
                name: "restok",
                path: `${prefix}/laporan/restok/:blnthn?`,
                goto: `${prefixName}laporan-restok`,
              },
            },
            component: () => import("@/views/admin/laporan/LaporanRestok.vue"),
          },
          {
            path: `${prefix}/laporan/laba/:blnthn?`,
            name: `${prefixName}laporan-laba`,
            meta: {
              title: "laporan",
              icon: "mdi-home",
              breadcrumb: {
                name: "laba",
                path: `${prefix}/laporan/laba/:blnthn?`,
                goto: `${prefixName}laporan-laba`,
              },
            },
            component: () => import("@/views/admin/laporan/LaporanLaba.vue"),
          },
        ],
      },
    ],
  },
];
export default AdminRoutes;
