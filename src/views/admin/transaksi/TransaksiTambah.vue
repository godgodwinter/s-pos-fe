<script setup>
/* eslint-disable */
import { ref } from "vue";
import Api from "@/axios/axios";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
import Toast from "@/components/lib/Toast";
import { useRouter } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import ButtonEdit from "@/components/Button/ButtonEdit.vue";
import ButtonDelete from "@/components/Button/ButtonDel.vue";
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("transaksi");

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
        label: "Nama Produk",
        field: "nama",
        type: "String",
    },
    {
        label: "Jumlah Barang",
        field: "jml",
        type: "String",
    },
    {
        label: "Harga Pembelian",
        field: "harga_beli",
        type: "String",
    },
];

const dataAsli = ref([]);
const data = ref([]);
const router = useRouter();
const dataDetail = ref({});
const dataForm = ref({});
// simpan sementara untuk lanjut ke proses Keranjang
const onApply = async (values) => {
    // console.log(values);
    let dataStore = {
        namatoko: dataDetail.value.namatoko,
        tglbeli: dataDetail.value.tglbeli,
        penanggungjawab: dataDetail.value.penanggungjawab,
    };
    // console.log(dataForm);
    try {
        const response = await Api.post(`admin/transaksi`, dataStore);
        console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({ name: "admin-transaksi" });

        return true;
    } catch (error) {
        console.error(error);
    }
};

const onSubmit = async (values) => {
    // console.log(values);
    let dataStore = {
        namatoko: dataDetail.value.namatoko,
        tglbeli: dataDetail.value.tglbeli,
        penanggungjawab: dataDetail.value.penanggungjawab,
    };
    // console.log(dataForm);
    try {
        const response = await Api.post(`admin/transaksi`, dataStore);
        console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({ name: "admin-transaksi" });

        return true;
    } catch (error) {
        console.error(error);
    }
};
</script>
<template>
    <BreadCrumb />
    <div class="shadow shadow-lg">
        // dari localStorage
        <Form v-slot="{ errors }" @submit="onApply">
            <div class="py-2 lg:py-4 px-4 grid grid-cols-3">

                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tanggal Transaksi</label>
                        <Field v-model="dataDetail.nama" :rules="fnValidasi.validateData" type="text" name="nama"
                            ref="nama" class="input input-bordered md:w-full max-w-md" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.nama }}
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penanggungjawab
                            //pegawai
                        </label>
                        <Field v-model="dataDetail.penanggungjawab" :rules="fnValidasi.validateData" type="text"
                            name="penanggungjawab" ref="penanggungjawab" class="input input-bordered md:w-full max-w-md"
                            required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.penanggungjawab }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <span class="btn btn-secondary">Batal</span> -->
                <button class="btn btn-primary">Apply</button>
                <button class="btn btn-danger">RESET</button>
            </div>
        </Form>
    </div>

    <div class="shadow shadow-lg py-4 px-4">

        <div class="grid grid-cols-2">
            <div class="shadow shadow-sm ">
                <Form v-slot="{ errors }" @submit="onApply">
                    <div class="py-2 lg:py-4 px-4">

                        <label for="name" class="text-sm font-sm italic text-red-500 block mb-2">
                            Jika produk belum ada / tidak ditemukan ?
                            <router-link :to="{
                                name: 'admin-produk-tambah',
                            }">
                                <button class="btn btn-danger">Tambah Produk</button>
                            </router-link>
                        </label>
                        <label for="name" class="text-sm font-sm italic text-red-500 block mb-2">
                            Jika produk kosong / habis ?
                            <router-link :to="{
                                name: 'admin-produk-tambah',
                            }">
                                <button class="btn btn-danger">Restok Produk</button>
                            </router-link>
                        </label>
                        // Pencarian ke table produk
                        <div class="space-y-4  w-full py-4">
                            <div class="form-control">
                                <div class="input-group">
                                    <input type="text" placeholder="Cari Produk ..."
                                        class="input input-bordered max-w-lg w-full" />
                                    <button class="btn btn-square">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </Form>
                <div class="py-4 px-6">
                    <div class="overflow-x-auto w-full">
                        <table class="table w-full">
                            <!-- head -->
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Nama Produk</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr>
                                    <th>
                                        <label>
                                            <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                                            <ButtonDelete @click="doDeleteData(props.row.id, props.index)" />
                                        </label>
                                    </th>
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                    <img src="/tailwind-css-component-profile-2@56w.png"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">Jam 1 </div>
                                                <div class="space-x-1">
                                                    <span class="badge badge-ghost badge-sm">Desktop
                                                    </span>
                                                    <span class="badge badge-ghost badge-sm"> Support
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <button class="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>
                            </tbody>
                            <!-- foot -->
                            <tfoot>
                                <tr>
                                    <th>Action</th>
                                    <th>Nama Produk</th>
                                    <th></th>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                </div>

            </div>
            <div class="">
                <div>
                    <h4 class="font-bold text-xl py-2">Keranjang Transaksi
                        // dari localStorage
                    </h4>
                    <h4>Total Jenis Barang : </h4>
                    <h4>Total Barang : </h4>
                    <h4>Total Pembayaran : </h4>
                </div>
                <div>

                    <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
                        enabled: true,
                    }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
                        <template #table-actions>
                            <div class="space-x-1 space-y-1 gap-1">
                                <router-link :to="{
                                    name: 'admin-label-tambah',
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
                                    <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                                    <ButtonDelete @click="doDeleteData(props.row.id, props.index)" />
                                </div>
                            </span>

                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
        <div class="w-full flex justify-end py-10 px-10 gap-4">
            <!-- <span class="btn btn-secondary">Batal</span> -->
            <button class="btn btn-primary">Apply</button>
            <button class="btn btn-danger">RESET</button>
        </div>
        <div class="w-full flex justify-end py-10 px-10 gap-4">
            <button class="btn btn-success">SIMPAN</button>
        </div>
    </div>

</template>