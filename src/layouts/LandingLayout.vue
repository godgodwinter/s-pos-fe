<script setup>
/* eslint-disable */
import Footer from "@/components/template/CFooter.vue";
import NavBar from "@/components/template/landing/NavBar.vue";
// import ThemeBar from "@/components/template/ThemeBar.vue";
// import NavBar from "../components/template/NavBar.vue";
// import ScrollToTop from "@/components/template/ScrollToTop.vue";
</script>
<template>
    <!-- <ScrollToTop /> -->
    <NavBar />
    <div class="py-12 px-4">
        <router-view />
    </div>
    <!-- <Footer /> -->
</template>
