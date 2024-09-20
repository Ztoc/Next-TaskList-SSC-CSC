import { eq } from 'drizzle-orm';

import EditTaskForm from '@/components/EditTaskForm';

import { db } from '@/db/client';
import { tasks } from '@/db/schema';

const fetchTaskById = async (id: number) => {
  return await db.select().from(tasks).where(eq(tasks.id, id));
};

type EditTaskPageProps = {
  params: {
    id: number;
  };
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = params;

  const task = await fetchTaskById(id);

  if (!task || task.length === 0) {
    return <div>Task not found</div>;
  }

  const taskDetails = task[0];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <EditTaskForm task={taskDetails} />
    </div>
  );
}
