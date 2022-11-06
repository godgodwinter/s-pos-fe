<script setup lang="ts">
import { ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scrollBehavior = (to: any) => {
  if (to.hash) {
    const element = document.getElementById(to.hash.slice(1));
    if (element) {
      return window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }
  return window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
<template>
  <div class="fixed bottom-4 right-4 xl:right-20 z-10">
    <span @click="scrollBehavior('top')">
      <div
        class="avatar transform duration-1000 ease-in-out animate-bounce font-mono font-semibold rounded-lg flex justify-between items-center bg-base-100 r0unded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
          />
        </svg>
      </div>
    </span>
  </div>
</template>
