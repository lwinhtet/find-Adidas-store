import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';

const LoadingPageIcon = ({
  className = 'min-h-screen',
  title,
}: {
  className?: string;
  title?: string;
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <ReloadIcon
        className="h-[48px] w-[48px] animate-spin"
        width={48}
        height={48}
      />
      {title && <p className="py-[15px]">Your title ...</p>}
    </div>
  );
};

export default LoadingPageIcon;
