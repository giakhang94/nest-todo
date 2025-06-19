// DragDropTask.tsx (KanbanBoard)
"use client";

import {
  DndContext,
  closestCorners,
  type DragEndEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import type { Task, TaskStatus } from "@/types";
import TaskItemDragDrop from "./TaskItem";
import { updateTaskStatus } from "@/actions/updateTaskStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const statuses: TaskStatus[] = ["To Do", "In Progress", "Done"];

type Props = {
  initialTasks?: Task[];
};

export default function DragDropTask({ initialTasks = [] }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      updateTaskStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["task"] }),
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id.toString() === active.id);
    const newStatus = over.id as TaskStatus;

    if (activeTask && activeTask.status !== newStatus) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeTask.id ? { ...t, status: newStatus } : t
        )
      );
      mutation.mutate({ id: activeTask.id, status: newStatus });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-5">
        {statuses.map((col) => (
          <DroppableColumn
            key={col}
            id={col}
            tasks={tasks.filter((t) => t.status === col)}
            onStatusChange={(taskId, newStatus) => {
              setTasks((prev) =>
                prev.map((t) =>
                  t.id === taskId ? { ...t, status: newStatus } : t
                )
              );
              mutation.mutate({ id: taskId, status: newStatus });
            }}
          />
        ))}
      </div>
    </DndContext>
  );
}

function DroppableColumn({
  id,
  tasks,
  onStatusChange,
}: {
  id: TaskStatus;
  tasks: Task[];
  onStatusChange: (taskId: number, status: TaskStatus) => void;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 rounded p-3 w-1/3 min-h-[300px]"
    >
      <h2 className="font-bold mb-3">{id}</h2>
      <SortableContext
        items={tasks.map((t) => t.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskItemDragDrop key={task.id} {...task} />
        ))}
      </SortableContext>
    </div>
  );
}
