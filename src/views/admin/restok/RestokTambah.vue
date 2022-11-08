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
import IconProduct from "@/components/Icons/IconMonstrProduct.vue";
import Fungsi from "@/components/lib/FungsiCampur";
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("restok");

const numberPattern = /\d+/g;
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

const router = useRouter();
const dataDetail = ref({
    namatoko: "",
    tglbeli: moment().format("YYYY-MM-DD"),
    penanggungjawab: { label: null, id: null },
});

const getDataFromLocalStorage = () => {
    let temp = localStorage.getItem("dataRestok");
    if (temp) {
        dataDetail.value = JSON.parse(temp);
    }
};
getDataFromLocalStorage();

// simpan sementara untuk lanjut ke proses Keranjang
const onApply = async (values) => {
    // console.log(dataForm);
    try {
        // console.log(dataStore);
        if (dataDetail.value.data_penanggungjawab.id == null) {
            Toast.danger("Error", "Pilih Penanggungjawab terlebih dahulu!");
        } else {
            // console.log(values);

            let getTemp = JSON.parse(localStorage.getItem("dataRestok"));
            let tempDataKeranjang = [];
            if (getTemp.dataKeranjang.length > 0) {
                tempDataKeranjang = getTemp.dataKeranjang;
            }
            let dataStore = {
                namatoko: dataDetail.value.namatoko,
                tglbeli: dataDetail.value.tglbeli,
                penanggungjawab: dataDetail.value.data_penanggungjawab.id,
                data_penanggungjawab: dataDetail.value.data_penanggungjawab,
                dataKeranjang: tempDataKeranjang,
            };
            localStorage.setItem("dataRestok", JSON.stringify(dataStore));
            Toast.babeng("Info", "Berhasil di terapkan!");

        }

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
        const response = await Api.post(`admin/label`, dataStore);
        console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({ name: "admin-label" });

        return true;
    } catch (error) {
        console.error(error);
    }
};
const dataPegawai = ref([]);
let pilihPegawai = ref([]);
const getDataPegawai = async () => {
    try {
        const response = await Api.get(`admin/pegawai`);
        // console.log(response);
        dataPegawai.value = response.data;
        dataPegawai.value.forEach((item) => {
            pilihPegawai.value.push({
                label: item.nama,
                id: item.id,
            });
        });
        return response;
    } catch (error) {
        Toast.danger("Warning", "Data Gagal dimuat");
        console.error(error);
    }
};
getDataPegawai();
const onReset = async () => {
    dataDetail.value.namatoko = "";
    dataDetail.value.tglbeli = moment().format("YYYY-MM-DD");
    dataDetail.value.data_penanggungjawab = { label: null, id: null };
    localStorage.removeItem("dataRestok");
}

