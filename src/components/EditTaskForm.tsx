'use client';

import { updateTask } from '@/actions/taskActions';
import { Task } from '@/db/schema';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BackButton from './BackButton';
import { Toaster } from './ui/toaster';

type EditTaskFormProps = {
  task: Task;
};

const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateTask(task.id, {
        title,
        description,
        dueDate,
        isCompleted,
      });
      toast({
        title: 'Task updated successfully!',
        variant: 'destructive',
        style: {
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 9999,
          backgroundColor: 'green',
          width: '260px',
          border: 'none',
        },
      });
    } catch (error: unknown) {
      toast({
        title: 'Woops!',
        description: error instanceof Error ? error.message : 'Something went wrong.',
        variant: 'destructive',
        style: {
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 9999,
          backgroundColor: 'red',
          width: '260px',
          border: 'none',
        },
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-3/4 max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <BackButton />
        <h1 className="mb-4 text-2xl font-bold">Edit Task</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border p-2"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate.split('T')[0]}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 w-full rounded-lg border p-2"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="mr-2 text-gray-700">Completed</label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            className="h-4 w-4"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Save Changes
          </button>
          <button
            type="button"
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            onClick={() => router.back()}>
            Cancel
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default EditTaskForm;
