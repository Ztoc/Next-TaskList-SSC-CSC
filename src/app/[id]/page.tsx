import { db } from '@/db/client';
import { eq } from 'drizzle-orm';

import DeleteTask from '@/components/DeleteTask';
import EditTask from '@/components/EditTask';
import { tasks } from '@/db/schema';
const fetchTaskById = async (id) => {
  return await db.select().from(tasks).where(eq(tasks.id, id));
};

export default async function TaskDetailPage({ params }) {
  const { id } = params;

  const task = await fetchTaskById(id);
  console.log(task);

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 text-black shadow-md">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">{task[0].title}</h1>
      <p className="mb-2 text-gray-700">{task[0].description}</p>

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

      <div className="flex justify-center">
        <EditTask id={task[0].id} />
        <DeleteTask id={task[0].id} />
      </div>
    </div>
  );
}