const dataAsli = ref([]);
const data = ref([]);
const getData = async () => {
    try {
        const response = await Api.get(`admin/produk`);
        dataAsli.value = response.data;
        data.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();
const inputCariProduk = ref('');
const onCariProduk = async () => {
    let input = inputCariProduk.value.trim().toLowerCase();
    let result = dataAsli.value.filter(item => { return item.nama.toLowerCase().includes(input) });
    data.value = result;
    // console.log(result);
    // getDataProduk where nama produk=== inputan
}

const dataKeranjang = ref([]);
const periksaKeranjang = () => {
    let getTemp = JSON.parse(localStorage.getItem("dataRestok"));
    if (getTemp.dataKeranjang.length > 0) {
        dataKeranjang.value = getTemp.dataKeranjang;
    }
}
periksaKeranjang();

const addToCart = (id) => {
    // 1. ambil data where id dari dataAsli
    let temp = dataAsli.value.filter(item => { return item.id === id; });
    // 2. push ke dalam array dataKeranjang;
    // periksa jika sudah ada tampilkan notif
    let periksa = dataKeranjang.value.filter(item => { return item.id === id });
    if (periksa.length > 0) {
        Toast.warning("Peringatan", "Barang sudah ada di keranjang!");
    } else {
        // console.log(temp[0]);
        temp[0].jml = 0;
        temp[0].harga_beli = "Rp. 0 ";
        temp[0].harga_beli_number = 0;
        dataKeranjang.value.push(temp[0]);
        Toast.babeng("Info", "Barang berhasil ditambahkan!");

    }
    // console.log(id);
}

const doKeranjangEditBarang = (id, index) => {
    let temp = dataKeranjang.value.filter(item => { return item.id === id });
    formEdit.value = true;
    dataFormKeranjang.value.id = id;
    dataFormKeranjang.value.index = index;
    // console.log(id, index);
    console.log(temp[0]);
    // tampilkan modal edit
    // update data
    // simpan where id
    dataFormKeranjang.value.jml = dataKeranjang.value[index].jml;
    dataFormKeranjang.value.harga_beli = dataKeranjang.value[index].harga_beli;
    // dataFormKeranjang.value.harga_beli_number = dataKeranjang.value[index].harga_beli.match(numberPattern).join('');
}
const doKeranjangDeleteBarang = (id, index) => {
    let temp = dataKeranjang.value.filter(item => { return item.id !== id });
    // console.log(dataKeranjang.value, temp, id);
    dataKeranjang.value = temp;
    // console.log(temp);
}
const babengRupiah = (angka = 0) => {
    // console.log(angka);
    dataFormKeranjang.value.harga_beli = Fungsi.formatRupiah(angka, 'Rp. ');
    // console.log(dataDetail.value.harga_jual_default.match(numberPattern).join(''));
}

const formEdit = ref(false);
const dataFormKeranjang = ref({});
const onKeranjangUpdateBarang = async (values) => {
    // console.log(dataFormKeranjang.value);
    dataKeranjang.value[dataFormKeranjang.value.index].jml = dataFormKeranjang.value.jml;
    dataKeranjang.value[dataFormKeranjang.value.index].harga_beli = dataFormKeranjang.value.harga_beli;
    dataKeranjang.value[dataFormKeranjang.value.index].harga_beli_number = dataFormKeranjang.value.harga_beli.match(numberPattern).join('');
    onFormEditBatal();
}
const onFormEditBatal = () => {
    formEdit.value = false;
    dataFormKeranjang.value = {};
}

const onResetDataKeranjang = () => {
    let getTemp = JSON.parse(localStorage.getItem("dataRestok"));
    dataKeranjang.value = [];
    getTemp.dataKeranjang = dataKeranjang.value;
    localStorage.setItem("dataRestok", JSON.stringify(getTemp));
}
const onApplyDataKeranjang = () => {
    let getTemp = JSON.parse(localStorage.getItem("dataRestok"));
    getTemp.dataKeranjang = dataKeranjang.value;
    localStorage.setItem("dataRestok", JSON.stringify(getTemp));
    console.log(getTemp);
}

const doSimpan = async () => {
    let getTemp = JSON.parse(localStorage.getItem("dataRestok"));
    let dataStore = {
        namatoko: getTemp.namatoko,
        tglbeli: getTemp.tglbeli,
        penanggungjawab: getTemp.penanggungjawab,
        dataKeranjang: dataKeranjang.value
    };
    console.log(dataStore);
    try {
        const response = await Api.post(`admin/restok`, dataStore);
        console.log(response);
        // // data.id = response.id;
        // Toast.success("Info", "Data berhasil ditambahkan!");
        // router.push({ name: "admin-label" });
        Toast.babeng("Info", "Data berhasil disimpan!")
        onResetDataKeranjang();
        return true;
    } catch (error) {
        console.error(error);
    }
}
</script>
<template>
    <BreadCrumb />

    <div class="shadow shadow-lg">
        <Form v-slot="{ errors }" @submit="onApply">
            <div class="py-2 lg:py-4 px-4 grid grid-cols-3">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nama Toko</label>
                        <Field v-model="dataDetail.namatoko" :rules="fnValidasi.validateData" type="text"
                            name="namatoko" ref="namatoko" class="input input-bordered md:w-full max-w-md" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.namatoko }}
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tanggal Pembelian</label>
                        <Field :rules="fnValidasi.validateData" v-model="dataDetail.tglbeli" name="tglbeli" type="date"
                            class="input input-bordered w-11/12" />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.nama }}
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penanggungjawab</label>

                        <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihPegawai"
                            :rules="fnValidasi.validateData" v-model="dataDetail.data_penanggungjawab"
                            v-bind:class="{ disabled: false }"></v-select>
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.penanggungjawab }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <span class="btn btn-secondary">Batal</span> -->
                <button class="btn btn-primary">Apply</button>
                <button class="btn btn-danger" @click="onReset()">RESET</button>
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
                        <div class="space-y-4  w-full py-4">
                            <div class="form-control">
                                <div class="input-group">
                                    <Field :rules="fnValidasi.validateData" v-model="inputCariProduk"
                                        name="inputCariProduk" type="text" placeholder="Cari Produk ..."
                                        class="input input-bordered max-w-lg w-full" @keyup="onCariProduk()" />
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
                                    <th>No</th>
                                    <th>Nama Produk</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr v-for="d, index in data">
                                    <th>
                                        <label>
                                            {{ index + 1 }}
                                        </label>
                                    </th>
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                    <!-- <img src="/tailwind-css-component-profile-2@56w.png"
                                                        alt="Avatar Tailwind CSS Component" /> -->
                                                    <IconProduct />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">{{ d.nama }}</div>
                                                <div class="space-x-1">
                                                    <span class="badge badge-ghost badge-sm">Kategori 1
                                                    </span>
                                                    <span class="badge badge-ghost badge-sm"> Kategori 2
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <button class="btn btn-warning btn-xs" @click="addToCart(d.id)">Add to
                                            Keranjang</button>
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
                    <h4 class="font-bold text-xl py-2">Keranjang Restok
                    </h4>
                    <h4>Total Jenis Barang : </h4>
                    <h4>Total Barang : </h4>
                    <h4>Total Pembayaran : </h4>
                </div>
                <div>

                    <vue-good-table :line-numbers="true" :columns="columns" :rows="dataKeranjang" :search-options="{
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
                                    <ButtonEdit @click="doKeranjangEditBarang(props.row.id, props.index)" />
                                    <ButtonDelete @click="doKeranjangDeleteBarang(props.row.id, props.index)" />
                                </div>
                            </span>

                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                </div>
                <!-- FORM-EDIT KERANJANG -->
                <div v-if="formEdit">
                    <Form v-slot="{ errors }" @submit="onKeranjangUpdateBarang()">
                        <div class="py-2 lg:py-4 px-4">
                            <div class="space-y-4">
                                <div class="flex flex-col">
                                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Jumlah
                                        Barang</label>
                                    <Field v-model="dataFormKeranjang.jml" :rules="fnValidasi.validateDataRupiah"
                                        type="text" name="jml" ref="jml"
                                        class="input input-bordered md:w-full max-w-2xl" required />
                                    <div class="text-xs text-red-600 mt-1">
                                        {{ errors.jml }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Harga Pembelian :
                                    Rupiah
                                    <!-- {{ labelRupiah }}  -->
                                </label>
                                <Field v-model="dataFormKeranjang.harga_beli" :rules="fnValidasi.validateData"
                                    type="text" name="harga_beli" ref="harga_beli"
                                    class="input input-bordered md:w-full max-w-2xl" required
                                    @keyup="babengRupiah(dataFormKeranjang.harga_beli)" />
                                <div class="text-xs text-red-600 mt-1">
                                    {{ errors.harga_beli }}
                                </div>
                            </div>
                        </div>

                        <div class="w-full flex justify-end py-10 px-10 gap-4">
                            <!-- <span class="btn btn-secondary">Batal</span> -->
                            <button class="btn btn-primary">Simpan</button>
                            <button class="btn btn-danger" @click="onFormEditBatal()">Batal</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div class="w-full flex justify-end py-10 px-10 gap-4">
            <!-- <span class="btn btn-secondary">Batal</span> -->
            <button class="btn btn-primary" @click="onApplyDataKeranjang()">Apply KERANJANG</button>
            <button class="btn btn-danger" @click="onResetDataKeranjang()">RESET KERANJANG</button>
        </div>
        <div class="w-full flex justify-end py-10 px-10 gap-4">
            <button class="btn btn-success" @click="doSimpan()">SIMPAN</button>
        </div>
    </div>

</template>