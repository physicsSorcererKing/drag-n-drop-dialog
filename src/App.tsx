import { useEffect, useMemo, useState } from 'react';

import { TitleFlex } from '@/components/TitleFlex.tsx';
import {
  VITE_API_TOKEN,
  VITE_APP_TITLE,
  VITE_APP_VERSION,
} from '@/utils/const/env.ts';

export const App: FC = () => {
  const [timestamp, setTimestamp] = useState<number>(Date.now());

  const dateString = useMemo<string>(
    () =>
      new Date(timestamp).toLocaleDateString() +
      ' ' +
      new Date(timestamp).toTimeString(),
    [timestamp],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TitleFlex>
        <h2>{VITE_APP_TITLE}</h2>
        <span>{VITE_APP_VERSION}</span>
      </TitleFlex>

      <p>API TOKEN: {VITE_API_TOKEN}</p>
      <p>{dateString}</p>
    </>
  );
};
