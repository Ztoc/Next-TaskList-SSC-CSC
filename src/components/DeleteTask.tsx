'use client';

import { deleteTask } from '@/actions/taskActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

type DeleteTaskProps = {
  id: number;
};

const DeleteTask = ({ id }: DeleteTaskProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    try {
      const res = await deleteTask(id);
      router.push('/');
      console.log('Task deleted successfully:', res);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        onClick={handleConfirm}>
        Delete Tasks
      </button>
      <ConfirmDialog open={open} setOpen={setOpen} handleConfirm={handleDelete} />
    </>
  );
};

export default DeleteTask;
