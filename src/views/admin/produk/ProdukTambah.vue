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
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("produk");

const router = useRouter();
const dataDetail = ref({});
const dataForm = ref({});

const onSubmit = async (values) => {
    // console.log(values);
    let dataStore = {
        nama: dataDetail.value.nama,
        harga_jual_default: dataDetail.value.harga_jual_default,
        satuan: dataDetail.value.satuan,
        berat: dataDetail.value.berat,
    };
    // console.log(dataForm);
    try {
        const response = await Api.post(`admin/produk`, dataStore);
        console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({ name: "admin-produk" });

        return true;
    } catch (error) {
        console.error(error);
    }
};
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
                    <Field v-model="dataDetail.harga_jual_default" :rules="fnValidasi.validateDataRupiah" type="number"
                        name="harga_jual_default" ref="harga_jual_default"
                        class="input input-bordered md:w-full max-w-2xl" required />
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
</template>