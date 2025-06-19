import { BASE_URL } from "@/constants";
import type { TaskStatus } from "@/types";
import axios from "axios";
export const updateTaskStatus = async (id: number, status: TaskStatus) => {
  const resp = await axios.patch(
    `${BASE_URL}/tasks/${id}/status`,
    { status },
    { withCredentials: true }
  );
  return resp.data;
};
