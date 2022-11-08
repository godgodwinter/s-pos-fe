<script setup >
/* eslint-disable */
import { ref, computed } from "vue";
import { useStoreLanding } from "@/stores/landing";
const storeLanding = useStoreLanding();
const theme = computed(() => storeLanding.getTheme);

const doUpdateTheme = (theme) => {
  storeLanding.setTheme(theme);
};

const windowTop = ref(0);

const onScroll = (e) => {
  windowTop.value = e.target.documentElement.scrollTop;
  //   console.log({ top: windowTop.value });
};
window.addEventListener("scroll", onScroll);
</script>
<template>
  <div class="static">
    <div class="fixed z-50 font-serif font-semibold text-sm py-2 text-center px-4 w-full" :class="{
      'bg-base-content border-b border-none text-base-100  ': windowTop > 10,
      'bg-base-content bg-opacity-20 border-b text-primary-content border-white border-opacity-40':
        windowTop < 10,
    }">
      <div class="flex lg:justify-center px-10 mx-4 overflow-hidden w-full justify-center">
        <div class="py-2 border-r inline-block border-r-white last:border-none">
          <router-link :to="{ name: 'admin-transaksi-tambah' }">
            <button
              class="font-normal text-sm hover:link my-1 block capitalize px-4 border-r inline-block border-r-white last:border-none leading-tight">
              Transaksi
            </button>
          </router-link>
        </div>
        <div class="py-2 border-r inline-block border-r-white last:border-none">

          <router-link :to="{ name: 'admin-restok-tambah' }">
            <button
              class="font-normal text-sm hover:link my-1 block capitalize px-4 border-r inline-block border-r-white last:border-none leading-tight">
              Restok
            </button>
          </router-link>
        </div>

        <button v-if="theme == 'cupcake'" @click="doUpdateTheme('dark')"
          class="font-normal text-sm hover:link my-1 block capitalize px-4 border-r last:border-none">
          <svg class="h-6" viewBox="0 0 24 24" style="fill: none; stroke: currentcolor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>
        <button v-else @click="doUpdateTheme('cupcake')"
          class="font-normal text-sm hover:link my-1 block capitalize px-4 border-r last:border-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </button>
        <div class="px-2">
          <label for="my-drawer-2" class="btn drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd" />
            </svg></label>
        </div>
      </div>
    </div>
  </div>
</template>
