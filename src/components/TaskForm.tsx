'use client';
import { addTask } from '@/actions/taskActions';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Toaster } from './ui/toaster';

export default function TaskForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('dueDate', formData.dueDate);
      await addTask(form);
      toast({
        title: 'Task added successfully!',
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
      setFormData({
        title: '',
        description: '',
        dueDate: '',
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
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">
          Add Task
        </button>
      </form>
      <Toaster />
    </>
  );
}
