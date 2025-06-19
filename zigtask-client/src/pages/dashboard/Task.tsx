import { getTaskByUser } from "@/actions/getTaskByUser";
import TaskItem from "@/components/tasks/TaskItem";
import Loading from "@/components/ui/Loading";
import { useQuery } from "@tanstack/react-query";

function Task() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["task"],
    queryFn: getTaskByUser,
  });

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

  const groupedTasks = groupTasksByStatus(data!);

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
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
      ))}
    </div>
  );
}

export default Task;
