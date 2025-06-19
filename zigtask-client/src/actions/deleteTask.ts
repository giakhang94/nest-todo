import { BASE_URL } from "@/constants";
import axios from "axios";

export const deleteTask = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/tasks/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
