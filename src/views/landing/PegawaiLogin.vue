<script setup>
/* eslint-disable */
import { ref } from "vue";
import API from "@/services/authServices";
import { useRouter } from "vue-router";
import Toast from "@/components/lib/Toast";
const router = useRouter();
const username = ref("");
const password = ref("");
const onSubmit = async () => {
    // console.log(username.value, password.value);
    // const res = await API.doLogin(username.value, password.value);
    // if (res === true) {
    //     router.push({ name: "AdminLayout" });
    //     // console.log("Login Berhasil");
    // }
    Toast.warning("Info", "Menu belum tersedia!")
};
</script>
<template>
    <div>
        <!-- FORM-LOGIN -->
        <div class="flex content-center justify-center">
            <div class=" bg-base-100 py-32 ">
                <div class="text-center lg:text-center">
                    <h1 class="text-5xl font-bold">Menu Pegawai</h1>
                    <p class="py-6">Masuk sebagai Pegawai / Kasir.</p>
                </div>
                <div class="flex-col lg:flex-row-reverse flex justify-center ">

                    <div class="cards w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body  flex justify-center ">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email / Username</span>
                                </label>
                                <input v-model="username" name="username" type="text" placeholder="email"
                                    class="input input-bordered input-secondary" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input v-model="password" name="password" type="password" placeholder="password"
                                    class="input input-bordered input-secondary" />

                            </div>
                            <div class="form-control mt-6">
                                <button class="btn btn-primary" @click="onSubmit()">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- FORM-LOGIN -->
    </div>
</template>
