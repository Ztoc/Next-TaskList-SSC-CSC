// app/add/page.js (Server component)

import TaskForm from '@/components/TaskForm';
import { db } from '@/db/client';
import { tasks } from '@/db/schema';

export const addTask = async (formData) => {
  'use server'; // Declare this function as a server action

  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');

  // Validate inputs
  if (!title || !description || !dueDate) {
    throw new Error('All fields are required.');
  }

  // Insert task into the database
  await db.insert(tasks).values({
    title,
    description,
    dueDate,
  });

  // Optionally redirect or return some data
};

export default function AddTaskPage() {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Add New Task</h1>
      {/* Pass the server action to the client component */}
      <TaskForm addTask={addTask} />
    </div>
  );
}
