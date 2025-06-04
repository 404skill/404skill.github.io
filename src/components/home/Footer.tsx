import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} 404Skill. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground font-mono">
          <Link to="/legal/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="/legal/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/legal/refund" className="hover:underline">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
