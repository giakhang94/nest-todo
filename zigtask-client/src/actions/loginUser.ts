import { BASE_URL } from "@/constants";
import type { LoginInput } from "@/types";
import axios from "axios";

export const loginUser = async (input: LoginInput) => {
  const resp = await axios.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify(input),
    { headers: { "content-type": "application/json" }, withCredentials: true }
  );
  return resp.data;
};
