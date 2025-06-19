import { deleteTask } from "@/actions/deleteTask";
import { updateTaskStatus } from "@/actions/updateTaskStatus";
import type { Task, TaskStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Delete, Edit } from "lucide-react";
import FlexibleInput from "./FlexibleInput";
import { useState } from "react";
import { updateTask } from "@/actions/updateTask";

const statusArr = [
  { status: "To Do", color: "#e26b6b" },
  { status: "In Progress", color: "#cfb42f" },
  { status: "Done", color: "#2fcf76" },
];
function TaskItem({ id, title, due, description, status }: Task) {
  const [input, setInput] = useState<{
    title?: string;
    due?: string;
    description?: string;
  }>({
    title,
    description,
    due: dayjs(due).format("YYYY-MM-DD").toString(),
  });
  const [edit, setEdit] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const editMutaion = useMutation({
    mutationKey: ["update"],
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body: { title?: string; due?: string; description?: string };
    }) => updateTask(id, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
    onError(error) {
      console.log(error);
    },
  });

  const deleteMuation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
  });

  const mutation = useMutation({
    mutationKey: ["status"],
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) => {
      return updateTaskStatus(id, status);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleChangeStatus = (id: number, newStatus: TaskStatus) => {
    mutation.mutate({ id, status: newStatus });
  };
  const handleDeleteTask = (id: number) => {
    deleteMuation.mutate(id);
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleEditTask = () => {
    setEdit(!edit);
  };
  const handleSubmitEditTask = () => {
    editMutaion.mutate({ id, body: input });
    setEdit(false);
  };
  return (
    <div className="relative w-full max-w-[300px] mx-5 my-10 border-1 border-gray-300 p-3 rounded-md shadow-xl">
      <FlexibleInput
        name="title"
        edit={edit}
        value={input.title!}
        onChange={handleChangeInput}
        classname="font-semibold text-xl"
        type="text"
      >
        {title}
      </FlexibleInput>
      <FlexibleInput
        name="description"
        edit={edit}
        value={input.description!}
        onChange={handleChangeInput}
        classname="text-md font-thin"
        type="text"
      >
        {description}
      </FlexibleInput>
      <FlexibleInput
        name="due"
        edit={edit}
        value={input.due!}
        onChange={handleChangeInput}
        classname="text-md italic font-thin"
        type="date"
      >
        Due date: <span>{dayjs(due).format("DD/MM/YYYY")}</span>
      </FlexibleInput>
      <div className="flex space-x-5 mt-3">
        {!edit ? (
          <Edit
            className="text-green-500 cursor-pointer"
            size={18}
            onClick={handleEditTask}
          />
        ) : (
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => {
              handleSubmitEditTask();
            }}
          >
            Save
          </span>
        )}
        {edit && (
          <span
            className="text-red-500 cursor-pointer"
            onClick={handleEditTask}
          >
            Cancel
          </span>
        )}
        {!edit && (
          <Delete
            className="text-red-500 cursor-pointer"
            size={18}
            onClick={() => {
              handleDeleteTask(id);
            }}
          />
        )}
      </div>
      <div className="absolute top-1 right-2">
        {statusArr.map(
          (item: { status: string; color: string }, index: number) => {
            return (
              <div className="relative group" key={index}>
                <div
                  onClick={() => {
                    handleChangeStatus(id, item.status as TaskStatus);
                  }}
                  style={{
                    backgroundColor: item.color,
                    opacity: status !== item.status ? "20%" : "100%",
                  }}
                  className="text-white font-bold block w-3 h-3  my-2 rounded-full  cursor-pointer "
                ></div>
                <div
                  className=" group-hover:block absolute hidden -top-1 -right-[120px] w-25"
                  style={{
                    color: item.color,
                  }}
                >
                  {item.status}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default TaskItem;
