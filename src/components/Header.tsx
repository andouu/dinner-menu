import { AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { NavigationOption, NAVIGATION_OPTIONS } from '../data/NavigationOptions';
import { useLocation, useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { usePath } from '../hooks/usePath';
import './Header.css';

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
  focused: boolean;
  onClick: (navigationOption: NavigationOption) => any;
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

  const disabled = navigationOption.dateAvailable != null && new Date() < navigationOption.dateAvailable;

  return (
    <motion.li
      style={{
        color: disabled ? 'rgba(30, 31, 36, 0.2)' : focused ? 'var(--accent-text-secondary-color)' : undefined,
        pointerEvents: disabled ? 'none' : undefined,
      }}
      variants={variants}
      onClick={disabled ? undefined : () => onClick(navigationOption)}
    >
      {navigationOption.text}
    </motion.li>
  );
};

const Menu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const sidebarVariants = {
    open: {
      width: '100%',
    },
    closed: {
      width: '0%',
      transition: { delay: 0.35 }
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

  const footerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
      }
    },
  };

  const footerNoteVariants = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: 75,
      opacity: 0,
    }
  };

  const handleRedirect = (navigationOption: NavigationOption) => {
    if (navigationOption.href === location.pathname) {
      setOpen(false);
    }
    else {
      navigate(navigationOption.href);
      setOpen(false);
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
            {NAVIGATION_OPTIONS
              .map((navigationOption: NavigationOption, i) => (
                <MenuItem
                  key={i}
                  navigationOption={navigationOption}
                  focused={navigationOption.href === location.pathname}
                  onClick={handleRedirect}
                />
              )
            )}
          </motion.ul>
        </motion.div>
        <motion.div className="sidebar-footer" variants={footerVariants}>
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
  const path = usePath();

  return (
    <motion.div
      className="header-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <Marquee className="ticker" autoFill>
        <div style={{ margin: '0 0.5rem', fontSize: '1.4rem', textTransform: 'uppercase' }}>{path}</div>
      </Marquee>
      <div className="header">
        <span className="title">
          <span>AND</span>
          <div className="circle" />
          <span style={{ marginLeft: '2px' }}>U</span>
        </span>
        <div className="content" />
        <Menu />
      </div>
    </motion.div>
  );
};