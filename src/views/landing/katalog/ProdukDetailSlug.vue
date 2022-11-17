<script setup>
/* eslint-disable */
import { ref } from "vue";
import { useRoute } from 'vue-router';
import QrcodeVue from 'qrcode.vue'
const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/";
const BASE_URL_FE = import.meta.env.VITE_API_URL_FE
    ? import.meta.env.VITE_API_URL_FE
    : "http://localhost:3000/";
const route = useRoute();
const slug = ref(route.params.slug)
const qrLink = ref(`${BASE_URL_FE}produk/slug/${slug.value}`);
const qrSize = ref(300);

</script>
<template>
    <div>

        <div class="w-full flex justify-center">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 class="text-5xl font-bold">Produk {{ slug }}!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <!-- <button class="btn btn-info">Detail Produk</button> -->
                    <div class="py-4">
                        <qrcode-vue :value="qrLink" :size="qrSize" level="H" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>