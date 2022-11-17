<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const id = route.params.id;
</script>
<template>
    <div class="py-4 px-4">
        <h1 class="text-5xl font-bold">KATEGORI : {{ id }}!</h1>
    </div>
    <!-- SECTION KATEGORI -->
    <div class="divider"></div>
    <div class="shadow-sm ">
        <div class="tabs tabs-boxed py-2">
            <a class="tab" @click="onKategori(1)">SEMUA</a>
            <a class="tab tab-active">KATEGORI 1</a>
            <a class="tab">KATEGORI 2</a>
            <a class="tab">KATEGORI 3</a>
            <a class="tab">KATEGORI 4</a>
        </div>
    </div>
    <!-- PENCARIAN PRODUK -->
    <div class="divider"></div>
    <div>

        <div class="w-full flex justify-center space-x-4">
            <div class="form-control">
                <div class="input-group">
                    <input type="text" placeholder="Cari Produk . . . " class="input input-bordered" />
                    <button class="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="form-control">
                <div class="input-group">
                    <select class="select select-bordered">
                        <option disabled selected>Urutkan</option>
                        <option>A-Z</option>
                        <option>Termurah - Termahal</option>
                        <option>Terbaru - Terlama</option>
                    </select>
                    <button class="btn">Go</button>
                </div>
            </div>
        </div>
    </div>
    <!-- PRODUK -->
    <div class="divider"></div>
    <div>
        <div class="flex flex-col w-full mx-auto space-x-4 space-y-4 bg-base-100 rounded-lg">

            <div class="w-full grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                <div v-for="i in 10" :key="i" class="flex justify-center py-4">
                    <div class="card w-96 glass">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="car!" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                            <div class="card-actions justify-end">
                                <div class="badge badge-outline">Fashion</div>
                                <div class="badge badge-outline">Products</div>
                            </div>
                            <div class="card-actions justify-end">
                                <button class="btn btn-info">Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


</template>