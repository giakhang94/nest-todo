import { BASE_URL } from "@/constants";
import type { User } from "@/types";
import axios from "axios";

export const getCurrentUser = async () => {
  const res = await axios.get(`${BASE_URL}/users/me`, {
    withCredentials: true,
  });
  const data = res.data as User;
  return data;
};
