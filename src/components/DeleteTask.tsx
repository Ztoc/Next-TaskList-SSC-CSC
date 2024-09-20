'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmDialog } from './ConfirmDialog';
import { Toaster } from './ui/toaster';

import { deleteTask } from '@/actions/taskActions';
import { useToast } from '@/hooks/use-toast';

type DeleteTaskProps = {
  id: number;
};

const DeleteTask = ({ id }: DeleteTaskProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleConfirm = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    try {
      await deleteTask(id);
      toast({
        title: 'Task Deleted successfully!',
        description: 'you are redirecting list page.',
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
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Error occured while deleting task!',
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
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        onClick={handleConfirm}>
        Delete Tasks
      </button>
      <ConfirmDialog open={open} setOpen={setOpen} handleConfirm={handleDelete} />
      <Toaster />
    </>
  );
};

export default DeleteTask;
