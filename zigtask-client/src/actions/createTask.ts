import axios from "axios";
import { BASE_URL } from "@/constants";

export type CreateTaskDto = {
  title: string;
  description: string;
  due: string;
  status: "To Do" | "In Progress" | "Done";
};

export const createTask = async (data: CreateTaskDto) => {
  const res = await axios.post(`${BASE_URL}/tasks/create`, data, {
    withCredentials: true,
  });
  return res.data;
};
