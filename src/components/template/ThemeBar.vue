<script setup lang="ts">
import { useStoreLanding } from "@/stores/landing";
const storeLanding = useStoreLanding();

const doUpdateTheme = (theme: string) => {
  storeLanding.setTheme(theme);
};

const data = [
  {
    id: 1,
    name: "cupcake",
    code: "cupcake",
  },
  {
    id: 2,
    name: "winter",
    code: "winter",
  },
  {
    id: 3,
    name: "retro",
    code: "retro",
  },
  {
    id: 4,
    name: "bumblebee",
    code: "bumblebee",
  },
  {
    id: 5,
    name: "valentine",
    code: "valentine",
  },
  {
    id: 5,
    name: "luxury",
    code: "luxury",
  },
  {
    id: 5,
    name: "dracula",
    code: "dracula",
  },
  {
    id: 5,
    name: "dark",
    code: "dark",
  },
];
</script>
<template>
  <!-- 
              class="font-normal text-sm hover:link my-1 hidden md:block capitalize" -->
  <div class="static">
    <div
      class="fixed z-50 font-serif font-semibold text-sm bg-base-content text-base-100 py-2 text-center px-4 w-full"
    >
      <div
        class="flex lg:justify-center gap-10 px-10 mx-4 overflow-auto w-full"
      >
        <button
          v-for="item in data"
          :key="item.id"
          class="font-normal text-sm hover:link my-1 block capitalize"
          @click="doUpdateTheme(item.code)"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>
