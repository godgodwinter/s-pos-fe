<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const onProdukDetail = (id) => {
    router.push({
        name: "produk-detail",
        params: { id: id },
    });

}
const onKategori = (id) => {
    router.push({
        name: "katalog-kategori",
        params: { id: id },
    });

}
</script>
<template>
    <div>
        <!-- header -->
        <!-- Terbanyak dibeli pada bulan ini -->
        <div class="bg-base-100">
            <div class="carousel w-full">
                <div id="item1" class="carousel-item w-full">
                    <div class="w-full flex justify-center">
                        <div class="hero-content flex-col lg:flex-row-reverse">
                            <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl" />
                            <div>
                                <h1 class="text-5xl font-bold">Produk Terlaris 1!</h1>
                                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                                    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                                </p>
                                <button class="btn btn-info" @click="onProdukDetail(1)">Detail Produk</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="item2" class="carousel-item w-full">
                    <div class="w-full flex justify-center">
                        <div class="hero-content flex-col lg:flex-row-reverse">
                            <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl" />
                            <div>
                                <h1 class="text-5xl font-bold">Produk Terlaris 2!</h1>
                                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                                    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                                </p>
                                <button class="btn btn-info" @click="onProdukDetail(2)">Detail Produk</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="item3" class="carousel-item w-full">
                    <div class="w-full flex justify-center">
                        <div class="hero-content flex-col lg:flex-row-reverse">
                            <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl" />
                            <div>
                                <h1 class="text-5xl font-bold">Produk Terlaris 3!</h1>
                                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                                    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                                </p>
                                <button class="btn btn-info" @click="onProdukDetail(3)">Detail Produk</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="item4" class="carousel-item w-full">
                    <div class="w-full flex justify-center">
                        <div class="hero-content flex-col lg:flex-row-reverse">
                            <img src="https://placeimg.com/260/400/arch" class="max-w-sm rounded-lg shadow-2xl" />
                            <div>
                                <h1 class="text-5xl font-bold">Produk Terlaris 4!</h1>
                                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                                    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                                </p>
                                <button class="btn btn-info" @click="onProdukDetail(4)">Detail Produk</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center w-full py-2 gap-2">
                <a href="#item1" class="btn btn-xs">1</a>
                <a href="#item2" class="btn btn-xs">2</a>
                <a href="#item3" class="btn btn-xs">3</a>
                <a href="#item4" class="btn btn-xs">4</a>
            </div>
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
                                <h2 class="card-title">Produk {{ i }}</h2>
                                <p>How to park your car at your garage?</p>
                                <div class="card-actions justify-end">
                                    <div class="badge badge-outline">Fashion</div>
                                    <div class="badge badge-outline">Products</div>
                                </div>
                                <div class="card-actions justify-end">
                                    <button class="btn btn-info" @click="onProdukDetail(i)">Detail Produk {{ i
                                    }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>