<script setup >
/* eslint-disable */
import NavBar from "@/components/template/admin/AdminNavBar.vue";
import { computed, ref } from "vue";
import Footer from "@/components/template/CFooter.vue";
import ThemeBar from "@/components/template/ThemeBar.vue";
import SideBarAdmin from "@/components/template/admin/SideBarAdmin.vue";
import ScrollToTop from "@/components/template/ScrollToTop.vue";
import { useStoreAdminAuth } from "@/stores/adminAuth";
import { useRouter } from "vue-router";
import Toast from "@/components/lib/Toast";
import serviceAuth from "@/services/authServices";
import { useStoreLanding } from "@/stores/landing";
const storeLanding = useStoreLanding();
const theme = computed(() => storeLanding.getTheme);

const doUpdateTheme = (theme) => {
    storeLanding.setTheme(theme);
};
const router = useRouter();
const storeAdminAuth = useStoreAdminAuth();
const token = computed(() => storeAdminAuth.getToken);
const isLogin = computed(() => storeAdminAuth.getIsLogin);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
storeAdminAuth.$subscribe((mutation, state) => { });

const resCheckToken = ref([]);
const checkTokenExpired = async (dataToken) => {
    resCheckToken.value = await serviceAuth.doCheckToken(dataToken);
    if (resCheckToken.value === false) {
        serviceAuth.doLogout(false);
        Toast.danger("Info", "Token Expired");
        router.push({ name: "LandingLogin" });
    }
};

if (token.value) {
    // console.log("isTokenExpired");
    checkTokenExpired(token.value);
} else {
    Toast.info("Info", "Silahkan login terlebih dahulu");
    router.push({ name: "LandingLogin" });
}
</script>
<template>
    <NavBar />
    <!-- <ScrollToTop /> -->
    <!-- <ThemeBar /> -->
    <div class="border-b-2 top-14 lg:top-14 relative">
        <div class="drawer drawer-mobile bg-base-100">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <main class="font-serif md:min-h-screen top-14 lg:top-14 py-12 px-2 lg:px-4 lg:py-10">
                    <router-view />
                </main>
            </div>
            <SideBarAdmin></SideBarAdmin>
        </div>
        <!-- <Footer /> -->
    </div>
</template>
