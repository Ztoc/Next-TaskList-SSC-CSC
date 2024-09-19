import { db } from '@/db/client';
import { Task, tasks } from '@/db/schema';
import Link from 'next/link';

const fetchTasks = async () => {
  return await db.select().from(tasks);
};

const TaskList = async () => {
  const taskList = await fetchTasks();

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Task List</h1>
      <table className="min-w-full border border-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b px-4 py-2 text-left">No</th>
            <th className="border-b px-4 py-2 text-left">Title</th>
            <th className="border-b px-4 py-2 text-left">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task: Task, index: number) => (
            <tr key={task.id} className="hover:bg-gray-100">
              <td className="border-b px-4 py-2">{index + 1}</td>
              <td className="border-b px-4 py-2">{task.title}</td>
              <td className="border-b px-4 py-2">{new Date(task.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        className="white white white float-right mt-2 rounded-lg bg-gray-700 p-2 text-white"
        href="/add">
        Add New Task
      </Link>
    </div>
  );
};

export default TaskList;
