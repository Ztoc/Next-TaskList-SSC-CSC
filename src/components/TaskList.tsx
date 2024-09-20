import Link from 'next/link';

import RefreshButton from './RefreshButton';

import { getAllTasks } from '@/actions/taskActions';
import { Task } from '@/db/schema';

const TaskList = async () => {
  let taskList: Task[] = [];
  try {
    taskList = await getAllTasks();
  } catch (error) {
    console.error(error);
    return <div>Error loading tasks</div>;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-2 flex w-full justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Task List</h1>
        <RefreshButton />
      </div>
      {taskList.length > 0 ? (
        <table className="min-w-full border border-gray-200 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b px-4 py-2 text-left">No</th>
              <th className="border-b px-4 py-2 text-left">Title</th>
              <th className="border-b px-4 py-2 text-left">Due Date</th>
              <th className="border-b px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task: Task, index: number) => (
              <tr key={task.id} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2">{index + 1}</td>
                <td className="border-b px-4 py-2">{task.title}</td>
                <td className="border-b px-4 py-2">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="border-b px-4 py-2">
                  <Link href={`/${task.id}`}>&rarr;</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No tasks available.</p>
      )}

      <Link className="white float-right mt-2 rounded-lg bg-gray-700 p-2 text-white" href="/add">
        Add New Task
      </Link>
    </div>
  );
};

export default TaskList;
