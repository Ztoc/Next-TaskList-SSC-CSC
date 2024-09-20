import TaskForm from '@/components/TaskForm';

export default function AddTaskPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Add New Task</h1>
        <TaskForm />
      </div>
    </div>
  );
}
