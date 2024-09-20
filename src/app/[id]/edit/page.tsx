import EditTaskForm from '@/components/EditTaskForm';
import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Fetch task by ID
const fetchTaskById = async (id) => {
  return await db.select().from(tasks).where(eq(tasks.id, id));
};

export default async function EditTaskPage({ params }) {
  const { id } = params;

  // Fetch task data
  const task = await fetchTaskById(id);

  if (!task || task.length === 0) {
    return <div>Task not found</div>;
  }

  // Set default form values with the fetched task data
  const taskDetails = task[0];

  return <EditTaskForm task={taskDetails} />;
}
