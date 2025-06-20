import { BASE_URL } from "@/constants";
import axios from "axios";
export const logoutUser = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/auth/logout`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
