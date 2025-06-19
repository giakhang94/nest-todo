import { BASE_URL } from "@/constants";
import type { Task } from "@/types";
import axios from "axios";

export const getTaskByUser = async () => {
  const resp = await axios.get(`${BASE_URL}/tasks`, { withCredentials: true });
  return resp.data as Task[];
};
