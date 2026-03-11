'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface PreloaderState {
  finished: boolean;
  setFinished: () => void;
}

const PreloaderContext = createContext<PreloaderState>({
  finished: false,
  setFinished: () => {},
});

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [finished, setDone] = useState(false);
  const setFinished = useCallback(() => setDone(true), []);

  return (
    <PreloaderContext.Provider value={{ finished, setFinished }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
