// 1. should be able to drag n drop the dialog
// 2. should be able to close the dialog
// 3. should be able to minimize the dialog
// 4. should be able to maximize the dialog
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';

export type DialogState = 'minimized' | 'maximized' | 'normal';
export type DragableDialogProps = {
  open: boolean;
  onClose: () => void;
} & ChildrenWithin;

export const DragableDialog: React.FC<DragableDialogProps> = ({
  open,
  onClose,
  children,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<DialogState>('normal');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStartDragging = (_e: React.MouseEvent) => {
    if (state !== 'normal') return;
    setIsDragging(true);
  };

  const handleEndDragging = (_e: React.MouseEvent) => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    },
    [isDragging],
  );

  const handleMinimize = () => {
    setState('minimized');
  };

  const handleMaximize = () => {
    setState('maximized');
  };

  const handleNormal = () => {
    setState('normal');
  };

  const handleClose = () => {
    onClose();
  };

  const dialogClassName = cn(
    'absolute w-[600px] min-h-1 h-[400px] flex flex-col rounded-md shadow-md',
    !open && 'hidden',
    state === 'minimized' && 'h-8',
    state === 'maximized' && 'h-full w-full',
  );

  const contentClassName = cn(
    'bg-white w-full h-full',
    state === 'minimized' && 'hidden',
  );

  // add event listeners to background to handle mouse move
  useLayoutEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, isDragging]);

  // update dialog position
  useLayoutEffect(() => {
    if (!isDragging || !dialogRef.current) return;

    switch (state) {
      case 'minimized':
        dialogRef.current.style.removeProperty('left');
        dialogRef.current.style.removeProperty('top');
        dialogRef.current.style.right = '0';
        dialogRef.current.style.bottom = '8px';
        break;
      case 'maximized':
        dialogRef.current.style.removeProperty('right');
        dialogRef.current.style.removeProperty('bottom');
        dialogRef.current.style.top = '0';
        dialogRef.current.style.left = '0';
        break;
      default:
        // update position on mouse move
        dialogRef.current.style.left = `${position.x}px`;
        dialogRef.current.style.top = `${position.y}px`;
    }
  }, [position, isDragging, state]);

  // state set to normal when dialog is closed
  useEffect(() => {
    if (!open) {
      setState('normal');
    }
  }, [open]);

  return (
    // dialog backdrop
    <div
      ref={backgroundRef}
      className={cn(
        'fixed w-full h-full inset-0 bg-black bg-opacity-50',
        !open && 'hidden',
      )}
    >
      <div className={'relative w-full h-full'}>
        <div ref={dialogRef} className={dialogClassName}>
          {/*header bar to drag*/}
          <div
            className={
              'flex justify-between items-center pl-2 bg-blue-400 rounded-t-md'
            }
            onMouseDown={handleStartDragging}
            onMouseUp={handleEndDragging}
          >
            <div>Dialog</div>
            <div className={'flex p-1 gap-1'}>
              <Button size={'sm'} onClick={handleMinimize}>
                min
              </Button>
              <Button size={'sm'} onClick={handleMaximize}>
                MAX
              </Button>
              <Button size={'sm'} onClick={handleNormal}>
                normal
              </Button>
              <Button size={'sm'} onClick={handleClose}>
                X
              </Button>
            </div>
          </div>
          <div className={contentClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
};
