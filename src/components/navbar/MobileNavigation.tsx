
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface MobileNavigationProps {
  isOpen: boolean;
  navLinks: Array<{ path: string; label: string }>;
  handleLogout: () => void;
}

const MobileNavigation = ({ isOpen, navLinks, handleLogout }: MobileNavigationProps) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="md:hidden glassmorphism border-t"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`py-3 flex items-center justify-between ${
              location.pathname === link.path
                ? 'text-primary font-medium'
                : 'text-foreground/80'
            }`}
          >
            <span>{link.label}</span>
            <ChevronRight size={16} />
          </Link>
        ))}
        
        {isAuthenticated ? (
          <>
            <div className="py-3 mt-2 border-t border-border flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.role}</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </>
        ) : (
          <Button className="mt-4" asChild>
            <Link to="/login">Masuk</Link>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
