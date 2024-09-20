'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <p className="cursor-pointer" onClick={() => router.back()}>
      &larr;
    </p>
  );
};

export default BackButton;
