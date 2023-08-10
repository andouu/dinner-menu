import { AnimatePresence } from 'framer-motion';
import { LoadingModal } from '../components/LoadingModal';
import { useState } from 'react';
import './Root.css';
import { Scene } from '../components/Scene';

export const Root = () => {
  const [loading, setLoading] = useState<boolean>(true);
  
  return (
    <div id="app">
      <AnimatePresence>
        {loading
          ? <LoadingModal key="loading" finishLoading={() => setLoading(false)} />
          : <Scene />}
      </AnimatePresence>
    </div>
  );
};