import { defineStore } from "pinia";

export const useStoreAdmin = defineStore({
  id: "storeAdmin",
  state: () => ({
    pagesActive: "dashboard",
  }),
  getters: {
    getPagesActive: (state) => state.pagesActive,
  },
  actions: {
    setPagesActive(pagesActive) {
      this.pagesActive = pagesActive;
    },
  },
});
