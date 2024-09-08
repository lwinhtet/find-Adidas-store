import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export function ButtonLoading({ className }: { className: string }) {
  return (
    <Button className={className} disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
