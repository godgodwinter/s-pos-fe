<script setup>
/* eslint-disable */
import { ref } from "vue";
import Api from "@/axios/axios";
import { useRoute, useRouter } from "vue-router";
import QrcodeVue from "qrcode.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Fungsi from "@/components/lib/FungsiCampur";
moment.updateLocale("id", localization);
const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";
const BASE_URL_FE = import.meta.env.VITE_API_URL_FE
  ? import.meta.env.VITE_API_URL_FE
  : "http://localhost:3000/";
const route = useRoute();
const router = useRouter();
const kodetrans = ref(route.params.kodetrans);
const qrLink = ref(`${BASE_URL_FE}transaksi/kodetrans/${kodetrans.value}`);
const qrSize = ref(300);

const dataDetail = ref(null);
const data = ref(null);
const getDataDetail = async () => {
  try {
    const response = await Api.get(`v1/transaksi/kodetrans/${kodetrans.value}`);
    dataDetail.value = response.data;
    data.value = response.data;
    // console.log("====================================");
    // console.log(dataDetail.value);
    // console.log("====================================");
    // console.log(response.data.harga_jual_default);
    // dataDetail.value.harga_jual_default = Fungsi.formatRupiah(response.data.harga_jual_default, 'Rp. ');
    // return response.data;
  } catch (error) {
    console.error(error);
  }
};
getDataDetail();

const doPergiKeLink = () => {
  getDataDetail();
  return router.push({
    name: "transaksi-detail-kodetrans",
    params: {
      kodetrans: kodetrans.value,
    },
  });
};
</script>
<template>
  <!-- <div>Transaksi Detail {{ id }}</div> -->

  <!-- {{ qrLink }} -->
  <div v-if="data">
    <!-- PENCARIAN PRODUK -->
    <div class="divider"></div>
    <div>
      <div class="w-full flex justify-center space-x-4">
        <div class="form-control">
          <div class="input-group">
            <input
              v-model="kodetrans"
              type="text"
              placeholder="KODE TRANSAKSI ..."
              class="input input-bordered w-full"
            />
            <button class="btn btn-square" @click="doPergiKeLink()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <div class="w-full flex justify-center">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <!-- <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl" /> -->
          <qrcode-vue :value="qrLink" :size="qrSize" level="H" />
          <div>
            <h1 class="text-2xl font-bold">KODE TRANSAKSI: {{ kodetrans }}</h1>
            <p class="py-6">
              Tanggal transaksi :
              {{ moment(data.tglbeli).format("d MMMM YYYY") }}
            </p>
            <p class="py-6">
              Jumlah Produk :
              {{ data.produk_jml }}
            </p>
            <p class="py-6">
              Total Bayar :
              {{ Fungsi.formatRupiah(data.total_bayar, "Rp. ") }}
            </p>
            <!-- <button class="btn btn-info">Detail Produk</button> -->
            <!-- <div class="py-4">
                        <qrcode-vue :value="value" :size="size" level="H" />
                    </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>

    <div class="px-6 py-6">
      <div class="overflow-x-auto w-full">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="(item, index) in data.transaksi_detail" :key="item.id">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <IconProduct />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ item.produk_nama }}</div>
                    <div class="text-sm opacity-50">{{ item.jml }} Barang</div>
                  </div>
                </div>
              </td>
              <!-- <td>
                Zemlak, Daniel and Leannon
                <br />
                <span class="badge badge-ghost badge-sm"
                  >Desktop Support Technician</span
                >
              </td> -->
              <td>{{ Fungsi.formatRupiah(item.harga_terjual, "Rp. ") }}</td>
              <th>
                {{ Fungsi.formatRupiah(item.harga_terjual * item.jml, "Rp. ") }}
              </th>
            </tr>
          </tbody>
          <!-- foot -->
          <tfoot>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Total</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
  <div v-else>Transaksi tidak ditemukan</div>
</template>
