<script setup>
/* eslint-disable */
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
import ButtonEdit from "@/components/Button/ButtonEdit.vue";
import ButtonDelete from "@/components/Button/ButtonDel.vue";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
import Fungsi from "@/components/lib/FungsiCampur"
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const router = useRouter();
const route = useRoute();
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("laporanrestok");

const blnthn = ref(route.params.blnthn ? route.params.blnthn : moment().year() + "-" + (parseInt(moment().month()) + 1));
// console.log(route.params.blnthn);
const columns = [
    {
        label: "Actions",
        field: "actions",
        sortable: false,
        width: "50px",
        tdClass: "text-center",
        thClass: "text-center",
    },
    {
        label: "Tanggal Transaksi",
        field: "tglbeli",
        type: "String",
    },
    {
        label: "Jumlah Barang",
        field: "jml_barang",
        type: "String",
    },
    {
        label: "Jenis Barang",
        field: "jml_jenis_barang",
        type: "String",
    },
    {
        label: "Total Pembayaran",
        field: "totalbayar",
        type: "String",
    },
];

const dataAsli = ref(null);
const data = ref(null);
const getData = async () => {
    try {
        // console.log(blnthn);
        const response = await Api.get(`admin/laporan/restok/?blnthn=${blnthn.value}`);
        dataAsli.value = response.data;
        data.value = response.data.detail;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();
const doEditData = async (id, index) => {
    // Toast.warning("Info", "Menu belum tersedia")
    // console.log(id, index);
    router.push({
        name: "admin-restok-edit",
        params: { id: id },
    });
};
const doDeleteData = async (id, index) => {
    if (confirm("Apakah anda yakin menghapus data ini?")) {
        try {
            const response = await Api.delete(`admin/transaksi/${id}`);
            // data.value.splice(index, 1);
            Toast.success("Success", "Data Berhasil dihapus!");
            getData();
            // Toast.warning("Info", "Menu belum tersedia")
            // return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};
const month = ref({
    month: moment(blnthn.value).month(),
    year: moment(blnthn.value).year(),
});

const fnMonth = () => {
    let temp = month.value.year + "-" + parseInt(month.value.month + 1);
    console.log(month.value, temp);
    blnthn.value = temp;
    getData();
    router.push({
        name: "admin-laporan-restok",
        params: { blnthn: temp },
    });
}
</script>
<template>
    <BreadCrumb />
    <div>
        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <!-- row 1 -->
                                <tr>
                                    <td class="whitespace-nowrap w-1/12">Pilih Laporan Bulan</td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-10/12">
                                        <div class="flex py-2 px-2 space-x-2">
                                            <Datepicker v-model="month" monthPicker />
                                            <button class="btn btn-md btn-info" @click="fnMonth()">Pilih</button>
                                        </div>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="dataAsli">
        <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow rounded-lg px-4 py-4">
                    <div class="overflow-x-auto">
                        <table class="table table-compact">
                            <tbody>
                                <tr>
                                    <td>TANGGAL TRANSAKSI</td>
                                    <td>:</td>
                                    <td>{{ dataAsli.blnthn_view }}</td>
                                </tr>
                                <tr>
                                    <td class="whitespace-nowrap w-1/12">TOTAL PENJUALAN </td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-10/12">
                                        {{ Fungsi.formatRupiah(dataAsli.total_pendapatan, "Rp. ") }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>TOTAL TRANSAKSI </td>
                                    <td>:</td>
                                    <td>{{ dataAsli.jml_transaksi }}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL BARANG TERJUAL </td>
                                    <td>:</td>
                                    <td>{{ dataAsli.jml_barang }}
                                        <!-- | ({{ dataAsli.jml_jenis_barang }}
                                        Jenis Barang) -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <h4>Ini Produk index</h4> -->
    <div v-if="data">

        <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
            enabled: true,
        }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-actions>
                <div class="space-x-1 space-y-1 gap-1">
                    <router-link :to="{
                        name: 'admin-transaksi-tambah',
                    }">
                        <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </router-link>
                </div>
            </template>
            <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                    <div class="text-sm font-medium text-center flex justify-center space-x-1">
                        <button @click="doEditData(props.row.id, props.index)"
                            class="tooltip text-sky-100 block rounded-md font-bold py-1 px-1 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg"
                            data-tip="Detail">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>

                        </button>
                        <!-- <ButtonDelete @click="doDeleteData(props.row.id, props.index)" /> -->
                    </div>
                </span>

                <span v-else-if="props.column.field == 'totalbayar'">
                    {{ Fungsi.formatRupiah(props.row.totalbayar, "Rp. ") }}
                </span>
                <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                </span>
            </template>
        </vue-good-table>
    </div>
</template>