import { fetchTaskById } from '@/actions/taskActions';
import DeleteTask from '@/components/DeleteTask';
import EditTask from '@/components/EditTask';

type TaskDetailPageProps = {
  params: {
    id: number;
  };
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = params;
  const task = await fetchTaskById(id);
  if (!task) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">Task not found</h1>
      </div>
    );
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 text-black shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">{task.title}</h1>

        <div className="mb-4 flex justify-between">
          <span className="text-gray-600">Description:</span>
          <span className="font-semibold">{task.description}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <span className="text-gray-600">Due Date:</span>
          <span className="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>

        <div className="mb-4 flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-semibold ${task.isCompleted ? 'text-green-500' : 'text-red-500'}`}>
            {task.isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>

        <div className="flex justify-between gap-x-10">
          <EditTask id={task.id} />
          <DeleteTask id={task.id} />
        </div>
      </div>
    </div>
  );
}
