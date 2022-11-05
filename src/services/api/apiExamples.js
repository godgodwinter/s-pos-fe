/* eslint-disable */
import Api from "@/axios/axios";
// import jwt_decode from "jwt-decode";
import Toast from "@/components/lib/Toast.js";
import { useStoreUjian } from "@/stores/ujian";
import { useStoreAuth } from "@/stores/auth";
const storeUjian = useStoreUjian();
const storeAuth = useStoreAuth();

const token = storeAuth.getToken;

const doGetUjianList = async () => {
  try {
    const response = await Api.get(`siswa/data/ujian`, {
      token,
    });
    const { data, success } = response;
    if (success) {
      storeUjian.setUjianList(data);
      // console.log(data);
    }
    // console.log(data, message, success);
    return true;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server!`);
    console.error(error);
    return false;
  }
};

const apiUjian = {
  doGetUjianList,
};
export default apiUjian;
