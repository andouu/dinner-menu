import { motion } from 'framer-motion';
import './Marquee.css';

interface MarqueeProps {
  children?: React.ReactNode;
};

export const Marquee: React.FC<MarqueeProps> = (props: MarqueeProps) => {
  const { children } = props;

  const marqueeVariants = {
    animate: {
      x: [0, -1035],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 5,
          ease: 'linear',
        },
      },
    },
  };
  
  return (
    <div className="marquee">
      <motion.div
        className="track"
        variants={marqueeVariants}
        animate="animate"
      >
        {children}
      </motion.div>
    </div>
  );
};