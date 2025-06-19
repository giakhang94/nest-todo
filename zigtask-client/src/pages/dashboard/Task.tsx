import { getTaskByUser } from "@/actions/getTaskByUser";
import TaskItem from "@/components/tasks/TaskItem";
import Loading from "@/components/ui/Loading";
import { useQuery } from "@tanstack/react-query";

function Task() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["task"],
    queryFn: getTaskByUser,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
  }
  console.log(data);
  return (
    <div>
      {data?.map((task, index: number) => {
        return (
          <div>
            <TaskItem
              id={task.id}
              title={task.title}
              due={task.due}
              description={task.description}
              status={task.status}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Task;
