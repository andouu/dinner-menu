import './Accent.css';

interface AccentProps {
  children?: React.ReactNode;
};

export const Accent: React.FC<AccentProps> = (props: AccentProps) => {
  const { children } = props;
  return (
    <div className="accent">
      {children}
    </div>
  );
};