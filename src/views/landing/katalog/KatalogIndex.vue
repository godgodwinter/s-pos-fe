<script setup>
import { useRouter } from "vue-router";
import Api from "@/axios/axios";
import { ref } from "vue";
import Fungsi from "@/components/lib/FungsiCampur";
const router = useRouter();
const onProdukDetail = (slug) => {
    router.push({
        name: "produk-detail-slug",
        params: { slug: slug },
    });

}
const onKategori = (id) => {
    router.push({
        name: "katalog-kategori",
        params: { id: id },
    });

}
const dataAsli = ref([]);
const data = ref([]);
const getData = async () => {
    try {
        const response = await Api.get(`v1/produk`);
        dataAsli.value = response.data;
        data.value = response.data;
        fnGetProdukTerlaris();

        // return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();


const dataLabelAsli = ref([]);
const dataLabel = ref([]);
const getDataLabel = async () => {
    try {
        const response = await Api.get(`v1/label`);
        dataLabelAsli.value = response.data;
        dataLabel.value = response.data;

        // return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataLabel();

const inputCari = ref();
const onKeyUpCari = async (cari) => {
    // console.log(cari);
    fnCari();
}

const fnCari = async () => {
    // data.value = dataAsli.value.filter(item => { return item })
    data.value = dataAsli.value.filter(item => { return item.nama.toLowerCase().includes(inputCari.value) });
}

const produkTerlarisList = ref([]);

const fnGetProdukTerlaris = async () => {
    produkTerlarisList.value = dataAsli.value.sort(function (a, b) {
        return b.stok_terjual - a.stok_terjual;
    });

}
</script>
<template>
    <div>
        <!-- {{ produkTerlarisList.slice(0, 3) }} -->
        <!-- header -->
        <!-- Terbanyak dibeli pada bulan ini -->
        <div class="bg-base-100">
            <div class="carousel w-full">
                <div class="carousel-item w-full" v-for="item, index in produkTerlarisList.slice(0, 3)" :key="item.id"
                    :id="'item' + index">
                    <div class="w-full flex justify-center">
                        <div class="hero-content flex-col lg:flex-row-reverse">
                            <img :src="item.photo[0].link" class="max-w-sm rounded-lg shadow-2xl"
                                v-if="item.photo.length > 0" />
                            <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl"
                                v-else />
                            <div class="py-4 space-y-2">
                                <h1 class="text-5xl font-bold">{{ item.nama }}</h1>

                                <p>{{ Fungsi.formatRupiah(item.harga_jual_default, 'Rp. ') }} </p>
                                <!-- <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                                    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                                </p> -->
                                <button class="btn btn-info" @click="onProdukDetail(item.slug)">Detail Produk</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="flex justify-center w-full py-2 gap-2">
                <a v-for="item, index in produkTerlarisList.slice(0, 3)" :key="item.id" :href="'#item' + index"
                    class="btn btn-xs">{{ index + 1 }}</a>
            </div>
        </div>
        <!-- SECTION KATEGORI -->
        <div class="divider"></div>
        <div class="shadow-sm ">
            <div class="tabs tabs-boxed py-2 space-x-4">
                <a class="tab" @click="onKategori(1)">SEMUA</a>
                <a class="tab tab-active" v-for="item, index in dataLabel" :key="item.id">{{ item.nama }}</a>
            </div>
        </div>
        <!-- PENCARIAN PRODUK -->
        <div class="divider"></div>
        <div>

            <div class="w-full flex justify-center space-x-4">
                <div class="form-control">
                    <div class="input-group">
                        <input type="text" placeholder="Cari Produk . . . " class="input input-bordered"
                            @keyup="onKeyUpCari(inputCari)" v-model="inputCari" name="inputCari" />
                        <button class="btn btn-square" @click="onKeyUpCari(inputCari)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- <div class="form-control">
                    <div class="input-group">
                        <select class="select select-bordered">
                            <option disabled selected>Urutkan</option>
                            <option>A-Z</option>
                            <option>Termurah - Termahal</option>
                            <option>Terbaru - Terlama</option>
                        </select>
                        <button class="btn">Go</button>
                    </div>
                </div> -->
            </div>
        </div>
        <!-- PRODUK -->
        <div class="divider"></div>
        <div>
            <div class="flex flex-col w-full mx-auto space-x-4 space-y-4 bg-base-100 rounded-lg">

                <div class="w-full grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    <div v-for="item, index in data" :key="item.id" class="flex justify-center py-4">
                        <div class="card w-96 glass">
                            <figure v-if="item.photo.length > 0">
                                <img :src="item.photo[0].link" alt="car!" />
                            </figure>
                            <figure v-else>
                                <img src="https://placeimg.com/400/225/arch" alt="car!" />
                            </figure>
                            <div class="card-body">
                                <h2 class="card-title"> {{ item.nama }}</h2>
                                <p>{{ Fungsi.formatRupiah(item.harga_jual_default, 'Rp. ') }} </p>
                                <div class="card-actions justify-end">
                                    <div class="badge badge-outline" v-for="label, index in item.labelSelected">{{
                                        label.nama
                                    }}</div>
                                </div>
                                <div class="card-actions justify-end">
                                    <button class="btn btn-info" @click="onProdukDetail(item.slug)">Detail Produk
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>