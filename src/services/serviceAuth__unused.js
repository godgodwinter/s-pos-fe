/* eslint-disable */
import { useStoreAdminAuth } from "@/stores/adminAuth";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
const storeAdminAuth = useStoreAdminAuth();

// const dataAsli = computed(() => storeAdminAuth.getData);

const doLogin = async (email, password) => {
  try {
    const response = await Api.post(`admin/auth/login`, {
      username: email,
      password,
    });
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("isLogin", true);
      storeAdminAuth.setToken(token);
      storeAdminAuth.setIsLogin(true);
      // console.log("login berhasil");
      // console.log(response.message);
      Toast.success("Info", "Login berhasil!");
    } else {
      // console.log("login gagal");
      // console.log(response.message);
      Toast.danger("Error", "Login gagal!");
    }

    return true;
  } catch (error) {
    Toast.danger("Error", `Gagal login!`);
    console.error(error);
  }
};

const doCheckToken = async (token) => {
  try {
    const response = await Api.post(`admin/auth/profile`, {
      token: token,
    });
    // console.log(response.hasOwnProperty("data"));
    if (response.hasOwnProperty("data")) {
      const newToken = response.data.newToken;
      localStorage.setItem("token", newToken);
      storeAdminAuth.setToken(newToken);
      console.log(response.data.me.nama);

      const dataMe = {
        id: response.data.me.id,
        nama: response.data.me.nama,
        username: response.data.me.username,
        email: response.data.me.email,
      };
      storeAdminAuth.setMe(dataMe);
      // console.log(dataMe);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server!`);
    console.error(error);
    return false;
  }
};

const doLogout = async (alert = true) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    storeAdminAuth.setToken("");
    storeAdminAuth.setIsLogin(false);
    if (alert) {
      Toast.success("Info", "Logout berhasil!");
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

const serviceAuth = {
  doLogin,
  doCheckToken,
  doLogout,
};
export default serviceAuth;
