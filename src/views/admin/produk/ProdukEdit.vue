<script setup>
/* eslint-disable */
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("produk");
</script>
<template>
    <BreadCrumb />
    <h4>Ini dashboard Edit</h4>
</template>