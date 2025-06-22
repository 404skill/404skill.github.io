import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, HelpCircle, Home, LogOut, Rocket, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check for authentication state
  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      if (session?.user) {
        // Get user name from metadata if available
        const userMeta = session.user.user_metadata;
        setUserName(userMeta?.name || session.user.email?.split('@')[0] || '');

        // If we get a new session, fetch the user profile
        if (event === 'SIGNED_IN') {
          fetchUserProfile(session.user.id);
        }
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      if (session?.user) {
        const userMeta = session.user.user_metadata;
        setUserName(userMeta?.name || session.user.email?.split('@')[0] || '');
        fetchUserProfile(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async userId => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data && data.name) {
        setUserName(data.name);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  const handleLogout = async () => {
    try {
      trackEvent({
        eventType: 'user_logout',
        component: 'Navbar',
      });

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error signing out:', error);
        return;
      }

      setIsLoggedIn(false);
      setUserName('');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
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

          <Link
            to="/getStarted"
            className={`text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary ${
              location.pathname === '/getStarted' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Rocket className="h-4 w-4" />
            <span className="hidden sm:inline">Get Started</span>
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

              {/*<Link*/}
              {/*  to="/help"*/}
              {/*  className={`text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary ${*/}
              {/*    location.pathname === '/help' ? 'text-primary' : 'text-muted-foreground'*/}
              {/*  }`}*/}
              {/*>*/}
              {/*  <HelpCircle className="h-4 w-4" />*/}
              {/*  <span className="hidden sm:inline">Get Help</span>*/}
              {/*</Link>*/}

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-secondary flex items-center gap-1"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>

              {userName && (
                <span className="hidden md:flex items-center text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {userName}
                </span>
              )}
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
