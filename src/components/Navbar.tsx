
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, HelpCircle, Home, LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock check for authentication
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">404Skill</span>
        </Link>
        
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          {isLoggedIn && (
            <>
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary ${
                  location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Projects</span>
              </Link>
              
              <Link 
                to="/help" 
                className={`text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary ${
                  location.pathname === '/help' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Get Help</span>
              </Link>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-primary flex items-center gap-1"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          )}
          
          {!isLoggedIn && (
            <Link to="/auth">
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
