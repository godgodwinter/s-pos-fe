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
          <button
            class="font-normal text-sm hover:link my-1 block capitalize px-4 border-r inline-block border-r-white last:border-none leading-tight">
            Transaksi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
