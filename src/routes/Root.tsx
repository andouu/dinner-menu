import { AnimatePresence } from 'framer-motion';
import { LoadingModal } from '../components/LoadingModal';
import { useState } from 'react';
import { Intro } from '../components/Intro';
import './Root.css';

export const Root = () => {
  const [loading, setLoading] = useState<boolean>(true);
  
  return (
    <div id="app">
      <AnimatePresence>
        {loading
          ? <LoadingModal key="loading" finishLoading={() => setLoading(false)} />
          : <Intro />}
      </AnimatePresence>
    </div>
  );
};