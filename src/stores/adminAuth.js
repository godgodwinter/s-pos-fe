/* eslint-disable */
import { defineStore } from "pinia";

export const useStoreAdminAuth = defineStore({
  id: "storeAdminAuth",
  state: () => ({
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    isLogin: localStorage.getItem("isLogin")
      ? localStorage.getItem("isLogin")
      : false,
    isAdmin: localStorage.getItem("isAdmin")
      ? JSON.parse(localStorage.getItem("isAdmin"))
      : false,
    me: {
      id: 0,
      name: "",
    },
  }),
  getters: {
    getToken: (state) => state.token,
    getIsLogin: (state) => state.isLogin,
    getIsAdmin: (state) => state.isAdmin,
    getMe: (state) => state.me,
  },
  actions: {
    setToken(tokeng) {
      this.token = token;
    },
    setIsLogin(isLogin) {
      this.isLogin = isLogin;
    },
    setIsAdmin(isAdmin) {
      this.isAdmin = isAdmin;
    },
    setMe(me) {
      this.me = me;
    },
  },
});
