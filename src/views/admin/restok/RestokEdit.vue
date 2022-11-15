<script setup>
/* eslint-disable */
import { ref } from "vue";
import Api from "@/axios/axios";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
import Fungsi from "@/components/lib/FungsiCampur"
const router = useRouter();
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("restok");

const route = useRoute();
const dataDetail = ref(null);
const dataForm = ref({});
const dataAsli = ref([]);
const data = ref([]);

const id = route.params.id;
const getDataDetail = async () => {
    try {
        const response = await Api.get(`admin/restok/${id}`);
        dataDetail.value = response.data;
        data.value = dataDetail.value.produk_detail;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataDetail();


const columns = [


    {
        label: "Nama Produk",
        field: "nama",
        type: "String",
    },
    {
        label: "Jumlah Barang",
        field: "jml",
        type: "String",
    }, {
        label: "Harga Beli",
        field: "harga_beli",
        type: "String",
    },
    {
        label: "Total Pembayaran",
        field: "total",
        type: "String",
    },
];

</script>
<template>
    <BreadCrumb />
    <div v-if="dataDetail" class="py-2">
        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <!-- row 1 -->
                                <tr>
                                    <td class="whitespace-nowrap w-1/12">KODE TRANS</td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-10/12">
                                        {{ dataDetail.kodetrans }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>TANGGAL RESTOK</td>
                                    <td>:</td>
                                    <td>{{ moment(dataDetail.tglbeli).format("DD MMMM YYYY") }}</td>
                                </tr>
                                <!-- row 2 -->
                                <tr>
                                    <td>NAMA TOKO</td>
                                    <td>:</td>
                                    <td>{{ dataDetail.namatoko }}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL BAYAR</td>
                                    <td>:</td>
                                    <td>{{ Fungsi.formatRupiah(dataDetail.totalbayar, "Rp. ") }}</td>
                                </tr>
                                <tr>
                                    <td>JUMLAH BARANG</td>
                                    <td>:</td>
                                    <td>{{ dataDetail.jml_barang }} Barang ( {{ dataDetail.jml_jenis_barang }} Jenis
                                        Barang )
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">

                    <div>
                        <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
                            enabled: true,
                        }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                            <template #table-actions>
                                <div class="space-x-1 space-y-1 gap-1">

                                    <button class="btn btn-sm btn-secondary" @click="router.go(-1)">Kembali</button>
                                </div>
                            </template>
                            <template #table-row="props">
                                <span v-if="props.column.field == 'actions'">
                                    <div class="text-sm font-medium text-center flex justify-center space-x-1">
                                        <!-- <ButtonEdit @click="doEditData(props.row.id, props.index)" /> -->
                                        <!-- <label for="" class="space-y-1">
                                            <button @click="doEditData(props.row.id, props.index)"
                                                class="tooltip text-sky-100 block rounded-md font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg"
                                                data-tip="Detail">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                                </svg>

                                            </button>
                                            <ButtonDelete @click="doDeleteData(props.row.id, props.index)" />
                                        </label> -->
                                    </div>
                                </span>

                                <span v-else-if="props.column.field == 'nama'">
                                    {{ props.row.produk ? props.row.produk.nama : "-" }}
                                </span>
                                <span v-else-if="props.column.field == 'harga_beli'">
                                    {{ Fungsi.formatRupiah(props.row.harga_beli, "Rp. ") }}

                                </span>
                                <span v-else-if="props.column.field == 'total'">
                                    {{ Fungsi.formatRupiah(props.row.harga_beli * props.row.jml, "Rp. ") }}

                                </span>
                                <span v-else>
                                    {{ props.formattedRow[props.column.field] }}
                                </span>
                            </template>
                        </vue-good-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>