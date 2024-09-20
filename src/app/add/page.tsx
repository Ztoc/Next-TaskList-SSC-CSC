import Link from 'next/link';

import AddTaskForm from '@/components/AddTaskForm';

export default function AddTaskPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Link className="mb-4 w-fit cursor-pointer rounded-sm bg-gray-200 p-2" href={'/'}>
        {' '}
        &larr; To List
      </Link>
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <div className="flex gap-x-2">
          <h1 className="mb-4 text-2xl font-bold">Add New Task</h1>
        </div>
        <AddTaskForm />
      </div>
    </div>
  );
}
