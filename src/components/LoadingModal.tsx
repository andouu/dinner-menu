import { motion, stagger, useAnimate, usePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import './LoadingModal.css';

interface ModalProps {
  finishLoading: Function;
};

export const LoadingModal: React.FC<ModalProps> = (props: ModalProps) => {
  const { finishLoading } = props;
  
  const [isPresent, safeToRemove] = usePresence();
  const [containerScope, animateContainer] = useAnimate();
  const [loaderScope, animateLoader] = useAnimate();
  const [percentageTextScope, animatePercentageText] = useAnimate();

  const [loadPercentage, setLoadPercentage] = useState<string>('0');

  const randomLoadTime = Math.random() * 1 + 0.5;

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        const initialDelay = 0.2;
        animateContainer('div', { opacity: 1 }, { delay: initialDelay, duration: 0.5 });
        await animateContainer('p', { opacity: 1 }, { delay: initialDelay + 0.3, duration: 0.5 });
        
        animateLoader('div', { width: '100%' }, { duration: randomLoadTime, ease: 'easeOut', delay: 0.1 });
        await animateContainer(0, 100, {
          duration: randomLoadTime + 0.1,
          ease: 'easeOut',
          onUpdate: (currentValue => {
            setLoadPercentage(currentValue.toFixed(0));
          }),
        });
        finishLoading();
      };

      enterAnimation();
    }
    else {
      const exitAnimation = async () => {
        await animatePercentageText('p', { y: 5, opacity: 0, rotateZ: 15 }, { delay: stagger(0.08, { startDelay: 0.3 }), duration: 0.25 });
        await animateContainer('div', { opacity: 0 }, { duration: 0.5 });
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={containerScope}
      className="modal-container fullscreen center-content-vertically"
      key="loading-modal"
    >
      <motion.div ref={loaderScope} className="modal-loading-bar-container rounded" initial={{ opacity: 0 }}>
        <motion.div
          className="modal-loading-bar"
          initial={{ width: '0%' }}
        />
      </motion.div>
      <motion.div ref={percentageTextScope} initial={{ opacity: 0 }}>
        {loadPercentage.split('').map((digit: string, i) => (
          <motion.p className="percentage-text-char" key={digit + i}>{digit}</motion.p>
        ))}
        <motion.p className="percentage-text-char">%</motion.p>
      </motion.div>
    </motion.div>
  );
};