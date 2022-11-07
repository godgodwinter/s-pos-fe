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
moment.updateLocale("id", localization);
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("label");

const router = useRouter();
const route = useRoute();
const dataDetail = ref({});
const dataForm = ref({});

// const id = route.params.id;
const getDataDetail = async () => {
    try {
        const response = await Api.post(`admin/auth/profile`);
        dataDetail.value = response.data.me;
        dataDetail.value.password = null;
        dataDetail.value.password2 = null;
        console.log(dataDetail.value);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataDetail();

const onSubmit = async (values) => {
    // console.log(values);
    let dataStore = {
        name: dataDetail.value.name,
        username: dataDetail.value.username,
        email: dataDetail.value.email,
        password: dataDetail.value.password,
    };
    // console.log(dataForm);
    try {
        const response = await Api.post(`admin/auth/profile/update`, dataStore);
        // console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil diupdate!");
        router.push({ name: "admin-profile" });

        return true;
    } catch (error) {
        console.error(error);
    }
};

const isPasswordSama = ref(false);
dataDetail.value.password == null;
dataDetail.value.password2 == null;
if (dataDetail.value.password == null && dataDetail.value.password2 == null) {
    isPasswordSama.value = true;
}
const doAlertPasswordTidakSama = () => {
    Toast.warning("Info", "Gagal! Password tidak sama!");
};
const periksaPassword = () => {
    //   Toast.success("Info", `tes ${dataDetail.value.password}`);
    // console.log(dataDetail.value.password, dataDetail.value.password2, '--', dataDetail.value.password == null || "" && dataDetail.value.password2 == null || "" ? "sama" : 'tidaksama');
    if (dataDetail.value.password != null) {
        if (dataDetail.value.password != dataDetail.value.password2) {
            isPasswordSama.value = false;
            //   doAlertPasswordTidakSama();
        } else {
            //   Toast.success("Info", "Password sama!");
            isPasswordSama.value = true;
        }
    }
    if (dataDetail.value.password == null || dataDetail.value.password == "" && dataDetail.value.password2 == null || dataDetail.value.password2 == "") {
        isPasswordSama.value = true;
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
                        <Field v-model="dataDetail.name" :rules="fnValidasi.validateData" type="text" name="name"
                            ref="name" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.name }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Username</label>
                        <Field v-model="dataDetail.username" :rules="fnValidasi.validateData" type="text"
                            name="username" ref="username" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.username }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Email</label>
                        <Field v-model="dataDetail.email" :rules="fnValidasi.validateEmail" type="text" name="email"
                            ref="email" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.email }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Password</label>
                        <Field v-model="dataDetail.password" type="password" name="password" ref="password"
                            autocomplete="off" class="input input-bordered md:w-full max-w-2xl"
                            @keyup="periksaPassword()" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.password }}
                        </div>

                    </div>
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Konfirmasi
                            Password</label>
                        <Field v-model="dataDetail.password2" type="password" name="password2" ref="password2"
                            autocomplete="off" class="input input-bordered md:w-full max-w-2xl"
                            @keyup="periksaPassword()" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.password2 }}
                        </div>

                    </div>

                </div>
            </div>

            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <span class="btn btn-secondary">Batal</span> -->
                <button class="btn btn-lg btn-primary" v-if="isPasswordSama">
                    Simpan
                </button>
                <span class="btn btn-lg btn-dark" v-else @click="doAlertPasswordTidakSama()">
                    Simpan
                </span>
            </div>
        </Form>
    </div>
</template>