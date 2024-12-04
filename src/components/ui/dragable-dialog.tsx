import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';

export type DialogState = 'minimized' | 'maximized' | 'normal';
export type DragableDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
} & ChildrenWithin;

type Position = { x: number; y: number };
type Size = { width: number; height: number };

export const DragableDialog: React.FC<DragableDialogProps> = ({
  open,
  onClose,
  title = 'Dialog',
  children,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<DialogState>('normal');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // the current position of the dialog
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  // the initial mouse position when the dragging starts
  const startDragPos = useRef<Position>({ x: 0, y: 0 });

  const handleStartDragging = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (state !== 'normal') return;

    setIsDragging(true);
    startDragPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleEndDragging = useCallback(() => {
    setIsDragging(false);

    // fix the position if the dialog is out of the screen
    if (!dialogRef.current) return;

    // get window size
    const windowSize: Size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // get dialog client rect
    const rect = dialogRef.current.getBoundingClientRect();

    // toolbar's height should not be out of the screen
    if (rect.top < 0) {
      setPosition((prev) => ({ ...prev, y: 0 }));
    }
    if (rect.top > windowSize.height - 40) {
      setPosition((prev) => ({ ...prev, y: windowSize.height - 40 }));
    }
    // dialog's width should not be fully out of the screen
    if (rect.left < -rect.width + 8) {
      setPosition((prev) => ({ ...prev, x: -rect.width + 8 }));
    }
    if (rect.left > windowSize.width - 8) {
      setPosition((prev) => ({ ...prev, x: windowSize.width - 8 }));
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition(() => ({
        x: e.clientX - startDragPos.current.x,
        y: e.clientY - startDragPos.current.y,
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

  const preventToolbarButtonPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const dialogClassName = cn(
    'absolute w-[600px] min-h-10 h-[400px] flex flex-col rounded-md shadow-md',
    !open && 'hidden',
    state === 'minimized' && 'h-10',
    state === 'maximized' && 'h-full w-full',
  );

  const toolbarClassName = cn(
    'flex justify-between items-center pl-2 bg-blue-400 rounded-t-md cursor-move',
    state !== 'normal' && 'cursor-default',
  );

  const contentClassName = cn(
    'bg-white w-full h-full rounded-b-md overflow-auto',
    state === 'minimized' && 'hidden',
  );

  // initialize dialog position
  useLayoutEffect(() => {
    if (open) {
      setPosition({
        x: window.innerWidth / 2 - dialogRef.current!.offsetWidth / 2,
        y: window.innerHeight / 2 - dialogRef.current!.offsetHeight / 2,
      });
    } else {
      setState('normal');
    }
  }, [open]);

  // add event listeners to background to handle mouse move
  useLayoutEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEndDragging);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEndDragging);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEndDragging);
    };
  }, [handleEndDragging, handleMouseMove, isDragging]);

  // update dialog position
  useLayoutEffect(() => {
    if (!dialogRef.current) return;

    switch (state) {
      case 'minimized':
        dialogRef.current.style.removeProperty('left');
        dialogRef.current.style.removeProperty('top');
        dialogRef.current.style.right = '0';
        dialogRef.current.style.bottom = '0';
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
  }, [position, state]);

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
          <div className={toolbarClassName} onMouseDown={handleStartDragging}>
            <div className={'select-none'}>{title}</div>
            <div className={'flex p-1 gap-1'}>
              <Button
                size={'sm'}
                onMouseDown={preventToolbarButtonPropagation}
                onClick={handleMinimize}
              >
                min
              </Button>
              <Button
                size={'sm'}
                onMouseDown={preventToolbarButtonPropagation}
                onClick={handleMaximize}
              >
                MAX
              </Button>
              <Button
                size={'sm'}
                onMouseDown={preventToolbarButtonPropagation}
                onClick={handleNormal}
              >
                normal
              </Button>
              <Button
                size={'sm'}
                onMouseDown={preventToolbarButtonPropagation}
                onClick={handleClose}
              >
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
