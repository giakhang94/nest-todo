import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, type CreateTaskDto } from "@/actions/createTask";

export function CreateTaskModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<CreateTaskDto>({
    title: "",
    description: "",
    due: "",
    status: "To Do",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      setOpen(false); // đóng modal
      setTask({ title: "", description: "", due: "", status: "To Do" }); // reset form
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Failed to create task");
    },
  });

  const handleCreate = () => {
    mutate(task);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Create Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>
          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>
          {/* Due date */}
          <div className="grid gap-2">
            <Label htmlFor="due">Due Date</Label>
            <Input
              type="date"
              name="due"
              value={task.due}
              onChange={(e) => setTask({ ...task, due: e.target.value })}
            />
          </div>
          {/* Status */}
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={task.status}
              onValueChange={(value) =>
                setTask({ ...task, status: value as CreateTaskDto["status"] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full" onClick={handleCreate} disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
