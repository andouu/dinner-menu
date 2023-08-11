import { motion, useScroll } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import './Header.css';
import { NavigationOption, NAVIGATION_OPTIONS } from '../api/NavigationOptions';

const ScrollingText: React.FC = () => {
  return (
    <div id="tape">

    </div>
  );
};

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3.5"
    stroke="#141414"
    strokeLinecap="square"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: (arg: any) => any;
};

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }: MenuToggleProps) => (
  <button onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

interface MenuItemProps {
  navigationOption: NavigationOption;
};

const MenuItem: React.FC<MenuItemProps> = ({ navigationOption }: MenuItemProps) => {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: 50,
      opacity: 0,
    },
    held: {
      opacity: 0.75
    }
  };

  return (
    <motion.li variants={variants}>
      {navigationOption.text}
    </motion.li>
  );
};

const Menu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const sidebarVariants = {
    open: {
      width: '100%',
    },
    closed: {
      width: '0%',
      transition: { delay: 0.5 }
    }
  };

  const ulVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.5 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    }
  };

  return (
    <motion.nav
      id="menu"
      animate={open ? 'open' : 'closed'}
    >
      <motion.div id="sidebar" variants={sidebarVariants} transition={{ duration: 0.25 }}>
        <motion.ul variants={ulVariants}>
          {NAVIGATION_OPTIONS.map((navigationOption: NavigationOption, i) => (
            <MenuItem key={i} navigationOption={navigationOption} />
          ))}
        </motion.ul>
      </motion.div>
      <MenuToggle toggle={() => setOpen(!open)} />
    </motion.nav>
  );
};

export const Header: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div id="header-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 0.5 }}>
      <div id="header">
        <span id="title">
          <span>AND</span>
          <div className="circle" />
          <span style={{ marginLeft: '2px' }}>U</span>
        </span>
        <ScrollingText />
        <Menu />
      </div>
    </motion.div>
  );
};