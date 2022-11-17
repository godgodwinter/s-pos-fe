<script setup>
/* eslint-disable */
import QrcodeVue from 'qrcode.vue'
let value = 'https://example.com';
let size = 300;
</script>
<template>
    <div>
        <qrcode-vue :value="value" :size="size" level="H" />
    </div>
</template>