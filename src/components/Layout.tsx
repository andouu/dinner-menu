import { MotionProps, motion } from 'framer-motion';

type LayoutProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { style, children, ...rest } = props;
  
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.25, duration: 0.5 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};