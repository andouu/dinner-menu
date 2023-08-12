import { AiFillGithub } from 'react-icons/ai';
import { motion, useScroll } from 'framer-motion';
import { useState } from 'react';
import { NavigationOption, NAVIGATION_OPTIONS } from '../api/NavigationOptions';
import { useLocation } from 'react-router-dom';
import './Header.css';

const ScrollingText: React.FC = () => {
  return (
    <div className="tape">

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
          closed: { d: "M 2 2.5 L 20 2.5", transition: { delay: 0.5 } },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1, transition: { delay: 0.5 } },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346", transition: { delay: 0.5 } },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

interface MenuItemProps {
  navigationOption: NavigationOption;
  focused: boolean;
  onClick: (focused: boolean) => any;
};

const MenuItem: React.FC<MenuItemProps> = ({ navigationOption, focused, onClick }: MenuItemProps) => {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: 75,
      opacity: 0,
    },
    held: {
      opacity: 0.75
    }
  };

  return (
    <motion.li style={{ color: focused ? '#D6913C' : undefined }} variants={variants} onClick={() => onClick(focused)}>
      {navigationOption.text}
    </motion.li>
  );
};

const Menu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const location = useLocation();

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

  const footerNoteVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { delay: 1.5 }
    },
    closed: {
      y: 75,
      opacity: 0,
    }
  };

  const handleLinkClick = (focused: boolean) => {
    if (focused) {
      setOpen(false);
    }
    else {

    }
  };

  return (
    <motion.nav
      className="menu"
      animate={open ? 'open' : 'closed'}
    >
      <motion.div className="sidebar" variants={sidebarVariants} transition={{ duration: 0.25 }}>
        <motion.div className="sidebar-content">
          <motion.ul variants={ulVariants}>
            {NAVIGATION_OPTIONS.map((navigationOption: NavigationOption, i) => (
              <MenuItem
                key={i}
                navigationOption={navigationOption}
                focused={navigationOption.href === location.pathname}
                onClick={handleLinkClick}
              />
            ))}
          </motion.ul>
        </motion.div>
        <motion.div className="sidebar-footer">
          <motion.div className="footer-note center-content" variants={footerNoteVariants}>
            <AiFillGithub size="2.5rem" style={{ marginRight: '2.5px' }} />
            <a className="link" href="https://github.com/andouu/dinner-menu" target="_blank">repo.</a>
          </motion.div>
          <motion.div className="footer-note" variants={footerNoteVariants}>
            Created with <a className="link" href="https://react-pxeokh.stackblitz.io/" target="_blank">love</a> for Soap (and 张家)
          </motion.div>
        </motion.div>
      </motion.div>
      <MenuToggle toggle={() => setOpen(!open)} />
    </motion.nav>
  );
};

export const Header: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="header-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <div className="header">
        <span className="title">
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