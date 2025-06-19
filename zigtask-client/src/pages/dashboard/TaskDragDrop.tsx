import { getTaskByUser } from "@/actions/getTaskByUser";
import DragDropTask from "@/components/tasks/DragDropContainer";
import Loading from "@/components/ui/Loading";
import { useQuery } from "@tanstack/react-query";

function TaskDragDrop() {
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
      <DragDropTask initialTasks={data || []} />
    </div>
  );
}

export default TaskDragDrop;
