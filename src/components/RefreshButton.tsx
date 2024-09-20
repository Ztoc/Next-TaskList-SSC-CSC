'use client';

import { useRouter } from 'next/navigation';

const RefreshButton = () => {
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="cursor-pointer rounded-full bg-gray-800 p-2 text-white" onClick={handleRefresh}>
      Reload
    </div>
  );
};

export default RefreshButton;
