<script setup>
import { RouterView } from "vue-router";
import { computed } from "vue";
import { useStoreLanding } from "@/stores/landing";
const storeLanding = useStoreLanding();
const theme = computed(() => storeLanding.getTheme);
</script>
<template>
  <div :data-theme="theme" class="min-h-screen">
    <RouterView />
  </div>
</template>
