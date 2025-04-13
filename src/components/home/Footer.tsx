
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground font-mono">
          &copy; 2025 BackendHub. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground font-mono">
          <Link to="#" className="hover:underline">Terms</Link>
          <Link to="#" className="hover:underline">Privacy</Link>
          <Link to="#" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
