<script setup>
/* eslint-disable */
import { ref } from "vue";
import Api from "@/axios/axios";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Fungsi from "@/components/lib/FungsiCampur";
import QrcodeVue from 'qrcode.vue'
const BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/";
const BASE_URL_FE = import.meta.env.VITE_API_URL_FE
    ? import.meta.env.VITE_API_URL_FE
    : "http://localhost:3000/";
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
const router = useRouter();
const route = useRoute();
storeAdmin.setPagesActive("produk");

const slug = ref(route.params.slug)
const qrLink = ref(`${BASE_URL_FE}produk/slug/${slug.value}`);
const qrSize = ref(300);

const dataDetail = ref({});
const dataForm = ref({});

const numberPattern = /\d+/g;
const babengRupiah = (angka = 0) => {
    // console.log(angka);
    dataDetail.value.harga_jual_default = Fungsi.formatRupiah(angka, 'Rp. ');
    // console.log(dataDetail.value.harga_jual_default.match(numberPattern).join(''));
}
const id = route.params.id;
const getDataDetail = async () => {
    try {
        // const response = await Api.get(`admin/produk/${slug.value}/slug`);
        // dataDetail.value = response.data;
        // console.log(response.data.harga_jual_default);
        // dataDetail.value.harga_jual_default = Fungsi.formatRupiah(response.data.harga_jual_default, 'Rp. ');
        // return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataDetail();
// const onSubmit = async (values) => {
//     // console.log(values);
//     let dataStore = {
//         nama: dataDetail.value.nama,
//         harga_jual_default: dataDetail.value.harga_jual_default.match(numberPattern).join(''),
//         satuan: dataDetail.value.satuan,
//         berat: dataDetail.value.berat,
//     };
//     // console.log(dataForm);
//     try {
//         const response = await Api.put(`admin / produk / ${id}`, dataStore);
//         console.log(response);
//         // data.id = response.id;
//         Toast.success("Info", "Data berhasil ditambahkan!");
//         router.push({ name: "admin-produk" });

//         return true;
//     } catch (error) {
//         console.error(error);
//     }
// };

const doPergiKeLink = () => {
    return router.push({
        name: "produk-detail-slug", params: {
            slug: slug.value
        }
    });

}

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
    <BreadCrumb />

    <div v-if="data">
        <div class="w-full ">
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

                    <div>
                        <router-link :to="{
                            name: 'produk-detail-slug', params: { slug: slug }
                        }" target="_blank">
                            <button class="btn btn-sm btn-warning">Go!</button>
                        </router-link>
                    </div>
                    <div>
                        Link : {{ qrLink }}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- <div>
        PRODUK DETAIL
        <div class="space-y-4">
            <div>
                <qrcode-vue :value="qrLink" :size="qrSize" level="H" />
            </div>
            <div>
                <router-link :to="{
                    name: 'produk-detail-slug', params: { slug: slug }
                }" target="_blank">
                    <button class="btn btn-sm btn-warning">Go!</button>
                </router-link>
            </div>
            <div>
                Link : {{ qrLink }}</div>
        </div>
    </div> -->
</template>