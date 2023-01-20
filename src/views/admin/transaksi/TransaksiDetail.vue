<script setup>
/* eslint-disable */
import { ref } from "vue";
import Api from "@/axios/axios";
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue";
import { useStoreAdmin } from "@/stores/admin";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Fungsi from "@/components/lib/FungsiCampur";
import QrcodeVue from "qrcode.vue";
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
storeAdmin.setPagesActive("transaksi");

const kodetrans = ref(route.params.kodetrans);
const qrLink = ref(`${BASE_URL_FE}kodetrans/${kodetrans.value}`);
const qrSize = ref(300);

const dataDetail = ref({});
const dataForm = ref({});

const numberPattern = /\d+/g;
const babengRupiah = (angka = 0) => {
  // console.log(angka);
  dataDetail.value.harga_jual_default = Fungsi.formatRupiah(angka, "Rp. ");
  // console.log(dataDetail.value.harga_jual_default.match(numberPattern).join(''));
};
const id = route.params.id;
// const getDataDetail = async () => {
//   try {
//     const response = await Api.get(`v1/transaksi/kodetrans/${kodetrans.value}`);
//     dataDetail.value = response.data;
//     console.log("====================================");
//     console.log(dataDetail.value);
//     console.log("====================================");
//     // console.log(response.data.harga_jual_default);
//     // dataDetail.value.harga_jual_default = Fungsi.formatRupiah(response.data.harga_jual_default, 'Rp. ');
//     // return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
// getDataDetail();
const onSubmit = async (values) => {
  // console.log(values);
  let dataStore = {
    nama: dataDetail.value.nama,
    harga_jual_default: dataDetail.value.harga_jual_default
      .match(numberPattern)
      .join(""),
    satuan: dataDetail.value.satuan,
    berat: dataDetail.value.berat,
  };
  // console.log(dataForm);
  try {
    const response = await Api.put(`admin / produk / ${id}`, dataStore);
    console.log(response);
    // data.id = response.id;
    Toast.success("Info", "Data berhasil ditambahkan!");
    router.push({ name: "admin-produk" });

    return true;
  } catch (error) {
    console.error(error);
  }
};

const doPergiKeLink = () => {
  return router.push({
    name: "transaksi-detail-kodetrans",
    params: {
      kodetrans: kodetrans.value,
    },
  });
};
</script>
<template>
  <BreadCrumb />
  <div>
    TRANSAKSI DETAIL
    <div class="space-y-4">
      <div>
        <qrcode-vue :value="qrLink" :size="qrSize" level="H" />
      </div>
      <div>
        <router-link
          :to="{
            name: 'transaksi-detail-kodetrans',
            params: { kodetrans: kodetrans },
          }"
          target="_blank"
        >
          <button class="btn btn-sm btn-warning">Go!</button>
        </router-link>
      </div>
      <div>Link : {{ qrLink }}</div>
    </div>
  </div>
</template>
