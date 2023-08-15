import { AnimatePresence } from 'framer-motion';
import { LoadingModal } from '../components/LoadingModal';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import './Root.css';

export const Root = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  if (location.pathname === '/') {
    return <Navigate replace to="/menu/breakfast" />;
  }

  return (
    <div id="app">
      <AnimatePresence>
        {loading
          ? <LoadingModal key="loading" finishLoading={() => setLoading(false)} />
          : (
            <>
              <Header />
              <Outlet />
            </>
          )}
      </AnimatePresence>
    </div>
  );
};