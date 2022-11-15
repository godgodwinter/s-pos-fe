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
storeAdmin.setPagesActive("laporanlaba");

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
        const response = await Api.get(`admin/laporan/laba?blnthn=${blnthn.value}`);
        dataAsli.value = response.data;
        // data.value = response.data.detail;

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
        name: "admin-laporan-laba",
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
                                    <td>TANGGAL </td>
                                    <td>:</td>
                                    <td>{{ dataAsli.blnthn_view }}</td>
                                </tr>
                                <tr>
                                    <td class="whitespace-nowrap w-1/12">TOTAL PENJUALAN / TRANSAKSI </td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-10/12">
                                        {{ Fungsi.formatRupiah(dataAsli.total_transaksi, "Rp. ") }} <button
                                            class="btn btn-sm btn-info" @click="router.push({
                                                name: 'admin-laporan-index',
                                                params: { blnthn: blnthn }
                                            })">Detail
                                            Penjualan</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>JUMLAH TRANSAKSI PENJUALAN </td>
                                    <td>:</td>
                                    <td>{{ dataAsli.jml_transaksi }}</td>
                                </tr>

                                <tr>
                                    <td class="whitespace-nowrap w-1/12">TOTAL RESTOK </td>
                                    <td class="whitespace-nowrap w-1/12">:</td>
                                    <td class="whitespace-nowrap w-10/12">
                                        {{ Fungsi.formatRupiah(dataAsli.total_restok, "Rp. ") }} <button
                                            class="btn btn-sm btn-info" @click="router.push({
                                                name: 'admin-laporan-restok',
                                                params: { blnthn: blnthn }
                                            })">Detail
                                            Restok</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>JUMLAH TRANSAKSI RESTOK </td>
                                    <td>:</td>
                                    <td>{{ dataAsli.jml_transaksi }}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL LABA/RUGI </td>
                                    <td>:</td>
                                    <td>
                                        <label class="text-red-500" v-if="dataAsli.status == 'Rugi'">{{ dataAsli.status
                                        }}
                                            {{
                                                    Fungsi.formatRupiah(dataAsli.total_laba, "Rp. ")
                                            }}</label>
                                        <label class="text-green-500" v-else>{{ dataAsli.status }} {{
                                                Fungsi.formatRupiah(dataAsli.total_laba, "Rp. ")
                                        }}</label>
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
</template>