<script setup>
import { useRoute } from 'vue-router';
import QrcodeVue from 'qrcode.vue'
const route = useRoute();
let value = 'https://example.com';
let size = 300;

const id = route.params.id;
</script>
<template>
    <div>

        <div class="w-full flex justify-center">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 class="text-5xl font-bold">Produk {{ id }}!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <!-- <button class="btn btn-info">Detail Produk</button> -->
                    <div class="py-4">
                        <qrcode-vue :value="value" :size="size" level="H" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>