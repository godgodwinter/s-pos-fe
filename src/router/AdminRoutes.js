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
            name: "Profile",
            path: `${prefix}/home`,
            goto: `${prefixName}dashboard`,
          },
        },
        // component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
        component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
      },
    ],
  },
];
export default AdminRoutes;
