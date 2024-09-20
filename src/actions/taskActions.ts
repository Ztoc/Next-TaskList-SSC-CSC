'use server';

import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getAllTasks = async () => {
  const res = await db.select().from(tasks);
  return res;
};
export const fetchTaskById = async (id: number) => {
  return await db.select().from(tasks).where(eq(tasks.id, id));
};

export const addTask = async (formData: FormData) => {
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');

  if (!title || !description || !dueDate) {
    throw new Error('All fields are required.');
  }

  await db.insert(tasks).values({
    title: title as string,
    description: description as string,
    dueDate: dueDate as string,
  });
};

export const updateTask = async (
  id: number,
  task: { title: string; description: string; dueDate: string; isCompleted: boolean }
) => {
  const res = await db.update(tasks).set(task).where(eq(tasks.id, id));
  return res;
};

export const deleteTask = async (id: number) => {
  const res = await db.delete(tasks).where(eq(tasks.id, id));
  return res;
};
