/* eslint-disable */
import { defineStore } from "pinia";

export const useStoreAdminAuth = defineStore({
  id: "storeAdminAuth",
  state: () => ({
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    isLogin: localStorage.getItem("isLogin")
      ? localStorage.getItem("isLogin")
      : false,
    me: {
      id: 0,
      name: "",
    },
  }),
  getters: {
    getToken: (state) => state.token,
    getIsLogin: (state) => state.isLogin,
    getMe: (state) => state.me,
  },
  actions: {
    setToken(tokeng) {
      this.token = token;
    },
    setIsLogin(isLogin) {
      this.isLogin = isLogin;
    },
    setMe(me) {
      this.me = me;
    },
  },
});
