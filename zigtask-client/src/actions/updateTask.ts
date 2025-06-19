import { BASE_URL } from "@/constants";
import axios from "axios";

export const updateTask = async (
  id: number,
  body: { title?: string; due?: string; description?: string }
) => {
  const resp = await axios.patch(`${BASE_URL}/tasks/${id}`, body, {
    withCredentials: true,
  });

  return resp.data;
};
