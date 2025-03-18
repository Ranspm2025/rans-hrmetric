
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DesktopNavigationProps {
  navLinks: Array<{ path: string; label: string }>;
}

const DesktopNavigation = ({ navLinks }: DesktopNavigationProps) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`text-sm font-medium transition-colors relative ${
            location.pathname === link.path
              ? 'text-primary'
              : 'text-foreground/80 hover:text-foreground'
          }`}
        >
          {link.label}
          {location.pathname === link.path && (
            <motion.div
              layoutId="navbar-indicator"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavigation;
