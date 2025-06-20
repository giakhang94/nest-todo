import { getTaskByUser } from "@/actions/getTaskByUser";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import TaskItem from "@/components/tasks/TaskItem";
import Loading from "@/components/ui/Loading";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";

function Task() {
  const [pickDate, setPickDate] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["task"],
    queryFn: getTaskByUser,
  });

  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const debouce = useDebounce(search, 500);

  //group by task
  const groupTasksByStatus = (tasks: any[]) => {
    return tasks.reduce((acc: Record<string, any[]>, task) => {
      if (!acc[task.status]) acc[task.status] = [];
      acc[task.status].push(task);
      return acc;
    }, {});
  };

  if (isLoading) return <Loading />;
  if (error) {
    console.log(error);
    return <div>Error loading tasks</div>;
  }
  const filteredTasks = data!.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(debouce.toLowerCase());

    const matchesDate = date
      ? format(new Date(task.due), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      : true;
    return matchesSearch && matchesDate;
  });
  const groupedTasks = groupTasksByStatus(filteredTasks!);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-between gap-4 items-center m-4">
        <h1 className="text-2xl font-bold">Search Task</h1>
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[200px]"
        />
        <div className="relative">
          <Button
            onClick={() => {
              setPickDate(!pickDate);
            }}
          >
            Pick Date
          </Button>
          {pickDate && (
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md absolute z-10"
            />
          )}
        </div>
        <Button variant="outline" onClick={() => setDate(undefined)}>
          Clear Date
        </Button>
      </div>

      <div className="flex space-x-10 items-center m-4">
        <CreateTaskModal />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {["To Do", "In Progress", "Done"].map((status) => {
          const tasks = groupedTasks[status] || [];
          return (
            <div key={status}>
              <h2 className="font-bold text-xl m-5 capitalize">{status}</h2>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  due={task.due}
                  description={task.description}
                  status={task.status}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Task;
