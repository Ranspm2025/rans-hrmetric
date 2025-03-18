
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import NavbarLogo from './navbar/NavbarLogo';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileNavigation from './navbar/MobileNavigation';
import UserMenu from './navbar/UserMenu';
import { useNavLinks } from '@/hooks/useNavLinks';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const navLinks = useNavLinks();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? 'glassmorphism py-3' : 'bg-transparent py-5'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <NavbarLogo />

        {/* Desktop Navigation */}
        <DesktopNavigation navLinks={navLinks} />

        <div className="hidden md:block">
          {isAuthenticated ? (
            <UserMenu handleLogout={handleLogout} />
          ) : (
            <Button asChild>
              <Link to="/login">Masuk</Link>
            </Button>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={isOpen} 
        navLinks={navLinks} 
        handleLogout={handleLogout} 
      />
    </motion.nav>
  );
};

export default Navbar;
