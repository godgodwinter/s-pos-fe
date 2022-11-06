/* eslint-disable */
import { defineStore } from "pinia";

export const useStoreLanding = defineStore({
  id: "storeLanding",
  state: () => ({
    theme: "bumblebee",
  }),
  getters: {
    getTheme: (state) => state.theme,
  },
  actions: {
    setTheme(theme) {
      this.theme = theme;
    },
  },
});
