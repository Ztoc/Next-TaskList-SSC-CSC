'use server';

import { db } from '@/db/client';
import { Task, tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updateTask = async (id: number, task: Task) => {
  const res = await db.update(tasks).set(task).where(eq(tasks.id, id));
  return res;
};
export const getAllTasks = async () => {
  const res = await db.select().from(tasks);
  return res;
};
export const addTask = async (formData: FormData) => {
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');

  if (!title || !description || !dueDate) {
    throw new Error('All fields are required.');
  }

  await db.insert(tasks).values({
    title,
    description,
    dueDate,
  });
};
