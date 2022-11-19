<script setup>
/* eslint-disable */
import Api from "@/axios/axios";
import { ref } from "vue";
import { useRoute } from 'vue-router';
import QrcodeVue from 'qrcode.vue'
import Fungsi from "@/components/lib/FungsiCampur";
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

const dataAsli = ref([]);
const data = ref(null);
const getData = async () => {
    try {
        const response = await Api.get(`v1/produk/${slug.value}/slug`);
        dataAsli.value = response.data;
        data.value = response.data;
        // fnGetProdukTerlaris();

        // return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();
</script>
<template>
    <div v-if="data">
        <div class="w-full flex justify-center">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="bg-base-100">
                    <div class="carousel w-full">
                        <div class="carousel-item w-full" v-for="item, index in data.photo" :key="item.id"
                            :id="'item' + index">
                            <div class="w-full flex justify-center">
                                <div class="hero-content flex-col lg:flex-row-reverse">
                                    <img :src="item.link" class="max-w-sm rounded-lg shadow-2xl" />

                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="flex justify-center w-full py-2 gap-2">
                        <a v-for="item, index in data.photo" :key="item.id" :href="'#item' + index"
                            class="btn btn-xs">{{ index + 1 }}</a>
                    </div>
                </div>
                <div>
                    <h1 class="text-5xl font-bold"> {{ data.nama }}</h1>
                    <p class="py-6">{{ data.desc }}
                    <div class="py-4 px-6">
                        <div class="overflow-x-auto w-full">
                            <table class="table w-full">
                                <!-- head -->

                                <tbody>
                                    <tr>
                                        <th>Nama </th>
                                        <th>:</th>
                                        <th>{{ data.nama }}</th>
                                    </tr>
                                    <tr>
                                        <th>Harga </th>
                                        <th>:</th>
                                        <th>{{ Fungsi.formatRupiah(data.harga_jual_default, 'Rp. ') }}</th>
                                    </tr>
                                    <tr>
                                        <th>Berat </th>
                                        <th>:</th>
                                        <th>{{ data.berat }}</th>
                                    </tr>
                                    <tr>
                                        <th>Stok </th>
                                        <th>:</th>
                                        <th>{{ data.stok_tersedia }}</th>
                                    </tr>
                                </tbody>


                            </table>
                        </div>
                    </div>
                    <!-- <h1 class="text-5xl font-bold">KODE PRODUK : {{ slug }}</h1> -->


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