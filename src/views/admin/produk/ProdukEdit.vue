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
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("produk");


const router = useRouter();
const route = useRoute();
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
        const response = await Api.get(`admin/produk/${id}`);
        dataDetail.value = response.data;
        // console.log(response.data.harga_jual_default);
        dataDetail.value.harga_jual_default = Fungsi.formatRupiah(response.data.harga_jual_default, 'Rp. ');
        labelSelected.value = response.data.labelSelected;
        listPhoto.value = response.data.photo;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataDetail();
const onSubmit = async (values) => {
    // console.log(values);
    let dataStore = {
        nama: dataDetail.value.nama,
        harga_jual_default: dataDetail.value.harga_jual_default.match(numberPattern).join(''),
        satuan: dataDetail.value.satuan,
        berat: dataDetail.value.berat,
    };
    // console.log(dataForm);
    try {
        const response = await Api.put(`admin/produk/${id}`, dataStore);
        // console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({ name: "admin-produk" });

        return true;
    } catch (error) {
        console.error(error);
    }
};
const labelExample = [{ id: 1, name: "Canada" }, { id: 2, name: "France" }, { id: 3, name: "USA" }, { id: 4, name: "Finland" }];
const labelList = ref(labelExample);
const labelSelected = ref([]);

const getLabel = async () => {
    try {
        const response = await Api.get(`admin/label`);
        labelList.value = response.data;
        console.log(labelList.value);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getLabel();


const onLabelSave = async () => {
    // console.log(values);
    let dataStore = {
        labelSelected: labelSelected.value,
    };
    // console.log(JSON.stringify(dataStore));
    try {
        const response = await Api.post(`admin/produk/${id}/updateLabel`, dataStore);
        // console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil diupdate!");
        getDataDetail();
        // router.push({ name: "admin-produk" });

        return true;
    } catch (error) {
        console.error(error);
    }
}


const listPhoto = ref(null);


const fnDoUploadFile = async (file, jenis) => {
    let link = `admin/produk/${id}/uploadPhoto`;

    let formData = new FormData();
    formData.append("file", file);
    //   formData.append("file", file.value.files[0]);
    //   let dataStore = {
    //     file: file,
    //   };
    try {
        // const response = await Api.post(link, dataStore);

        const response = await Api.post(link, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        Toast.success("Success", "Data Berhasil update!");
        getDataDetail();
        // router.go();
        // resetForm();
        console.log(response);
        return response.data;
    } catch (error) {
        Toast.danger("Warning", "Data gagal ditambahkan!");
        console.error(error);
    }
};


const photoProduk = ref(null);
const photoProdukFile = ref(null);
const doUploadPhotoProduk = () => {
    if (fnValidateFile(photoProdukFile.value)) {
        fnDoUploadFile(photoProdukFile.value, "produk");
        // Toast.babeng("Info", "Fitur belum tersedia!");
    }
};


const onChangePhotoProduk = (e) => {
    let file = e.target.files[0];
    photoProdukFile.value = file;
    photoProduk.value = URL.createObjectURL(file);
    console.log(file, photoProduk.value);
};

const fnValidateFile = (file) => {
    if (file) {
        if (file.size > 1048576) {
            Toast.danger("Warning", "File harus kurang dari 1mb!");
            return false;
        }
        if (file.type != "image/jpeg" && file.type != "image/png") {
            Toast.danger("Warning", "File harus jpg/png!");
            return false;
        }

        return true;
    } else {
        Toast.danger("Info", "Pilih File terlebih dahulu!");
        return false;
    }
};

const onDoDeletePhoto = async (imagesId) => {
    if (confirm("Apakah anda yakin menghapus data ini?")) {
        try {
            const response = await Api.delete(`admin/produk/${id}/deletePhoto/${imagesId}`);
            Toast.success("Success", "Data Berhasil dihapus!");
            getDataDetail();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}
</script>
<template>
    <BreadCrumb />
    <div>
        <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="py-2 lg:py-4 px-4">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nama</label>
                        <Field v-model="dataDetail.nama" :rules="fnValidasi.validateData" type="text" name="nama"
                            ref="nama" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.nama }}
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Harga Jual
                        Default : Rupiah </label>
                    <Field v-model="dataDetail.harga_jual_default" :rules="fnValidasi.validateData" type="text"
                        name="harga_jual_default" ref="harga_jual_default"
                        class="input input-bordered md:w-full max-w-2xl" required
                        @keyup="babengRupiah(dataDetail.harga_jual_default)" />
                    <div class="text-xs text-red-600 mt-1">
                        {{ errors.harga_jual_default }}
                    </div>
                </div>
                <div class="flex flex-col">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Satuan, Contoh : Lembar /
                        Buah / Lusin</label>
                    <Field v-model="dataDetail.satuan" :rules="fnValidasi.validateData" type="text" name="satuan"
                        ref="satuan" class="input input-bordered md:w-full max-w-2xl" required />
                    <div class="text-xs text-red-600 mt-1">
                        {{ errors.satuan }}
                    </div>
                </div>
                <div class="flex flex-col">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Berat (g)</label>
                    <Field v-model="dataDetail.berat" :rules="fnValidasi.validateDataRupiah" type="number" name="berat"
                        ref="berat" class="input input-bordered md:w-full max-w-2xl" required />
                    <div class="text-xs text-red-600 mt-1">
                        {{ errors.berat }}
                    </div>
                </div>
            </div>

            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <span class="btn btn-secondary">Batal</span> -->
                <button class="btn btn-primary">Simpan</button>
            </div>
        </Form>
    </div>
    <div class="divider"></div>
    <div class="space-y-4 py-4">
        <div>
            <h4 class="font-bold text-lg uppercase"> TAMBAHKAN Label : </h4>
        </div>
        <div>
            <v-select :options="labelList" :selectable="() => labelSelected.length < 3" v-model="labelSelected" multiple
                placeholder="Pilih label :" label="nama">
            </v-select>
        </div>
        <div>
            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <span class="btn btn-secondary">Batal</span> -->
                <button class="btn btn-primary" @click="onLabelSave()">Simpan</button>
            </div>
        </div>


    </div>
    <div class="divider"></div>
    <div>
        <div>
            <h4 class="font-bold text-lg uppercase"> PHOTO PRODUK : </h4>
        </div>
        <div>
            preview:
            <div class="card w-96 glass " v-if="photoProduk">
                <figure><img :src="photoProduk" alt="Preview" /></figure>
                <div class="card-body">
                    <!-- <h2 class="card-title">{{ item.nama }}</h2> -->
                    <!-- <p>{{ item.desc }}</p> -->
                    <div class="card-actions justify-end">
                        <button class="btn btn-danger" @click="photoProduk == null">RESET</button>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h4 class="font-medium text-lg "> Pilih Photo : </h4>
            <div><input type="file" class="file-input file-input-bordered file-input-accent w-full max-w-xs"
                    name="photoProduk" @change="onChangePhotoProduk($event)" />
            </div>
            <div>
                <div class="w-full flex justify-end py-10 px-10 gap-4">
                    <!-- <span class="btn btn-secondary">Batal</span> -->
                    <button class="btn btn-primary" @click="doUploadPhotoProduk()">Simpan</button>
                </div>
            </div>
        </div>
        <div>
            <title>
                List Photo</title>
            <div clas="flex justify-center w-full">
                <div v-if="listPhoto" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 space-x-4 px-4 py-4 ">
                    <div class="card w-96 glass " v-for="item, index in listPhoto" :key="item.id">
                        <figure><img :src="item.link" :alt="item.nama" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">{{ item.nama }}</h2>
                            <!-- <p>{{ item.desc }}</p> -->
                            <div class="card-actions justify-end">
                                <button class="btn btn-danger" @click="onDoDeletePhoto(item.id)">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>

</template>