import BackButton from '@/components/BackButton';
import DeleteTask from '@/components/DeleteTask';
import EditTask from '@/components/EditTask';
import { fetchTaskById } from '../../actions/taskActions';

type TaskDetailPageProps = {
  params: {
    id: number;
  };
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = params;

  const task = await fetchTaskById(id);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 text-black shadow-md">
        <BackButton />
        <h1 className="mb-4 text-3xl font-bold text-gray-900">{task[0].title}</h1>

        <div className="mb-4 flex justify-between">
          <span className="text-gray-600">Description:</span>
          <span className="font-semibold">{task[0].description}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <span className="text-gray-600">Due Date:</span>
          <span className="font-semibold">{new Date(task[0].dueDate).toLocaleDateString()}</span>
        </div>

        <div className="mb-4 flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span
            className={`font-semibold ${task[0].isCompleted ? 'text-green-500' : 'text-red-500'}`}>
            {task[0].isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>

        <div className="flex justify-between gap-x-10">
          <EditTask id={task[0].id} />
          <DeleteTask id={task[0].id} />
        </div>
      </div>
    </div>
  );
}
