/* eslint-disable */
import { defineStore } from "pinia";
export const useStoreAuth = defineStore({
  id: "storeAuth",
  state: () => ({
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    isLogin: localStorage.getItem("isLogin")
      ? localStorage.getItem("isLogin")
      : false,
    isAdmin: localStorage.getItem("isAdmin")
      ? localStorage.getItem("isAdmin")
      : false,
  }),
  getters: {
    getToken: (state) => state.token,
    getIsLogin: (state) => state.isLogin,
    getIsAdmin: (state) => state.isAdmin,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setIsLogin(isLogin) {
      this.isLogin = isLogin;
    },
    setIsAdmin(isAdmin) {
      this.isAdmin = isAdmin;
    },
  },
});
