'use client';

import { useRouter } from 'next/navigation';

type EditTaskProps = {
  id: number;
};

const EditTask = ({ id }: EditTaskProps) => {
  const router = useRouter();
  return (
    <button
      className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
      onClick={() => {
        router.push(`${id}/edit`);
      }}>
      Edit Task
    </button>
  );
};

export default EditTask;
