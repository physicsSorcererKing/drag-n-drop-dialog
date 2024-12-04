import { useState } from 'react';

import { Container } from '@/components/container.tsx';
import { Button } from '@/components/ui/button.tsx';
import { DragableDialog } from '@/components/ui/dragable-dialog.tsx';

export const App: FC = () => {
  const [open, setOpen] = useState(false);
  const handleTrigger = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Container>
      <Button onClick={handleTrigger}>Click to Open Dialog</Button>
      <DragableDialog open={open} onClose={setOpen.bind(null, false)}>
        <div className={'w-full h-full flex items-center justify-center'}>
          Dialog Content
        </div>
      </DragableDialog>
    </Container>
  );
};
